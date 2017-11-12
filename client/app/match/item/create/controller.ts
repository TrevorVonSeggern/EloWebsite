import {BasicCreateItemController} from 'web-angularjs-crud-base-items/item/create/controller';
import {MatchPlayerService} from '../matchPlayerService';

import {typeName} from '../../typeName';
import * as Event from '../../../event/list/factory';
import * as Team from '../../../team/list/factory';
import * as Player from '../../../player/list/factory';
import {isNullOrUndefined} from "util";

export class controller extends BasicCreateItemController {
	static controllerName: string = typeName + 'Create-controller';
	static $inject: any[] = [
		'$scope',
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

	constructor(public scope, public itemFactory: MatchPlayerService, $stateParams, $state,
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
			if (loadingCount === 0) {
				this.loading = false;

				scope.$watch('vm.item.startTime', (value, old) => {
					if ((this.item.endTime == null || this.item.endTime == undefined) || this.item.endTime == old)
						this.item.endTime = value;
				}, true);

				// On non dirty model, initialize the team players to a good guess.
				scope.$watch('vm.item.TeamAId', (teamId) => {
					if(teamId == undefined || this.item.TeamAPlayers.length != 0)
						return;
					// Get a list of players to add to TeamAPlayers
					itemFactory.getPlayerListForTeam(teamId, this.item.endTime, (playerIds) => {
						this.item.TeamAPlayers = [];
						for (let i = 0; i < playerIds.length; ++i) {
							this.item.TeamAPlayers.push({PlayerId: playerIds[i]})
						}
					}, (error) => console.log(error));
				}, true);

				// On non dirty model, initialize the team players to a good guess.
				scope.$watch('vm.item.TeamBId', (teamId) => {
					if(teamId == undefined || this.item.TeamBPlayers.length != 0)
						return;
					// Get a list of players to add to TeamAPlayers
					itemFactory.getPlayerListForTeam(teamId, this.item.endTime, (playerIds) => {
						this.item.TeamBPlayers = [];
						for (let i = 0; i < playerIds.length; ++i) {
							this.item.TeamBPlayers.push({PlayerId: playerIds[i]})
						}
					}, (error) => console.log(error));
				}, true);

				// Set the event Id to first in the list.
				if(this.eventSelectList.length > 0)
					this.item.EventId = this.eventSelectList[0].value;
				this.item.winner = true;
			}
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
