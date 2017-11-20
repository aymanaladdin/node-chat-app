
const expect = require("expect");
const {Users} = require("./../utils/users");

let users = new Users();

beforeEach(()=>{
    users.usersList = [{id: "111", name: "Ayman", room: "A"},
                       {id: "112", name: "Ahmed", room: "A"},
                       {id: "121", name: "Eslam", room: "B"}]
});

describe("Users class", ()=>{
    
    it("Should add user", ()=>{
        const user = users.addUser("122", "Emad", "B");
        expect(users.usersList.length).toBe(4);
        expect(user.id).toBe("122");

    });

    it("Should return a user for existing id", ()=>{
        const user = users.getUser("111");
        expect(user).toEqual({id: "111", name: "Ayman", room: "A"});
    });

    it("Should not return a user for non existing id", ()=>{
        const user = users.getUser("333");
        expect(user).toBeFalsy();
    });

    it("Should remove user for an existing id", ()=>{
        const user = users.removeUser('111');
        expect(user.name).toBe("Ayman");
        expect(users.userlist.length).toBe(2);
    });

    it("Should not remove user for non existing id", ()=>{
        const user = users.removeUser('333');
        expect(user).toBeFalsy();
        expect(users.usersList.length).toBe(3);    
    });


    it("Should return all users names for a given chat room", ()=>{
        const usersNames = users.getUserList("A");
        expect(usersNames.length).toBe(2);
        expect(usersNames).toContain("Ayman");   
        expect(users.usersList.length).toBe(3);  
    });
});