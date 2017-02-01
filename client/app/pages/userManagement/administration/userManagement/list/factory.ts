import {BasicListFactory} from "../../../../../component/baseItem/list/factory";
import {definition} from "../../../../../Definition";
import {UserFactory} from "../../../user/factory";
/**
 * Created by trevor on 7/21/2016.
 */

export class ListFactory extends BasicListFactory {
	static factoryName:string = definition.userManagement.factoryName;
	static $inject:any[]      = [UserFactory.factoryName];

	constructor(public userFactory:UserFactory) {
		super();
	}

	getUserCount(cb:(count)=>void):void {
		this.userFactory.httpServerCall('/api/user/size', 'get', undefined, (data) => {
			cb(data.data.size);
		});
	}

	static factory() {
		let result:any[] = ListFactory.$inject;
		result.push((userFactory:UserFactory) =>
			new ListFactory(userFactory));
		return result;
	}
}