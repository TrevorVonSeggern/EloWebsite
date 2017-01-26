import IHttpService = angular.IHttpService;
import IWindowService = angular.IWindowService;
import IScope = angular.IScope;
import {ItemService} from '../service';
import {BaseDetailItemController} from "../../../../../component/baseItem/item/detail/controller";
import {eloDefinition} from "../../../eloDefinition";
import {UserFactory} from "../../../../userManagement/user/factory";

export class controller extends BaseDetailItemController {
	static controllerName: string = eloDefinition.gameDetail.controllerName;
	static $inject: any[] = [
		'$scope',
		'$window',
		'$stateParams',
		ItemService.serviceName,
		UserFactory.factoryName,
	];

	processGame() {
		this.loading = true;
		this.userFactory.httpServerCall('/api/elo/game/process/' + this.item._id, 'get', undefined, (data) => {
			this.loading = false;
			if (data.data.error)
				console.log(data.data.message);
		}, (error) => {
			console.log(error);
			this.loading = false;
		});
	}

	constructor($scope: IScope,
				$window: IWindowService,
				$stateParams,
				public itemService: ItemService,
				public userFactory: UserFactory) {
		super($scope, $window, $stateParams, itemService, '/#/game');
	}
}
controller.$inject.push(controller);
