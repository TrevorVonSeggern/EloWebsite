import IHttpService = angular.IHttpService;
import IWindowService = angular.IWindowService;
import IScope = angular.IScope;
import {ItemService} from '../service';
import {BaseDetailItemController} from "../../../../../component/baseItem/item/detail/controller";
import {eloDefinition} from "../../../eloDefinition";

export class controller extends BaseDetailItemController {
	static controllerName: string = eloDefinition.eventDetail.controllerName;
	static $inject: any[] = [
		'$scope',
		'$window',
		'$stateParams',
		ItemService.serviceName
	];

	constructor($scope: IScope,
				$window: IWindowService,
				$stateParams,
				public itemService: ItemService) {
		super($scope, $window, $stateParams, itemService, '/#/event');
	}
}
controller.$inject.push(controller);
