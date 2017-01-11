import {definition} from '../../../Definition';

export class controller {
	static controllerName:string = definition.labelText.controllerName;

	constructor($scope:ng.IScope) {
	}
}

controller.$inject = ['$scope'];
