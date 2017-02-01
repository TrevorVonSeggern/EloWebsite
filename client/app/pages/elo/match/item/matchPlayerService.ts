// Created by trevor on 5/31/16.


import {BasicItemService} from "../../../../component/baseItem/item/service";
import {UserFactory} from "../../../userManagement/user/factory";
import {ListFactory} from "../list/factory";
import {BasicListFactory} from "../../../../component/baseItem/list/factory";
export class MatchPlayerService extends BasicItemService {

	static serviceName: string = 'match-player-item-service';
	static $inject: any[] = [UserFactory.factoryName, ListFactory.factoryName];

	constructor(userFactory: UserFactory, listFactory: BasicListFactory) {
		super(userFactory, listFactory, '/#/match', '/api/elo/match_player/');
	}

	saveItem(item: any, cb: () => void, failCB: (data) => void) {
		this.userFactory.httpServerCall('/api/elo/match_player/', 'PUT', item, (response) => {
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
		let result: any[] = MatchPlayerService.$inject;
		result.push((userFactory: UserFactory, factory: BasicListFactory) => new MatchPlayerService(userFactory, factory));
		return result;
	}
}
