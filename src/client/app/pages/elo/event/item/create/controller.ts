import IHttpService = angular.IHttpService;
import {BasicCreateItemController} from "../../../../../component/baseItem/item/create/controller";
import {ItemService} from "../service";
import {typeName} from "../../typeName";
import {ListFactory} from "../../../game/list/factory";

export class controller extends BasicCreateItemController {
	static controllerName: string = typeName + 'Create-controller';
	static $inject: any[] = [
		ItemService.serviceName,
		'$stateParams', '$window',
		ListFactory.factoryName // This is for GAME, not Event.
	];

	loading: boolean = false;
	gameSelectList: any[] = [];

	constructor(public itemFactory: ItemService, $stateParams, $window, gameListFactory: ListFactory) {
		super(itemFactory, $stateParams, $window, '/#/event');
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
}
controller.$inject.push(controller);
