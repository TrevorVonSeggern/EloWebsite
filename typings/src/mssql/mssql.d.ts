/**
 * Created by trevor on 7/28/2016.
 */

declare class MssqlRequest {
	constructor();

	query(sql:string);
}

declare module 'mssql' {
	function connect(config:any);

	var Request:any;
}