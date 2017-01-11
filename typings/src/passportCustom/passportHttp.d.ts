declare module passportCustomModule {

}
declare class passportCustomModule {
	static Strategy:any;

	constructor(cb:(req, callback)=>void);
}

declare module 'passport-custom' {
	export = passportCustomModule;
}