import IHttpService = angular.IHttpService;
import {BasicCreateItemController} from "../../../../../component/baseItem/item/create/controller";
import {MatchPlayerService} from "../matchPlayerService";

import {typeName} from "../../typeName";
import * as Event from "../../../event/list/factory";
import * as Team from "../../../team/list/factory";
import * as Player from "../../../player/list/factory";

export class controller extends BasicCreateItemController {
	static controllerName: string = typeName + 'Create-controller';
	static $inject: any[] = [
		MatchPlayerService.serviceName,
		'$stateParams', '$window',
		Event.ListFactory.factoryName,
		Team.ListFactory.factoryName,
		Player.ListFactory.factoryName,
	];

	loading: boolean = false;
	gameId: string;
	gameSelectList: any[] = [];
	teamSelectList: any[];
	eventSelectList: any[];
	playerSelectList: any[] = [];

	addPlayerTeamA() {
		let a = new Object({playerId: ''});
		this.item.teamAPlayers.push(a);
	}

	removePlayerTeamA(index: number) {
		this.item.teamAPlayers.splice(index, 1);
	}

	addPlayerTeamB() {
		let a = new Object({playerId: ''});
		this.item.teamBPlayers.push(a);
	}

	removePlayerTeamB(index: number) {
		this.item.teamBPlayers.splice(index, 1);
	}

	constructor(public itemFactory: MatchPlayerService, $stateParams, $window,
				eventListFactory: Event.ListFactory, teamListFactory: Team.ListFactory, playerListFactory: Player.ListFactory) {
		super(itemFactory, $stateParams, $window, '/#/match');
		if (this.gameId)
			this.item.gameId = this.gameId;
		this.loading = true;

		this.item = {
			teamAPlayers: [],
			teamBPlayers: [],
		};

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
}
controller.$inject.push(controller);
