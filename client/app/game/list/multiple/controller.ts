import {BaseMultipleController, generateGUID} from 'web-angularjs-crud-base-items/list/multiple/controller';
import {typeName} from '../../typeName';
import {AjaxFactory} from 'web-angularjs-user-factory/AjaxFactory';
import {ListFactory} from '../factory';

export class controller extends BaseMultipleController {
	static controllerName: string = typeName + 'ListMultipleController';
	static $inject: any[] = [AjaxFactory.factoryName, ListFactory.factoryName, '$state'];

	listenerGUID: string = generateGUID();

	constructor(ajaxFactory:AjaxFactory, public factory: ListFactory, $state) {
		super(ajaxFactory, $state, '/api/game');
	}
}

controller.$inject.push(controller);
