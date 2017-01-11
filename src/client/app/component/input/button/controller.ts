import IScope = angular.IScope;

export class controller {
	type;

	constructor(scope) {
		if (scope.type === undefined) {
			scope.type = 'button'
		}
		if (scope.label) {
			if(scope.label.charAt(0) === '\'')
				scope.label = scope.label.substr(1);
			if(scope.label.charAt(scope.label.length - 1) === '\'')
				scope.label = scope.label.substr(0, scope.label.length - 1);
		}
	}

	static $inject: string[];
}
controller.$inject = ['$scope'];
