import {BasicListFactory} from 'web-angularjs-crud-base-items/list/factory';
import {AjaxFactory} from 'web-angularjs-user-factory/AjaxFactory';
import {typeName} from "../typeName";

export class ListFactory extends BasicListFactory {
	static factoryName: string = typeName + 'ListFactory';

	static $inject: any[] = [AjaxFactory.factoryName]; // depends on the user factory

	constructor(public itemFactory: AjaxFactory) {
		super();
	}

	getGameCount(cb: (count) => void): void {
		this.itemFactory.httpServerCall('/api/game/size', 'get', undefined, (data) => {
			cb(data.size);
		});
	}

	getSelectList(cb: (selectList) => void, fail?: (error) => void): void {
		this.itemFactory.httpServerCall('/api/game/', 'GET', undefined, (data) => {
			let list = data;
			let resultList = [];
			for (let i = 0; i < list.length; i++) {
				resultList.push(new Object({label: list[i].name, value: list[i].id}));
			}
			cb(resultList);
		}, (error) => {
			fail(error);
		});
	}

	static factory() {
		let result: any[] = ListFactory.$inject;
		result.push((itemFactory: AjaxFactory) =>
			new ListFactory(itemFactory));
		return result;
	}
}