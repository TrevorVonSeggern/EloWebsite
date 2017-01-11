import IHttpService = angular.IHttpService;
import {BasicCreateItemController} from "../../../../../component/baseItem/item/create/controller";
import {ItemService} from "../service";
import {typeName} from "../../typeName";

export class controller extends BasicCreateItemController {
	static controllerName: string = typeName + 'Create-controller';
	static $inject: any[] = [ItemService.serviceName, '$stateParams', '$window'];

	loading: boolean = false;

	constructor(public itemFactory: ItemService, $stateParams, $window) {
		super(itemFactory, $stateParams, $window, '/#/game');
	}
}
controller.$inject.push(controller);
