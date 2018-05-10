const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
  client.user.setActivity('Be nice.');
});

client.on("message", async message => {
	if(message.author.bot) return;

	if(message.content.includes("sorry")) {
		message.channel.send("On behalf of Canada Squad, we are all sorry.");
	}

	if(message.content.indexOf(config.prefix) !== 0) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	// COMMANDS
	switch(command) {	
		case "help":
			await message.channel.send({embed:
				{
					color: 0xff6d00,
					author: {
						name: client.user.username,
						icon_url: client.user.avatarURL,
					},
					title: "#CanadaSquad",
					description: "Commands and help information for using Canada Bot.",
					timestamp: new Date(),
					fields: [{
						name: "Commands",
						value: "Coming soon."
					},
					],
					footer: {
						text: "Canada Bot",
					}
				}
			});

			break;
		case "duel":
			var randomNumber = randomIntFromInterval(1,2);
			var authorName = message.author.username;
			var personToDuel = message.mentions.members.first().user;
			personToDuel = personToDuel.username;
			
			//message.delete().catch(O_o=>{});
			
			if(randomNumber == 1) {				
				await message.channel.send({embed:
					{
						color: 0xff6d00,
						title: "Duel commencing...",
						fields: [{
							name: authorName + " vs " + personToDuel,
							value: personToDuel + " threw a fireball at " + authorName + ". \n" + authorName + " dodged the fireball and stabbed " + personToDuel + ". \n" + personToDuel + " was slain by " + authorName + " in an epic duel. \n**Winner: " + authorName + "**"
						},
						],
					}
				});

			} else {
				await message.channel.send({embed:
					{
						color: 0xff6d00,
						title: "Duel commencing...",
						fields: [{
							name: authorName + " vs " + personToDuel,
							value: authorName + " was shot in the knee by " + personToDuel + ". \n" + authorName + " was killed by " + personToDuel + " in a duel of the ages. \n**Winner: " + personToDuel + "**"
						},
						],
					}
				});
			}
		
			break;
		case "say":
			const sayMessage = args.join(" ");

			message.delete().catch(O_o=>{});
			message.channel.send(sayMessage);

			break;
		case "canada":
			message.channel.send("Oh Canada!");

			break;
		case "live":
			var authorUsername = message.author.username;
			await message.channel.send(authorUsername + " is currently live at https://www.twitch.tv/" + authorUsername);

			break;
		default:
			message.channel.send("I do not know that command, use /help for commands you can use!");

			break;
	}
  
});

client.login(process.env.TOKEN);

function randomIntFromInterval(min,max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}