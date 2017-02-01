import {BasicCreateItemController} from "../../../../../component/baseItem/item/create/controller";
import {ItemService} from "../service";
import {typeName} from "../../typeName";
import {ListFactory} from "../../../game/list/factory";

export class controller extends BasicCreateItemController {
	static controllerName: string = typeName + 'Create-controller';
	static $inject: any[] = [
		ItemService.serviceName,
		'$stateParams', '$window',
		ListFactory.factoryName, // This is for GAME, not Team.
	];

	loading: boolean = false;
	gameId: string;
	gameSelectList: any[] = [];

	constructor(public itemFactory: ItemService, $stateParams, $window, gameListFactory: ListFactory) {
		super(itemFactory, $stateParams, $window, '/#/team');
		if (this.gameId)
			this.item.gameId = this.gameId;
		this.loading = true;

		let allLoading: boolean = false;
		gameListFactory.getSelectList((list) => {
			this.gameSelectList = list;
			this.loading = false;
		});
	}
}
controller.$inject.push(controller);