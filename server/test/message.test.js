const expect = require("expect");
const {generateMsg} = require("./../utils/message.js");


describe("generateMsg()", ()=>{
    it('Should return new Msg obj', ()=>{
        const msg = generateMsg('Admin', 'helloEveryOne');

        expect(msg).toMatchObject({from: 'Admin', text: "helloEveryOne"});
        expect(typeof msg.createdAt).toBe('number');
    });
});