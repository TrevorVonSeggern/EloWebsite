import IWindowService = angular.IWindowService;
import {ItemService} from '../service';
import {ListFactory} from '../../list/factory';
import {BaseEditItemController} from "../../../../../../component/baseItem/item/edit/controller";
import {definition} from "../../../../../../Definition";

export class controller extends BaseEditItemController {
	static controllerName: string = definition.userManagementEdit.controllerName;
	static $inject: any[] = [
		'$window',
		ListFactory.factoryName,
		ItemService.serviceName,
		'$stateParams'
	];

	constructor($window: IWindowService,
				public Factory: ListFactory,
				public itemFactory: ItemService,
				$stateParams) {
		super($window, itemFactory, $stateParams, '/#/userManagement');
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
