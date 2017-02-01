import IHttpService = angular.IHttpService;
import {BasicCreateItemController} from "../../../../../component/baseItem/item/create/controller";
import {ItemService} from "../service";
import {typeName} from "../../typeName";
import {ListFactory} from "../../../game/list/factory";
import {UserFactory} from "../../../../userManagement/user/factory";

export class controller extends BasicCreateItemController {
	static controllerName: string = typeName + 'Create-controller';
	static $inject: any[] = [
		ItemService.serviceName,
		'$stateParams', '$window',
		ListFactory.factoryName, // This is for GAME, not Player.
		UserFactory.factoryName,
	];

	loading: boolean = false;
	gameId: string;
	gameSelectList: any[] = [];
	userSelectList: any[] = [];

	constructor(public itemFactory: ItemService, $stateParams, $window, gameListFactory: ListFactory, userFactory: UserFactory) {
		super(itemFactory, $stateParams, $window, '/#/player');
		if (this.gameId)
			this.item.gameId = this.gameId;
		this.item.userId = null;

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
