// Created by trevor on 5/31/16.

export class BasicListFactory {
	static factoryName:string = 'BasicListFactory';
	static $inject:any[]      = [];

	ItemListListeners:any = {};

	AddedItem() {
		for (let prop in this.ItemListListeners) {
			this.ItemListListeners[prop]();
		}
	}

	AddListener(key:string, func) {
		this.ItemListListeners[key] = func;
	}

	RemoveListener(key:string) {
		delete this.ItemListListeners[key];
	}

	constructor() {
	}

	$get() {
		return this;
	}

	static Factory() {
		return [
			function () {
				return new BasicListFactory();
			}
		]
	}
}

BasicListFactory.$inject.push(BasicListFactory);