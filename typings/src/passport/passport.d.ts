declare module 'passport' {
	export function initialize();

	export function use(name:string, module:any);

	export function authenticate(name:string, options:any);
	export function authenticate(names:string[], options:any);
}