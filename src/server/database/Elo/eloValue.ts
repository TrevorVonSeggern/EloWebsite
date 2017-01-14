import {SqlModel} from "../Base/SqlModel";
import fs = require('fs');
import {Connection} from "../Sql/Connection";
import {EloValueModel} from "../../../models/Elo/eloValue";

/**
 * Created by trevor on 3/21/16.
 */
// Load required packages

// Define our client schema
let EloValueSchema: EloValueModel = {
	_id: '',
	playerId: '',
	matchId: '',
	eloValue: 400
};

let sqlBasePath = './src/server/database/Sql/scripts/Elo/eloValue/';
let sqlGetByIdScript = fs.readFileSync(sqlBasePath + 'getById.sql', 'utf8');
let sqlInsertScript = fs.readFileSync(sqlBasePath + 'insert.sql', 'utf8');
let sqlRemoveScript = fs.readFileSync(sqlBasePath + 'remove.sql', 'utf8');
let sqlUpdateScript = fs.readFileSync(sqlBasePath + 'update.sql', 'utf8');
let sqlAllScript = fs.readFileSync(sqlBasePath + 'all.sql', 'utf8');
let sqlCountScript = fs.readFileSync(sqlBasePath + 'count.sql', 'utf8');
let sqlGetByMatchIdScript = fs.readFileSync(sqlBasePath + 'getAllByMatchId.sql', 'utf8');

class SqlEloValue extends SqlModel {

	constructor(instance?: any) {
		super(instance, EloValue);
	}

	protected getOneByIdScript(id: string): Promise<string> {
		return new Promise<string>((resolve) => {
			resolve(Connection.format(sqlGetByIdScript, [id]));
		});
	}

	public createScript(modelInstance: any): Promise<string> {
		return new Promise<string>((resolve) => {
			resolve(Connection.format(sqlInsertScript, [
				modelInstance._id,
				modelInstance.playerId,
				modelInstance.matchId,
				modelInstance.eloValue
			]));
		});
	}

	protected removeByIdScript(id: string): Promise<string> {
		return new Promise<string>((resolve) => {
			resolve(Connection.format(sqlRemoveScript, [id]));
		});
	}

	protected saveScript(modelInstance: any): Promise<string> {
		return new Promise<string>((resolve) => {
			resolve(Connection.format(sqlUpdateScript, [
				modelInstance.playerId,
				modelInstance.matchId,
				modelInstance.eloValue,
				modelInstance._id
			]));
		});
	}

	protected getAllScript(limit?: number, skip?: number): Promise<string> {
		return new Promise<string>((resolve) => {
			let script = '' + sqlAllScript; // plus an empty string for mutability.
			if (limit && typeof limit === 'number' && limit > 0) {
				script = script + ' LIMIT ' + limit.toString();
				if (skip && typeof skip === 'number' && skip > 0)
					script = script + ' OFFSET ' + skip.toString();
			}
			resolve(script);
		});
	}

	protected getCountScript(): Promise<string> {
		return new Promise<string>((resolve) => {
			let script = '' + sqlCountScript; // plus an empty string for mutability.
			resolve(script);
		});
	}

	private getAllByMatchIdScript(matchId: string): Promise<string> {
		return new Promise<string>((resolve) => {
			resolve(Connection.format(sqlGetByMatchIdScript, [matchId]));
		});
	}

	static getAllByMatchId(name: string): Promise<EloValueModel[]> {
		return new Promise<EloValueModel[]>((resolve, reject) => {
			let sqlClient = new SqlEloValue();
			sqlClient.getAllByMatchIdScript(name).then((query: string) => {
				return Connection.query(query).then((data) => {
					if (data.length === 0 || !data || !data.length)
						resolve([]);
					else
						resolve(data);
				}, (error) => {
					reject(error);
				});
			}, (error) => {
				console.log('error injecting get all by matchId script.');
				reject(error);
			});
		});
	}
}

export class EloValue extends SqlEloValue implements EloValueModel {
	playerId: string;
	matchId: string;
	eloValue: number;

	constructor(instance?: any) {
		super(instance);
	}

	static getAllByMatchId(matchId: string): Promise<EloValueModel[]> {
		return SqlEloValue.getAllByMatchId(matchId);
	}
}

// Export the Mongoose model
// export let Client = Dynamoose.model('Client', ClientSchema);