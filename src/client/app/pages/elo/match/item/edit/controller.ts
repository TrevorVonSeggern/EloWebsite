import IWindowService = angular.IWindowService;
import {BaseEditItemController} from "../../../../../component/baseItem/item/edit/controller";
import {eloDefinition} from "../../../eloDefinition";
import {ListFactory} from "../../list/factory";
import * as Event from "../../../event/list/factory";
import * as Team from "../../../team/list/factory";
import * as Player from "../../../player/list/factory";
import {ItemService} from "../service";

export class controller extends BaseEditItemController {
	static controllerName: string = eloDefinition.matchEdit.controllerName;
	static $inject: any[] = [
		'$window',
		ListFactory.factoryName,
		ItemService.serviceName,
		'$stateParams',
		Event.ListFactory.factoryName,
		Player.ListFactory.factoryName,
		Team.ListFactory.factoryName,
	];

	gameId: string;
	eventSelectList: any[] = [];
	teamSelectList: any[] = [];
	playerSelectList: any[] = [];

	teamAPlayers = [];
	teamBPlayers = [];
	a = 0;

	addPlayerTeamA() {
		let a = new Object({id: ''});
		this.teamAPlayers.push(a);
	}

	removePlayerTeamA(index: number) {
		this.teamAPlayers.splice(index, 1);
	}

	addPlayerTeamB() {
		let a = new Object({id: ''});
		this.teamBPlayers.push(a);
	}

	removePlayerTeamB(index: number) {
		this.teamBPlayers.splice(index, 1);
	}
	constructor($window: IWindowService,
				public Factory: ListFactory,
				public itemFactory: ItemService,
				$stateParams,
				public eventListFactory: Event.ListFactory,
				public playerListFactory: Player.ListFactory,
				public teamListFactory: Team.ListFactory) {
		super($window, itemFactory, $stateParams, '/#/match');
		if (this.gameId)
			this.item.gameId = this.gameId;

		let loadingCount: number = 3;
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
		playerListFactory.getSelectList((list) => {
			this.playerSelectList = list;
			finished();
		}, (error) => {
			finished();
			console.log(error);
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
