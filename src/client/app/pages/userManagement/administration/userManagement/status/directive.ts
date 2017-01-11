import {controller} from './controller';
import {definition} from "../../../../../Definition";

export class directive {
	static directiveName:string = 'tvoUserManagementStatus';

	templateUrl:string = definition.userManagementStatus.templateUrl;
	controller         = controller.$inject;

	controllerAs:string      = 'vm';
	bindToController:boolean = true;

	scope = {};

	constructor() {

	}
}