import IScope = angular.IScope;

class controller {
	isOpen: boolean = false;

	openCalendar = function (e) {
		e.preventDefault();
		e.stopPropagation();

		this.isOpen = true;
	};

	constructor() {
	}

}
controller.$inject = ['$scope'];
export let InputDatetimeController = controller;
