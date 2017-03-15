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

	saveItem(item: any, cb: () => void, failCB: (data) => void) {
		this.ajaxFactory.httpServerCall('/api/player/', 'PUT', item, (response) => {
			if (response.data.error)
				return failCB && failCB(response.data);
			this.listFactory.AddedItem();
			item = response.data;
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
