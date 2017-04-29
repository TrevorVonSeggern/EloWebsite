import {DBMatch} from "./sequelize";
import {ServerBaseModel, all} from "web-base-server-model";
import {mapObjectToObject} from 'web-base-model';
import {Match} from "../../models/models";
import {GameServer} from "./game";
import {EventServer} from "./event";
import {PlayerServer} from "./player";
import {EloValueServer} from "./eloValue";
import {isNullOrUndefined} from "util";

export class MatchServer extends ServerBaseModel implements Match {
	id: string | number;
	startTime: Date;
	endTime: Date;
	TeamAId: string | number;
	TeamBId: string | number;
	EventId: string | number;
	status: number;
	winner: boolean;

	constructor(instance?) {
		super(instance);
	}

	static setAllStatus(gameId: string | number): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			DBMatch.update({'status': null}, {where: {id: {$ne: null}}}).then(() => {
				resolve();
			}, reject);
		})
	}

	static processOne(): Promise<Boolean> {
		return new Promise<Boolean>((resolve, reject) => {
			MatchServer.getOneToProcess().then((match) => {
				if (isNullOrUndefined(match)) {
					return resolve(false);
				}

				let count = 2;

				// get game
				let gameInstance;
				let players = [];
				match.getGame().then((game: GameServer) => {
					gameInstance = game;
					// get players to get their previous skill value
					match.getAllPlayers().then((playerList: PlayerServer[]) => {
						players = playerList;

						// get the previous player elo value...
						let playerDepCount = playerList.length;
						let playerDepCheck = function () {
							playerDepCount--;
							if (playerDepCount <= 0)
								checkFinished();
						};

						for (let i = 0; i < playerList.length; ++i) {
							let getPlayerElo = function (player: PlayerServer) {
								player.getCurrentEloValue(game).then(() => {
									playerDepCheck();
								}, reject);
							};
							getPlayerElo(playerList[i]);
						}
					}, reject);
				}, reject);

				// get elo values
				let elos: EloValueServer[] = [];
				EloValueServer.allByMatchId(match.id).then((eloValues: EloValueServer[]) => {
					elos = eloValues;
					checkFinished();
				}, reject);

				function checkFinished() {
					count--;
					if (count <= 0) {
						process();
					}
				}

				let process = () => {
					if (players.length != elos.length)
						return reject("incorrect number of eloValues per player.");

					let teamAElo = 0;
					let teamBElo = 0;
					let teamACount = 0;
					let teamBCount = 0;

					for (let i = 0; i < elos.length; ++i) {
						if (elos[i].TeamId === match.TeamAId) {
							++teamACount;
							for (let p = 0; p < players.length; ++p) {
								if (players[p].id === elos[i].PlayerId) {
									teamAElo += players[p]._currentElo || elos[i].eloValue;
									break;
								}
							}
						}
						else if (elos[i].TeamId === match.TeamBId) {
							++teamBCount;
							for (let p = 0; p < players.length; ++p) {
								if (players[p].id === elos[i].PlayerId) {
									teamBElo += players[p]._currentElo || elos[i].eloValue;
									break;
								}
							}
						}
					}
					if (teamACount === 0 || teamBCount === 0) {
						return resolve();
					}
					let rA = Math.pow(10, teamAElo / 400);
					let rB = Math.pow(10, teamBElo / 400);
					let eA = rA / (rA + rB);
					let eB = rB / (rA + rB);
					let sA = match.winner === true ? 1 : (match.winner === false ? 0 : 0.5);
					let sB = 1 - sA;
					let aDelta = (gameInstance.scale * (sA - eA)) / teamACount;
					let bDelta = (gameInstance.scale * (sB - eB)) / teamBCount;

					let dep = 1 /*match*/ + elos.length;
					// update the elo values to their new score.

					for (let i = 0; i < elos.length; ++i) {
						if (elos[i].TeamId === match.TeamAId) {
							for (let p = 0; p < players.length; ++p) {
								if (players[p].id === elos[i].PlayerId) {
									elos[i].eloValue = players[p]._currentElo + aDelta;
									break;
								}
							}
						}
						else if (elos[i].TeamId === match.TeamBId) {
							for (let p = 0; p < players.length; ++p) {
								if (players[p].id === elos[i].PlayerId) {
									elos[i].eloValue = players[p]._currentElo + bDelta;
									break;
								}
							}
						}
						elos[i].save().then(() => {
							resUpdate();
						}, reject);
					}

					// update the match.
					match.status = 1;
					match.save().then(() => {
						resUpdate();
					}, reject);

					function resUpdate() {
						--dep;
						if (dep <= 0)
							resolve(true);
					}
				};
			}, reject);
		});
	}

	save(): Promise<void> {
		if (this.id !== null)
			return new Promise<void>((resolve, reject) => {
				let id = this.id;
				delete this.id;
				DBMatch.update(this, {where: {id: id}}).then((item: any) => {
					this.id = id;
					if (item && item.dataValues)
						mapObjectToObject(item.dataValues, this);
					resolve();
				});
			});
		else
			return this.create();
	};

	create(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			DBMatch.create(this).then((item: any) => {
				if (item && item.dataValues)
					mapObjectToObject(item.dataValues, this);
				resolve();
			}, reject);
		});
	};

	static removeById(id: string | number): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			DBMatch.destroy({where: {id: id}}).then(() => resolve(), reject);
		});
	};

	remove(): Promise<void> {
		return MatchServer.removeById(this.id);
	};

	static getOneById(id: string | number): Promise<MatchServer> {
		return new Promise<MatchServer>((resolve, reject) => {
			DBMatch.findOne({where: {id: id}}).then((item: any) => {
				if (item && item.dataValues)
					resolve(new MatchServer(item.dataValues));
				else
					resolve(undefined);
			}, reject);
		});
	};

	private static getOneToProcess(): Promise<MatchServer> {
		return new Promise<MatchServer>((resolve, reject) => {
			DBMatch.findOne({where: {status: null}, order: ['endTime']}).then((item: any) => {
				if (item && item.dataValues)
					resolve(new MatchServer(item.dataValues));
				else
					resolve(undefined);
			}, reject);
		});
	};

	static all(userId, limit?: number, skip?: number): Promise<any[]> {
		// TODO: limit by userID.
		return all(DBMatch, limit, skip);
	};

	static getCount(): Promise<number> {
		return new Promise<number>((resolve, reject) => {
			DBMatch.count().then((num) => resolve(num), reject);
		});
	};

	getEvent(): Promise<EventServer> {
		return new Promise<EventServer>((resolve, reject) => {
			if (this.EventId == null)
				return reject('EventId is null');
			EventServer.getOneById(this.EventId).then((event) => resolve(event), reject);
		});
	}

	getGame(): Promise<GameServer> {
		return new Promise<GameServer>((resolve, reject) => {
			this.getEvent().then((event) => {
				if (event.GameId == null)
					return reject('GameId is null');
				GameServer.getOneById(event.GameId).then((game) => {
					resolve(game);
				}, reject);
			}, reject);

		});
	}

	getAllPlayers(): Promise<PlayerServer[]> {
		return PlayerServer.getAllPlayersInMatch(this.id);
	}
}
