module.exports = {
    name: 'sum',
    description: 'Sums up all arguments.',
    args: true,
    execute(message, args) {
        console.log("Code : 1")
        let nbArgs = args.map(x => parseFloat(x))
        let sum = nbArgs.reduce((counter, x) => counter += x)
        message.channel.send(`Result : ${sum}`)
    }
}