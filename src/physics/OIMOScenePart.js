/// #if NODEJS
const Worker = eval('require')("worker_threads").Worker;
/// #endif
import { PromiseProxy } from "../utils";

/**Wrapper around `OIMOWorker` and all it's communication
 */
export class OIMOScenePart {
    initializer() {
        this._objects = {};

        /// #if NODEJS
        this._worker = new Worker("./dist/server/OimoWorker.js");
        /// #else
        this._worker = new Worker("/js/OimoWorker.js");
        /// #endif
        this._worker.postMessage = this._worker.webkitPostMessage || this._worker.postMessage;
        this._worker.onmessage = this.onMessage.bind(this);

        this._workerLoaded = false;
        this._workerPromise = new PromiseProxy();

        this._lastFPS = 0;

        this._loadInterval = setInterval(()=>{
            //We post messages until the worker loads, because we can't reliably
            //determine otherwise when it does which breaks things at the start
            //of the level otherwise
            this._worker.postMessage({ command: "loadbeat" });
        }, 100);
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
        if(msg.loadbeat) {
            this._workerLoaded = true;
            this._workerPromise.externalResolve();
            clearInterval(this._loadInterval);
            return;
        }

        this._lastFPS = msg.fps;

        // Get fresh data from the worker
        let bodyData = msg.data;
        Object.keys(this._objects).forEach((key,i)=>{
            let o = this._objects[key];
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
            this.phys_add(obj.getPhysicsParams(), obj);
        }
    }

    onUnregister(obj) {
        if(obj.supportsPhysics) {
            this.phys_del(obj.getPhysicsParams());
        }
    }

    /**Adds a physics object with the given params, optionally taking
     * a THREE.js object to keep up to date with the physics object.
     * @param {object} physObj Object with physics parameters
     * @param {THREE.Object3D} [threeObj=undefined] THREE.js object to update
     * (normally the object that generated the physObj)
     */
    phys_add(physObj, threeObj=undefined) {
        this._objects[physObj.id] = threeObj;

        this._worker.postMessage({
            command: "add",
            id: physObj.id,
            data: physObj
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
    phys_set(physObj, setPos=true, setRot=true, setVel=false, setAngVel=false) {
        this._worker.postMessage({
            command: "set",
            obj: physObj,
            setPos, setRot, setVel, setAngVel
        });
    }

    /**Deletes the given physics object from the simulation
     * @param {object} physObj The physics object to delete (.id)
     */
    phys_del(physObj) {
        this._worker.postMessage({
            command: "del",
            id: physObj.id
        });
        delete this._objects[physObj.id];
    }

    /**Applies impulse
     * @param {object} physObj The physics object to apply to (.id)
     * @param {Number[]} pos Three component array, the position to apply to
     * @param {Number[]} force Three component array, the force to apply, will be scaled by 1/m
     */
    phys_impulse(physObj, pos, force) {
        this._worker.postMessage({
            command: "impulse",
            id: physObj.id,
            pos,
            force
        });
    }

    /**Gets the currect fps
     * @returns {number} The last FPS received from the OIMOWorker
     */
    get phys_fps() {
        return this._lastFPS;
    }

    /**Starts the simulation
     */
    phys_play() {
        this._worker.postMessage({
            command: "play"
        });
    }

    /**Pauses the simulation
     */
    phys_pause() {
        this._worker.postMessage({
            command: "pause"
        });
    }
}