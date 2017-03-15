// Created by trevor on 5/20/16.

export class PlayerFactory {
	static factoryName: string = 'PlayerFactory';
	static $inject: string[] = ['bcrypt', '$http'];

	static initialized = false;

	constructor() {
		PlayerFactory .initialized = true;
	}

	$get() {
		return this;
	}

	static Factory() {
		return [function () {
			return new PlayerFactory ();
		}];
	}
}
