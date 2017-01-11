import {ListFactory} from '../list/factory';
import {definition} from "../../../../../Definition";

export class controller {
	static controllerName = definition.userManagement.controllerName;
	static $inject:any[]  = [ListFactory.factoryName];

	userCount:number;

	constructor(factory:ListFactory) {
		factory.getUserCount((data) => {
			this.userCount = data;
		});
	}

}
controller.$inject.push(controller);
