import {ItemService} from '../service';
import * as Game from '../../../game/item/service';
import {BaseDetailItemController} from 'web-angularjs-crud-base-items/item/detail/controller';
import {definition} from '../../../../definition';
import {UserFactory} from 'web-angularjs-user-factory/UserFactory';

export class controller extends BaseDetailItemController {
	static controllerName: string = definition.playerDetail.controllerName;
	static $inject: any[] = [
		'$scope',
		'$state',
		'$stateParams',
		ItemService.serviceName,
		Game.ItemService.serviceName,
		UserFactory.factoryName,
	];

	GameId: string;
	gameName: string = '';
	userFirstName: string = '';

	constructor($scope,
				$state,
				$stateParams,
				public itemService: ItemService,
				public gameItemService: Game.ItemService,
				public userFactory: UserFactory) {
		super($scope, $state, $stateParams, itemService, 'player');
		if (this.GameId)
			this.item.GameId = this.GameId;
	}

	itemLoadComplete() {
		if (this.itemIsEmpty())
			this.cancel(this.returnUrl);
		this.loading = true;
		let loadingCounter = 2;
		let finishLoading = () => {
			loadingCounter--;
			if (loadingCounter === 0)
				this.loading = false;
		};

		if (this.item.GameId) {
			this.gameItemService.getItem(this.item.GameId, (game) => {
				this.gameName = game.name;
				finishLoading();
			}, (error) => {
				finishLoading();
				console.log(error);
			});
		}
		else {
			finishLoading();
		}

		if (this.item.userId) {
			this.userFactory.getOneById(this.item.userId, (user: any) => {
				this.userFirstName = user.first_name;
				finishLoading();
			}, (error) => {
				finishLoading();
				console.log(error);
			});
		} else {
			finishLoading();
		}

	}
}
controller.$inject.push(controller);
