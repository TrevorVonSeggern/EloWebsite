import {definition} from '../../Definition';

export class HomeController {
	static controllerName = definition.home.controllerName;
	static $inject:any[]  = ['$scope'];

	name:string;

	constructor($scope:any) {

		this.name = "Home Template";
		$scope.vm = this;
	}

}
HomeController.$inject.push(HomeController);

