import {DBEloValue} from "./sequelize";
import {ServerBaseModel, all} from "web-base-server-model";
import {mapObjectToObject} from 'web-base-model';
import {EloValue} from "../../models/models";

export class EloValueServer extends ServerBaseModel implements EloValue {
	id: string;
	PlayerId: string;
	MatchId: string;
	TeamId: string;
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

	static removeById(id: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			DBEloValue.destroy({where: {id: id}}).then(() => resolve(), reject);
		});
	};

	remove(): Promise<void> {
		return EloValueServer.removeById(this.id);
	};

	static getOneById(id: string): Promise<EloValueServer> {
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

	static getCount(): Promise<number> {
		return new Promise<number>((resolve, reject) => {
			DBEloValue.count().then((num) => resolve(num), reject);
		});
	};

}
