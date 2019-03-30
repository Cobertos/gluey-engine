import { PromiseProxy } from "../utils";
/// #if NODEJS
const WSWebSocket = eval('require')("ws");
/// #endif
const isServer = typeof window === "undefined";

/**Encapsulates all the networking work needed to keep
 * objects synced between computers
 * @todo If we need UDP and in browser listen servers, consider using
 * https://peerjs.com/, which uses WebRTC data channels for UDP
 */
export class WSScenePart extends BasePart {
  static mixin(){
    return class WSScenePartMixin {
      /**@prop {boolean} supportsNetworking*/
      get supportsNetworking() { return true; }

      initializer(...args) {
        this.networking = new WSScenePart(this, ...WSScenePart.getPartArguments(args));
      }
    }
  }

    

    constructor(simObject, url) {
        super(simObject);
        this._isServer = !url;
        this._connectionPromise = new PromiseProxy();
        let ws;

        if(this.isServer) { //We ARE a server
            ws = new WSWebSocket.Server({
                port: 10016,
                clientTracking: true
            });
            ws.on("listening", this._connectionPromise.externalResolve);
            ws.on("error", (err)=>{
              throw err;
            });
        }
        else { //We're connecting to a server
            ws = new WebSocket(url);
            ws.addEventListener("open", this._connectionPromise.externalResolve);
            ws.addEventListener("error", (err)=>{
              throw err;
            });
        }
        this._ws = ws;
    }

    get isServer() {
        return this._isServer;
    }
    get isClient() {
        return !!this.isServer;
    }

    async load() {
        await this._connectionPromise;
    }

    //TODO: RPCs
    /*rpc(rpcName, ...rpcArgs) {
        if(this.isServer) {
            let clientID = rpcArgs[0];
            rpcArgs = rpcArgs.slice(1);
        }
        else {
            ws.send();
        }
    }*/
}