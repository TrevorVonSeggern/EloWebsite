import {NewUID} from "../../../database/Base/Model";
import {Client} from '../../../database/UserManagement/client';
import * as fs from 'fs';
let process: any = require('process');

let googleData = JSON.parse(fs.readFileSync('./AuthData.json', 'utf8'));

function loopFunction(obj) {

	Client.getOneByName(obj.name).then((clientDb) => {
		if (clientDb)
			return;

		let client: any = new Client();

		client._id = NewUID();
		client.name = obj.name;
		client.url = obj.url;
		client.redirect_uri = obj.redirect_uri;

		if (client.name.toLowerCase() === 'google' && process.env.GOOGLE_REDIRECT_URI)
			client.redirect_uri = process.env.GOOGLE_REDIRECT_URI;

		client.response_type = obj.response_type;
		client.client_id = obj.client_id;
		client.scope = obj.scope;
		client.state = obj.state;

		client.save().then(() => {
			console.log('added [' + obj.name + '] client');
		}, (err) => {
			console.log(err);
		});
	}, (error: string) => {
		console.log(error);
	});
}


if (googleData && googleData.clients) {
	for (let index in googleData.clients) {
		// I had to create a function to give each item it's own spot in memory. Errors otherwise.
		loopFunction(googleData.clients[index]);
	}
}
