// Created by trevor on 5/31/16.


import {BasicItemService} from "../../../../component/baseItem/item/service";
import {UserFactory} from "../../../userManagement/user/factory";
import {ListFactory} from "../list/factory";
import {BasicListFactory} from "../../../../component/baseItem/list/factory";
export class ItemService extends BasicItemService {

	static serviceName: string = 'event-item-service';
	static $inject: any[] = [UserFactory.factoryName, ListFactory.factoryName];

	constructor(userFactory: UserFactory, listFactory: BasicListFactory) {
		super(userFactory, listFactory, '/#/event', '/api/elo/event/');
	}

	saveItem(item: any, cb: () => void, failCB: (data) => void) {
		this.userFactory.httpServerCall('/api/elo/event/', 'PUT', item, (response) => {
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
		result.push((userFactory: UserFactory, factory: BasicListFactory) => new ItemService(userFactory, factory));
		return result;
	}
}
