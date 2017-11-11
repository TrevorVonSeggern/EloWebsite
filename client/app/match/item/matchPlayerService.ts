import {BasicItemService} from 'web-angularjs-crud-base-items/item/service';
import {AjaxFactory} from 'web-angularjs-user-factory/AjaxFactory';
import {ListFactory} from "../list/factory";
import {BasicListFactory} from 'web-angularjs-crud-base-items/list/factory';
export class MatchPlayerService extends BasicItemService {

	static serviceName: string = 'match-player-item-service';
	static $inject: any[] = [AjaxFactory.factoryName, ListFactory.factoryName];

	constructor(ajaxFactory: AjaxFactory, listFactory: BasicListFactory) {
		super(ajaxFactory, listFactory, '/api/match_player/');
	}


	saveItem(item: any, cb: (item) => void, failCB?: (data) => void): void {
		this.ajaxFactory.httpServerCall('/api/match_player/', 'PUT', item, (response) => {
			if (response.error)
				return failCB && failCB(response);
			this.listFactory.AddedItem();
			item = response;
			cb && cb(item);
		}, () => {
			failCB && failCB(undefined);
		});
	}

	static Service() {
		let result: any[] = MatchPlayerService.$inject;
		result.push((factory: AjaxFactory, listFactory: BasicListFactory) => new MatchPlayerService(factory, listFactory));
		return result;
	}
}
