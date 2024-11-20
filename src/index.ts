// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';
import { makePostRequest } from './utils/api.js';

dotenv.config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(process.env.BOT_TOKEN);
  
const apiUrl = `https://gelbooru.com/index.php?page=dapi&s=post&limit=1&tags=loli+uncensored&api_key=${process.env.GEL_BOORU_API_KEY}&user_id=${process.env.GEL_BOORU_USER}`;
  
// Schedule the request every 60 minutes
// setInterval(() => {
	makePostRequest(apiUrl)
	  .then(data => {
		console.log('Request successful:', data);
	  })
	  .catch(error => {
		console.error('Error:', error);
	  });
//   }, 60 * 60 * 1000); // 60 minutes in milliseconds
