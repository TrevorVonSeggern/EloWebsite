import {DBPlayer} from "./sequelize";
import {ServerBaseModel, all} from "web-base-server-model";
import {mapObjectToObject} from 'web-base-model';
import {Player} from "../../models/models";

export class PlayerServer extends ServerBaseModel implements Player {
	id: string;
	name: string;
	GameId: string;
	UserId: string;

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
				});
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

	static removeById(id: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			DBPlayer.destroy({where: {id: id}}).then(() => resolve(), reject);
		});
	};

	remove(): Promise<void> {
		return PlayerServer.removeById(this.id);
	};

	static getOneById(id: string): Promise<PlayerServer> {
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

}
