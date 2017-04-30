import {BaseEditItemController} from 'web-angularjs-crud-base-items/item/edit/controller';
import {definition} from '../../../../definition';
import {ListFactory} from '../../list/factory';
import * as Game from '../../../game/list/factory';
import {ItemService} from '../service';
import {UserFactory} from 'web-angularjs-user-factory/UserFactory';

export class controller extends BaseEditItemController {
	static controllerName: string = definition.playerEdit.controllerName;
	static $inject: any[] = [
		'$scope',
		'$state',
		ListFactory.factoryName,
		ItemService.serviceName,
		'$stateParams',
		Game.ListFactory.factoryName, // This is for GAME, not Player.
		UserFactory.factoryName,
	];

	GameId: string;
	gameSelectList: any[] = [];
	userSelectList: any[] = [];

	constructor(public $scope, $state,
				public Factory: ListFactory,
				public itemFactory: ItemService,
				$stateParams,
				public gameListFactory: Game.ListFactory, userFactory: UserFactory) {
		super($state, itemFactory, $stateParams, 'player');
		if (this.GameId)
			this.item.GameId = this.GameId;

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
