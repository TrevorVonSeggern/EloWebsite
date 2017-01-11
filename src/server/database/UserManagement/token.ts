/**
 * Created by trevor on 3/21/16.
 */
import {TokenModel} from "../../../models/UserManagement/token";
import {SqlModel} from "../Base/SqlModel";
import {config} from '../../config/database';

// Define our token schema
let TokenSchema = {
	_id: {type: String, required: true, index: true},
	value: {type: String, required: true}, // bearer token.
	userId: {type: String, required: true}, // the user that the token is tied to.
	clientId: {type: String, required: true} // ie... (localAuth,  google, facebook)
};

import fs = require('fs');
import {Connection} from "../Sql/Connection";
let sqlBasePath = './src/server/database/Sql/scripts/UserManagement/token/';
let sqlGetByIdScript = fs.readFileSync(sqlBasePath + 'getById.sql', 'utf8');
let sqlInsertScript = fs.readFileSync(sqlBasePath + 'insert.sql', 'utf8');
let sqlRemoveScript = fs.readFileSync(sqlBasePath + 'remove.sql', 'utf8');
let sqlUpdateScript = fs.readFileSync(sqlBasePath + 'update.sql', 'utf8');
let sqlAllScript = fs.readFileSync(sqlBasePath + 'all.sql', 'utf8');
let sqlCountScript = fs.readFileSync(sqlBasePath + 'count.sql', 'utf8');
let sqlGetByValueScript = fs.readFileSync(sqlBasePath + 'getByValue.sql', 'utf8');
let sqlGetByUserIdScript = fs.readFileSync(sqlBasePath + 'getByUserId.sql', 'utf8');

class SqlToken extends SqlModel {

	constructor(instance?: any) {
		super(instance, Token);
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
				modelInstance.value,
				modelInstance.userId,
				modelInstance.clientId
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
				modelInstance.value,
				modelInstance.userId,
				modelInstance.clientId,
				modelInstance._id
			]));
		});
	}

	protected getAllScript(limit: number, skip: number): Promise<string> {
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

	private getOneByUserIdScript(userId: string): Promise<string> {
		return new Promise<string>((resolve) => {
			resolve(Connection.format(sqlGetByUserIdScript, [userId]));
		});
	}

	static getOneByUserId(userId: string): Promise<Token> {
		return new Promise<Token>((resolve, reject) => {
			let sqlClient = new SqlToken();
			sqlClient.getOneByUserIdScript(userId).then((query: string) => {
				return Connection.query(query).then((data) => {
					if (data.length === 0)
						resolve(undefined);
					else
						resolve(new Token(data[0]));
				}, (error) => {
					reject(error);
				});
			}, (error) => {
				console.log('error injecting remove by name script.');
				reject(error);
			});
		});
	}

	private getOneByValueScript(value: string): Promise<string> {
		return new Promise<string>((resolve) => {
			resolve(Connection.format(sqlGetByValueScript, [value]));
		});
	}

	static getOneByValue(value: string): Promise<Token> {
		return new Promise<Token>((resolve, reject) => {
			let sqlClient = new SqlToken();
			sqlClient.getOneByValueScript(value).then((query: string) => {
				return Connection.query(query).then((data) => {
					if (data.length === 0)
						resolve(undefined);
					else
						resolve(new Token(data[0]));
				}, (error) => {
					reject(error);
				});
			}, (error) => {
				console.log('error injecting remove by value script.');
				reject(error);
			});
		});
	}

	protected getCountScript(): Promise<string> {
		return new Promise<string>((resolve) => {
			let script = '' + sqlCountScript; // plus an empty string for mutability.
			resolve(script);
		});
	}
}

export class Token extends SqlToken implements TokenModel {
	_id: string;
	value: string;
	userId: string;
	clientId: string;

	constructor(instance?: any) {
		super(instance);
	}

	static all(): Promise<any[]> {
		let token = new Token();
		return token.all();
	}

	static getOneByUserId(value: string): Promise<Token> {
		return SqlToken.getOneByUserId(value);
	}

	static getCount(): Promise<number> {
		let sqlClient = new SqlToken();
		return sqlClient.getCount();
	}

	static getOneByValue(value: string): Promise<Token> {
		return SqlToken.getOneByValue(value);
	}
}
