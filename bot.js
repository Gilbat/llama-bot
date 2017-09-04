const Discord = require('discord.js');
var client = new Discord.Client();

client.login('____');


client.on("ready", () => {
  console.log("Starting up!");
});


/*
var board = []

function rstboard() {
	for (i = 0; i < 27; i++) {
		board[i] = 0;
	}
}

function getValueOnBoard(majX, majY, minX, minY) {
	return board[majX * 27 + majY * 9 + minX * 3 + minY];
}

function getValueOnBoard(majX, majY, minX, minY, value) {
	board[majX * 27 + majY * 9 + minX * 3 + minY] = value;
}

var activeX = 1;
var activeY = 1;
*/
info = {}

TIMEOUT_ROLE_ID = "354313345979121664";
TIMEOUT_CHANNEL_ID = "354312520447688704";
HEAVY_TIMEOUT_ROLE_ID = "354329328688955392";
SERVER_ID = "331900978548965376"

client.on("message", (message) => {
	if (message.author.bot)
		return;
	if (message.guild != null && message.guild.id == SERVER_ID) {

		if (message.content == "ping") {
			message.channel.send("Pong begin");
		// Usage!
		sleep(4000).then(() => {
			message.channel.send("Pong end");
		});
		
		}
	
	
		date = new Date();
		timerinfo = info[message.author.id];
		if (timerinfo == undefined)
			timerinfo = { lasttime: date.getTime(), totaltime: 0, punishment: false, completiontime: 0, heavypunishment: false }
		var t = date.getTime();
		timerinfo.totaltime += (2000 - (t - timerinfo.lasttime));
		timerinfo.lasttime = t;
		if (timerinfo.totaltime < 0) timerinfo.totaltime = 0;
		
		
		if (timerinfo.heavypunishment) {
			message.channel.send(message.author.username + ", you are muted.");
			message.delete();
			return;
		}
		
		if (timerinfo.punishment) {
			if (date.getTime() > timerinfo.completiontime) {
				message.member.removeRole(TIMEOUT_ROLE_ID, "SPAM");
				message.channel.send(message.author.username + ", I'm letting you go now.");
				timerinfo.punishment = false;
				message.member.setMute(false);
			} else {
				message.channel.send(message.author.username + ", you still have " + (0.001 * (timerinfo.completiontime - date.getTime())) + " seconds left in the time out corner.");
			}
		}
		
		if (timerinfo.totaltime > 8000) {
			timerinfo.totaltime = 0;
			message.channel.send(":exclamation: :exclamation: :regional_indicator_s: :regional_indicator_p: :regional_indicator_a: :regional_indicator_m:     :regional_indicator_d: :regional_indicator_e: :regional_indicator_t: :regional_indicator_e: :regional_indicator_c: :regional_indicator_t: :regional_indicator_e: :regional_indicator_d: :exclamation: :exclamation:");
			client.channels.get(TIMEOUT_CHANNEL_ID).send(":exclamation: :exclamation: :regional_indicator_s: :regional_indicator_p: :regional_indicator_a: :regional_indicator_m:     :regional_indicator_d: :regional_indicator_e: :regional_indicator_t: :regional_indicator_e: :regional_indicator_c: :regional_indicator_t: :regional_indicator_e: :regional_indicator_d: :exclamation: :exclamation:");
			
			if (timerinfo.punishment) {
				client.channels.get(TIMEOUT_CHANNEL_ID).send(message.author.username + ", I can't believe this. Spamming in the thinking corner? I'l sorry to say I'll have to mute you.");
				
				sleep(2000).then(() => {
					message.member.addRole(HEAVY_TIMEOUT_ROLE_ID, "SPAM");
				});
				
				timerinfo.heavypunishment = true;
				info[message.author.id] = timerinfo;
				sleep(90000).then(() => {
					timerinfo.heavypunishment = false;
					message.member.removeRole(HEAVY_TIMEOUT_ROLE_ID, "SPAM");
					client.channels.get(TIMEOUT_CHANNEL_ID).send(message.author.username + ", I've unmuted you, but you still need to be in the timeout corner a bit.");
					timerinfo.completiontime = date.getTime() + 45000;
					timerinfo.punishment = true;
					info[message.author.id] = timerinfo;
					message.member.addRole(TIMEOUT_ROLE_ID, "SPAM");
				});
			}
			else {
				client.channels.get(TIMEOUT_CHANNEL_ID).send(message.author.username + ", you have spammed too much. You need to go think about your actions a bit.");
			}
			timerinfo.completiontime = date.getTime() + 45000;
			
			timerinfo.punishment = true;
			sleep(2000).then(() => {
				message.member.addRole(TIMEOUT_ROLE_ID, "SPAM");
			});
		}
		info[message.author.id] = timerinfo;
	} else if (message.channel instanceof Discord.DMChannel) {
		if (message.channel.recipient.id == "125612588271665152") {
			client.channels.get("331900978548965376").send(message.content);
		}
	}
});

  function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
