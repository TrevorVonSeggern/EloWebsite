import IHttpService = angular.IHttpService;
import IWindowService = angular.IWindowService;
import IScope = angular.IScope;
import {ItemService} from '../service';
import * as Game from '../../../game/item/service';
import {BaseDetailItemController} from "../../../../../component/baseItem/item/detail/controller";
import {eloDefinition} from "../../../eloDefinition";

export class controller extends BaseDetailItemController {
	static controllerName: string = eloDefinition.eventDetail.controllerName;
	static $inject: any[] = [
		'$scope',
		'$window',
		'$stateParams',
		ItemService.serviceName,
		Game.ItemService.serviceName,
	];

	gameId: string;
	gameName: string = '';

	constructor($scope: IScope,
				$window: IWindowService,
				$stateParams,
				public itemService: ItemService,
				public gameItemService: Game.ItemService) {
		super($scope, $window, $stateParams, itemService, '/#/event');
		if (this.gameId)
			this.item.gameId = this.gameId;
	}

	itemLoadComplete() {
		if (this.itemIsEmpty())
			this.cancel(this.returnUrl);
		this.loading = true;
		this.gameItemService.getItem(this.item.gameId, (game) => {
			this.gameName = game.name;
			this.loading = false;
		}, (error) => {
			this.loading = false;
			console.log(error);
		});
	}
}
controller.$inject.push(controller);
