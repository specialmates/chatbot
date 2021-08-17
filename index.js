const Discord = require('discord.js');
const fetch = require("node-fetch");
const keepAlive = require("./server");
const client = new Discord.Client();
client.login("BOT_TOKEN");
client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
});

client.on("message", async message => {
if (message.channel.name == "chatbot") {
if (message.author.bot) return;
message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
if (message.content.includes(`@`)) {
return message.channel.send(`**:x: Please do not ping anyone!**`);
 }
  message.channel.startTyping();
if (!message.content) return message.channel.send("Please say something.");
fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(message.content)}&botname=${client.user.username}&ownername=Biraj`)
    .then(res => res.json())
    .then(data => {
        message.channel.send(`${data.message}`);
    });
      message.channel.stopTyping();
}
});
keepAlive()
