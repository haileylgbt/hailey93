const colors = require('colors');



const SQLite = require("better-sqlite3");
const sql = new SQLite('./economy.sqlite');

var userjoins = 0;
var joinlist = [];
var ujpmpeak = 0;

var userleaves = 0;
var leavelist = [];
var ulpmpeak = 0;

var msgs = 0;
var msglist = [];
var mpmpeak = 0;

var epm = 0;
var epmpeak = 0;

const text = require('./text.json')
const moment = require('moment')
var statusTimestamp = moment().format('h:mm:ssa');

const crypto = require('crypto');

class cyber {
  static toHex(string) {
    var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
    var mystr = mykey.update(string, 'utf8', 'hex')
    mystr += mykey.final('hex');
    return mystr;
  }

  static fromHex(string) {
    var mykey = crypto.createDecipher('aes-128-cbc', 'mypassword');
    var mystr = mykey.update(string, 'hex', 'utf8')
    mystr += mykey.final('utf8');
    return mystr;
  }

  static toB64(string) {
    var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
    var mystr = mykey.update(string, 'utf8', 'base64')
    mystr += mykey.final('base64');
    return mystr;
  }

  static fromB64(string) {
    var mykey = crypto.createDecipher('aes-128-cbc', 'mypassword');
    var mystr = mykey.update(string, 'base64', 'utf8')
    mystr += mykey.final('utf8');
    return mystr;
  }
}


const he = require('he');
const io = require('socket.io-client')

// INSERT HEADER HERE

const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

const client = new Discord.Client();

const config = require("./config.json");

cn = 0;
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;

/*
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
    console.log(`Loaded command ${commandName}`);
    cn = cn + 1;
  });
});
*/

socket.on('_connected', function(data){

    socket.emit('user joined', '🔧 hailey93 (h:)', '#00ffff', "", "", "")
    console.log(`[Client/${"Info".cyan}] Connected to Trollbox`)

    setTimeout(function () {
      socket.emit('message', 'hello all! im online and ready to function!')
    }, 3000);
})

