/// #if NODEJS
const Worker = eval('require')("worker_threads").Worker;
/// #endif
import { PromiseProxy } from "../utils";

/**Wrapper around `OIMOWorker` and all it's communication
 */
export class OIMOScenePart {
    mixin() {
        return class OIMOScenePartMixin {
            get supportsPhysics(){ return true; }
            initializer(){
                this.physics = new OIMOScenePart(this);
                this._loadPromise = this._loadPromise ? 
                    this._loadPromise.then(this.physics.load()) :
                    this.physics.load();
                this.physics.load().then(()=>console.log("Physics scene loaded")):
            }
        }
    }

    constructor() {
        this._physicsObjects = {};

        /// #if NODEJS
        this._worker = new Worker("./dist/server/OimoWorker.js");
        /// #else
        this._worker = new Worker("/js/OimoWorker.js");
        /// #endif
        this._worker.postMessage = this._worker.webkitPostMessage || this._worker.postMessage;
        this._worker.onmessage = this.onMessage.bind(this);

        //Not loaded until the worker posts a message to us
        this._workerPromise = new PromiseProxy();

        this._lastFPS = 0;
    }

    /**@returns {Promise} Promise when the Worker has finished loading
     */
    async load() {
        await this._workerPromise;
    }

    /**Called after a physics simulation frame. Unserializes all the data from the
     * byte array in the same way it was packed
     * @param msg The message from the Worker
     */
    onMessage(msg) {
        /// #if BROWSER
        msg = msg.data;
        /// #endif
        if(msg.loaded) {
            this._workerPromise.externalResolve();
            return;
        }

        this._lastFPS = msg.fps;

        // Get fresh data from the worker
        let bodyData = msg.data;
        Object.keys(this._physicsObjects).forEach((key,i)=>{
            let o = this._physicsObjects[key];
            let offset = i*14;
            if(bodyData[offset] !== 1){ //not asleep || static
                o.position.fromArray( bodyData, offset+1);
                o.quaternion.fromArray( bodyData, offset+4 );
                o.linearVelocity.fromArray( bodyData, offset+8);
                o.angularVelocity.fromArray( bodyData, offset+11);
                //TODO: This should work for ALL OBJECTS, not just non-sleeping
                //dynamic ones
                if(typeof o.onPhysicsTick === "function") {
                    o.onPhysicsTick();
                }
            }
        });
    }

    onRegister(obj) {
        if(obj.supportsPhysics) {
            this.add(obj.physics.properties, obj);
        }
    }

    onUnregister(obj) {
        if(obj.supportsPhysics) {
            this.del(obj.physics.properties);
        }
    }

    /**Adds a physics object with the given params, optionally taking
     * a THREE.js object to keep up to date with the physics object.
     * @param {object} physObj Object with physics parameters
     * (normally the object that generated the physObj)
     */
    add(physObj) {
        this._physicsObjects[physObj.id] = physObj;
        obj.position = obj.position.toArray();
        obj.quaternion = obj.quaternion.toArray();
        obj.linearVelocity = obj.linearVelocity.toArray();
        obj.angularVelocity = obj.angularVelocity.toArray();

        this._worker.postMessage({
            command: "add",
            obj: physObj
        });
    }

    /**Given a physics object will conditionally set pos, rot, velocity,
     * and/or angular velocity 
     * @param {object} physObj Physics parameters with the new data and .id
     * @param {boolean} [setPos=true] Conditionally set pos of data
     * @param {boolean} [setRot=true] Conditionally set rot of data
     * @param {boolean} [setVel=false] Conditionally set linear velocity
     * @param {boolean} [setAngVel=false] Conditionally set angular velocity
     */
    set(physObj, setPos=true, setRot=true, setVel=false, setAngVel=false) {
        this._worker.postMessage({
            command: "set",
            obj: physObj,
            setPos, setRot, setVel, setAngVel
        });
    }

    /**Deletes the given physics object from the simulation
     * @param {object} physObj The physics object to delete (.id)
     */
    del(physObj) {
        this._worker.postMessage({
            command: "del",
            id: physObj.id
        });
        delete this._physicsObjects[physObj.id];
    }

    /**Applies impulse
     * @param {object} physObj The physics object to apply to (.id)
     * @param {THREE.Vector3} pos The position to apply the impulse too
     * @param {THREE.Vector3} force The force to apply, will be scaled by 1/m
     */
    impulse(physObj, pos, force) {
        this._worker.postMessage({
            command: "impulse",
            id: physObj.id,
            position: physObj.position,
            force: physObj.force.toArray()
        });
    }

    /**Gets the currect fps
     * @returns {number} The last FPS received from the OIMOWorker
     */
    get fps() {
        return this._lastFPS;
    }

    /**Starts the simulation
     */
    play() {
        this._worker.postMessage({
            command: "play"
        });
    }

    /**Pauses the simulation
     */
    pause() {
        this._worker.postMessage({
            command: "pause"
        });
    }
}