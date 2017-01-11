declare module requestModule {

}

declare class requestModule {
	constructor(options:any, callback:(error, reqres, body)=>void);
}


declare module 'request' {
	export = requestModule;
}