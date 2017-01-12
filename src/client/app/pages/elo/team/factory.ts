// Created by trevor on 5/20/16.

import IModule = angular.IModule;
import IHttpService = angular.IHttpService;

export class TeamFactory {
	static factoryName: string = 'TeamFactory';
	static $inject: string[] = ['bcrypt', '$http'];

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
