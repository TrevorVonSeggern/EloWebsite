import {ItemService} from '../service';
import * as Game from '../../../game/item/service';
import {BaseDetailItemController} from 'web-angularjs-crud-base-items/item/detail/controller';
import {definition} from "../../../../definition";

export class controller extends BaseDetailItemController {
	static controllerName: string = definition.eventDetail.controllerName;
	static $inject: any[] = [
		'$scope',
		'$state',
		'$stateParams',
		ItemService.serviceName,
		Game.ItemService.serviceName,
	];

	GameId: string;
	gameName: string = '';

	constructor($scope,
				$state,
				$stateParams,
				public itemService: ItemService,
				public gameItemService: Game.ItemService) {
		super($scope, $state, $stateParams, itemService, 'event');
		if (this.GameId)
			this.item.GameId = this.GameId;
	}

	itemLoadComplete() {
		if (this.itemIsEmpty())
			this.cancel(this.returnUrl);
		this.loading = true;
		this.gameItemService.getItem(this.item.GameId, (game) => {
			this.gameName = game.name;
			this.loading = false;
		}, (error) => {
			this.loading = false;
			console.log(error);
		});
	}
}
controller.$inject.push(controller);
