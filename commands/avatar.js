exports.run = (client, message, args) => {
  message.channel.send(`Getting ${message.author.username}'s avatar...`)
  message.channel.send(message.author.avatarURL);
}
