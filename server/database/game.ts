import {DBGame} from "./sequelize";
import {ServerBaseModel, all} from "web-base-server-model";
import {mapObjectToObject} from 'web-base-model';
import {Game} from "../../models/models";

export class GameServer extends ServerBaseModel implements Game {
	id: string;
	name: string;
	UserId: string;
	startValue: number;
	scale: number;

	constructor(instance?) {
		super(instance);
	}

	save(): Promise<void> {
		if (this.id !== null)
			return new Promise<void>((resolve, reject) => {
				let id = this.id;
				delete this.id;
				DBGame.update(this, {where: {id: id}}).then((item: any) => {
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
			DBGame.create(this).then((item: any) => {
				if (item && item.dataValues)
					mapObjectToObject(item.dataValues, this);
				resolve();
			}, reject);
		});
	};

	static removeById(id: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			DBGame.destroy({where: {id: id}}).then(() => resolve(), reject);
		});
	};

	remove(): Promise<void> {
		return GameServer.removeById(this.id);
	};

	static getOneById(id: string): Promise<GameServer> {
		return new Promise<GameServer>((resolve, reject) => {
			DBGame.findOne({where: {id: id}}).then((item: any) => {
				if (item && item.dataValues)
					resolve(new GameServer(item.dataValues));
				else
					resolve(undefined);
			}, reject);
		});
	};

	static all(userId, limit?: number, skip?: number): Promise<any[]> {
		return all(DBGame, limit, skip); // TODO: Limit games by userId
	};

	static getCount(): Promise<number> {
		return new Promise<number>((resolve, reject) => {
			DBGame.count().then((num) => resolve(num), reject);
		});
	};

}
