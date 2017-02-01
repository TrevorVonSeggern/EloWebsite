// Created by trevor on 5/20/16.

export class GameFactory {
	static factoryName: string = 'GameFactory';
	static $inject: string[] = ['bcrypt', '$http'];

	static initialized = false;

	constructor() {
		GameFactory.initialized = true;
	}

	$get() {
		return this;
	}

	static Factory() {
		return [function () {
			return new GameFactory();
		}];
	}
}
