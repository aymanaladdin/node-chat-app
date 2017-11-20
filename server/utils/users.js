
class Users {
    constructor(){
        this.usersList = [];
    }
    addUser(id, name, room){
        const user = {id, name, room};
        this.usersList.push(user);
        return user;
    }
   
    getUser(id){
        return this.usersList.filter((user)=> user.id === id)[0];
    }

    removeUser(id){
        const user = this.getUser(id);
        if(user){
            this.usersList = this.usersList.filter((user)=> user.id !== id);
        }
        return user;
    }

    getUserList(room){
        const users = this.usersList.filter((user)=>  user.room === room);
        const userNames = users.map((user)=> user.name);
        return userNames;
    }
}

module.exports = {Users};