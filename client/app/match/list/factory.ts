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
		this.itemFactory.httpServerCall('/api/match/size', 'get', undefined, (data) => {
			cb(data.size);
		});
	}

	static factory() {
		let result: any[] = ListFactory.$inject;
		result.push((itemFactory: AjaxFactory) =>
			new ListFactory(itemFactory));
		return result;
	}
}