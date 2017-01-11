// Created by trevor on 5/31/16.


import {BasicItemService} from "../../../../../component/baseItem/item/service";
import {UserFactory} from "../../../user/factory";
import {ListFactory} from "../list/factory";
import {BasicListFactory} from "../../../../../component/baseItem/list/factory";

export class ItemService extends BasicItemService {

	static serviceName: string = 'user-item-factory';
	static $inject: any[] = [UserFactory.factoryName, ListFactory.factoryName];

	constructor(userFactory: UserFactory, listFactory: BasicListFactory) {
		super(userFactory, listFactory, '/#/userManagement', '/api/user/');
	}

	saveItem(item: any, cb: () => void, failCB: (data) => void) {
		if (item.password)
			item.password = this.userFactory.HashString(item.password);
		this.userFactory.httpServerCall('/api/user/', 'PUT', item, (response) => {
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
		result.push((userFactory: UserFactory, factory: BasicListFactory) =>
			new ItemService(userFactory, factory));
		return result;
	}
}
