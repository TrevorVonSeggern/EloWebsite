import IWindowService = angular.IWindowService;
import {BaseEditItemController} from "../../../../../component/baseItem/item/edit/controller";
import {eloDefinition} from "../../../eloDefinition";
import {ListFactory} from "../../list/factory";
import * as Game from "../../../game/list/factory";
import {ItemService} from "../service";
import {UserFactory} from "../../../../userManagement/user/factory";

export class controller extends BaseEditItemController {
	static controllerName: string = eloDefinition.playerEdit.controllerName;
	static $inject: any[] = [
		'$scope',
		'$window',
		ListFactory.factoryName,
		ItemService.serviceName,
		'$stateParams',
		Game.ListFactory.factoryName, // This is for GAME, not Player.
		UserFactory.factoryName,
	];

	gameId: string;
	gameSelectList: any[] = [];
	userSelectList: any[] = [];

	constructor(public $scope, $window: IWindowService,
				public Factory: ListFactory,
				public itemFactory: ItemService,
				$stateParams,
				public gameListFactory: Game.ListFactory, userFactory: UserFactory) {
		super($window, itemFactory, $stateParams, '/#/player');
		if (this.gameId)
			this.item.gameId = this.gameId;

		this.loading = true;
		let loadingCounter = 2;

		let finishLoading = () => {
			loadingCounter--;
			if (loadingCounter === 0)
				this.loading = false;
		};

		gameListFactory.getSelectList((list) => {
			this.gameSelectList = list;
			finishLoading();
		});

		userFactory.getSelectList((list: any[]) => {
			list.unshift({label: '---', value: null});
			this.userSelectList = list;
			finishLoading();
		}, (error: string) => {
			console.log(error);
			finishLoading();
		});
	}

	deleteItem(returnUrl: string) {
		this.loading = true;
		this.itemFactory.deleteItem(this.item, () => {
			this.loading = false;
			this.cancel(returnUrl);
		}, () => {
			this.loading = false;
		});
	}
}

controller.$inject.push(controller);
