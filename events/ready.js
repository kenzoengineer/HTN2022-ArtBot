module.exports = {
    name: "ready",
    execute(client) {
        console.log("Ready!");
        client.user.setActivity("/art...");
    }  
};