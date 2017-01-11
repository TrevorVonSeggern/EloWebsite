declare module benvModule {
	export function setup(callback:any);
	export function expose(options:any);
	export function require(path:string, name:string);
}
//
// declare class benvModule {
//
// }

declare module 'benv' {
	export = benvModule;
}