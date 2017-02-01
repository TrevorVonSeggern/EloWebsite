import {BasicListFactory} from "../../../../component/baseItem/list/factory";
import {UserFactory} from "../../../userManagement/user/factory";
import {typeName} from "../typeName";

export class ListFactory extends BasicListFactory {
	static factoryName: string = typeName + 'ListFactory';

	static $inject: any[] = [UserFactory.factoryName]; // depends on the user factory

	constructor(public itemFactory: UserFactory) {
		super();
	}

	getItemCount(cb: (count) => void): void {
		this.itemFactory.httpServerCall('/api/team/size', 'get', undefined, (data) => {
			cb(data.data.size);
		});
	}

	getSelectList(resolve: (list: any[]) => void, reject: (error: string) => void) {
		this.itemFactory.httpServerCall('/api/elo/team/', 'get', undefined, (data) => {
			let list = data.data;
			let result = [];
			for (let i = 0; i < list.length; ++i) {
				result.push(new Object({label: list[i].name, value: list[i]._id}))
			}
			resolve(result);
		}, (error) => {
			reject(error);
		});
	}

	static factory() {
		let result: any[] = ListFactory.$inject;
		result.push((itemFactory: UserFactory) =>
			new ListFactory(itemFactory));
		return result;
	}
}