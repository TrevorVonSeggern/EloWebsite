import {DBMatch, DBTeam, DBEloValue} from "./sequelize";
import {ServerBaseModel, all} from "web-base-server-model";
import {mapObjectToObject} from 'web-base-model';
import {MatchPlayer, EloValue} from "../../models/models";
import {DBEvent} from "./sequelize";
import logs from "web-server-database/server/logs";
import {EloValueServer} from "./eloValue";

export class MatchPlayerServer extends ServerBaseModel implements MatchPlayer {
	id: string|number;
	startTime: Date;
	endTime: Date;
	TeamAId: string|number;
	TeamBId: string|number;
	TeamAPrevious: string|number;
	TeamBPrevious: string|number;
	EventId: string|number;
	status: number;
	TeamAPlayers: EloValue[];
	TeamBPlayers: EloValue[];
	TeamAPlayersPrevious: EloValue[];
	TeamBPlayersPrevious: EloValue[];
	winner: boolean;

	constructor(instance?) {
		super(instance);
	}

	private static getCenterDeltaList(old: EloValue[], current: EloValue[]): EloValue[] {
		let result = [];
		if (!current || !old)
			return;
		for (let i = 0; i < old.length; ++i) {
			let contains = false;
			for (let c = 0; c < current.length; ++c) {
				if (current[c].PlayerId === old[i].PlayerId &&
					current[c].TeamId === old[i].TeamId &&
					current[c].id === old[i].id) {
					contains = true;
					break;
				}
			}
			if (contains)
				result.push(old[i]);
		}
		return result;
	}

	private static getLeftDeltaList(old: EloValue[], current: EloValue[]): EloValue[] {
		let result = [];
		if (!current)
			return;
		for (let i = 0; i < current.length; ++i) {
			let contains = false;
			for (let c = 0; c < old.length; ++c) {
				if (current[i].PlayerId === old[c].PlayerId &&
					current[i].TeamId === old[c].TeamId &&
					current[i].id === old[c].id) {
					contains = true;
					break;
				}
			}
			if (!contains)
				result.push(current[i]);
		}
		return result;
	}

