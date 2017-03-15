import {ItemService} from '../service';
import * as Game from '../../../game/item/service';
import {BaseDetailItemController} from 'web-angularjs-crud-base-items/item/detail/controller';
import {definition} from "../../../../definition";

export class controller extends BaseDetailItemController {
	static controllerName: string = definition.matchDetail.controllerName;
	static $inject: any[] = [
		'$scope',
		'$state',
		'$stateParams',
		ItemService.serviceName,
		Game.ItemService.serviceName,
	];

	displayVs(): string {
		if (!this.item || !this.item.teamAName || !this.item.teamBName)
			return '';
		return this.item.teamAName + ' vs ' + this.item.teamBName;
	}

	winnerText(): string {
		if (!this.item || !this.item.winner)
			return '';
		let winner = this.item.winner; // shorthand
		if (winner === 1 || winner === true || winner === 'true')
			return 'TeamA';
		return 'TeamB';
	}

	gameId: string;
	gameName: string = '';

	constructor($scope,
				$state,
				$stateParams,
				public itemService: ItemService,
				public gameItemService: Game.ItemService) {
		super($scope, $state, $stateParams, itemService, 'match');
		if (this.gameId)
			this.item.gameId = this.gameId;
	}

	itemLoadComplete() {
		if (this.itemIsEmpty())
			this.cancel(this.returnUrl);
		this.loading = true;
		this.gameItemService.getItem(this.item.gameId, (game) => {
			this.gameName = game.name;
			this.loading = false;
		}, (error) => {
			this.loading = false;
			console.log(error);
		});
	}
}
controller.$inject.push(controller);
