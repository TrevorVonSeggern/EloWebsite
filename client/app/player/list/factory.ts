import {BasicListFactory} from 'web-angularjs-crud-base-items/list/factory';
import {AjaxFactory} from 'web-angularjs-user-factory/AjaxFactory';
import {typeName} from '../typeName';

export class ListFactory extends BasicListFactory {
	static factoryName: string = typeName + 'ListFactory';

	static $inject: any[] = [AjaxFactory.factoryName]; // depends on the user factory

	constructor(public itemFactory: AjaxFactory) {
		super();
	}

	getItemCount(cb: (count) => void): void {
		this.itemFactory.httpServerCall('/api/player/size', 'get', undefined, (data) => {
			cb(data.size);
		});
	}

	getSelectList(resolve: (list: any[]) => void, reject: (error: string) => void) {
		this.itemFactory.httpServerCall('/api/player/', 'get', undefined, (data) => {
			let list = data;
			let result = [];
			for (let i = 0; i < list.length; ++i) {
				result.push(new Object({label: list[i].name, value: list[i].id}))
			}
			resolve(result);
		}, (error) => {
			reject(error);
		});
	}

	static factory() {
		let result: any[] = ListFactory.$inject;
		result.push((itemFactory: AjaxFactory) =>
			new ListFactory(itemFactory));
		return result;
	}
}