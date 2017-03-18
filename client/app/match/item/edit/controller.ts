import {BaseEditItemController} from 'web-angularjs-crud-base-items/item/edit/controller';
import {ListFactory} from '../../list/factory';
import * as Event from '../../../event/list/factory';
import * as Team from '../../../team/list/factory';
import * as Player from '../../../player/list/factory';
import {MatchPlayerService} from '../matchPlayerService';
import {definition} from "../../../../definition";

export class controller extends BaseEditItemController {
	static controllerName: string = definition.matchEdit.controllerName;
	static $inject: any[] = [
		'$state',
		ListFactory.factoryName,
		MatchPlayerService.serviceName,
		'$stateParams',
		Event.ListFactory.factoryName,
		Player.ListFactory.factoryName,
		Team.ListFactory.factoryName,
	];

	gameId: string;
	eventSelectList: any[] = [];
	teamSelectList: any[] = [];
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

	protected itemLoadComplete() {
		this.item.TeamAPlayers = this.item.TeamAPlayers || [];
		this.item.TeamBPlayers = this.item.TeamBPlayers || [];
	}

	constructor($state,
				public Factory: ListFactory,
				public itemFactory: MatchPlayerService,
				$stateParams,
				public eventListFactory: Event.ListFactory,
				public playerListFactory: Player.ListFactory,
				public teamListFactory: Team.ListFactory) {
		super($state, itemFactory, $stateParams, 'match');
		if (this.gameId)
			this.item.GameId = this.gameId;

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
