import {BasicCreateItemController} from 'web-angularjs-crud-base-items/item/create/controller';
import {ItemService} from '../service';
import {typeName} from '../../typeName';
import {ListFactory} from '../../../game/list/factory';
import {UserFactory} from 'web-angularjs-user-factory/UserFactory';

export class controller extends BasicCreateItemController {
	static controllerName: string = typeName + 'Create-controller';
	static $inject: any[] = [
		ItemService.serviceName,
		'$stateParams', '$state',
		ListFactory.factoryName, // This is for GAME, not Player.
		UserFactory.factoryName,
	];

	loading: boolean = false;
	GameId: string;
	gameSelectList: any[] = [];
	userSelectList: any[] = [];

	constructor(public itemFactory: ItemService, $stateParams, $state, gameListFactory: ListFactory, userFactory: UserFactory) {
		super(itemFactory, $stateParams, $state, 'player');
		if (this.GameId)
			this.item.GameId = this.GameId;
		this.item.UserId = null;

		this.loading = true;

		let loadingCounter = 1;
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
}
controller.$inject.push(controller);
