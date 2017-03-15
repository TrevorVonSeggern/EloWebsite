import {BaseEditItemController} from 'web-angularjs-crud-base-items/item/edit/controller';
import {definition} from '../../../../definition';
import {ListFactory} from '../../list/factory';
import * as Game from '../../../game/list/factory';
import {ItemService} from '../service';

export class controller extends BaseEditItemController {
	static controllerName: string = definition.teamEdit.controllerName;
	static $inject: any[] = [
		'$state',
		ListFactory.factoryName,
		ItemService.serviceName,
		'$stateParams',
		Game.ListFactory.factoryName // This is for GAME, not Team.
	];

	gameId: string;
	gameSelectList: any[] = [];

	constructor($state,
				public Factory: ListFactory,
				public itemFactory: ItemService,
				$stateParams,
				public gameListFactory: Game.ListFactory) {
		super($state, itemFactory, $stateParams, 'team');
		if (this.gameId)
			this.item.gameId = this.gameId;
		this.loading = true;
		gameListFactory.getSelectList((list) => {
			this.gameSelectList = list;
			this.loading = false;
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
