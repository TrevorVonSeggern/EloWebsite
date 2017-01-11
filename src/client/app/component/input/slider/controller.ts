import IScope = angular.IScope;

class controller {
	constructor(public $scope:any) {
		$scope.vm = this;
	}

	static $inject:string[];
}
controller.$inject               = ['$scope'];
export var InputSliderController = controller;
