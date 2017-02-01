// Created by trevor on 5/20/16.

import IHttpService = angular.IHttpService;

export class TeamFactory {
	static factoryName: string = 'TeamFactory';
	static $inject: string[] = [];

	static initialized = false;

	constructor() {
		TeamFactory .initialized = true;
	}

	$get() {
		return this;
	}

	static Factory() {
		return [function () {
			return new TeamFactory ();
		}];
	}
}
