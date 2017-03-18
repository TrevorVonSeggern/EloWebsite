import {DBTeam} from "./sequelize";
import {ServerBaseModel, all} from "web-base-server-model";
import {mapObjectToObject} from 'web-base-model';
import {Team} from "../../models/models";
import {DBGame} from "./sequelize";

export class TeamServer extends ServerBaseModel implements Team {
	id: string;
	name: string;
	GameId: string;

	constructor(instance?) {
		super(instance);
	}

	static allByGame(userId, gameId, limit, skip): Promise<Team[]> {
		// TODO: limit by userId
		return new Promise<Team[]>((resolve, reject) => {
			// TODO: resolve all teams by game id (and user id);
			resolve();
		});
	}

	save(): Promise<void> {
		if (this.id !== null)
			return new Promise<void>((resolve, reject) => {
				let id = this.id;
				delete this.id;
				DBTeam.update(this, {where: {id: id}}).then((item: any) => {
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
			DBTeam.create(this).then((item: any) => {
				if (item && item.dataValues)
					mapObjectToObject(item.dataValues, this);
				resolve();
			}, reject);
		});
	};

	static removeById(id: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			DBTeam.destroy({where: {id: id}}).then(() => resolve(), reject);
		});
	};

	remove(): Promise<void> {
		return TeamServer.removeById(this.id);
	};

	static getOneById(id: string): Promise<TeamServer> {
		return new Promise<TeamServer>((resolve, reject) => {
			DBTeam.findOne({where: {id: id}, include: [DBGame]}).then((item: any) => {
				if (item && item.dataValues)
					resolve(new TeamServer(item.dataValues));
				else
					resolve(undefined);
			}, reject);
		});
	};

	static all(userId, limit?: number, skip?: number): Promise<any[]> {
		// TODO: limit by userId.
		return all(DBTeam, limit, skip);
	};

	static getCount(): Promise<number> {
		return new Promise<number>((resolve, reject) => {
			DBTeam.count().then((num) => resolve(num), reject);
		});
	};

}
