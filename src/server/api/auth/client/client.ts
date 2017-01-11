/**
 * Created by trevor on 3/21/16.
 */
// Load required packages
import {Model} from "../../../database/Model";

// Define our client schema
let ClientSchema = {
	name: {type: String, required: true},
	url: {type: String, required: true},
	redirect_uri: {type: String, required: true},
	response_type: {type: String, required: true},
	client_id: {type: String, required: true},
	scope: {type: String, required: true},
	state: {type: String, required: true}
};

export class Client extends Model {
	name: string;
	url: string;
	redirect_uri: string;
	response_type: string;
	client_id: string;
	scope: string;
	state: string;

	constructor(instance?: any) {
		super('Client', ClientSchema, instance);
	}

	static query(filter: any): Promise<any[]> {
		let client = new Client();
		return client.query(filter);
	}

	static scan(filter: any): Promise<any[]> {
		let client = new Client();
		return client.scan(filter);
	}

	static get(filter: any): Promise<Client> {
		let client = new Client();
		return new Promise<Client>((resolve, reject) => {
			client.get(filter).then((model) => {
				resolve(model as Client);
			}, (error: string) => {
				reject(error);
			});
		});
	}

	static all(limit?: number, skip?: number): Promise<any[]> {
		let client = new Client();
		return client.all(limit, skip);
	}

}

// Export the Mongoose model
// export let Client = Dynamoose.model('Client', ClientSchema);