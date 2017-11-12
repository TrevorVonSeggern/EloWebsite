import {DBEloValue, DBPlayer, helperFunction_createIfNotExists} from "./sequelize";
import {ServerBaseModel, all} from "web-base-server-model";
import {mapObjectToObject} from 'web-base-model';
import {Player} from "../../models/models";
import {EloValueServer} from "./eloValue";
import {GameServer} from "./game";
import * as Sequelize from "sequelize";

export class PlayerServer extends ServerBaseModel implements Player {
	id: string;
	name: string;
	GameId: string | number;
	UserId: string;
	_currentElo: number;

	constructor(instance?) {
		super(instance);
	}

	static allByGame(userId, gameId, limit, skip): Promise<Player[]> {
		// TODO: limit by userId
		return new Promise<Player[]>((resolve, reject) => {
			// TODO resolve all players by game
			resolve();
		});
	}

	static getAllPlayersInMatch(matchId: string | number): Promise<PlayerServer[]> {
		return new Promise<PlayerServer[]>((resolve, reject) => {
			let whereCondition: any = Sequelize.literal("EloValues.MatchId = " + matchId);
			DBPlayer.findAll({where: whereCondition, include: [DBEloValue]}).then((result: any[]) => {
				let players: PlayerServer[] = [];
				for (let i = 0; i < result.length; ++i) {
					players.push(new PlayerServer(result[i].dataValues));
				}
				resolve(players);
			}, reject);
		});
	}

	static allByTeam(teamId: string | number): Promise<PlayerServer[]> {
		return new Promise<PlayerServer[]>((resolve, reject) => {
			let whereCondition: any = {teamId: teamId};
			DBPlayer.findAll({where: whereCondition}).then((result: any[]) => {
				let players: PlayerServer[] = [];
				for (let i = 0; i < result.length; ++i) {
					players.push(new PlayerServer(result[i].dataValues));
				}
				resolve(players);
			}, reject);
		});
	}

	save(): Promise<void> {
		if (this.id !== null)
			return new Promise<void>((resolve, reject) => {
				let id = this.id;
				delete this.id;
				DBPlayer.update(this, {where: {id: id}}).then((item: any) => {
					this.id = id;
					if (item && item.dataValues)
						mapObjectToObject(item.dataValues, this);
					resolve();
				}, reject);
			});
		else
			return this.create();
	};

	create(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			DBPlayer.create(this).then((item: any) => {
				if (item && item.dataValues)
					mapObjectToObject(item.dataValues, this);
				resolve();
			}, reject);
		});
	};

	createIfNotExists(): Promise<boolean> {
		return helperFunction_createIfNotExists(PlayerServer, this);
	};

	static removeById(id: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			DBPlayer.destroy({where: {id: id}}).then(() => resolve(), reject);
		});
	};

	remove(): Promise<void> {
		return PlayerServer.removeById(this.id);
	};

	static getOneById(id: string | number): Promise<PlayerServer> {
		return new Promise<PlayerServer>((resolve, reject) => {
			DBPlayer.findOne({where: {id: id}}).then((item: any) => {
				if (item && item.dataValues)
					resolve(new PlayerServer(item.dataValues));
				else
					resolve(undefined);
			}, reject);
		});
	};

	static all(userId, limit?: number, skip?: number): Promise<any[]> {
		// TODO: limit by userId.
		return all(DBPlayer, limit, skip);
	};

	static getCount(): Promise<number> {
		return new Promise<number>((resolve, reject) => {
			DBPlayer.count().then((num) => resolve(num), reject);
		});
	};

	getGame(): Promise<GameServer> {
		return new Promise<GameServer>((resolve, reject) => {
			GameServer.getOneById(this.GameId).then((game) => resolve(game), (error) => reject(error));
		});
	}

	getCurrentEloValue(game?: GameServer): Promise<number> {
		return new Promise<number>((resolve, reject) => {
			EloValueServer.getPlayerCurrentElo(this.id, game).then((value) => {
				this._currentElo = value;
				resolve();
			}, reject);
		});
	}
}
