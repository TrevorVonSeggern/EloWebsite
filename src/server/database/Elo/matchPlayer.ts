import {SqlModel} from "../Base/SqlModel";
import fs = require('fs');
import {Connection} from "../Sql/Connection";
import {formatDateTime} from "../Model";
import {MatchPlayerModel, PlayerSelectItem} from "../../../models/Elo/matchPlayer";
import {EloValue} from "./eloValue";

/**
 * Created by trevor on 3/21/16.
 */
export let MatchPlayerSchema: MatchPlayerModel = {
	_id: null,
	startTime: null,
	endTime: null,
	teamA: null,
	teamB: null,
	eventId: null,
	status: 0,
	teamAPlayers: [],
	teamBPlayers: []
};

let sqlBasePath = './src/server/database/Sql/scripts/Elo/match/';
let sqlGetByIdScript = fs.readFileSync(sqlBasePath + 'getById.sql', 'utf8');
let sqlInsertScript = fs.readFileSync(sqlBasePath + 'insert.sql', 'utf8');
let sqlRemoveScript = fs.readFileSync(sqlBasePath + 'remove.sql', 'utf8');
let sqlUpdateScript = fs.readFileSync(sqlBasePath + 'update.sql', 'utf8');
let sqlAllScript = fs.readFileSync(sqlBasePath + 'all.sql', 'utf8');
let sqlViewAllScript = fs.readFileSync(sqlBasePath + 'view.sql', 'utf8');
let sqlCountScript = fs.readFileSync(sqlBasePath + 'count.sql', 'utf8');
let sqlSetAllStatusScript = fs.readFileSync(sqlBasePath + 'setAllStatus.sql', 'utf8');

class SqlMatch extends SqlModel {
	teamAPlayers: PlayerSelectItem[] = [];
	teamBPlayers: PlayerSelectItem[] = [];
	teamAPlayersPrevious: PlayerSelectItem[] = [];
	teamBPlayersPrevious: PlayerSelectItem[] = [];
	teamA: string;
	teamB: string;
	teamAPrevious: string;
	teamBPrevious: string;

	constructor(instance?: any) {
		super(instance, MatchPlayer);
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

	protected getViewAllScript(limit?: number, skip?: number): Promise<string> {
		return new Promise<string>((resolve) => {
			let script = '' + sqlViewAllScript; // plus an empty string for mutability.
			if (limit && typeof limit === 'number' && limit > 0) {
				script = script + ' LIMIT ' + limit.toString();
				if (skip && typeof skip === 'number' && skip > 0)
					script = script + ' OFFSET ' + skip.toString();
			}
			resolve(script);
		});
	}

	viewAll(limit?: number, skip?: number): Promise<any[]> {
		if (!skip || skip < 0)
			skip = 0;
		return new Promise<any[]>((resolve, reject) => {
			this.getViewAllScript(limit, skip).then((query: string) => {
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

	private getLeftDeltaList(old: PlayerSelectItem[], current: PlayerSelectItem[]): PlayerSelectItem[] {
		let result = [];
		if (!current)
			return;
		for (let i = 0; i < current.length; ++i) {
			let contains = false;
			for (let c = 0; c < old.length; ++c) {
				if (current[i].value === old[c].value) {
					contains = true;
					break;
				}
			}
			if (!contains)
				result.push(current[i]);
		}
		return result;
	}

	createEloValueInsertQuery(teamId: string, list: PlayerSelectItem[]): string {
		let eloValue = new EloValue();
		// eloValue.
		return '';
	}

	save(): Promise<SqlModel> {
		if (!this.existingModel)
			return this.create();

		return new Promise<SqlModel>((resolve, reject) => {
			this.presave().then(() => {
				function finalSave(query: string) {
					return Connection.query(query).then((data) => {
						if (data === undefined) {
							reject('no result from the database');
						}
						else if (data.affectedRows === 1 && data.changedRows === 1 && data.serverStatus === 2) {
							resolve(this);
						}
						else
							resolve(undefined);
					}, (error) => {
						reject(error);
					});
				}

				this.saveScript(this).then((query: string) => {
					let script: string = 'START TRANSACTION;';


					// get a list of elo values to create
					let toAddTeamA = this.getLeftDeltaList(this.teamAPlayersPrevious, this.teamAPlayers);
					let toAddTeamB = this.getLeftDeltaList(this.teamBPlayersPrevious, this.teamBPlayers);

					script += this.createEloValueInsertQuery(this.teamA, toAddTeamA);
					script += this.createEloValueInsertQuery(this.teamB, toAddTeamB);

					// update the teamId of nonChanging eloValues.
					if (this.teamA !== this.teamAPrevious) {

					}
					if (this.teamB !== this.teamBPrevious) {

					}

					// get a list of elo values ot delete
					let toDeleteTeamA = this.getLeftDeltaList(this.teamAPlayers, this.teamAPlayersPrevious);
					let toDeleteTeamB = this.getLeftDeltaList(this.teamBPlayers, this.teamBPlayersPrevious);


					script += 'COMMIT;'
				}, (error) => {
					console.log('error injecting save script.');
					reject(error);
				});
			}, (error) => {
				reject(error);
			});
		});
	}
}

export class MatchPlayer extends SqlMatch implements MatchPlayerModel {
	startTime: Date;
	endTime: Date;
	eventId: string;
	status: number;
	winner: boolean;

	constructor(instance?: any) {
		super(instance);
		this.winner = !(!this.winner);
	}

	static setAllStatus(gameId: string) {
		let item = new MatchPlayer();
		return item.setAllStatus(gameId);
	}

	static getOneById(id: string) {
		let item: any = new MatchPlayer();
		item = item.getOneById(id);
		item.teamAPlayersPrevious = item.teamAPlayers;
		item.teamBPlayersPrevious = item.teamBPlayers;
		return item;
	}

	static getCount() {
		let item = new MatchPlayer();
		return item.getCount();
	}

	static all(limit?: number, skip?: number): Promise<any[]> {
		let itemModel = new MatchPlayer();
		return new Promise<MatchPlayerModel[]>((resolve, reject) => {
			itemModel.all(limit, skip).then((data) => {
				resolve(data);
			}, (error) => {
				reject(error);
			});
		});
	}

	static viewAll(limit?: number, skip?: number): Promise<any[]> {
		let itemModel = new MatchPlayer();
		return new Promise<MatchPlayerModel[]>((resolve, reject) => {
			itemModel.viewAll(limit, skip).then((data) => {
				resolve(data);
			}, (error) => {
				reject(error);
			});
		});
	}
}
