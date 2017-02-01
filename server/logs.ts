// Created by trevor on 1/9/17.

export let privateLogs: string[] = [];

export function logs(log: string) {
	console.log(log);
	privateLogs.push(log);
}