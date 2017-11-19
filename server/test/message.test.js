const expect = require("expect");
const {generateMsg, generateLocationMsg} = require("./../utils/message.js");


describe("generateMsg()", ()=>{
    it('Should return new Msg obj', ()=>{
        const msg = generateMsg('Admin', 'helloEveryOne');

        expect(msg).toMatchObject({from: 'Admin', text: "helloEveryOne"});
        expect(typeof msg.createdAt).toBe('number');
    });
});

describe("generateLocationMsg()", ()=>{
    it("Should return new message with url", ()=>{
        const locMsg = generateLocationMsg("Admin", 31.407946199999998, 31.811799199999996);

        expect(typeof locMsg.createdAt).toBe('number');
        expect(locMsg).toMatchObject({from: 'Admin', url: "https://www.google.com/maps?q=31.407946199999998,31.811799199999996"});

    });
});