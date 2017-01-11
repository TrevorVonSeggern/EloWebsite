import IHttpService = angular.IHttpService;
import {BaseMultipleController, generateGUID} from "../../../../../component/baseItem/list/multiple/controller";
import {typeName} from "../../typeName";
import {UserFactory} from "../../../../userManagement/user/factory";
import {ListFactory} from "../factory";

export class controller extends BaseMultipleController {
	navigateToItem(id: string) {
		if (this.mode == 'router')
			this.$window.location = '/#/' + typeName + '/' + id;
	}

	static controllerName: string = typeName + 'ListMultipleController';
	static $inject: any[] = ['$scope', UserFactory.factoryName, '$timeout', ListFactory.factoryName, '$q', '$window'];

	listenerGUID: string = generateGUID();

	constructor($scope, userFactory, $timeout, public factory: ListFactory, $q, public $window) {
		super(userFactory, $window, '/api/elo/game');

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
