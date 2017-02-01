import IHttpService = angular.IHttpService;
import IWindowService = angular.IWindowService;
import IScope = angular.IScope;
import {ItemService} from '../service';
import * as Game from '../../../game/item/service';
import {BaseDetailItemController} from "../../../../../component/baseItem/item/detail/controller";
import {eloDefinition} from "../../../eloDefinition";
import {UserFactory} from "../../../../userManagement/user/factory";

export class controller extends BaseDetailItemController {
	static controllerName: string = eloDefinition.playerDetail.controllerName;
	static $inject: any[] = [
		'$scope',
		'$window',
		'$stateParams',
		ItemService.serviceName,
		Game.ItemService.serviceName,
		UserFactory.factoryName,
	];

	gameId: string;
	gameName: string = '';
	userFirstName: string = '';

	constructor($scope: IScope,
				$window: IWindowService,
				$stateParams,
				public itemService: ItemService,
				public gameItemService: Game.ItemService,
				public userFactory: UserFactory) {
		super($scope, $window, $stateParams, itemService, '/#/player');
		if (this.gameId)
			this.item.gameId = this.gameId;
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
		this.gameItemService.getItem(this.item.gameId, (game) => {
			this.gameName = game.name;
			finishLoading();
		}, (error) => {
			finishLoading();
			console.log(error);
		});
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
