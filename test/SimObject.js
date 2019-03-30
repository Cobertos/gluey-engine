import { expect } from "chai";
import { spy } from "sinon";
import * as PIXI from "pixi.js";
import { SimObject } from "../src/SimObject";
import { BasePart } from "../src/BasePart";

describe("SimObject", ()=>{
    it("is a function that builds PIXI.DisplayObject classes", ()=>{
        //assert
        expect(typeof SimObject === "function").to.be.ok;
        let cls = SimObject(PIXI.DisplayObject);
        expect(typeof cls === "function").to.be.ok;
        expect(cls.prototype).to.be.an.instanceof(PIXI.DisplayObject);
    });
    it("must be passed a PIXI.DisplayObject", ()=>{
        //assert
        expect(()=>   SimObject(class A {})   ).to.throw(Error);
        expect(SimObject(PIXI.Sprite)).to.be.ok;
        expect(SimObject(PIXI.AnimatedSprite)).to.be.ok;
    });
    it("has an onConstructed() hook run after constructor() for parts", (done)=>{
        //arrange
        let spyConstructor = spy();
        let spyOnConstructed = spy();
        class TestPart extends BasePart {
            onConstructed(){ spyOnConstructed(); }
        }
        class TestSO extends SimObject(THREE.Object3D, TestPart) {
            constructor() {
                super();
                spyConstructor();
            }
        }

        //act
        new TestSO();

        //assert
        expect(spyOnConstructed.callCount).to.equal(0); //Called in a setTimeout(0)
        expect(spyConstructor.callCount).to.equal(1);
        setTimeout(()=>{
            expect(spyConstructor.callCount, "constructor callCount").to.equal(1);
            expect(spyOnConstructed.callCount, "onConstructed callCount").to.equal(1);
            done();
        },33);
    });
    it("has an static onDefined() hook run after class definition for parts", ()=>{
        //arrange
        let spyOnDefined = spy();
        class TestPart extends BasePart {
            static onDefined(){ spyOnDefined(); }
        }
        class TestSO extends SimObject(THREE.Object3D, TestPart) {}

        //act
        TestSO.finishDefinition();

        //assert
        expect(spyOnDefined.callCount).to.equal(1);
    });
    it("can get root object at .scene", ()=>{
        //arrange
        class TestSO extends SimObject(THREE.Object3D) {}
        class TestSOEnd extends SimObject(THREE.Object3D) {
            get scene() {
                return "Wow";
            }
        }

        //act
        let o2 = new TestSO();
        let o1 = new TestSO();
        let root = new TestSOEnd();
        root.add(o1);
        o1.add(o2);

        //assert
        expect(o2.scene).to.equal("Wow");
    });
    it("will .register every object added to an object with a scene", ()=>{
        //arrange
        let registerSpy = spy();
        class TestSO extends SimObject(THREE.Object3D) {}
        class TestSOEnd extends SimObject(THREE.Object3D) {
            get scene() {
                return {
                    register: registerSpy
                };
            }
        }

        //act
        let o3 = new TestSO();
        let o2 = new TestSO();
        let o1 = new TestSO();
        let root = new TestSOEnd();
        o1.add(o2);
        root.add(o1, o3);

        //assert
        expect(registerSpy.callCount).to.equal(3);
        expect(registerSpy.getCall(0).args[0].uuid, "call0").to.equal(o1.uuid);
        expect(registerSpy.getCall(1).args[0].uuid, "call1").to.equal(o2.uuid);
        expect(registerSpy.getCall(2).args[0].uuid, "call2").to.equal(o3.uuid);

    });
});