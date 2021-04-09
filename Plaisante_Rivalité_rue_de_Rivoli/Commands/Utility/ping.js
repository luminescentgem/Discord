module.exports = {
    name: 'ping',
    description: 'Ping? Pong!',
    cooldown: 5,
    execute(message, args) {
        console.log("Code : 0")
        let timeTaken = Date.now() - message.createdTimestamp
        message.channel.send(`Pong ! (${timeTaken} ms)`)
    }
}