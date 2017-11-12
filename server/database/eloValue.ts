import {DBEloValue, DBMatch} from "./sequelize";
import {ServerBaseModel, all} from "web-base-server-model";
import {mapObjectToObject} from 'web-base-model';
import {EloValue} from "../../models/models";
import {GameServer} from "./game";
import * as Sequelize from "sequelize";
import {PlayerServer} from "./player";
import * as sequelize from "sequelize";

export class EloValueServer extends ServerBaseModel implements EloValue {
	id: string | number;
	PlayerId: string | number;
	MatchId: string | number;
	TeamId: string | number;
	eloValue: number;

	constructor(instance?) {
		super(instance);
	}

	save(): Promise<void> {
		if (this.id !== null)
			return new Promise<void>((resolve, reject) => {
				let id = this.id;
				delete this.id;
				DBEloValue.update(this, {where: {id: id}}).then((item: any) => {
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
			DBEloValue.create(this).then((item: any) => {
				if (item && item.dataValues)
					mapObjectToObject(item.dataValues, this);
				resolve();
			}, reject);
		});
	};

	static removeById(id: string | number): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			DBEloValue.destroy({where: {id: id}}).then(() => resolve(), reject);
		});
	};

	remove(): Promise<void> {
		return EloValueServer.removeById(this.id);
	};

	static getOneById(id: string | number): Promise<EloValueServer> {
		return new Promise<EloValueServer>((resolve, reject) => {
			DBEloValue.findOne({where: {id: id}}).then((item: any) => {
				if (item && item.dataValues)
					resolve(new EloValueServer(item.dataValues));
				else
					resolve(undefined);
			}, reject);
		});
	};

	static all(limit?: number, skip?: number): Promise<any[]> {
		return all(DBEloValue, limit, skip);
	};

	static allByMatchId(matchId: string | number, limit?: number, skip?: number): Promise<EloValueServer[]> {
		return new Promise<any[]>((resolve, reject) => {
			DBEloValue.all({where: {MatchId: matchId}}).then((items: any[]) => {
				let result: EloValueServer [] = [];
				for (let i = 0; i < items.length; ++i) {
					result.push(new EloValueServer(items[i].dataValues));
				}
				resolve(result);
			}, error => reject(error))
		});
	};

	static getCount(): Promise<number> {
		return new Promise<number>((resolve, reject) => {
			DBEloValue.count().then((num) => resolve(num), reject);
		});
	};

	static getPlayerCurrentElo(playerId: string | number, game?: GameServer): Promise<number> {
		return new Promise<number>((resolve, reject) => {
			DBEloValue.findOne({
				where: {
					playerId: playerId
				},
				include: [{model: DBMatch, required: true, where: {status: 1}}],
				order: [[DBMatch, 'endTime', 'DESC']]
			}).then((item: any) => {
				if (item && item.dataValues && item.dataValues.eloValue)
					resolve(item.dataValues.eloValue);
				else if (game && game.startValue)
					resolve(game.startValue);
				else {
					PlayerServer.getOneById(playerId).then((player: PlayerServer) => {
						player.getGame().then((g: GameServer) => {
							resolve(g.startValue);
						})
					}, () => reject('could not find elo value from result.'));
				}
			});
		});
	}

	static getPlayerCurrentEloValues(playerId: string | number): Promise<EloValueServer[]> {
		return new Promise<EloValueServer[]>((resolve, reject) => {
			DBEloValue.findAll({
				where: {playerId: playerId, MatchId: {$ne: null}},
				include: [DBMatch],
				order: ['endTime']
			}).then((item: any) => {
				let result: EloValueServer[] = [];
				for (let i = 0; i < item.length; ++i) {
					if (item[i].dataValues) {
						result.push(new EloValueServer(item[i].dataValues));
					}
				}
				return resolve(result);
			});
		});
	}
}
