import {BaseMultipleController, generateGUID} from 'web-angularjs-crud-base-items/list/multiple/controller';
import {typeName} from '../../typeName';
import {AjaxFactory} from 'web-angularjs-user-factory/AjaxFactory';
import {ListFactory} from '../factory';

export interface IList {
	busy: boolean;
	items: any[];
	skip: number;
}

export class controller extends BaseMultipleController {

	static controllerName: string = typeName + 'ListMultipleController';
	static $inject: any[] = [AjaxFactory.factoryName, ListFactory.factoryName, '$state'];

	list: IList;

	constructor(ajaxFactory: AjaxFactory, public factory: ListFactory, $state) {
		super(ajaxFactory, $state, '/api/match_player/view');
		this.PAGE_SIZE = 20;
		this.list = {
			skip: 0,
			busy: false,
			items: []
		};
	}

	listenerGUID: string = generateGUID();

	gameId: string;

	loadMore() {
		if (this.list.skip > this.list.items.length)
			return;
		this.loading = true;
		this.list.busy = true;
		this.list.skip += this.PAGE_SIZE;
		this.ajaxFactory.httpServerCall(this.itemsUrl, 'GET', {
			limit: this.PAGE_SIZE,
			skip: this.list.skip - this.PAGE_SIZE,
			gameId: this.gameId
		}, (response) => {
			let nItems = response;
			for (let i: number = 0; i < nItems.length; ++i) {
				this.list.items.push(nItems[i]);
			}
			this.loading = false;
			this.list.busy = false;
		});
	}

}

controller.$inject.push(controller);
