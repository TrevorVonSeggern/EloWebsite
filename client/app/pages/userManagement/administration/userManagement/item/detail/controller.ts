import {BaseDetailItemController} from "../../../../../../component/baseItem/item/detail/controller";
import {definition} from "../../../../../../Definition";
import {ItemService} from "../service";

export class controller extends BaseDetailItemController {
	static controllerName: string = definition.userManagementDetail.controllerName;
	static $inject: any[] = [
		'$scope',
		'$window',
		'$stateParams',
		ItemService.serviceName
	];

	constructor($scope,
				$window,
				$stateParams,
				public itemService: ItemService) {
		super($scope, $window, $stateParams, itemService, '/#/administration/userManagement');
	}
}
controller.$inject.push(controller);
