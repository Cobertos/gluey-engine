/// #if NODEJS
const Worker = eval('require')("worker_threads").Worker;
/// #endif
import { PromiseProxy } from "../utils";

/**Encapsulates an OIMOWorker and all the object communications with it
 * @todo The getInfo() doesn't actually work Im pretty sure
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
            this._worker.postMessage({ command: "loadbeat" });
        }, 100);
    }

    async load() {
        await this._workerPromise;
    }

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
     * a THREE.js object to update with the created rigidbody
     * @param {object} physObj Object with physics parametets
     * @param {THREE.Object3D} [threeObj=undefined] THREE.js update to update
     */
    phys_add(physObj, threeObj=undefined) {
        this._objects[physObj.id] = threeObj;

        this._worker.postMessage({
            command: "add",
            id: physObj.id,
            //pos, array of vec3
            //size, array of vec3
            //rot, array of vec4 (its a quat)
            data: physObj
        });
    }

    /**Given a physics object, will set a new position
     * and optionally rotation
     * @param {object} physObj The physics object with id with new pos and rot
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
     * @param {object} physObj The physics object to delete
     */
    phys_del(physObj) {
        this._worker.postMessage({
            command: "del",
            id: physObj.id
        });
        delete this._objects[physObj.id];
    }

    /**Applies impulse
     * @param {object} physObj The physics object to apply to
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