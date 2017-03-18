import {BasicCreateItemController} from 'web-angularjs-crud-base-items/item/create/controller';
import {ItemService} from '../service';
import {typeName} from '../../typeName';
import {ListFactory} from '../../../game/list/factory';

export class controller extends BasicCreateItemController {
	static controllerName: string = typeName + 'Create-controller';
	static $inject: any[] = [
		ItemService.serviceName,
		'$stateParams', '$state',
		ListFactory.factoryName, // This is for GAME, not Team.
	];

	loading: boolean = false;
	GameId: string;
	gameSelectList: any[] = [];

	constructor(public itemFactory: ItemService, $stateParams, $state, gameListFactory: ListFactory) {
		super(itemFactory, $stateParams, $state, 'team');
		if (this.GameId)
			this.item.GameId = this.GameId;
		this.loading = true;

		let allLoading: boolean = false;
		gameListFactory.getSelectList((list) => {
			this.gameSelectList = list;
			this.loading = false;
		});
	}
}
controller.$inject.push(controller);
