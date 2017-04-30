import {BasicCreateItemController} from 'web-angularjs-crud-base-items/item/create/controller';
import {MatchPlayerService} from '../matchPlayerService';

import {typeName} from '../../typeName';
import * as Event from '../../../event/list/factory';
import * as Team from '../../../team/list/factory';
import * as Player from '../../../player/list/factory';

export class controller extends BasicCreateItemController {
	static controllerName: string = typeName + 'Create-controller';
	static $inject: any[] = [
		MatchPlayerService.serviceName,
		'$stateParams', '$state',
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
		let a = new Object({PlayerId: ''});
		this.item.TeamAPlayers.push(a);
	}

	removePlayerTeamA(index: number) {
		this.item.TeamAPlayers.splice(index, 1);
	}

	addPlayerTeamB() {
		let a = new Object({PlayerId: ''});
		this.item.TeamBPlayers.push(a);
	}

	removePlayerTeamB(index: number) {
		this.item.TeamBPlayers.splice(index, 1);
	}

	constructor(public itemFactory: MatchPlayerService, $stateParams, $state,
				eventListFactory: Event.ListFactory, teamListFactory: Team.ListFactory, playerListFactory: Player.ListFactory) {
		super(itemFactory, $stateParams, $state, 'match');
		if (this.gameId)
			this.item.GameId = this.gameId;
		this.loading = true;

		this.item = {
			TeamAPlayers: [],
			TeamBPlayers: [],
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
