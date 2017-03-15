// import {SqlModel} from "../Base/SqlModel";
// import fs = require('fs');
// import {Connection} from "../Sql/Connection";
// import {formatDateTime} from "../Model";
// import {MatchPlayerModel} from "../../../models/Elo/matchPlayer";
// import {EloValue} from "./eloValue";
// import {NewUID} from "../Base/Model";
// import {Game} from "./game";
// import {Event} from "./event";
//
// /**
//  * Created by trevor on 3/21/16.
//  */
// export let MatchPlayerSchema: MatchPlayerModel = {
// 	_id: null,
// 	startTime: null,
// 	endTime: null,
// 	teamA: null,
// 	teamB: null,
// 	eventId: null,
// 	status: 0,
// 	teamAPlayers: [],
// 	teamBPlayers: []
// };
//
// let sqlBasePath = './src/server/database/Sql/scripts/Elo/match/';
// let sqlGetByIdScript = fs.readFileSync(sqlBasePath + 'getById.sql', 'utf8');
// let sqlInsertScript = fs.readFileSync(sqlBasePath + 'insert.sql', 'utf8');
// let sqlRemoveScript = fs.readFileSync(sqlBasePath + 'remove.sql', 'utf8');
// let sqlUpdateScript = fs.readFileSync(sqlBasePath + 'update.sql', 'utf8');
// let sqlAllScript = fs.readFileSync(sqlBasePath + 'all.sql', 'utf8');
// let sqlViewAllScript = fs.readFileSync(sqlBasePath + 'view.sql', 'utf8');
// let sqlCountScript = fs.readFileSync(sqlBasePath + 'count.sql', 'utf8');
// let sqlSetAllStatusScript = fs.readFileSync(sqlBasePath + 'setAllStatus.sql', 'utf8');
//
// class SqlMatch extends SqlModel {
// 	teamAPlayers: EloValue[] = [];
// 	teamBPlayers: EloValue[] = [];
// 	teamAPlayersPrevious: EloValue[] = [];
// 	teamBPlayersPrevious: EloValue[] = [];
// 	teamA: string;
// 	teamB: string;
// 	teamAPrevious: string;
// 	teamBPrevious: string;
// 	eventId: string;
// 	status: number;
//
// 	constructor(instance?: any) {
// 		super(instance, MatchPlayer);
// 	}
//
// 	protected getOneByIdScript(id: string): Promise<string> {
// 		return new Promise<string>((resolve) => {
// 			resolve(Connection.format(sqlGetByIdScript, [id]));
// 		});
// 	}
//
// 	getOneById(id: string): Promise<SqlModel> {
// 		return new Promise<MatchPlayer>((resolve, reject) => {
// 			this.getOneByIdScript(id).then((query: string) => {
// 				return Connection.query(query).then((data) => {
// 					if (!data || data.length === 0)
// 						resolve(undefined);
// 					else {
// 						let item = new MatchPlayer(data[0]);
// 						EloValue.getAllByMatchId(item._id).then((dataElo) => {
// 							// team A
// 							let eloItems: EloValue[] = dataElo as EloValue[];
// 							for (let a = 0; a < eloItems.length; ++a) {
// 								if (eloItems[a].teamId === item.teamA) {
// 									item.teamAPlayers.push(new EloValue(eloItems[a]));
// 								}
// 							}
// 							// team B
// 							for (let b = 0; b < eloItems.length; ++b) {
// 								if (eloItems[b].teamId === item.teamB) {
// 									item.teamBPlayers.push(new EloValue(eloItems[b]));
// 								}
// 							}
//
// 							resolve(item);
// 							// console.log(data);
// 						}, (error) => reject(error));
// 					}
// 				}, (error) => reject(error));
// 			}, (error) => reject(error));
// 		});
// 	}
//
// 	protected createScript(modelInstance): Promise<string> {
// 		return new Promise<string>((resolve) => {
// 			resolve(Connection.format(sqlInsertScript, [
// 				modelInstance._id,
// 				formatDateTime(modelInstance.startTime),
// 				formatDateTime(modelInstance.endTime),
// 				modelInstance.teamA,
// 				modelInstance.teamB,
// 				modelInstance.eventId,
// 				modelInstance.status.toString(),
// 				modelInstance.winner
// 			]));
// 		});
// 	}
//
// 	protected removeByIdScript(id: string): Promise<string> {
// 		return new Promise<string>((resolve) => {
// 			resolve(Connection.format(sqlRemoveScript, [id]));
// 		});
// 	}
//
// 	protected saveScript(modelInstance: any): Promise<string> {
// 		return new Promise<string>((resolve) => {
// 			resolve(Connection.format(sqlUpdateScript, [
// 				formatDateTime(modelInstance.startTime),
// 				formatDateTime(modelInstance.endTime),
// 				modelInstance.teamA,
// 				modelInstance.teamB,
// 				modelInstance.eventId,
// 				modelInstance.status.toString(),
// 				modelInstance.winner,
// 				modelInstance._id
// 			]));
// 		});
// 	}
//
// 	protected getAllScript(limit?: number, skip?: number): Promise<string> {
// 		return new Promise<string>((resolve) => {
// 			let script = '' + sqlAllScript; // plus an empty string for mutability.
// 			if (limit && typeof limit === 'number' && limit > 0) {
// 				script = script + ' LIMIT ' + limit.toString();
// 				if (skip && typeof skip === 'number' && skip > 0)
// 					script = script + ' OFFSET ' + skip.toString();
// 			}
// 			resolve(script);
// 		});
// 	}
//
// 	protected getCountScript(): Promise<string> {
// 		return new Promise<string>((resolve) => {
// 			let script = '' + sqlCountScript; // plus an empty string for mutability.
// 			resolve(script);
// 		});
// 	}
//
// 	protected setAllStatusScript(gameId: string): Promise<string> {
// 		return new Promise<string>((resolve) => {
// 			resolve(Connection.format(sqlSetAllStatusScript, [gameId]));
// 		});
// 	}
//
// 	protected setAllStatus(gameId: string): Promise<boolean> {
// 		return new Promise<boolean>((resolve, reject) => {
// 			let sqlClient = new SqlMatch();
// 			sqlClient.setAllStatusScript(gameId).then((query: string) => {
// 				return Connection.query(query).then((data) => {
// 					if (data && data.warningCount === 0 && (data.errorCount === 0 || data.errorCount === undefined))
// 						resolve(true);
// 					else
// 						resolve(false);
// 				}, (error) => {
// 					reject(error);
// 				});
// 			}, (error) => {
// 				console.log('error setting all match statuses to 0.');
// 				reject(error);
// 			});
// 		});
// 	}
//
// 	protected getViewAllScript(limit?: number, skip?: number): Promise<string> {
// 		return new Promise<string>((resolve) => {
// 			let script = '' + sqlViewAllScript; // plus an empty string for mutability.
// 			if (limit && typeof limit === 'number' && limit > 0) {
// 				script = script + ' LIMIT ' + limit.toString();
// 				if (skip && typeof skip === 'number' && skip > 0)
// 					script = script + ' OFFSET ' + skip.toString();
// 			}
// 			resolve(script);
// 		});
// 	}
//
// 	viewAll(limit?: number, skip?: number): Promise<any[]> {
// 		if (!skip || skip < 0)
// 			skip = 0;
// 		return new Promise<any[]>((resolve, reject) => {
// 			this.getViewAllScript(limit, skip).then((query: string) => {
// 				return Connection.query(query).then((data) => {
// 					resolve(data);
// 				}, (error) => {
// 					reject(error);
// 				});
// 			}, (error) => {
// 				console.log('error injecting all script.');
// 				reject(error);
// 			});
// 		});
// 	}
//
// 	private static getLeftDeltaList(old: EloValue[], current: EloValue[]): EloValue[] {
// 		let result = [];
// 		if (!current)
// 			return;
// 		for (let i = 0; i < current.length; ++i) {
// 			let contains = false;
// 			for (let c = 0; c < old.length; ++c) {
// 				if (current[i].playerId === old[c].playerId) {
// 					contains = true;
// 					break;
// 				}
// 			}
// 			if (!contains)
// 				result.push(current[i]);
// 		}
// 		return result;
// 	}
//
// 	private static getCenterDeltaList(old: EloValue[], current: EloValue[]): EloValue[] {
// 		let result = [];
// 		if (!current || !old)
// 			return;
// 		for (let i = 0; i < old.length; ++i) {
// 			let contains = false;
// 			for (let c = 0; c < current.length; ++c) {
// 				if (current[i].playerId === old[c].playerId) {
// 					contains = true;
// 					break;
// 				}
// 			}
// 			if (contains)
// 				result.push(current[i]);
// 		}
// 		return result;
// 	}
//
// 	private insertTeamEloValueQuery(teamId: string, list: EloValue[]): Promise<EloValue[]> {
// 		return new Promise<EloValue[]>((resolve) => {
// 			let result: EloValue[] = [];
// 			for (let i = 0; i < list.length; ++i) {
// 				let eloValue = new EloValue();
// 				eloValue._id = NewUID();
// 				eloValue.teamId = teamId;
// 				eloValue.matchId = this._id;
// 				eloValue.playerId = list[i].playerId;
// 				eloValue.eloValue = 0;
// 				result.push(eloValue);
// 			}
// 			resolve(result);
// 		});
// 	}
//
// 	private getEloValueCreateQuery(): Promise<EloValue[]> {
// 		let toAddTeamA = SqlMatch.getLeftDeltaList(this.teamAPlayersPrevious, this.teamAPlayers);
// 		let toAddTeamB = SqlMatch.getLeftDeltaList(this.teamBPlayersPrevious, this.teamBPlayers);
//
// 		return new Promise<EloValue[]>((resolve, reject) => {
// 			this.insertTeamEloValueQuery(this.teamA, toAddTeamA).then((teamAQuery: EloValue[]) => {
// 				this.insertTeamEloValueQuery(this.teamB, toAddTeamB).then((teamBQuery: EloValue[]) => {
// 					let result = [];
// 					result.push.apply(result, teamAQuery);
// 					result.push.apply(result, teamBQuery);
// 					resolve(result);
// 				}, (error) => reject(error));
// 			}, (error) => reject(error));
// 		});
// 	}
//
// 	private getEloValueUpdateQuery(): Promise<EloValue[]> {
// 		let toUpdateTeamA = [];
// 		if (this.teamAPrevious !== this.teamA)
// 			toUpdateTeamA = SqlMatch.getCenterDeltaList(this.teamAPlayersPrevious, this.teamAPlayers);
// 		let toUpdateTeamB = [];
// 		if (this.teamBPrevious !== this.teamB)
// 			toUpdateTeamB = SqlMatch.getCenterDeltaList(this.teamBPlayersPrevious, this.teamBPlayers);
//
// 		let tAId = this.teamA;
// 		let tBId = this.teamB;
// 		for (let i = 0; i < toUpdateTeamA.length; ++i) {
// 			toUpdateTeamA[i].teamId = tAId;
// 		}
// 		for (let i = 0; i < toUpdateTeamB.length; ++i) {
// 			toUpdateTeamB[i].teamId = tBId;
// 		}
//
// 		return new Promise<EloValue[]>((resolve) => {
// 			let result = [];
// 			result.push.apply(result, toUpdateTeamA);
// 			result.push.apply(result, toUpdateTeamB);
// 			resolve(result);
// 		});
// 	}
//
// 	private getEloValueDeleteQuery(): Promise<EloValue[]> {
// 		let toDeleteTeamA = SqlMatch.getLeftDeltaList(this.teamAPlayers, this.teamAPlayersPrevious);
// 		let toDeleteTeamB = SqlMatch.getLeftDeltaList(this.teamBPlayers, this.teamBPlayersPrevious);
//
// 		return new Promise<EloValue[]>((resolve) => {
// 			let result = [];
// 			result.push.apply(result, toDeleteTeamA);
// 			result.push.apply(result, toDeleteTeamB);
// 			resolve(result);
// 		});
// 	}
//
// 	private saveEloValues(): Promise<boolean> {
// 		return new Promise<boolean>((resolve, reject) => {
// 			let errorString: string = undefined;
// 			let dependencies = 2;
// 			let dependencyError: boolean = false;
// 			let finalResolve = () => {
// 				dependencies--;
// 				if (dependencyError || dependencies < 0)
// 					return;
//
// 				if (errorString) {
// 					dependencyError = true;
// 					reject(errorString);
// 				}
// 				else {
// 					resolve(true);
// 				}
// 			};
//
// 			this.getEloValueUpdateQuery().then((updateList) => {
// 				let updateDependencies = updateList.length;
// 				let updateError: boolean = false;
//
// 				function updateResolve() {
// 					if (updateError)
// 						return;
// 					updateDependencies--;
// 					if (updateDependencies <= 0)
// 						finalResolve();
// 				}
//
// 				if (updateDependencies === 0)
// 					finalResolve();
// 				for (let i = 0; i < updateDependencies; ++i) {
// 					let item = new EloValue(updateList[i]);
// 					item.save().then(() => {
// 						updateResolve();
// 					}, (error) => {
// 						console.log(error);
// 						updateError = true;
// 						updateResolve();
// 					});
// 				}
// 			}, (error) => {
// 				errorString = error;
// 				finalResolve();
// 			});
//
// 			this.getEloValueDeleteQuery().then((deleteList) => {
// 				let deleteDependencies = deleteList.length;
// 				let deleteError: boolean = false;
//
// 				let deleteResolve = () => {
// 					if (deleteError)
// 						return;
// 					deleteDependencies--;
// 					if (deleteDependencies <= 0) {
// 						this.getEloValueCreateQuery().then((createList) => {
// 							let createDependencies = createList.length;
// 							let createError: boolean = false;
//
// 							function createResolve() {
// 								if (createError)
// 									return;
// 								createDependencies--;
// 								if (createDependencies === 0)
// 									finalResolve();
// 							}
//
// 							for (let i = 0; i < createDependencies; ++i) {
// 								createList[i].save().then(() => {
// 									createResolve();
// 								}, () => {
// 									createError = true;
// 									createResolve();
// 								});
// 							}
// 						}, (error) => {
// 							errorString = error;
// 							finalResolve();
// 						});
// 					}
// 				};
// 				if (deleteDependencies === 0)
// 					deleteResolve();
// 				for (let i = 0; i < deleteDependencies; ++i) {
// 					EloValue.removeById(deleteList[i]._id).then(() => {
// 						deleteResolve();
// 					}, () => {
// 						deleteError = true;
// 						deleteResolve();
// 					});
// 				}
// 			}, (error) => {
// 				errorString = error;
// 				finalResolve();
// 			});
//
// 		});
// 	}
//
// 	save(): Promise<SqlModel> {
// 		if (!this.existingModel)
// 			return this.create();
//
// 		return new Promise<SqlModel>((resolve, reject) => {
// 			this.presave().then(() => {
// 				this.saveScript(this).then((query: string) => {
// 					Connection.query(query).then((data) => {
// 						if (data === undefined)
// 							return reject('no result from the database');
// 						this.saveEloValues().then(() => {
// 							resolve(this);
// 						}, (error) => reject(error));
// 					}, (error) => {
// 						reject(error);
// 					});
// 				}, (error) => reject(error));
// 			}, (error) => reject(error));
// 		});
// 	}
//
// 	create(): Promise<SqlModel> {
// 		this._id = NewUID();
// 		this.status = 0;
//
// 		return new Promise<SqlModel>((resolve, reject) => {
// 			this.presave().then(() => {
// 				this.createScript(this).then((query: string) => {
// 					return Connection.query(query).then((data) => {
// 						if (data === undefined) {
// 							reject('no result from the database');
// 						}
// 						this.saveEloValues().then(() => {
// 							resolve(this);
// 						}, (error) => reject(error));
// 					}, (error) => {
// 						reject(error);
// 					});
// 				}, (error) => {
// 					console.log('error injecting create script.');
// 					console.log(error);
// 					reject(error);
// 				});
// 			}, (error) => {
// 				reject(error);
// 			});
// 		});
// 	}
//
// 	getGame(): Promise<Game> {
// 		return new Promise<Game>((resolve, reject) => {
// 			Event.getOneById(this.eventId).then((event: Event) => {
// 				Game.getOneById(event.gameId).then((game: Game) => {
// 					resolve(game);
// 				}, (error) => reject(error));
// 			}, (error) => reject(error));
// 		});
// 	}
// }
//
// export class MatchPlayer extends SqlMatch implements MatchPlayerModel {
// 	startTime: Date;
// 	endTime: Date;
// 	winner: boolean;
//
// 	constructor(instance?: any) {
// 		super(instance);
// 		this.winner = !(!this.winner);
// 	}
//
// 	static setAllStatus(gameId: string) {
// 		let item = new MatchPlayer();
// 		return item.setAllStatus(gameId);
// 	}
//
// 	static getOneById(id: string) {
// 		let item: any = new MatchPlayer();
// 		item = item.getOneById(id);
// 		item.teamAPlayersPrevious = item.teamAPlayers;
// 		item.teamBPlayersPrevious = item.teamBPlayers;
// 		return item;
// 	}
//
// 	static getCount() {
// 		let item = new MatchPlayer();
// 		return item.getCount();
// 	}
//
// 	static all(limit?: number, skip?: number): Promise<any[]> {
// 		let itemModel = new MatchPlayer();
// 		return new Promise<MatchPlayerModel[]>((resolve, reject) => {
// 			itemModel.all(limit, skip).then((data) => {
// 				resolve(data);
// 			}, (error) => {
// 				reject(error);
// 			});
// 		});
// 	}
//
// 	static viewAll(limit?: number, skip?: number): Promise<any[]> {
// 		let itemModel = new MatchPlayer();
// 		return new Promise<MatchPlayerModel[]>((resolve, reject) => {
// 			itemModel.viewAll(limit, skip).then((data) => {
// 				resolve(data);
// 			}, (error) => {
// 				reject(error);
// 			});
// 		});
// 	}
// }
