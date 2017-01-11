/**
 * Created by trevor on 7/11/2016.
 */


declare class connectMongoDbSession {
	constructor(session:any);
}

declare module 'connect-mongodb-session' {
	function createSession(session:any);

	export = createSession;
}