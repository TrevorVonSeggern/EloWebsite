
import {definition} from "../../../Definition";
export class AdministrationController {
	static controllerName = definition.administration.controllerName;
	static $inject:any[]  = ['$scope'];

	constructor() {
	}

}
AdministrationController.$inject.push(AdministrationController);

