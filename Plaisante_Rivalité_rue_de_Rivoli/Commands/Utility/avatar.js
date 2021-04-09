module.exports = {
    name: 'avatar',
    aliases: ['icon', 'pfp'],
    description: 'Shows one\'s avatar',
    args: false,
    execute(message, args) {
        if (!args.length) {
        console.log("Code : 2")
        message.reply(message.author.displayAvatarURL())
    } else {
        console.log("Code : 3")
        message.reply(args[0].displayAvatarURL())
        }
    }
}