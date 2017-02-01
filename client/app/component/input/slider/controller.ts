import IScope = angular.IScope;

class controller {
	constructor() {
	}

	static $inject: string[];
}
controller.$inject = ['$scope'];
export let InputSliderController = controller;
