import IWindowService = angular.IWindowService;
import {BaseEditItemController} from "../../../../../component/baseItem/item/edit/controller";
import {eloDefinition} from "../../../eloDefinition";
import {ListFactory} from "../../list/factory";
import * as Game from "../../../game/list/factory";
import {ItemService} from "../service";

export class controller extends BaseEditItemController {
	static controllerName: string = eloDefinition.eventEdit.controllerName;
	static $inject: any[] = [
		'$window',
		ListFactory.factoryName,
		ItemService.serviceName,
		'$stateParams',
		Game.ListFactory.factoryName // This is for GAME, not Event.
	];

	gameId: string;
	gameSelectList: any[] = [];

	constructor($window: IWindowService,
				public Factory: ListFactory,
				public itemFactory: ItemService,
				$stateParams,
				public gameListFactory: Game.ListFactory) {
		super($window, itemFactory, $stateParams, '/#/event');
		if (this.gameId)
			this.item.gameId = this.gameId;
		this.loading = true;
		gameListFactory.getGameSelectList((list) => {
			let resultList = [];
			for (let i = 0; i < list.length; i++) {
				resultList.push(new Object({label: list[i].name, value: list[i]._id}));
			}
			this.gameSelectList = resultList;
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
