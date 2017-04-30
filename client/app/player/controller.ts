import {typeName} from "./typeName";

export class controller {
	static controllerName = typeName + '-controller';
	static $inject: any[] = [];

	constructor() {
	}
}
controller.$inject.push(controller);
