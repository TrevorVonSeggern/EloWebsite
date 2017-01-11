import IScope = angular.IScope;

class controller {
	vm:any = this;
	constructor($scope:IScope) {
		this.vm = $scope;
	}

}
controller.$inject = ['$scope'];
export var InputEmailController = controller;
