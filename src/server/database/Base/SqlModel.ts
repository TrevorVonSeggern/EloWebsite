// Created by trevor on 12/26/16.

import {NewUID, mapObjectToObject} from "./Model";
import {Connection} from "../Sql/Connection";
import {IBaseModel} from "../../../models/baseModel";

export abstract class SqlModel implements IBaseModel {
	_id: string;
	modelInstance;
	existingModel: boolean;

	constructor(instance: any, public modelType) {
		if (instance)
			mapObjectToObject(instance, this);
		this.existingModel = !!(instance && instance._id);
	}

	//noinspection JSMethodCanBeStatic
	presave(): Promise<void> {
		// a nothing promise function. Made to be overridden
		return new Promise<void>((resolve) => {
			resolve(); // false as in it has not been modified
		});
	}

	protected abstract saveScript(modelInstance: any): Promise<string>;

	save(): Promise<SqlModel> {
		if (!this.existingModel)
			return this.create();

		return new Promise<SqlModel>((resolve, reject) => {
			this.presave().then(() => {
				// let instance = {};
				// mapObjectToObject(this, instance, new this.modelType());
				this.saveScript(this).then((query: string) => {
					return Connection.query(query).then((data) => {
						if (data === undefined) {
							reject('no result from the database');
						}
						else if (data.affectedRows === 1 && data.changedRows === 1 && data.serverStatus === 2) {
							resolve(this);
						}
						else
							resolve(undefined);
					}, (error) => {
						reject(error);
					});
				}, (error) => {
					console.log('error injecting save script.');
					reject(error);
				});
			}, (error) => {
				reject(error);
			});
		});
	}

	protected abstract createScript(modelInstance: any): Promise<string>;

	create(): Promise<SqlModel> {
		this._id = NewUID();

		return new Promise<SqlModel>((resolve, reject) => {
			this.presave().then(() => {
				this.createScript(this).then((query: string) => {
					return Connection.query(query).then((data) => {
						if (data === undefined) {
							reject('no result from the database');
						}
						else if (data.affectedRows === 1 && data.changedRows === 0 && data.serverStatus === 2) {
							resolve(this);
						}
						else
							resolve(undefined);
					}, (error) => {
						reject(error);
					});
				}, (error) => {
					console.log('error injecting create script.');
					reject(error);
				});
			}, (error) => {
				reject(error);
			});
		});
	}

	protected abstract removeByIdScript(id: string): Promise<string>;

	removeById(id: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			if (!id)
				reject('id is a non string');

			this.removeByIdScript(id).then((query: string) => {
				return Connection.query(query).then(() => {
					resolve();
				}, (error) => {
					reject(error);
				});
			}, (error) => {
				console.log('error injecting remove by id script.');
				reject(error);
			});
		});
	}

	remove(): Promise<void> {
		return this.removeById(this._id);
	}

	protected abstract getOneByIdScript(id: string): Promise<string>;

	getOneById(id: string): Promise<SqlModel> {
		return new Promise<SqlModel>((resolve, reject) => {
			this.getOneByIdScript(id).then((query: string) => {
				return Connection.query(query).then((data) => {
					if (!data || data.length === 0)
						resolve(undefined);
					else
						resolve(new this.modelType(data[0]));
				}, (error) => {
					reject(error);
				});
			}, (error) => {
				console.log('error injecting remove by id script.');
				reject(error);
			});
		});
	}

	protected abstract getAllScript(limit: number, skip: number): Promise<string>;

	all(limit?: number, skip?: number): Promise<any[]> {
		if (!skip || skip < 0)
			skip = 0;
		return new Promise<any[]>((resolve, reject) => {
			this.getAllScript(limit, skip).then((query: string) => {
				return Connection.query(query).then((data) => {
					resolve(data);
				}, (error) => {
					reject(error);
				});
			}, (error) => {
				console.log('error injecting all script.');
				reject(error);
			});
		});
	}

	protected abstract getCountScript(): Promise<string>;

	getCount(): Promise<number> {
		return new Promise<number>((resolve, reject) => {
			this.getCountScript().then((query: string) => {
				return Connection.query(query).then((data) => {
					if (data === undefined)
						resolve(0);
					else if (data.length === 1 && data[0].size !== undefined && data[0].size >= 0)
						resolve(data[0].size);
					else
						reject('Undefined output getting count.');
				}, (error) => {
					reject(error);
				});
			}, (error) => {
				console.log('error injecting count script.');
				reject(error);
			});
		});
	}
}