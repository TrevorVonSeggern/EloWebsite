import IHttpService = angular.IHttpService;
import {ItemService} from '../service';
import {BasicCreateItemController} from "../../../../../../component/baseItem/item/create/controller";
import {definition} from "../../../../../../Definition";

export class controller extends BasicCreateItemController {
	static controllerName:string = definition.userManagementCreate.controllerName;
	static $inject:any[]         = [ItemService.serviceName, '$stateParams', '$window'];

	loading:boolean = false;

	constructor(public itemFactory:ItemService, $stateParams, $window) {
		super(itemFactory, $stateParams, $window, '/#/userManagement');
	}

	roleList = [
		{label: 'Administrator', value: 'Administrator'},
		{label: 'User', value: 'User'},
		{label: 'Guest', value: 'guest'},
	];

}
controller.$inject.push(controller);
