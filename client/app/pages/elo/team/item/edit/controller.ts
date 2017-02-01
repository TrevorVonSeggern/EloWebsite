import IWindowService = angular.IWindowService;
import {BaseEditItemController} from "../../../../../component/baseItem/item/edit/controller";
import {eloDefinition} from "../../../eloDefinition";
import {ListFactory} from "../../list/factory";
import * as Game from "../../../game/list/factory";
import {ItemService} from "../service";

export class controller extends BaseEditItemController {
	static controllerName: string = eloDefinition.teamEdit.controllerName;
	static $inject: any[] = [
		'$window',
		ListFactory.factoryName,
		ItemService.serviceName,
		'$stateParams',
		Game.ListFactory.factoryName // This is for GAME, not Team.
	];

	gameId: string;
	gameSelectList: any[] = [];

	constructor($window: IWindowService,
				public Factory: ListFactory,
				public itemFactory: ItemService,
				$stateParams,
				public gameListFactory: Game.ListFactory) {
		super($window, itemFactory, $stateParams, '/#/team');
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
