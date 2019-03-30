const BasePartClss = [];

function BasePartSuite(BasePartCls){
    describe(`BasePart - ${BasePartCls.name}`, ()=>{
        it(`returns a class from static mixin`, ()=>{
            //act/assert
            expect(BasePartCls.mixin()).to.be.a("function");
        });
        it(`returns part arguments`, ()=>{
            //act/assert
            expect(BasePartCls.arguments()).to.be.an("object");
        });
        it(`grabs arguments from a list of arguments`, ()=>{
            //arrange
            const myArgs = ["a","b"];
            const args = [{
                [BasePartCls.name]: myArgs
            }];
            //act/assert
            expect(BasePartCls.getPartArguments(args)).to.equal(myArgs);
        });
        it(`returns empty arguments for the part if none passed`, ()=>{
            //arrange
            const args = [{"notReal":"a"}, 4];
            //act/assert
            expect(BasePartCls.getPartArguments(args)).to.deep.equal([]);
        });
    });
};

BasePartClss.forEach(BasePartSuite);