client.on("ready", () => {

  const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'economy';").get();
  if (!table['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare("CREATE TABLE economy (id TEXT PRIMARY KEY, user TEXT, guild TEXT, money INTEGER);").run();
    // Ensure that the "id" row is always unique and indexed.
    sql.prepare("CREATE UNIQUE INDEX idx_economy_id ON economy (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }

  // And then we have two prepared statements to get and set the score data.
  client.getBalance = sql.prepare("SELECT * FROM economy WHERE user = ? AND guild = ?");
  client.setBalance = sql.prepare("INSERT OR REPLACE INTO economy (id, user, guild, money) VALUES (@id, @user, @guild, @money);");

  client.user.setPresence({ activity: { name: 'Perfect93' }, status: 'online' })
  console.log(`[Client/${"Info".cyan}] Connected to Discord`);
});

var memoryraw = fs.readFileSync('memory.json');
var memory = JSON.parse(memoryraw);

var rawbanlist = fs.readFileSync('banlist.json');
var banlist = JSON.parse(rawbanlist);

function updateMemory() {
  let newmemory = JSON.stringify(memory, null, 2);
  fs.writeFile('memory.json', newmemory, (err) => {
    if (err) throw err;
    console.log(`[Client/${"Update".green}] memory.json updated`);
  });
}

function updateBans() {
  let newbanlist = JSON.stringify(banlist, null, 2);
  fs.writeFile('banlist.json', newbanlist, (err) => {
    if (err) throw err;
    console.log(`[Client/${"Update".green}] banlist.json updated`);
  });
}

function randRange(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function randRangeFloat(min, max) {
  return Math.random() * (max - min) + min
}

function getRandomFromArray(arr) {
  return arr[randRange(0, arr.length)];
}

function arraySum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

function stringIsInArray(str, arr) {
  if (arr.indexOf(str) !== -1) {
    return true;
  } else {
    return false;
  }
}

function alert(color, name, desc, ping) {
  const theAlert = new Discord.MessageEmbed()
    // Set the title of the field
    .setTitle(name)
    .setAuthor("harry93", "https://cdn.discordapp.com/attachments/683178867678117908/683575784660533249/harry93.png")
    .setColor(color)
    .setDescription(desc)

  if (ping) {
    client.channels.cache.get('409386794098884628').send(`<@&693230205145317467>`, theAlert);
  } else {
    client.channels.cache.get('409386794098884628').send(theAlert);
  }

}

client.on("message", (message) => {

  let balance;
  if (message.guild) {
    balance = client.getBalance.get(message.author.id, message.guild.id);
    if (!balance) {
      balance = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, money: 0}
    }
    balance.money += randRangeFloat(0.10, 0.25);
    client.setBalance.run(balance);
  }

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (message.content.indexOf(config.prefix) !== 0) return;

  if (message.author.id === "126110044625305600") {
    if (text.soup.indexOf(message.content) !== -1) {
      message.channel.send(text.soup[text.soup.indexOf(message.content) + 1])
    }
  }

  if (command === "money") {
    switch (args[0]) {
      case undefined:
        message.channel.send("Command list coming soon!")
        break;

      case "bal":
        message.channel.send(`You have $${balance.money.toFixed(2)}.`)
        break;

      case "gift":
        if (!args[2]) {
          message.channel.send("Not enough args!")
          return;
        }

        if (args[2] > balance.money) {
          message.channel.send("You don't have enough money to send.")
          return;
        }

        args[2] = Number(args[2]);

        let recieverID = message.mentions.users.first().id.toString();
        let recipient = client.getBalance.get(recieverID, message.guild.id);
        balance.money -= args[2];
        recipient.money += args[2];
        client.setBalance.run(balance);
        client.setBalance.run(recipient);
        message.channel.send(`Successfully gifted $${args[2]} to ${message.mentions.users.first()}.`)
        break;

      default:
        message.channel.send("That's not a real economy command.")
    }
  }

  if (command === "tbstatus") {
    var embedimage = undefined;
    var embedmessage = undefined;

    if (epm === 0) {
      embedmessage = `"Give harry93 a minute or two to start up and gain some data off me."`;
    } else if (epm >= 150) {
      embedmessage = `"I'm under attack! So many events are occurring within a minute!"`;
      embedimage = "https://cdn.discordapp.com/attachments/409386794098884628/694188914331615242/logob.png";
    } else if (epm <= 10) {
      embedmessage = `"I'm feeling a little quiet at the moment."`;
      embedimage = "https://cdn.discordapp.com/attachments/409386794098884628/694341742387789845/epm_below_10.png";
    } else if (epm >= 200) {
      embedmessage = `"HOLY FUCK SOMEONE GET JANKEN PLEASE!"`;
      embedimage = "https://cdn.discordapp.com/attachments/409386794098884628/694342457844039770/epm_200_or_above.png";
    } else if (epm === 93) {
      embedmessage = `"I appear to be alr-oh look! The EPM is 93!"`;
      embedimage = "https://cdn.discordapp.com/attachments/409386794098884628/694342693702336586/harry93.png";
    } else if (epm >= 30) {
      embedmessage = `"I'm feeling quite lively at the moment!"`;
      embedimage = "http://www.windows93.net/c/sys/img/logob.png";
    } else {
      embedmessage = `"I'm feeling okay at the moment."`;
      embedimage = "http://www.windows93.net/c/sys/img/logob.png";
    }

    if (args.includes("--nopic")) {
      var embedimage = undefined;
    }

    if (args.includes("--lastminute")) {
      const embed = new Discord.MessageEmbed()
        // Set the title of the field
        .setTitle('Trollbox Status')
        .setImage(embedimage)
        .setAuthor("harry93", "https://cdn.discordapp.com/attachments/683178867678117908/683575784660533249/harry93.png")
        .setColor(0x00ffff)
        .setDescription("Stats as of last update")
        .addField("Time collecting data", `${(process.uptime()/60).toFixed(1)} minutes`, false)
        .addField("Joins in the last minute", isNaN(joinlist[joinlist.length-1]) ? "No data" :  joinlist[joinlist.length-1], true)
        .addField("Leaves in the last minute", isNaN(leavelist[leavelist.length-1]) ? "No data" :  leavelist[leavelist.length-1], true)
        .addField("Messages in the last minute", isNaN(msglist[msglist.length-1]) ? "No data" :  msglist[msglist.length-1], true)

        .setFooter(`As of ${statusTimestamp} AEST. Info is updated every ${memory.clockTockSpeed/1000} seconds.`, "http://www.windows93.net/c/sys/skins/w93/apps/chat.gif");
      message.channel.send(embed);
    } else {
      const embed = new Discord.MessageEmbed()
        // Set the title of the field
        .setTitle('Trollbox Status')
        .setImage(embedimage)
        .setAuthor("harry93", "https://cdn.discordapp.com/attachments/683178867678117908/683575784660533249/harry93.png")
        .setColor(0x00ffff)
        .setDescription(embedmessage)
        .addField("Time collecting data", `${(process.uptime()/60).toFixed(1)} minutes`, false)
        .addField("Total user joins", !isNaN(joinlist) ? "No data" :  arraySum(joinlist), true)
        .addField("User joins per minute", !isNaN(joinlist) ? "No data" :  (arraySum(joinlist)/joinlist.length).toFixed(2), true)
        .addField("Peak UJPM", isNaN(ujpmpeak) ? "No data" :  ujpmpeak, true)
        .addField("Total user leaves", !isNaN(leavelist) ? "No data" :  arraySum(leavelist), true)
        .addField("User leaves per minute", !isNaN(leavelist) ? "No data" :  (arraySum(leavelist)/leavelist.length).toFixed(2), true)
        .addField("Peak ULPM", isNaN(ulpmpeak) ? "No data" :  ulpmpeak, true)
        .addField("Total messages sent", !isNaN(msglist) ? "No data" : arraySum(msglist), true)
        .addField("Messages per minute", !isNaN(msglist) ? "No data" : (arraySum(msglist)/msglist.length).toFixed(2), true)
        .addField("Peak MPM", isNaN(mpmpeak) ? "No data" :  mpmpeak, true)
        .addField("Total EPM", isNaN(epm) ? "No data" : epm, true)
        .addField("Peak EPM", isNaN(epmpeak) ? "No data" : epmpeak, true)
        .setFooter(`As of ${statusTimestamp} AEST. Info is updated every ${memory.clockTockSpeed/1000} seconds.`, "http://www.windows93.net/c/sys/skins/w93/apps/chat.gif");
      message.channel.send(embed);
    }


  }


  if (command === "erp") {
    if (message.channel.nsfw || message.channel.id == "672280231377371137" || message.channel.id == "711060426137403412") {
      switch (args.join(" ")) {
        case "reset":
          memory.erp.isNaked = false;
          memory.erp.pleasure = 0;
          message.channel.send("the erp has been reset!")
          break;
        case "cuddle":
          if (memory.erp.isNaked) {
              memory.erp.pleasure += 15;
              message.channel.send(getRandomFromArray(text.erp.nakedcuddle))
          } else {
            var rand = randRange(0, 1);
            memory.erp.pleasure += rand;
            message.channel.send(text.erp.cuddle[rand])
          }
          break;
        case "undress":
          if (!memory.erp.isNaked) {
            memory.erp.pleasure += 10;
            memory.erp.isNaked = true;
            message.channel.send(getRandomFromArray(text.erp.undress))
          } else {
            message.channel.send("i'm already naked though, silly!~")
          }
          break;
      }
      updateMemory()
    } else {
        message.channel.send("p-please not here...")
    }
  }


  if (command === "ping") {
    message.channel.send("pong!");
  }

  if (command === "drill1") {
    alert(0x00ffff, "Cyan alert!", "This is just a drill for testing purposes.")
  }

  if (command === "tb") {
    if (args.join(" ").includes("fortnite") || args.join(" ").includes("sonic")) {
      message.channel.send("error! message contains banned words!")
    } else {
      socket.emit('message', he.decode(message.author.tag + ": " + args.join(" ")))
      message.channel.send("sent!");
      console.log(`[${"DISCORD".blue} => ${"T".cyan}${"B".pink}]` + message.author.tag + ": " + args.join(" "))
    }

  }



  if (command === "say") {
    socket.emit('message', args.join(" "))
    message.channel.send("sent!");
  }

  if (command === "hug") {
    memory.hugs++;
    updateMemory()
    message.channel.send(`awww, thanks for the hug! i've now been hugged ${memory.hugs} times!`)
  }

  if (command === "unhug") {
    message.channel.send(getRandomFromArray(text.cant))
  }

  if (command === "elbump") {
    memory.hugs++;
    updateMemory()
    message.channel.send(`hehe, thanks for the elbump! ` + getRandomFromArray(text.elbump))
  }

  if (command === "horny") {
    if (message.channel.nsfw || message.channel.id == "672280231377371137") {
      message.channel.send(text.saysexy[Math.round(Math.random() * (text.saysexy.length - 0) + 0)])
    } else {
      message.channel.send("n-not here...")
    }
  }

  if (command === "manifesto") {
    if (randRange(1, 6) === 6) {
      if (randRange(0, 1) === 0) {
        message.channel.send(`sqrt(${getRandomFromArray(text.manifesto.a)})` + " = " + getRandomFromArray(text.manifesto.c))
      } else {
        message.channel.send(`sqrt(${getRandomFromArray(text.manifesto.b)})` + " = " + getRandomFromArray(text.manifesto.c))
      }
    } else {
      message.channel.send(getRandomFromArray(text.manifesto.a) + " " + getRandomFromArray(text.manifesto.operations) + " " +  getRandomFromArray(text.manifesto.b) + " = " + getRandomFromArray(text.manifesto.c))
    }
  }

  if (command === "roll") {
    if (args[0] === undefined) {
      message.channel.send('not enough args! try this: "h:roll 1d6"')
      return;
    }

    var diceargs = args[0].split("d")
    if (diceargs[0] === undefined) {
      message.channel.send('not enough args! try this: "h:roll 1d6"')
      return;
    } else if (diceargs[1] === undefined) {
      message.channel.send('not enough args! try this: "h:roll 1d6"')
      return;
    }
    console.log(`[Client/${"Debug".pink}] ${diceargs}`)
    var n = diceargs[0];
    var s = diceargs[1];
    var rolls = [];
    var rolltotal = 0;
    var i = 0;
    var equation = "";

    if (n > 100) {
      message.channel.send('sorry! dice limit has been set to 100 by harry.')
      return;
    }

    if (s > 1000000) {
      message.channel.send('i seriously dont see why you need such a large dice...')
      return;
    }

    for (var i = 0; i < n; i++) {
      rolls.push(Math.round(Math.random() * (s - 1) + 1))

      if (i === (n - 1)) {
        equation += rolls[i].toString();
      } else {
        equation += rolls[i].toString() + " + ";
      }

      rolltotal = rolls.reduce((a, b) => a + b, 0)

    }
    console.log(`[Client/${"Debug".pink}] rolls`)
    message.channel.send('rolled ' + args[0] + ': ' + equation + " = " + rolltotal)
  }
});

socket.on('message', function(data) {
msgs++;





  function isHarry() {
    if (text.harryhomes.indexOf(data.home) !== -1) {
      return true;
    } else {
      return false;
    }
  }







  var message = data.msg.toLowerCase();
  var args = message.split(' ').slice(1);




    // economy commands!!!







    if (message.startsWith("h:joanne")) {
      if (memory.cooldowns.joanne === false) {
        socket.emit('message', "sorry! you can't use this command again yet!")
      } else {
        if (args[1] === undefined) {
          socket.emit('message', "you need to give me two words!")
          return;
        } else if (args[1] === args[0]) {
          socket.emit('message', "the two words can't be the same!")
          return;
        }
        var w1 = args[0].toUpperCase();
        var w2 = args[1].toUpperCase();

        socket.emit('message', he.decode(`${w1}${w1}${w1}${w1}`))
        setTimeout(function () {
          socket.emit('message', he.decode(`${w2}${w2}${w2}${w2}`))
        }, 2000);
        memory.cooldowns.joanne = false;
        updateMemory()
        setTimeout(function () {
          memory.cooldowns.joanne = true;
          updateMemory()
        }, 150000);
      }
    }


    if (message === "h:perfect93") {
      var output = "PERFECT93:\n\n";
      for (var i = 0; i < text.perfect93.length; i++) {
        output += text.perfect93[i] + "\n";
      }
      socket.emit('message', output)
    }

    if (message.startsWith("h:") && data.nick !== "&#128295; harry93 (h:)") {
      console.log(`[Server/${"Log".orange}][${moment().format('h:mm:ssa')}] ${data.nick} (${data.home}) executed "${message}"`)
    }

    if (text.badthings.some(v => data.msg.toLowerCase().includes(v))) {
      socket.emit('message', getRandomFromArray(text.badresponses))
    }

    if (message === "fuck you harry") {
      socket.emit("message", getRandomFromArray(text.plsdont))
    }

    if (message === "bruh") {
      socket.emit("message", "bruh")
    }

    if (message === "hey harry93 wanna have sex?") {
      socket.emit('message', "no")
    }

    if (message.startsWith("h:hug")) {
      memory.hugs++;
      updateMemory()
      socket.emit('message', `awww, thanks for the hug! i've now been hugged ${memory.hugs} times!`)
    }

    if (message.startsWith("h:howtoblock")) {
      socket.emit("message", "To block a user. Right click on their name on the user list on the right. Be careful though, blocking users will block everyone who share the same home as the user!")
    }

    if (message.startsWith("h:unhug")) {
      memory.hugs--;
      updateMemory()
      socket.emit('message', `Huh? Soooo...that means I've had ${memory.hugs} hugs then...`)
    }

    if (message.startsWith("h:sex")) {
      socket.emit('message', getRandomFromArray(text.cant))
    }

    if (message.startsWith("h:elbump")) {
      memory.hugs++;
      updateMemory()
      socket.emit('message', `hehe, thanks for the elbump! ` + getRandomFromArray(text.elbump))
    }

    if (message.startsWith("h:drink")) {
      var beverage = args[0];
      switch (beverage) {
        default:
          socket.emit(`${data.nick} ${getRandomFromArray(text.randomDrinking)} ${beverage}.`);
          break;
        case undefined:
          socket.emit(`${data.nick} ${getRandomFromArray(text.randomDrinking)} nothing. They feel unaffected.`);
          break;
        case "juice":
          socket.emit(`${data.nick} ${getRandomFromArray(text.randomDrinking)} ${getRandomFromArray(text.juices)} juice.`);

      }
    }

  /* this command cant be used yet since we cant read the user list
    if (message.startsWith("h:tag")) {
      if (memory.tag.it === data.nick) {
        if (args === undefined) {
          socket.emit('message', 'You need someone to tag!')
        }
      }
    }
  */
/*
    if (message.startsWith("h:feed")) {
      if (memory.cooldowns.feed === true) {
        var meal = he.decode(args.join(' '));
        if (stringIsInArray(meal, text.feed.meals)) {
          socket.emit('message', text.feed.responses[text.feed.meals.indexOf(meal)])
          memory.cooldowns.feed = false;
          updateMemory()
          setTimeout(function () {
            memory.cooldowns.feed = false;
            updateMemory()
          }, 90000);
        } else {
          socket.emit('message', "My cyber-digestive system doesn't support that yet, sorry!")
        }
      } else {
        socket.emit('message', "I'm a bit full at the moment. Try again in a little bit!")
      }
    }
*/

    if (message.startsWith("h:help")) {
        socket.emit('message','you can find a list of my commands on my wiki page! type "h:wiki" to learn more.')
    }

    if (message.startsWith("h:hello")) {
        socket.emit('message','hello! :D')
    }

    if (message === "hate me if you must but I LOVE PINEAPPLE ON PIZZA") {
        socket.emit('message','omg same!!')
    }

    if (message.includes("they're waiting for you, gordon")) {
      socket.emit('message','in the tesssst chammmbaaaar....')
    }

    // quiky ticky!
/*
    if (message.startsWith("h:qt")) {
      switch (args[0]) {
        case undefined:
          socket.emit('message', "harry93's Quiky Ticky Clone v1\n\nCommands:\nh:qt create - creates a ticket.\nh:qt stats - displays how many tickets have been created.\n\nDisclaimer: This is not the real Quiky Ticky system. This is a clone created for entertainment purposes.")
          break;

        case "create":
          memory.qt.total++;
          var ticketRand = randRange(1, 11);

          if (ticketRand > 1 && ticketRand < 11) {
            memory.qt.good++;
            socket.emit('message', `You have created Ticket #${memory.qt.total}. The machine is able to read the ticket's barcode.`)
          } else if (ticketRand > 10) {
            memory.qt.cyan++;
            socket.emit('message', `You have created Ticket #${memory.qt.total}. The ticket appears to be made of cyan paper.`)

          } else if (ticketRand = 1) {
            memory.qt.questionable++;
            socket.emit('message', `You have created Ticket #ERR. The machine is unable to read the ticket's barcode.`)
          }
          updateMemory()
          break;

        case "stats":
          socket.emit('message', `QUIKY TICKY\n\n\nAll good tickets: ${memory.qt.good + memory.qt.cyan}\nNon-cyan good tickets: ${memory.qt.good}\n???? tickets: ${memory.qt.questionable}\nCyan tickets: ${memory.qt.cyan}\n\nTotal tickets: ${memory.qt.total}`)
          break;
      }
    }
*/

    if (message.startsWith("oh?")) {
        socket.emit('message','on harriet?')
    }

    if (message.startsWith("h:8ball")) {

        if (args.join(" ").startsWith("will")) {
          socket.emit('message', getRandomFromArray(text.fortune.levelone))
        } else if (args.join(" ").startsWith("what are the chances of")) {
          socket.emit('message', getRandomFromArray(text.fortune.leveltwo))
        } else {
          socket.emit('message', 'you need to start your question with "will" or "what are the chances of".')
        }
      }

    if (message.startsWith("h:send")) {

      //client.channels.cache.get('683621110922870784').send(he.decode(data.nick + ": " + args.join(" ")))
      //console.log(he.decode(`[${"T".cyan}${"B".pink} => ${"DISCORD".blue}]` + data.nick + ": " + args.join(" ")))
      socket.emit("message", "this command has been temporarily disabled!")
    }

    if (message.includes("how do i use harry93")) {
        socket.emit('message','all my commands start with "h:"!')
    }

    if (message.includes("is harry93 real")) {
        socket.emit('message', 'maybe...')
    }

    if (message.startsWith("h:awesome")) {
        socket.emit('message','http://www.windows93.net/wiki/93.php?How%20to%20Make%20Your%20Trollbox%20Bot%20Awesome')
    }

    if (message.startsWith("h:wiki")) {
        socket.emit('message','my wiki page: http://www.windows93.net/wiki/93.php?harry93')
    }

    if (message.startsWith("h:utctime")) {
        socket.emit('message','it is currently ' + moment.utc().format('h:mma') + " UTC")
    }

    if (text.impostertalk.indexOf(message) !== -1) {
      if (isHarry() === false) {
        socket.emit('message', "no you're not!")
      } else {
        socket.emit('message', "you sure are! *kiss*")
      }
    }

    if (message.startsWith("h:mycolour")) {
        socket.emit('message', data.color)
    }

    if (message.startsWith("h:home")) {
      socket.emit('message', data.home)
    }

    if (message.startsWith("h:myspace")) {
        socket.emit('message', "harry's myspace: https://myspace.windows93.net/?id=4536")
    }

    if (message.startsWith("h:kailey")) {
        socket.emit('message', getRandomFromArray(text.kailey))
    }

    if (message.startsWith("h:morty")) {
        socket.emit('message', getRandomFromArray(text.morty))
    }

    if (message.startsWith("h:ant")) {
        socket.emit('message', getRandomFromArray(text.ant))
    }

    if (message.startsWith("h:manifesto")) {
      if (randRange(1, 6) === 6) {
        if (randRange(0, 1) === 0) {
          socket.emit('message', `sqrt(${getRandomFromArray(text.manifesto.a)})` + " = " + getRandomFromArray(text.manifesto.c))
        } else {
          socket.emit('message', `sqrt(${getRandomFromArray(text.manifesto.b)})` + " = " + getRandomFromArray(text.manifesto.c))
        }
      } else {
        socket.emit('message', getRandomFromArray(text.manifesto.a) + " " + getRandomFromArray(text.manifesto.operations) + " " +  getRandomFromArray(text.manifesto.b) + " = " + getRandomFromArray(text.manifesto.c))
      }

    }

    if (message.startsWith("h:quote")) {
      if (args[0] === undefined) {
        socket.emit('message', text.quotes[Math.round(Math.random() * (text.quotes.length - 0) + 0)])
      } else {
        socket.emit('message', text.quotes[args[0]])
      }
    }
  if (memory.hornymode === true) {
    if (message.includes("harry93 say something sexy")) {
        socket.emit('message', text.saysexy[Math.round(Math.random() * (text.saysexy.length - 0) + 0)])
    }

    if (message.startsWith("h:kiss")) {
      socket.emit("message", "mmmmwah! hehehe, thank you for the kiss~")
    }
  }


    if (message.startsWith("h:statuscheck")) {
      if (args === undefined) {
        if (isHarry()) {
          socket.emit('message', "current relationship with harry: is harry")
        } else if (text.friendlist.indexOf(data.nick) !== -1) {
          socket.emit('message', "current relationship with harry: friend")
        } else {
          socket.emit('message', "current relationship with harry: stranger (or list is outdated)")
        }
      } else {
        if (args[0] === "harry") {
          socket.emit('message', "current relationship with harry: is harry")
        } else if (text.friendlist.indexOf(args[0]) !== -1) {
          socket.emit('message', "current relationship with harry: friend")
        } else {
          socket.emit('message', "current relationship with harry: stranger (or list is outdated)")
        }
      }
    }

    if (message.startsWith("h:bottime")) {
        socket.emit('message','it is currently ' + moment().format('h:mma'))
    }

    if (message.startsWith("harry93 your next message is")) {
      let nextMessage = args.slice(4).join(' ')
      socket.emit('message', nextMessage)
        setTimeout(function () {
          socket.emit('message', "wait...what!?")
        }, 1000);
    }

    if (message.startsWith("h:ping")) {
        socket.emit('message','pong! latency display coming soon.')
    }

    if (message.startsWith("h:add2")) {                                 // the command is called "add2", funny enough.
        if (args[1] === undefined) {                                    // if there isnt a 2nd number to add...
          socket.emit('message', "not enough args! need two numbers.")  // send an error message.
          return;                                                       // and then end the command here.
        }

        var n1 = Number(args[0]);                                           // since the arguments are strings, we need to convert them to numbers
        var n2 = Number(args[1]);

        var sum = (n1 + n2).toString();                                     // but then, we can convert it back to a string again.

        socket.emit('message', sum)                                     // send the sum!
    }

    if (message.startsWith("h:colourwheel")) {                                         // you already know what this line's about by now...hopefully...
      var colours = ["blue", "red", "yellow", "orange", "purple", "green", "cyan"];     // here's our colours, all snug in a little array!
      var landedOn = colours[Math.round(Math.random() * (colours.length - 0) + 0)];     // a random selection from the colour wheel is stored in "landedOn"

      socket.emit('message', "the colour wheel has landed on " + landedOn)             // send the selection1
    }



    if (message.startsWith("h:roll")) {
      if (args[0] === undefined) {
        socket.emit('message','not enough args! try this: "h:roll 1d6"')
        return;
      }
      var diceargs = args[0].split("d")
      if (diceargs[0] === undefined) {
        socket.emit('message','not enough args! try this: "h:roll 1d6"')
        return;
      } else if (diceargs[1] === undefined) {
        socket.emit('message','not enough args! try this: "h:roll 1d6"')
        return;
      }
      console.log(`[Client/${"Debug".pink}] ${diceargs}`)
      var n = diceargs[0];
      var s = diceargs[1];
      var rolls = [];
      var rolltotal = 0;
      var i = 0;
      var equation = "";
      if (n > 100) {
        socket.emit('message','sorry! dice limit has been set to 100 by harry.')
        return;
      }
      if (s > 1000000) {
        socket.emit('message','i seriously dont see why you need such a large dice...')
        return;
      }
      for (var i = 0; i < n; i++) {
        rolls.push(Math.round(Math.random() * (s - 1) + 1))
        if (i === (n - 1)) {
          equation += rolls[i].toString();
        } else {
          equation += rolls[i].toString() + " + ";
        }
        rolltotal = rolls.reduce((a, b) => a + b, 0)
      }
      console.log(`[Client/${"Debug".pink}] ${rolls}`)
      socket.emit('message','rolled ' + args[0] + ': ' + equation + " = " + rolltotal)
    }

    if (message === "im a bot, bitch") {
      socket.emit('message', "i am also a bot!")
    }



  if (isHarry() === true) {

    if (message.startsWith("h:ban")) {
      banlist += args[0];
      updateBans();
      socket.emit('message', `Users with the home ${args[0]} can no longer interact with me.`)
    }

    if (message.startsWith("hdev:togglehornymode")) {
      if (memory.hornymode === true) {
        memory.hornymode = false;
        updateMemory()
        socket.emit("message", "Suggestive/questionable commands have been disabled.")
      } else {
        memory.hornymode = true;
        updateMemory()
        socket.emit("message", "Suggestive/questionable commands have been enabled.")
      }
    }

    if (message === "i love you harry93") {
      socket.emit('message', "awww, i love you too! *kiss*")
    }

    if (message === "*tickles harry93*") {
      socket.emit('message', "hehehe, that tickles!")
    }

    if (message === "hdev:say") {
      socket.emit('message', args.join(" "))
    }

    if (message === "hdev:updatememory") {
      updateMemory()
      socket.emit('message', "memory.json updated!")
    }

    if (message === "hdev:resetcooldowns") {
      memory.cooldowns.joanne = true;
      updateMemory()
      socket.emit('message', "cooldowns reset!")
    }

    if (message.startsWith("hdev:settockspeed")) {
      memory.clockTockSpeed = Number(args[0]);
      updateMemory()
      socket.emit('message', `clock tock speed is now ${memory.clockTockSpeed}!`)
    }

    if (message === "hdev:getallpotentialciphers") {
      console.log(crypto.getCiphers().slice(0, 71))
      console.log(crypto.getCiphers().slice(100))
      socket.emit('message', "ok! all of the ciphers that the crypto module currently supports have been printed in the terminal!")
    }

    if (message === "hey harry93 wanna have sex?") {
      socket.emit('message', "ummm...uhhhh....i'll get back to you on that....")
    }

    if (message === "hdev:checkmail") {
      socket.emit('message', "checkmail")
    }

    if (text.soup.indexOf(message) !== -1) {
      socket.emit('message', text.soup[text.soup.indexOf(message) + 1])
    }

    if (message === "hdev:exit") {
      socket.emit('message', "im going offline now. i'll be back soon!")
      socket.emit('user left', '🔧 harry93 (h:)', '#00ffff')
      process.exit();
    }

  }



})




var iface = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
iface.on('line', function(line){
    var lineArgs = line.split(" ").slice(1);

    try {

      if (line.startsWith("tbecho")) {
        socket.emit("message", lineArgs.join(" "))
      } else if (line.startsWith("disecho")) {
        var ch = String(lineArgs[0]);
        lineArgs = lineArgs.slice(1);
        client.channels.cache.get(ch).send(lineArgs.join(" "))
      } else if (line.startsWith("announce")) {
        client.channels.cache.get("683621000516337698").send(lineArgs.join(" "))
      } else {
        eval(line)
      }

    } catch(err){
        console.log(`[Client/${"Error".red}] ${err}`)
    }
})


setInterval(function(){

  if (memory.clockTockSpeed >= 120000) {
    socket.emit('message', text.quotes[Math.round(Math.random()*text.quotes.length-1)])
  }



  console.log(`[Server/${"Stats".yellow}] ${userjoins} users have joined in the last minute.`)
  console.log(`[Server/${"Stats".yellow}] ${userleaves} users have left in the last minute.`)
  console.log(`[Server/${"Stats".yellow}] ${msgs} messages have been sent in the last minute.`)
  joinlist.push(userjoins);
  leavelist.push(userleaves);
  msglist.push(msgs);
  userjoins = 0;
  userleaves = 0;
  msgs = 0;
  epm = ((arraySum(joinlist)/joinlist.length) + (arraySum(leavelist)/leavelist.length) + (arraySum(msglist)/msglist.length)).toFixed(2)

  if ((arraySum(joinlist)/joinlist.length) > ujpmpeak) {
    ujpmpeak = (arraySum(joinlist)/joinlist.length).toFixed(2);
  }

  if ((arraySum(leavelist)/leavelist.length) > ulpmpeak) {
    ulpmpeak = (arraySum(leavelist)/leavelist.length).toFixed(2);
  }

  if ((arraySum(msglist) / msglist.length) > mpmpeak) {
    mpmpeak = (arraySum(msglist)/msglist.length).toFixed(2);
  }

  if (epm > epmpeak) {
    epmpeak = epm;
  }
  statusTimestamp = moment().format('h:mm:ssa');

  if (epm >= 150) {
    alert(0x35383E, "Red alert!", "We have reached 150EPM. Expect massive delays and possibly a server crash.", true)
  }



}, memory.clockTockSpeed);

socket.on('user left', function(data) {
  userleaves++;
})

socket.on('user joined', function(data){

  if (stringIsInArray(data.home, text.harryhomes) === false) {
    userjoins++;
  }

  if (userjoins === 100) {
    alert(0xff0000, "Red alert!", "100 users have joined within a minute!", true)
  }

  if (data.nick === 'harry' && data.color === "#00fffe") { // harry (me)
		socket.emit('message', "hello, creator! *walks up to you and gives you a kiss and a hug*")
	}

  if (data.nick === 'Gamma' && data.color === "#ff0000") { // gamma
		socket.emit('message', "hiiii gamgam!")
	}

  if (data.nick === 'Gamma' && data.color === "#ff0000") { // kailey
		socket.emit('message', "kailey!!! <3")
	}

  if (data.nick.includes('harry93') && data.color !== "#00ffff") { // harry93(?)
		socket.emit('message', "well, you know what they say, imitation is the most sincere form of flattery!")
	}

})
client.login(config.token);
