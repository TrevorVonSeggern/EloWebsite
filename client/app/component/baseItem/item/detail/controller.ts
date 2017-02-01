import IHttpService = angular.IHttpService;
import {BasicItemService} from '../service';
import {BaseItemController} from '../baseController';

export abstract class BaseDetailItemController extends BaseItemController {
	static $inject: any[] = ['$scope', '$stateParams', BasicItemService.serviceName];

	eventEditFocused: boolean = false; // if true, skip details and go straight to edit.

	constructor($scope: any,
				$window,
				$stateParams: any,
				public basicItemService: BasicItemService,
				public returnUrl: string) {
		super(basicItemService, $stateParams, $window, () => {
			return this.returnUrl;
		});
	}

	itemLoadComplete() {
		if (this.itemIsEmpty())
			this.cancel(this.returnUrl);
	}

	edit(urlToEdit: string) {
		if (this.basicItemService.mode === 'router') {
			this.$window.location.href = (urlToEdit + '/' + this.item._id);
		}
		else {
			this.eventEditFocused = true;
		}
	}
}
BaseDetailItemController.$inject.push(BaseDetailItemController);
