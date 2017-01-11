// Created by trevor on 12/29/16.


import {IBaseModel} from "../../../models/Base/baseModel";
import {config} from '../../config/database';
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

let mapIgnoredItems = ['modelType', 'existingModel'];

export function mapObjectToObject(from: any, to: any, schema?: any) {
	let keys = schema;
	if (!schema && this.schema && this.schema.attributes)
		keys = Object.keys(this.schema.attributes);
	if (from === undefined || to === undefined)
		return;
	if (!keys)
		keys = Object.keys(from);
	for (let key in keys) {
		let index = keys[key];
		if (mapIgnoredItems.indexOf(index) > -1) // ignore form the list.
			continue;
		if (from)
			to[index] = from[index];
		else
			to[index] = undefined;
	}
}

export abstract class BaseServerModel implements IBaseModel {
	_id: string;

	constructor(instance?: any) {
		if (instance) {
			mapObjectToObject(instance, this);
		}
	}

	mapFromObject(obj) {
		mapObjectToObject(obj, this);
	}

	abstract getOneById(id: string): Promise<IBaseModel>;

	abstract save(): Promise<IBaseModel>;

	abstract presave(): Promise<void>;

	abstract remove(): Promise<void>;

	abstract removeById(id: string): Promise<void>;

	abstract create(): Promise<IBaseModel>;

	abstract all(skip?: number, limit?: number): Promise<IBaseModel[]>;
}
