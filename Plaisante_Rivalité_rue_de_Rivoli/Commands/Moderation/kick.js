module.exports = {
    name: 'give-role',
    description: 'Give a role to a user.',
    guildOnly: true,
    args: true,
    usage: '<user> <role>',
    execute(message, args) {
        console.log("Code : 5")
        if (args[0] == 'foo') {
        	return message.channel.send('bar')
        }
        message.channel.send(`Arguments: ${args}\nArguments length ${args.length}`)
    }
}
