import {BaseMultipleController, generateGUID} from "../../../../../component/baseItem/list/multiple/controller";
import {typeName} from "../../typeName";
import {UserFactory} from "../../../../userManagement/user/factory";
import {ListFactory} from "../factory";

export class controller extends BaseMultipleController {
	static controllerName: string = typeName + 'ListMultipleController';
	static $inject: any[] = ['$scope', UserFactory.factoryName, '$timeout', ListFactory.factoryName, '$q', '$window'];

	listenerGUID: string = generateGUID();

	constructor($scope, userFactory, $timeout, public factory: ListFactory, $q, public $window) {
		super(userFactory, $window, '/api/elo/game');
		this.baseName = typeName;
	}
}

controller.$inject.push(controller);
