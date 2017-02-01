/**
 * Created by trevor on 3/18/16.
 */
class appController {
	tabIcon: string = 'src/client/images/Icon.ico';
	static $inject: string[];
	static clientLoaded: boolean = false;
	clientLoaded = appController.clientLoaded;
	scope: any;

	constructor($scope: any) {
		$scope.appvm = this;

		$scope.onViewLoad = function () {
			console.log('view changed');
		};
	}
}
appController.$inject = ['$scope'];
export var AppController = appController;
