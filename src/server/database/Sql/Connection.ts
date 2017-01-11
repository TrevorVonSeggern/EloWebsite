import {QueryRequest} from "./QueryRequest";
/**
 * Created by trevor on 1/13/16.
 */

let mysql = require('mysql');
import {config} from '../../config/database';
let settings = config.sql;

export class Connection {
	static pool: any = undefined;
	static poolActiveConnections: number = 0;
	requestPool: QueryRequest[] = [];

	static format(query: string, inserts: string[]): string {
		return mysql.format(query, inserts)
	}

	static createPoolConnection() {
		if (Connection.pool == undefined) {
			Connection.pool = mysql.createPool(settings); // create pool.
		}
	}

	static query(query: string): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			Connection.createPoolConnection();
			Connection.pool.getConnection(function (error: any, mysqlCon: any) {
				if (error) {
					mysqlCon && mysqlCon.release();
					console.log(error);
					reject(error);
					return;
				}

				mysqlCon.query(query, (error, data) => {
					if (error)
						reject(error);
					else
						resolve(data);
				});
				mysqlCon.release();
			});
		});
	}

	static executeQueryRequestOnConnection(mysqlCon: any, requestPool: QueryRequest[], finishedCallback: () => any) {
		// ran out of requests
		if (requestPool == undefined || requestPool == null || requestPool == [] || requestPool.length <= 0) {
			finishedCallback();
			return;
		}
		let request: QueryRequest = requestPool.shift();

		// process a request
		mysqlCon.query(request.query, function (data) {
			request.callback(data);
			if (requestPool.length == 0) {
				finishedCallback();
			} else {
				Connection.executeQueryRequestOnConnection(mysqlCon, requestPool, finishedCallback);
			}
		});
	}

	executePool(savedAllCallback: () => any) {
		if (this.requestPool == undefined || this.requestPool.length == undefined || this.requestPool.length <= 0) {
			return; // don't bother if there aren't any queries
		}
		Connection.createPoolConnection();

		let connections_to_create: number = (settings.connectionLimit - Connection.poolActiveConnections);
		for (let c = 0; c < connections_to_create; c++) {
			Connection.pool.getConnection(function (error: any, mysqlCon: any) {
				if (error) {
					mysqlCon && mysqlCon.release();
					console.log(error);
					return;
				}

				Connection.poolActiveConnections++;

				Connection.executeQueryRequestOnConnection(mysqlCon, this.requestPool, function () {
					Connection.poolActiveConnections--;
					mysqlCon.release();
					savedAllCallback();
				});
			});
		}
	}
}