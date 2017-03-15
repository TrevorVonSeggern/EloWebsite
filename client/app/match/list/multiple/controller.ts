import {BaseMultipleController, generateGUID} from 'web-angularjs-crud-base-items/list/multiple/controller';
import {typeName} from '../../typeName';
import {AjaxFactory} from 'web-angularjs-user-factory/AjaxFactory';
import {ListFactory} from '../factory';

export class controller extends BaseMultipleController {

	static controllerName: string = typeName + 'ListMultipleController';
	static $inject: any[] = [AjaxFactory.factoryName, ListFactory.factoryName, '$state'];


	constructor(ajaxFactory:AjaxFactory, public factory: ListFactory, $state) {
		super(ajaxFactory, $state, '/api/match');
	}

	listenerGUID: string = generateGUID();

	gameId: string;

	loadMore() {
		this.loading = true;
		this.ajaxFactory.httpServerCall(this.itemsUrl, 'GET', {
			limit: this.PAGE_SIZE,
			skip: this.items.length,
			gameId: this.gameId
		}, (response) => {
			let nItems = response;
			for (let i: number = 0; i < nItems.length; ++i) {
				this.items.push(nItems[i]);
			}
			this.loading = false;
		});
	}

}

controller.$inject.push(controller);
