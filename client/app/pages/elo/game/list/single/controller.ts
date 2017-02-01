import {typeName} from "../../typeName";

export class controller {

	constructor() {
	}

	static controllerName:string = typeName + 'ListSingleController';
	static $inject:any[]         = ['$scope'];
}

controller.$inject.push(controller);
