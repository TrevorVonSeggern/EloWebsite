import {BaseEditItemController} from 'web-angularjs-crud-base-items/item/edit/controller';
import {ListFactory} from '../../list/factory';
import {ItemService} from '../service';
import {definition} from "../../../../definition";

export class controller extends BaseEditItemController {
	static controllerName: string = definition.gameEdit.controllerName;
	static $inject: any[] = [
		'$state',
		ListFactory.factoryName,
		ItemService.serviceName,
		'$stateParams'
	];

	constructor($state,
				public Factory: ListFactory,
				public itemFactory: ItemService,
				$stateParams) {
		super($state, itemFactory, $stateParams, 'game');
	}

	roleList = [
		{label: 'Administrator', value: 'Administrator'},
		{label: 'User', value: 'User'},
		{label: 'Guest', value: 'Guest'},
	];

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
