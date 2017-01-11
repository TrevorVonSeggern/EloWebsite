import IHttpService = angular.IHttpService;
import {definition} from "../../../../../../Definition";
import {ListFactory} from '../factory';
import {BaseMultipleController, generateGUID} from "../../../../../../component/baseItem/list/multiple/controller";

export class controller extends BaseMultipleController {
	navigateToItem(id:string) {
		if (this.mode == 'router')
			this.$window.location = '/#/userManagement/' + id;
	}

	static controllerName:string = definition.userManagementMultipleItem.controllerName;
	static $inject:any[]         = ['$scope', 'UserFactory', '$timeout', ListFactory.factoryName, '$q', '$window'];

	listenerGUID:string = generateGUID();

	constructor($scope, userFactory, $timeout, public factory:ListFactory, $q, public $window) {
		super(userFactory, $window, '/api/user');

		// reload all the pages.
		// factory.AddListener(this.listenerGUID, () => {
		// 	 this.thisrefresh();
		// });
		// $scope.$on('$destroy', () => {
		// 	this.factory.RemoveListener(this.listenerGUID);
		// });
	}


}

controller.$inject.push(controller);
