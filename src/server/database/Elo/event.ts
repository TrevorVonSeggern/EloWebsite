import {SqlModel} from "../Base/SqlModel";
import fs = require('fs');
import {Connection} from "../Sql/Connection";
import {EventModel} from "../../../models/Elo/event";

/**
 * Created by trevor on 3/21/16.
 */
export let EventSchema: EventModel = {
	_id: '',
	name: '',
	startTime: new Date(),
	endTime: new Date(),
	gameId: '',
	userId: '',
	comment: ''
};

let sqlBasePath = './src/server/database/Sql/scripts/Elo/event/';
let sqlGetByIdScript = fs.readFileSync(sqlBasePath + 'getById.sql', 'utf8');
let sqlInsertScript = fs.readFileSync(sqlBasePath + 'insert.sql', 'utf8');
let sqlRemoveScript = fs.readFileSync(sqlBasePath + 'remove.sql', 'utf8');
let sqlUpdateScript = fs.readFileSync(sqlBasePath + 'update.sql', 'utf8');
let sqlAllScript = fs.readFileSync(sqlBasePath + 'all.sql', 'utf8');
let sqlCountScript = fs.readFileSync(sqlBasePath + 'count.sql', 'utf8');

class SqlEvent extends SqlModel {

	constructor(instance?: any) {
		super(instance, Event);
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
				modelInstance.startTime,
				modelInstance.endTime,
				modelInstance.gameId,
				modelInstance.userId,
				modelInstance.comment
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
				modelInstance.name,
				modelInstance.startTime,
				modelInstance.endTime,
				modelInstance.gameId,
				modelInstance.userId,
				modelInstance.comment,
				modelInstance._id
			]));
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

export class Event extends SqlEvent implements EventModel {
	name: string;
	startTime: Date;
	endTime: Date;
	gameId: string;
	userId: string;
	comment: string;

	constructor(instance?: any) {
		super(instance);
	}

	static getOneById(identifier: string) {
		let item = new Event();
		return item.getOneById(identifier);
	}

	static allByGame(gameId?: string, limit?: number, skip?: number) {
		let item = new Event();
		return item.allByGame(gameId, limit, skip);
	}

	static getCount() {
		let item = new Event();
		return item.getCount();
	}
}
