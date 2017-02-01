import {ClientModel} from "../../../models/UserManagement/client";
import {SqlModel} from "../Base/SqlModel";
import {config} from '../../config/database';
import fs = require('fs');
import {Connection} from "../Sql/Connection";

/**
 * Created by trevor on 3/21/16.
 */
// Load required packages

// Define our client schema
let ClientSchema = {
	_id: {type: String, required: true, index: true},
	name: {type: String, required: true},
	url: {type: String, required: true},
	redirect_uri: {type: String, required: true},
	response_type: {type: String, required: true},
	client_id: {type: String, required: true},
	scope: {type: String, required: true},
	state: {type: String, required: true}
};

let sqlBasePath = './src/server/database/Sql/scripts/UserManagement/client/';
let sqlGetByIdScript = fs.readFileSync(sqlBasePath + 'getById.sql', 'utf8');
let sqlInsertScript = fs.readFileSync(sqlBasePath + 'insert.sql', 'utf8');
let sqlRemoveScript = fs.readFileSync(sqlBasePath + 'remove.sql', 'utf8');
let sqlUpdateScript = fs.readFileSync(sqlBasePath + 'update.sql', 'utf8');
let sqlAllScript = fs.readFileSync(sqlBasePath + 'all.sql', 'utf8');
let sqlCountScript = fs.readFileSync(sqlBasePath + 'count.sql', 'utf8');
let sqlGetByNameScript = fs.readFileSync(sqlBasePath + 'getByName.sql', 'utf8');

class SqlClient extends SqlModel {

	constructor(instance?: any) {
		super(instance, Client);
	}

	protected getOneByIdScript(id: string): Promise<string> {
		return new Promise<string>((resolve) => {
			resolve(Connection.format(sqlGetByIdScript, [id]));
		});
	}

	protected createScript(modelInstance: any): Promise<string> {
		return new Promise<string>((resolve) => {
			resolve(Connection.format(sqlInsertScript, [
				modelInstance._id,
				modelInstance.name,
				modelInstance.url,
				modelInstance.redirect_uri,
				modelInstance.response_type,
				modelInstance.client_id,
				modelInstance.scope,
				modelInstance.state
			]));
		});
	}

	protected removeByIdScript(id: string): Promise<string> {
		return new Promise<string>((resolve) => {
			resolve(Connection.format(sqlRemoveScript, [id]));
		});
	}

	protected saveScript(modelInstance: any): Promise<string> {
		return new Promise<string>((resolve) => {
			resolve(Connection.format(sqlUpdateScript, [
				modelInstance._id,
				modelInstance.name,
				modelInstance.url,
				modelInstance.redirect_uri,
				modelInstance.response_type,
				modelInstance.client_id,
				modelInstance.scope,
				modelInstance.state,
				modelInstance._id
			]));
		});
	}

	protected getAllScript(limit?: number, skip?: number): Promise<string> {
		return new Promise<string>((resolve) => {
			let script = '' + sqlAllScript; // plus an empty string for mutability.
			if (limit && typeof limit === 'number' && limit > 0) {
				script = script + ' LIMIT ' + limit.toString();
				if (skip && typeof skip === 'number' && skip > 0)
					script = script + ' OFFSET ' + skip.toString();
			}
			resolve(script);
		});
	}

	protected getCountScript(): Promise<string> {
		return new Promise<string>((resolve) => {
			let script = '' + sqlCountScript; // plus an empty string for mutability.
			resolve(script);
		});
	}

	private getOneByNameScript(name: string): Promise<string> {
		return new Promise<string>((resolve) => {
			resolve(Connection.format(sqlGetByNameScript, [name]));
		});
	}

	static getOneByName(name: string): Promise<Client> {
		return new Promise<Client>((resolve, reject) => {
			let sqlClient = new SqlClient();
			sqlClient.getOneByNameScript(name).then((query: string) => {
				return Connection.query(query).then((data) => {
					if (data.length === 0)
						resolve(undefined);
					else
						resolve(new Client(data[0]));
				}, (error) => {
					reject(error);
				});
			}, (error) => {
				console.log('error injecting remove by name script.');
				reject(error);
			});
		});
	}
}

export class Client extends SqlClient implements ClientModel {
	_id: string;
	name: string;
	url: string;
	redirect_uri: string;
	response_type: string;
	client_id: string;
	scope: string;
	state: string;

	public mapToObject(obj) {
		let keys = Object.keys(ClientSchema);
		for (let key in keys) {
			if (obj)
				obj[keys[key]] = this[keys[key]];
		}
	}

	constructor(instance?: any) {
		super(instance);
	}

	static getOneByName(name: string): Promise<Client> {
		return SqlClient.getOneByName(name);
	}
}

// Export the Mongoose model
// export let Client = Dynamoose.model('Client', ClientSchema);