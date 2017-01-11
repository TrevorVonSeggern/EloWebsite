///<reference path="../../models/baseModel.ts"/>
// Created by trevor on 12/26/16.


import {IBaseModel} from "../../models/baseModel";
import * as bcrypt from 'bcrypt-nodejs'

export function hashString(input, _salt): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		bcrypt.hash(input, _salt, null, function (err, hash) {
			if (err)
				reject(err);
			else
				resolve(hash);
		});
	});
}
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function GenerateUID(len): string {
	let buf = [], chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < len; ++i) {
		buf.push(chars[getRandomInt(0, chars.length - 1)]);
	}

	return buf.join('');
}
export function NewUID(): string {
	return GenerateUID(30);
}

export abstract class Model implements IBaseModel {
	_id: string;
	modelType;
	modelInstance;
	existingModel: boolean;

	constructor(name, public schema, instance: any) {
		schema._id = {
			type: String,
			required: true,
			index: true,
			rangeKey: true
		};

		if (instance)
			this.mapFromObject(instance);

		this.modelInstance = new this.modelType();

		this.existingModel = !!(instance && instance._id);
		this.mapToObject(this.modelInstance);
	}

	protected mapToModelInstance() {
		this.mapObjectToObject(this, this.modelInstance);
	}

	protected mapFromObject(obj) {
		this.mapObjectToObject(obj, this);
	}

	protected mapObjectToObject(from: any, to: any) {
		let keys = Object.keys(this.schema.attributes);
		if (to === undefined)
			return;
		for (let key in keys) {
			if (from)
				to[keys[key]] = from[keys[key]];
			else
				to[keys[key]] = undefined;
		}
	}

	public mapToObject(obj) {
		let keys = Object.keys(this.schema.attributes);
		for (let key in keys) {
			if (obj)
				obj[keys[key]] = this[keys[key]];
		}
	}

	presave(): Promise<void> {
		// a nothing promise function. Made to be overridden
		return new Promise<void>((resolve) => {
			resolve(); // false as in it has not been modified
		});
	}

	save(): Promise<Model> {
		if (!this.existingModel)
			this._id = NewUID();

		return new Promise<Model>((resolve, reject) => {
			this.presave().then(() => {
				this.mapToModelInstance(); // after presave...
				this.modelInstance.save((error) => {
					if (error)
						reject(error);
					else {
						resolve(this);
					}
				});
			}, (error) => {
				reject(error);
			});
		});
	}

	create(): Promise<Model> {
		this._id = undefined;
		return this.save();
	}

	remove(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.mapToModelInstance(); // none of it's fields are populated, including _id possibly
			this.modelInstance.delete(function (err) {
				if (err)
					reject(err);
				else
					resolve();
			});
		});
	}

	static create(model: Model): Promise<Model> {
		return model.create();
	}

	get(filters: any): Promise<Model> {
		return new Promise<Model>((resolve, reject) => {
			this.modelType.scan(filters, (err, result: any[]) => {
				if (err)
					return reject(err);
				if (result === undefined || result.length == 0)
					return resolve(undefined);
				if (result.length)
					this.mapFromObject(result[0]);
				else
					this.mapFromObject(result);
				resolve(this);
			});
		});
	}

	protected query(filters: any): Promise<any[]> { // filters across indexed values
		return new Promise<Model[]>((resolve, reject) => {
			this.modelType.query(filters, function (error: string, items: any[]) {
				if (error)
					reject(error);
				else
					resolve(items);
			});
		});
	}

	protected scan(filters: any): Promise<any[]> { // filters across all columns
		return new Promise<Model[]>((resolve, reject) => {
			this.modelType.scan(filters, function (error: string, items: any[]) {
				if (error)
					reject(error);
				else
					resolve(items);
			});
		});
	}

	all(limit?: number, skip?: number): Promise<any[]> {
		if (!skip || skip < 0)
			skip = 0;
		return new Promise<any[]>((resolve, reject) => {
			if (limit && limit > 0) {
				this.modelType.scan({}).limit(limit + skip).exec(function (error: string, items: any[]) {
					if (error)
						return reject(error);
					items.splice(0, skip);
					resolve(items);
				});
			} else {
				this.modelType.scan({}, function (error: string, items: any[]) {
					if (error)
						reject(error);
					else
						resolve(items);
				});
			}
		});
	}

}