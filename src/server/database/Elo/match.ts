import {SqlModel} from "../Base/SqlModel";
import fs = require('fs');
import {Connection} from "../Sql/Connection";
import {MatchModel} from "../../../models/Elo/match";
import {formatDateTime} from "../Model";

/**
 * Created by trevor on 3/21/16.
 */
export let MatchSchema: MatchModel = {
	_id: null,
	startTime: null,
	endTime: null,
	teamA: null,
	teamB: null,
	eventId: null,
	status: 0
};

let sqlBasePath = './src/server/database/Sql/scripts/Elo/match/';
let sqlGetByIdScript = fs.readFileSync(sqlBasePath + 'getById.sql', 'utf8');
let sqlInsertScript = fs.readFileSync(sqlBasePath + 'insert.sql', 'utf8');
let sqlRemoveScript = fs.readFileSync(sqlBasePath + 'remove.sql', 'utf8');
let sqlUpdateScript = fs.readFileSync(sqlBasePath + 'update.sql', 'utf8');
let sqlAllScript = fs.readFileSync(sqlBasePath + 'all.sql', 'utf8');
let sqlCountScript = fs.readFileSync(sqlBasePath + 'count.sql', 'utf8');
let sqlSetAllStatusScript = fs.readFileSync(sqlBasePath + 'setAllStatus.sql', 'utf8');

class SqlMatch extends SqlModel {

	constructor(instance?: any) {
		super(instance, Match);
	}

	protected getOneByIdScript(id: string): Promise<string> {
		return new Promise<string>((resolve) => {
			resolve(Connection.format(sqlGetByIdScript, [id]));
		});
	}

	protected createScript(modelInstance): Promise<string> {
		return new Promise<string>((resolve) => {
			resolve(Connection.format(sqlInsertScript, [
				modelInstance._id,
				formatDateTime(modelInstance.startTime),
				formatDateTime(modelInstance.endTime),
				modelInstance.teamA,
				modelInstance.teamB,
				modelInstance.eventId,
				modelInstance.status.toString(),
				modelInstance.winner
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
				formatDateTime(modelInstance.startTime),
				formatDateTime(modelInstance.endTime),
				modelInstance.teamA,
				modelInstance.teamB,
				modelInstance.eventId,
				modelInstance.status.toString(),
				modelInstance.winner,
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

	protected setAllStatusScript(gameId: string): Promise<string> {
		return new Promise<string>((resolve) => {
			resolve(Connection.format(sqlSetAllStatusScript, [gameId]));
		});
	}

	protected setAllStatus(gameId: string): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			let sqlClient = new SqlMatch();
			sqlClient.setAllStatusScript(gameId).then((query: string) => {
				return Connection.query(query).then((data) => {
					if (data && data.warningCount === 0 && (data.errorCount === 0 || data.errorCount === undefined))
						resolve(true);
					else
						resolve(false);
				}, (error) => {
					reject(error);
				});
			}, (error) => {
				console.log('error setting all match statuses to 0.');
				reject(error);
			});
		});
	}
}

export class Match extends SqlMatch implements MatchModel {
	startTime: Date;
	endTime: Date;
	teamA: string;
	teamB: string;
	eventId: string;
	status: number;
	winner: boolean;

	constructor(instance?: any) {
		super(instance);
		this.winner = !(!this.winner);
	}

	static setAllStatus(gameId: string) {
		let item = new Match();
		return item.setAllStatus(gameId);
	}

	static getOneById(id: string) {
		let item = new Match();
		return item.getOneById(id);
	}

	static getCount() {
		let item = new Match();
		return item.getCount();
	}

	static all(limit?: number, skip?: number): Promise<any[]> {
		let itemModel = new Match();
		return new Promise<MatchModel[]>((resolve, reject) => {
			itemModel.all(limit, skip).then((data) => {
				resolve(data);
			}, (error) => {
				reject(error);
			});
		});
	}
}
