import {BaseMultipleController, generateGUID} from "../../../../../component/baseItem/list/multiple/controller";
import {typeName} from "../../typeName";
import {UserFactory} from "../../../../userManagement/user/factory";
import {ListFactory} from "../factory";

export class controller extends BaseMultipleController {

	static controllerName: string = typeName + 'ListMultipleController';
	static $inject: any[] = ['$scope', UserFactory.factoryName, '$timeout', ListFactory.factoryName, '$q', '$window'];

	listenerGUID: string = generateGUID();

	gameId: string;

	constructor($scope, userFactory, $timeout, public factory: ListFactory, $q, public $window) {
		super(userFactory, $window, '/api/elo/team');
		this.baseName = typeName;
	}

	loadMore() {
		this.loading = true;
		this.userFactory.httpServerCall(this.itemsUrl, 'GET', {
			limit: this.PAGE_SIZE,
			skip: this.items.length,
			gameId: this.gameId
		}, (response) => {
			let nItems = response.data;
			for (let i: number = 0; i < nItems.length; ++i) {
				this.items.push(nItems[i]);
			}
			this.loading = false;
		});
	}

}

controller.$inject.push(controller);
