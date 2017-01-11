/**
 * Created by trevor on 7/11/2016.
 */


declare class dynamooseModule {
	constructor(session: any);

}

declare class DynamooseSchema {
	constructor(schema: any);
}

declare class DynamooseTable {

}

declare class QueryClass {
	exec(callback: (error: string, item) => void);

	where(rangeKey: any): QueryClass;

	fileter: QueryClass;

	and(): QueryClass;

	or(): QueryClass;

	not(): QueryClass;

	null(): QueryClass;

	eq(value: any): QueryClass;

	lt(value: any): QueryClass; /// less than the range key or filter than the value argument.
	le(value: any): QueryClass; /// less than or eq the range key or filter than the value argument.
	gt(value: any): QueryClass; /// greater than the range key or filter than the value argument.
	ge(value: any): QueryClass; /// greater than or eq the range key or filter than the value argument.

	beginsWith(value: any): QueryClass;

	between(a: any, b: any): QueryClass;

	contains(value: any): QueryClass;

	in(value: any): QueryClass;

	limit(limit: number): QueryClass;

	consistent(): QueryClass;

	descending(): QueryClass;

	ascending(): QueryClass;

	startAt(key: any): QueryClass;

	attributes(attributes: any): QueryClass;
}

declare class DynamooseClass {
	_id: number;

	constructor(instance?: any);

	save();

	static batchPut(items: any[], callback: (error: string, items: any) => void);
	static batchPut(items: any[], options: any, callback: (error: string, items: any) => void);

	static get(identifier: any): QueryClass; // as the is the object it gets form the database.

	static query(queryString: any): QueryClass;

	static queryOne(queryObject: any): QueryClass;

	static scan(queryString: any): QueryClass;

	static update(conditions: any, newValues: any, callback: (string) => void);
}

declare module "dynamoose" {

	export class Schema {
		constructor(schema: any);
	}

	export let AWS: any;

	export function local();

	export function ddb();

	export function setDefaults(options: any);

	export function model(modelName: String, schema: any): typeof DynamooseClass;

}