import {BasicCreateItemController} from 'web-angularjs-crud-base-items/item/create/controller';
import {ItemService} from '../service';
import {typeName} from '../../typeName';

export class controller extends BasicCreateItemController {
	static controllerName: string = typeName + 'Create-controller';
	static $inject: any[] = [ItemService.serviceName, '$stateParams', '$state'];

	loading: boolean = false;

	constructor(public itemFactory: ItemService, $stateParams, $state) {
		super(itemFactory, $stateParams, $state, 'game');
	}
}
controller.$inject.push(controller);
