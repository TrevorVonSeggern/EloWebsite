import {BasicListFactory} from "../../../../component/baseItem/list/factory";
import {UserFactory} from "../../../userManagement/user/factory";
import {typeName} from "../typeName";

export class ListFactory extends BasicListFactory {
	static factoryName: string = typeName + 'ListFactory';

	static $inject: any[] = [UserFactory.factoryName]; // depends on the user factory

	constructor(public itemFactory: UserFactory) {
		super();
	}

	getGameCount(cb: (count) => void): void {
		this.itemFactory.httpServerCall('/api/game/size', 'get', undefined, (data) => {
			cb(data.data.size);
		});
	}

	getSelectList(cb: (selectList) => void, fail?: (error) => void): void {
		this.itemFactory.httpServerCall('/api/elo/game/', 'GET', undefined, (data) => {
			let list = data.data;
			let resultList = [];
			for (let i = 0; i < list.length; i++) {
				resultList.push(new Object({label: list[i].name, value: list[i]._id}));
			}
			cb(resultList);
		}, (error) => {
			fail(error);
		});
	}

	static factory() {
		let result: any[] = ListFactory.$inject;
		result.push((itemFactory: UserFactory) =>
			new ListFactory(itemFactory));
		return result;
	}
}