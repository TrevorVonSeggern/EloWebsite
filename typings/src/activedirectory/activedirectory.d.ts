/**
 * Created by trevor on 7/25/2016.
 */

declare class activeDirectoryClass {
	constructor(config:any);
}

declare module activeDirectoryClass {

}


declare module 'activedirectory' {
	export  = activeDirectoryClass;
}