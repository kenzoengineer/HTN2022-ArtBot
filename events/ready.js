module.exports = {
    name: "ready",
    execute(client) {
        console.log(`Ready! ${client.user.tag}`);
        client.user.setActivity("/art...");
    }  
};