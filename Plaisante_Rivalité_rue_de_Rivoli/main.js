const fs = require('fs')
const Discord = require('discord.js')
const { prefix, token} = require("./config.json")

const client = new Discord.Client()
client.commands = new Discord.Collection()
client.cooldowns = new Discord.Collection()

const commandFolders = fs.readdirSync('./Commands')

//Toutes les actions à faire pour répertorier les commandes
for (const folder of commandFolders) {
    if (!folder.startsWith('.')) {
        const commandFiles = fs.readdirSync(`./Commands/${folder}`).filter(file => file.endsWith('.js'))
        for (const file of commandFiles) {
            const command = require(`./Commands/${folder}/${file}`)

            // set a new item in the Collection
            // with the key as the command name and the value as the exported module
            client.commands.set(command.name, command)
            // console.log(command.name, command)
        }
    }
}

//Toutes les actions à faire quand le bot se connecte
client.once("ready", () => {
    console.log("Ready")
})

// Répondre à un message
client.on("message", message => {
    if (message.author.bot || !message.content.startsWith(prefix)) return

    let args = message.content.slice(prefix.length).trim().split(/ +/)
    let commandName = args.shift().toLowerCase()

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

    if (!command) return

    console.log(`command is ${command}, args are ${args}`)

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!')
    }
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``
        }

        return message.channel.send(reply)
    }

    const {cooldowns} = client

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection())
    }

    const now = Date.now()
    const timestamps = cooldowns.get(command.name)
    const cooldownAmount = (command.cooldown || 3) * 1000

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000
            return message.channel.send(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
        }
    }
    timestamps.set(message.author.id, now)
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

    try {
            client.commands.get(commandName).execute(message, args)
    } 
    catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }
})

client.login(token);