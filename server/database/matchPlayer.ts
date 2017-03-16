import {DBMatch} from "./sequelize";
import {ServerBaseModel, all} from "web-base-server-model";
import {mapObjectToObject} from 'web-base-model';
import {MatchPlayer, EloValue} from "../../models/models";

export class MatchPlayerServer extends ServerBaseModel implements MatchPlayer {
	id: string;
	startTime: Date;
	endTime: Date;
	TeamA: string;
	TeamB: string;
	TeamAPrevious: string;
	TeamBPrevious: string;
	EventId: string;
	status: number;
	teamAPlayers: EloValue[];
	teamBPlayers: EloValue[];
	teamAPlayersPrevious: EloValue[];
	teamBPlayersPrevious: EloValue[];
	winner: boolean;

	constructor(instance?) {
		super(instance);
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

	static removeById(id: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			DBMatch.destroy({where: {id: id}}).then(() => resolve(), reject);
		});
	};

	remove(): Promise<void> {
		return MatchPlayerServer.removeById(this.id);
	};

	static getOneById(id: string): Promise<MatchPlayerServer> {
		return new Promise<MatchPlayerServer>((resolve, reject) => {
			DBMatch.findOne({where: {id: id}}).then((item: any) => {
				if (item && item.dataValues)
					resolve(new MatchPlayerServer(item.dataValues));
				else
					resolve(undefined);
			}, reject);
		});
	};

	static all(userId, limit?: number, skip?: number): Promise<any[]> {
		// TODO, limit by userId
		return all(DBMatch, limit, skip);
	};

	static getCount(): Promise<number> {
		return new Promise<number>((resolve, reject) => {
			DBMatch.count().then((num) => resolve(num), reject);
		});
	};

}
