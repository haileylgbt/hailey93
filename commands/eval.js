exports.run = (client, message, args, config) => {

  if(message.author.id !== client.config.ownerID) {
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      return;
    }
  } else {
    message.channel.send("nu")
  }
}
