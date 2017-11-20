const expect = require("expect");

const {isValidString} = require("./../utils/valodators");

describe("isValidString()", ()=>{
    it("Should return true", ()=>{
        const str = isValidString("trust me i'm a string value");
        expect(str).toBe(true);
    });
    it("Should return false for empty string", ()=>{
        const str = isValidString("");
        expect(str).toBe(false);
    });
    it("Should return false for non string", ()=>{
        const str = isValidString(true);
        expect(str).toBe(false);
    });
});