import {SqlModel} from "../Base/SqlModel";
import fs = require('fs');
import {Connection} from "../Sql/Connection";
import {TeamModel} from "../../../models/Elo/team";

/**
 * Created by trevor on 3/21/16.
 */
export let TeamSchema: TeamModel = {
	_id: '',
	name: '',
	gameId: ''
};

let sqlBasePath = './src/server/database/Sql/scripts/Elo/team/';
let sqlGetByIdScript = fs.readFileSync(sqlBasePath + 'getById.sql', 'utf8');
let sqlInsertScript = fs.readFileSync(sqlBasePath + 'insert.sql', 'utf8');
let sqlRemoveScript = fs.readFileSync(sqlBasePath + 'remove.sql', 'utf8');
let sqlUpdateScript = fs.readFileSync(sqlBasePath + 'update.sql', 'utf8');
let sqlAllScript = fs.readFileSync(sqlBasePath + 'all.sql', 'utf8');
let sqlCountScript = fs.readFileSync(sqlBasePath + 'count.sql', 'utf8');

class SqlTeam extends SqlModel {

	constructor(instance?: any) {
		super(instance, Team);
	}

	protected getOneByIdScript(id: string): Promise<string> {
		return new Promise<string>((resolve) => {
			resolve(Connection.format(sqlGetByIdScript, [id]));
		});
	}

	protected createScript(modelInstance: TeamModel): Promise<string> {
		return new Promise<string>((resolve) => {
			resolve(Connection.format(sqlInsertScript, [
				modelInstance._id,
				modelInstance.name,
				modelInstance.gameId
			]));
		});
	}

	protected removeByIdScript(id: string): Promise<string> {
		return new Promise<string>((resolve) => {
			resolve(Connection.format(sqlRemoveScript, [id]));
		});
	}

	protected saveScript(modelInstance: TeamModel): Promise<string> {
		return new Promise<string>((resolve) => {
			resolve(Connection.format(sqlUpdateScript, [
				modelInstance.name,
				modelInstance.gameId,
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

	protected getAllGameIdScript(gameId: string, limit: number, skip: number): Promise<string> {
		return new Promise<string>((resolve) => {
			let script = '' + sqlAllScript; // plus an empty string for mutability.
			if (gameId) {
				script = script + " WHERE gameId = '" + gameId + "'";
			}
			if (limit && typeof limit === 'number' && limit > 0) {
				script = script + ' LIMIT ' + limit.toString();
				if (skip && typeof skip === 'number' && skip > 0)
					script = script + ' OFFSET ' + skip.toString();
			}
			resolve(script);
		});
	}

	allByGame(gameId?: string, limit?: number, skip?: number): Promise<any[]> {
		if (!skip || skip < 0)
			skip = 0;
		return new Promise<any[]>((resolve, reject) => {
			this.getAllGameIdScript(gameId, limit, skip).then((query: string) => {
				return Connection.query(query).then((data) => {
					resolve(data);
				}, (error) => {
					reject(error);
				});
			}, (error) => {
				console.log('error injecting all script.');
				reject(error);
			});
		});
	}
}

export class Team extends SqlTeam implements TeamModel {
	name: string;
	gameId: string;

	constructor(instance?: any) {
		super(instance);
	}

	static getOneById(id: string) {
		let item = new Team();
		return item.getOneById(id);
	}

	static getCount() {
		let item = new Team();
		return item.getCount();
	}

	static all(limit?: number, skip?: number): Promise<any[]> {
		let itemModel = new Team();
		return new Promise<TeamModel[]>((resolve, reject) => {
			itemModel.all(limit, skip).then((data) => {
				resolve(data);
			}, (error) => {
				reject(error);
			});
		});
	}

	static allByGame(gameId?: string, limit?: number, skip?: number) {
		let item = new Team();
		return item.allByGame(gameId, limit, skip);
	}
}
