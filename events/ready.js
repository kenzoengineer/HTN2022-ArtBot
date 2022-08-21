module.exports = {
    name: "ready",
    execute(client) {
        console.log("Ready!");
        console.log(client.user.setActivity("/art"));
    }  
};