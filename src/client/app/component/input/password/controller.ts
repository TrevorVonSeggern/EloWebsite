class controller {
	vm:any;

	constructor($scope:ng.IScope) {
		this.vm = $scope;
		setTimeout(() => {
			$scope.$apply();
		}, 1000);
	}
}

controller.$inject = ['$scope'];

export var InputPasswordController = controller;