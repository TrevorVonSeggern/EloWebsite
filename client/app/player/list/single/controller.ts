import {typeName} from "../../typeName";

export class controller {

	constructor($scope) {
	}

	static controllerName:string = typeName + 'ListSingleController';
	static $inject:any[]         = ['$scope'];
}

controller.$inject.push(controller);
