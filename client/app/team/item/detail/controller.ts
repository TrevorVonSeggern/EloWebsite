import {ItemService} from '../service';
import * as Game from '../../../game/item/service';
import {BaseDetailItemController} from 'web-angularjs-crud-base-items/item/detail/controller';
import {definition} from '../../../../definition';

export class controller extends BaseDetailItemController {
	static controllerName: string = definition.teamDetail.controllerName;
	static $inject: any[] = [
		'$scope',
		'$state',
		'$stateParams',
		ItemService.serviceName,
		Game.ItemService.serviceName,
	];

	GameId: string;
	GameName: string = '';

	constructor($scope,
				$state,
				$stateParams,
				public itemService: ItemService,
				public gameItemService: Game.ItemService) {
		super($scope, $state, $stateParams, itemService, 'team');
		if (this.GameId)
			this.item.GameId = this.GameId;
	}

	itemLoadComplete() {
		if (this.itemIsEmpty())
			this.cancel(this.returnUrl);
		this.loading = true;
		if (this.item.GameId != null)
			this.gameItemService.getItem(this.item.GameId, (game) => {
				this.GameName = game.name;
				this.loading = false;
			}, (error) => {
				this.loading = false;
				console.log(error);
			});
		else
			this.loading = false;
	}
}
controller.$inject.push(controller);
