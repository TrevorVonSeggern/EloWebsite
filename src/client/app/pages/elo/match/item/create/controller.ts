import IHttpService = angular.IHttpService;
import {BasicCreateItemController} from "../../../../../component/baseItem/item/create/controller";
import {ItemService} from "../service";
import {typeName} from "../../typeName";
import * as Event from "../../../event/list/factory";
import * as Team from "../../../team/list/factory";

export class controller extends BasicCreateItemController {
	static controllerName: string = typeName + 'Create-controller';
	static $inject: any[] = [
		ItemService.serviceName,
		'$stateParams', '$window',
		Event.ListFactory.factoryName,
		Team.ListFactory.factoryName,
	];

	loading: boolean = false;
	gameId: string;
	gameSelectList: any[] = [];
	teamSelectList: any[];
	eventSelectList: any[];

	constructor(public itemFactory: ItemService, $stateParams, $window,
				eventListFactory: Event.ListFactory, teamListFactory: Team.ListFactory) {
		super(itemFactory, $stateParams, $window, '/#/match');
		if (this.gameId)
			this.item.gameId = this.gameId;
		this.loading = true;

		let loadingCount: number = 2;
		let finished = () => {
			loadingCount--;
			if (loadingCount === 0)
				this.loading = false;
		};

		eventListFactory.getSelectList((list) => {
			this.eventSelectList = list;
			finished();
		}, (error) => {
			finished();
			console.log(error);
		});
		teamListFactory.getSelectList((list) => {
			this.teamSelectList = list;
			finished();
		}, (error) => {
			finished();
			console.log(error);
		});
	}
}
controller.$inject.push(controller);
