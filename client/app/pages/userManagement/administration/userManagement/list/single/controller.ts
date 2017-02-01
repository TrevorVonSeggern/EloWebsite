import {definition} from "../../../../../../Definition";

export class controller {

	constructor($scope) {
	}

	static controllerName:string = definition.userManagementSingleItem.controllerName;
	static $inject:any[]         = ['$scope'];
}

controller.$inject.push(controller);
