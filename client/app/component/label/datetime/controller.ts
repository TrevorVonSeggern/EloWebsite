import {definition} from '../../../Definition';

export class controller {
	static controllerName: string = definition.labelDatetime.controllerName;

	value: string;

	constructor() {
		let d = new Date(this.value);
		this.value = d.toString();
		this.value = this.value.substring(0, this.value.length - 6 - 5 - 4);
	}
}

controller.$inject = ['$scope'];
