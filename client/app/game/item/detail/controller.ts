import {ItemService} from '../service';
import {BaseDetailItemController} from 'web-angularjs-crud-base-items/item/detail/controller';
import {AjaxFactory} from 'web-angularjs-user-factory/AjaxFactory';
import {definition} from '../../../../definition';

export class controller extends BaseDetailItemController {
	static controllerName: string = definition.gameDetail.controllerName;
	static $inject: any[] = [
		'$scope',
		'$state',
		'$stateParams',
		ItemService.serviceName,
		AjaxFactory.factoryName,
	];

	processGame() {
		this.loading = true;
		this.ajaxFactory.httpServerCall('/api/game/process/' + this.item._id, 'get', undefined, (data) => {
			this.loading = false;
			if (data.data.error)
				console.log(data.data.message);
		}, (error) => {
			console.log(error);
			this.loading = false;
		});
	}

	constructor($scope,
				$state,
				$stateParams,
				public itemService: ItemService,
				public ajaxFactory: AjaxFactory) {
		super($scope, $state, $stateParams, itemService, 'game');
	}
}
controller.$inject.push(controller);
