// Created by trevor on 5/20/16.

import IModule = angular.IModule;
import IHttpService = angular.IHttpService;

export class MatchFactory {
	static factoryName: string = 'MatchFactory';
	static $inject: string[] = ['bcrypt', '$http'];

	static initialized = false;

	constructor() {
		MatchFactory .initialized = true;
	}

	$get() {
		return this;
	}

	static Factory() {
		return [function () {
			return new MatchFactory ();
		}];
	}
}
