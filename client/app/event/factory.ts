// Created by trevor on 5/20/16.

export class EventFactory {
	static factoryName: string = 'EventFactory';
	static $inject: string[] = ['bcrypt', '$http'];

	static initialized = false;

	constructor() {
		EventFactory .initialized = true;
	}

	$get() {
		return this;
	}

	static Factory() {
		return [function () {
			return new EventFactory ();
		}];
	}
}
