import {DBEvent} from "./sequelize";
import {ServerBaseModel, all} from "web-base-server-model";
import {mapObjectToObject} from 'web-base-model';
import {Event} from "../../models/models";

export class EventServer extends ServerBaseModel implements Event {
	id: string;
	name: string;
	startTime: Date;
	endTime: Date;
	GameId: string;
	comment: string;

	constructor(instance?) {
		super(instance);
	}

	static allByGame(gameId, limit, skip): Promise<any[]> {
		return new Promise<any[]>((resolve, reject) => {
			resolve();
		});
	}

	save(): Promise<void> {
		if (this.id !== null)
			return new Promise<void>((resolve, reject) => {
				let id = this.id;
				delete this.id;
				DBEvent.update(this, {where: {id: id}}).then((item: any) => {
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
			DBEvent.create(this).then((item: any) => {
				if (item && item.dataValues)
					mapObjectToObject(item.dataValues, this);
				resolve();
			}, reject);
		});
	};

	static removeById(id: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			DBEvent.destroy({where: {id: id}}).then(() => resolve(), reject);
		});
	};

	remove(): Promise<void> {
		return EventServer.removeById(this.id);
	};

	static getOneByName(name: string): Promise<EventServer> {
		return new Promise<EventServer>((resolve, reject) => {
			DBEvent.findOne({where: {name: name}}).then((item: any) => {
				if (item && item.dataValues)
					resolve(new EventServer(item.dataValues));
				else
					resolve(undefined);
			}, reject);
		});
	};

	static getOneById(id: string): Promise<EventServer> {
		return new Promise<EventServer>((resolve, reject) => {
			DBEvent.findOne({where: {id: id}}).then((item: any) => {
				if (item && item.dataValues)
					resolve(new EventServer(item.dataValues));
				else
					resolve(undefined);
			}, reject);
		});
	};

	static all(userId, limit?: number, skip?: number): Promise<any[]> {
		// TODO: limit events by userID
		return all(DBEvent, limit, skip);
	};

	static getCount(): Promise<number> {
		return new Promise<number>((resolve, reject) => {
			DBEvent.count().then((num) => resolve(num), reject);
		});
	};

}
