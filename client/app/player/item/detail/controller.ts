import {ItemService} from '../service';
import * as Game from '../../../game/item/service';
import {BaseDetailItemController} from 'web-angularjs-crud-base-items/item/detail/controller';
import {definition} from '../../../../definition';
import {UserFactory} from 'web-angularjs-user-factory/UserFactory';

export class controller extends BaseDetailItemController {
	static controllerName: string = definition.playerDetail.controllerName;
	static $inject: any[] = [
		'$scope',
		'$state',
		'$stateParams',
		ItemService.serviceName,
		Game.ItemService.serviceName,
		UserFactory.factoryName,
	];

	GameId: string;
	gameName: string = '';
	userFirstName: string = '';
	eloChartData: any[] = [{
		key: 'Elo Value',
		values: [
			{x: new Date('2014'), y: 0},
			{x: new Date('2015'), y: 1.1},
			{x: new Date('2016'), y: 2},
			{x: new Date('2017'), y: 0.5},
		]
	}];

	constructor($scope,
				$state,
				$stateParams,
				public itemService: ItemService,
				public gameItemService: Game.ItemService,
				public userFactory: UserFactory) {
		super($scope, $state, $stateParams, itemService, 'player');
		if (this.GameId)
			this.item.GameId = this.GameId;
	}

	itemLoadComplete() {
		this.loading = true;

		if (this.itemIsEmpty()) {
			return this.cancel(this.returnUrl);
		}

		this.itemService.getEloChart(this.item, () => {
			console.log('get elo chart success');
		}, () => {
			console.log('get elo chart failure')
		});

		let loadingCounter = 2;
		let finishLoading = () => {
			loadingCounter--;
			if (loadingCounter === 0)
				this.loading = false;
		};

		if (this.item.GameId) {
			this.gameItemService.getItem(this.item.GameId, (game) => {
				this.gameName = game.name;
				finishLoading();
			}, (error) => {
				finishLoading();
				console.log(error);
			});
		}
		else {
			finishLoading();
		}

		if (this.item.userId) {
			this.userFactory.getOneById(this.item.userId, (user: any) => {
				this.userFirstName = user.first_name;
				finishLoading();
			}, (error) => {
				finishLoading();
				console.log(error);
			});
		} else {
			finishLoading();
		}

	}
}
controller.$inject.push(controller);
