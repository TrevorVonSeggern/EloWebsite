import {BasicItemService} from 'web-angularjs-crud-base-items/item/service';
import {AjaxFactory} from 'web-angularjs-user-factory/AjaxFactory';
import {ListFactory} from '../list/factory';
import {BasicListFactory} from 'web-angularjs-crud-base-items/list/factory';
export class ItemService extends BasicItemService {

	static serviceName: string = 'player-item-service';
	static $inject: any[] = [AjaxFactory.factoryName, ListFactory.factoryName];

	constructor(ajaxFactory: AjaxFactory, listFactory: BasicListFactory) {
		super(ajaxFactory, listFactory, '/api/player/');
	}

	getEloChart(item, cb, failCB) {
		this.ajaxFactory.httpServerCall('/api/player/' + item.id + '/elo', 'GET', undefined, (response) => {
			if (response.error)
				return failCB && failCB(response);
			if (response.length === 0 || !response[0].values || !response[0].values.length)
				return cb();
			for (let i = 0; i < response[0].values.length; ++i) {
				response[0].values[i].x = new Date(response[0].values[i].x);
			}
			item.eloChartData = response;
			cb && cb();
		}, () => {
			failCB && failCB(undefined);
		});
	}

	saveItem(item: any, cb: () => void, failCB: (data) => void) {
		this.ajaxFactory.httpServerCall('/api/player/', 'PUT', item, (response) => {
			if (response.error)
				return failCB && failCB(response);
			this.listFactory.AddedItem();
			item = response;
			cb && cb();
		}, () => {
			failCB && failCB(undefined);
		});
	}

	static Service() {
		let result: any[] = ItemService.$inject;
		result.push((ajaxFactory: AjaxFactory, factory: BasicListFactory) => new ItemService(ajaxFactory, factory));
		return result;
	}
}
