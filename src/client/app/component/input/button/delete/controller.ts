import IScope = angular.IScope;

export class controller {
	static $inject:any[] = ['$scope'];

	constructor() {
	}
}
controller.$inject.push(controller);