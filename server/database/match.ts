import {DBMatch} from "./sequelize";
import {ServerBaseModel, all} from "web-base-server-model";
import {mapObjectToObject} from 'web-base-model';
import {Match} from "../../models/models";

export class MatchServer extends ServerBaseModel implements Match {
	id: string|number;
	startTime: Date;
	endTime: Date;
	TeamAId: string|number;
	TeamBId: string|number;
	EventId: string|number;
	status: number;
	winner: boolean;

	constructor(instance?) {
		super(instance);
	}

	static setAllStatus(matchId): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			// TODO: Set all match status
			resolve();
		})
	}

	static processOne(): Promise<Boolean> {
		return new Promise<Boolean>((resolve, reject) => {
			// TODO: Add process Logic
			// this.getProcessScript().then((query: string) => {
			// 	Connection.query(query).then((response:any) => {
			// 		// TODO: Add logic to see if it is done processing or not.
			// 		if(response.length && response.length === 35 && response[33].affectedRows === 1 && response[33].changedRows === 1)
			// 			resolve(true);
			// 		else
			// 			resolve(false);
			// 	}, (error) => {
			// 		reject(error);
			// 	});
			// }, (error) => reject(error));
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

	static removeById(id: string| number): Promise<void> {
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

	static all(userId, limit?: number, skip?: number): Promise<any[]> {
		// TODO: limit by userID.
		return all(DBMatch, limit, skip);
	};

	static getCount(): Promise<number> {
		return new Promise<number>((resolve, reject) => {
			DBMatch.count().then((num) => resolve(num), reject);
		});
	};

}
