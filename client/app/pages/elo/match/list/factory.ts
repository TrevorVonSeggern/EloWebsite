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
		this.itemFactory.httpServerCall('/api/match/size', 'get', undefined, (data) => {
			cb(data.data.size);
		});
	}

	static factory() {
		let result: any[] = ListFactory.$inject;
		result.push((itemFactory: UserFactory) =>
			new ListFactory(itemFactory));
		return result;
	}
}