	private save_delete_eloValues(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			let toDeleteTeamA = MatchPlayerServer.getLeftDeltaList(this.TeamAPlayers, this.TeamAPlayersPrevious);
			let toDeleteTeamB = MatchPlayerServer.getLeftDeltaList(this.TeamBPlayers, this.TeamBPlayersPrevious);
			let toDelete: EloValue[] = [];
			toDelete = toDelete.concat(toDeleteTeamA);
			toDelete = toDelete.concat(toDeleteTeamB);

			let doneCounter = toDelete.length;

			function checkDone() {
				doneCounter--;
				if (doneCounter <= 0) {
					resolve();
				}
			}

			if (doneCounter === 0)
				return resolve();

			for (let i = 0; i < toDelete.length; ++i) {
				DBEloValue.destroy({where: {id: toDelete[i].id}}).then(() => {
					checkDone();
				}, error => reject(error));
			}

		});

	}

	private save_update_eloValues() {
		return new Promise<void>((resolve, reject) => {
			return new Promise<void>(() => {
				let toUpdateA = MatchPlayerServer.getCenterDeltaList(this.TeamAPlayers, this.TeamAPlayersPrevious);
				let toUpdateB = MatchPlayerServer.getCenterDeltaList(this.TeamBPlayers, this.TeamBPlayersPrevious);
				let toUpdate: EloValue[] = [];
				toUpdate = toUpdate.concat(toUpdateA);
				toUpdate = toUpdate.concat(toUpdateB);
				// save each to Update value
				let doneCounter = toUpdate.length;

				function checkDone() {
					doneCounter--;
					if (doneCounter === 0) {
						resolve();
					}
				}

				if (doneCounter <= 0)
					return resolve();

				for (let i = 0; i < toUpdate.length; ++i) {
					let elo = new EloValueServer(toUpdate[i]);
					elo.MatchId = this.id;
					elo.save().then(() => {
						checkDone();
					});
				}
			});
		});
	}

	private save_create_eloValues() {
		return new Promise<void>((resolve, reject) => {
			let toCreateTeamA = MatchPlayerServer.getLeftDeltaList(this.TeamAPlayersPrevious, this.TeamAPlayers);
			let toCreateTeamB = MatchPlayerServer.getLeftDeltaList(this.TeamBPlayersPrevious, this.TeamBPlayers);
			let toCreate: any[] = []; // type is really EloValue[]. Need any[] to delete hidden fields.
			toCreate = toCreate.concat(toCreateTeamA);
			toCreate = toCreate.concat(toCreateTeamB);

			if (toCreate.length === 0)
				return resolve();

			// remove id, create update date times.
			for (let i = 0; i < toCreate.length; ++i) {
				delete toCreate[i].id;
				delete toCreate[i].createdAt;
				delete toCreate[i].updatedAt;
			}

			DBEloValue.bulkCreate(toCreate).then(() => {
				resolve();
			}, error => reject(error));
		});
	}

	save(): Promise<void> {
		if (this.id !== null)
			return new Promise<void>((resolve, reject) => {
				// update elo values.
				EloValueServer.allByMatchId(this.id).then((current: EloValue[]) => {
					// get the to delete list.
					let teamACurrent: EloValue[] = [];
					let teamBCurrent: EloValue[] = [];
					let teamA = this.TeamAId;
					let teamB = this.TeamBId;
					for (let i = 0; i < current.length; ++i) {
						if (current[i].TeamId == teamA)
							teamACurrent.push(current[i]);
						else if (current[i].TeamId == teamB)
							teamBCurrent.push(current[i]);
					}
					for (let i = 0; i < this.TeamAPlayers.length; ++i) {
						this.TeamAPlayers[i].TeamId = teamA;
						this.TeamAPlayers[i].MatchId = this.id;
					}
					for (let i = 0; i < this.TeamBPlayers.length; ++i) {
						this.TeamBPlayers[i].TeamId = teamB;
						this.TeamBPlayers[i].MatchId = this.id;
					}

					this.TeamAPlayersPrevious = teamACurrent;
					this.TeamBPlayersPrevious = teamBCurrent;
					this.save_delete_eloValues().then(() => {
						this.save_update_eloValues().then(() => {
							this.save_create_eloValues().then(() => {
								let id = this.id;
								delete this.id;
								DBMatch.update(this, {where: {id: id}}).then((item: any) => {
									this.id = id;
									if (item && item.dataValues)
										mapObjectToObject(item.dataValues, this);
									resolve();
								});
							});
						});
					});
				});
			});
		else
			return this.create();
	};

	create(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			DBMatch.create(this).then((item: any) => {
				if (item && item.dataValues) {
					mapObjectToObject(item.dataValues, this);
					let id = this.id;
					let teamA = this.TeamAId;
					let teamB = this.TeamBId;
					for (let i = 0; i < this.TeamAPlayers.length; ++i) {
						this.TeamAPlayers[i].MatchId = id;
						this.TeamAPlayers[i].TeamId = teamA;
					}
					for (let i = 0; i < this.TeamBPlayers.length; ++i) {
						this.TeamBPlayers[i].MatchId = id;
						this.TeamBPlayers[i].TeamId = teamB;
					}
					this.save_create_eloValues().then(() => {
						resolve();
					});
				}
			}, reject);
		});
	};

	static removeById(id: string|number): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			DBMatch.destroy({where: {id: id}}).then(() => resolve(), reject);
		});
	};

	remove(): Promise<void> {
		return MatchPlayerServer.removeById(this.id);
	};

	static getOneById(id: string): Promise<MatchPlayerServer> {
		return new Promise<MatchPlayerServer>((resolve, reject) => {
			DBMatch.findOne({
				where: {id: id},
				include: [{model: DBTeam, as: 'TeamA'}, {model: DBTeam, as: 'TeamB'}, DBEvent]
			}).then((item: any) => {
				if (item && item.dataValues) {
					EloValueServer.allByMatchId(id).then((eloList: EloValue[]) => {
						item = new MatchPlayerServer(item.dataValues);

						if (item.Event)
							item.EventName = item.Event.dataValues.name;
						if (item.TeamA)
							item.TeamAName = item.TeamA.dataValues.name;
						if (item.TeamB)
							item.TeamBName = item.TeamB.dataValues.name;

						let teamA = item.TeamAId;
						let teamB = item.TeamBId;
						item.TeamAPlayers = [];
						item.TeamBPlayers = [];
						for (let i = 0; i < eloList.length; ++i) {
							if (eloList[i].TeamId == teamA)
								item.TeamAPlayers.push(eloList[i]);
							else if (eloList[i].TeamId == teamB)
								item.TeamBPlayers.push(eloList[i]);
						}
						resolve(item);
					}, error => reject(error));
				}
				else
					resolve(undefined);
			}, reject);
		});
	};

	static all(userId, limit?: number, skip?: number): Promise<any[]> {
		// TODO, limit by userId
		return all(DBMatch, limit, skip);
	};

	static viewAll(userId, limit?: number, skip?: number): Promise<any[]> {
		// TODO, limit by userId
		return new Promise<any[]>((resolve, reject) => {
			DBMatch.all({
				include: [{model: DBTeam, as: 'TeamA'},
					{model: DBTeam, as: 'TeamB'},
					DBEvent]
			}).then((items: any[]) => {
				let result: any[] = [];
				if (!items)
					return resolve([]);
				for (let i = 0; i < items.length; ++i) {
					let dv = items[i].dataValues;
					let item: any = {
						id: dv.id,
						endTime: dv.endTime
					};
					if (dv.Event)
						item.EventName = dv.Event.dataValues.name;
					if (dv.TeamA)
						item.TeamAName = dv.TeamA.dataValues.name;
					if (dv.TeamB)
						item.TeamBName = dv.TeamB.dataValues.name;

					result.push(item);
				}
				resolve(result);
			}, (error) => {
				logs(error);
				reject(error);
			});
		});
	};

	static getCount(): Promise<number> {
		return new Promise<number>((resolve, reject) => {
			DBMatch.count().then((num) => resolve(num), reject);
		});
	};

}
