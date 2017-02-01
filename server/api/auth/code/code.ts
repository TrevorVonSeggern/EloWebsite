/**
 * Created by trevor on 3/21/16.
 */

import {Model} from "../../../database/Model";

// Define our token schema
let CodeSchema = {
	value: {type: String, required: true},
	redirectUri: {type: String, required: true},
	userId: {type: String, required: true},
	clientId: {type: String, required: true}
};

export class Code extends Model {
	value:string;
	redirectUri:string;
	userId:string;
	clientId:string;

	constructor(instance?:any) {
		super('Code', CodeSchema, instance);
	}


	static query(filter: any): Promise<any[]> {
		let code = new Code();
		return code.query(filter);
	}

	static scan(filter: any): Promise<any[]> {
		let client = new Code();
		return client.scan(filter);
	}

	static get(filter: any): Promise<Code> {
		let client = new Code();
		return new Promise<Code>((resolve, reject) => {
			client.get(filter).then((model) => {
				resolve(model as Code);
			}, (error: string) => {
				reject(error);
			});
		});
	}

	static all(limit?: number, skip?: number): Promise<any[]> {
		let client = new Code();
		return client.all(limit, skip);
	}
}
