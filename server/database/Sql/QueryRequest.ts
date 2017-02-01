// Created by trevor on 12/29/16.

export class QueryRequest {
	constructor(query_value:string, callback_value:(data:any[]) => any) {
		this.callback = callback_value;
		this.query = query_value;
	}

	callback:(data:any) => any;
	query:string;
}