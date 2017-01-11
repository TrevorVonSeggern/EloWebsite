/**
 * Created by trevor on 3/20/16.
 */
import {UserModel, ClientSalt} from '../../../models/UserManagement/user';
import {hashString} from "../Base/Model";
import {SqlModel} from "../Base/SqlModel";
import {config} from '../../config/database';

let ServerSalt = '$2a$06$7A/WgchbB8iK3.gVFYP.NO';
export function HashStringClient(inputString: string): Promise<string> {
	return hashString(inputString, ClientSalt);
}
export function HashStringServer(inputString: string): Promise <string> {
	return hashString(inputString, ServerSalt);
}

// Define our user schema
export let UserSchema = {
	_id: {type: String, required: true, index: true},
	username: {type: String, required: true},
	password: {type: String, required: true},
	first_name: {type: String, required: true},
	last_name: {type: String, required: true},
	email: {type: String, required: true},
	role: {type: String, required: true}
};

import fs = require('fs');
import {Connection} from "../Sql/Connection";
let sqlBasePath = './src/server/database/Sql/scripts/UserManagement/user/';
let sqlGetByIdScript = fs.readFileSync(sqlBasePath + 'getById.sql', 'utf8');
let sqlInsertScript = fs.readFileSync(sqlBasePath + 'insert.sql', 'utf8');
let sqlRemoveScript = fs.readFileSync(sqlBasePath + 'remove.sql', 'utf8');
let sqlUpdateScript = fs.readFileSync(sqlBasePath + 'update.sql', 'utf8');
let sqlAllScript = fs.readFileSync(sqlBasePath + 'all.sql', 'utf8');
let sqlCountScript = fs.readFileSync(sqlBasePath + 'count.sql', 'utf8');
let sqlGetByUsernameScript = fs.readFileSync(sqlBasePath + 'getByUsername.sql', 'utf8');

class SqlUser extends SqlModel {

	constructor(instance?: any) {
		super(instance, ServerUser);
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
				modelInstance.username,
				modelInstance.password,
				modelInstance.first_name,
				modelInstance.last_name,
				modelInstance.email,
				modelInstance.role
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
				modelInstance.username,
				modelInstance.password,
				modelInstance.first_name,
				modelInstance.last_name,
				modelInstance.email,
				modelInstance.role,
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

	protected getCountScript(): Promise<string> {
		return new Promise<string>((resolve) => {
			let script = '' + sqlCountScript; // plus an empty string for mutability.
			resolve(script);
		});
	}

	private getByUsernameScript(username: string): Promise<string> {
		return new Promise<string>((resolve) => {
			resolve(Connection.format(sqlGetByUsernameScript, [username]));
		});
	}

	static getOneByUsername(username: string): Promise<any> {
		return new Promise<SqlUser>((resolve, reject) => {
			let sqlClient = new SqlUser();
			sqlClient.getByUsernameScript(username).then((query: string) => {
				Connection.query(query).then((data) => {
					if (data.length === 0)
						resolve(undefined);
					else
						resolve(new ServerUser(data[0]));
				}, (error) => {
					reject(error);
				});
			}, (error) => {
				console.log('error injecting remove by value script.');
				reject(error);
			});
		});
	}
}


export class ServerUser extends SqlUser implements UserModel {
	_id: string;
	username: string;
	password: string;
	first_name: string;
	last_name: string;
	email: string;
	role: string;

	passwordOld: string;

	constructor(instance?: any) {
		super(instance);
		this.passwordOld = this.password;
	}

	public mapToObject(obj) {
		let keys = Object.keys(UserSchema);
		for (let key in keys) {
			if (obj)
				obj[keys[key]] = this[keys[key]];
		}
	}

	presave(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			if (this.passwordOld == this.password) {
				this.passwordOld = this.password;
				resolve();
			} // Break out if the password hasn't changed
			else
				HashStringServer(this.password).then((hash) => {
					this.password = hash;
					resolve();
				}, reject);
		});
	}

	verifyPassword(pwdInQuestion: string): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			HashStringServer(pwdInQuestion).then((hashInQuestion: string) => {
				resolve(hashInQuestion === this.password);
			}, reject);
		})
	}

	verifyPasswordClient(password: string): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			HashStringClient(password).then((hash) => {
				HashStringServer(hash).then((hashedPassword) => {
					resolve(this.password === hashedPassword);
				}, (error: string) => {
					reject(error);
				});
			}, (error: string) => {
				reject(error);
			});
		});
	}

	static getOneById(id: string): Promise<ServerUser> {
		let user = new ServerUser();
		return new Promise<ServerUser>((resolve, reject) => {
			user.getOneById(id).then((user) => {
				resolve(user as ServerUser);
			}, (error) => {
				reject(error);
			});
		});
	}

	static getOneByUsername(username: string): Promise<ServerUser> {
		return SqlUser.getOneByUsername(username);
	}

	static all(limit?: number, skip?: number): Promise<any[]> {
		let user = new ServerUser();
		return new Promise<any[]>((resolve, reject) => {
			user.all(limit, skip).then((data) => {
				resolve(data);
			}, (error) => {
				reject(error);
			});
		});
	}

	static getCount(): Promise<number> {
		let sql = new SqlUser();
		return sql.getCount();
	}
}
