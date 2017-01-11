declare module 'fs' {
	export function readFileSync(fileName:string);

	export function readFile(filename:string, encoding:string, cb:any);
}