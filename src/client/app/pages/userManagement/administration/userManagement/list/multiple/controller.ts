import IHttpService = angular.IHttpService;
import {definition} from "../../../../../../Definition";
import {ListFactory} from '../factory';
import {BaseMultipleController, generateGUID} from "../../../../../../component/baseItem/list/multiple/controller";

export class controller extends BaseMultipleController {
	static controllerName:string = definition.userManagementMultipleItem.controllerName;
	static $inject:any[]         = ['$scope', 'UserFactory', '$timeout', ListFactory.factoryName, '$q', '$window'];

	listenerGUID:string = generateGUID();

	constructor($scope, userFactory, $timeout, public factory:ListFactory, $q, public $window) {
		super(userFactory, $window, '/api/user');
		this.baseName = 'userManagement';
	}
}

controller.$inject.push(controller);
