import {BaseMultipleController, generateGUID} from 'web-angularjs-crud-base-items/list/multiple/controller';
import {typeName} from '../../typeName';
import {AjaxFactory} from 'web-angularjs-user-factory/AjaxFactory';
import {ListFactory} from '../factory';

export interface IList {
	busy:boolean;
	items:any[];
	skip:number;
}

export class controller extends BaseMultipleController {

	static controllerName: string = typeName + 'ListMultipleController';
	static $inject: any[] = [AjaxFactory.factoryName, ListFactory.factoryName, '$state'];

	listenerGUID: string = generateGUID();

	gameId: string;

	list:IList;

	constructor(ajaxFactory: AjaxFactory, public factory: ListFactory, $state) {
		super(ajaxFactory, $state, '/api/player', 'player-edit');
		this.PAGE_SIZE = 5;
		this.list = {
			busy: false,
			items: [],
			skip: 0
		}
	}

	loadMore() {
		if(this.list.skip > this.list.items.length)
			return;
		this.loading = true;
		this.list.busy = true;
		this.ajaxFactory.httpServerCall(this.itemsUrl, 'GET', {
			limit: this.PAGE_SIZE,
			skip: this.list.skip,
			gameId: this.gameId
		}, (response) => {
			this.list.skip += this.PAGE_SIZE;
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
