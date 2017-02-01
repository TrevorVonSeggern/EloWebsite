/**
 * Created by trevor on 3/21/16.
 */

// Load required packages
import {Model} from "../../../database/Model";


// Define our token schema
let TokenSchema = {
	value: {type: String, required: true}, // bearer token.
	userId: {type: String, required: true}, // the user that the token is tied to.
	clientId: {type: String, required: true} // ie... (localAuth,  google, facebook)
};

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function uid(len): string {
	let buf = []
		, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
		, charlen = chars.length;

	for (let i = 0; i < len; ++i) {
		buf.push(chars[getRandomInt(0, charlen - 1)]);
	}

	return buf.join('');
}
export function NewUID(): string {
	return uid(30);
}

export class Token extends Model {
	value: string;
	userId: string;
	clientId: string;

	constructor(instance?: any) {
		super('Token', TokenSchema, instance);
	}

	static query(filter: any): Promise<any[]> {
		let code = new Token();
		return code.query(filter);
	}

	static scan(filter: any): Promise<any[]> {
		let client = new Token();
		return client.scan(filter);
	}

	static get(id: any): Promise<Token> {
		let client = new Token();
		return new Promise<Token>((resolve, reject) => {
			client.get(id).then((model) => {
				resolve(model as Token);
			}, (error: string) => {
				reject(error);
			});
		});
	}

	static all(limit?: number, skip?: number): Promise<any[]> {
		let client = new Token();
		return client.all(limit, skip);
	}
}