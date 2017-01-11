import IScope = angular.IScope;

class controller {
	vm:any;

	constructor($scope:IScope) {
		this.vm = $scope;
	}
}
controller.$inject = ['$scope'];

export var InputPhoneController = controller;