import IHttpService = angular.IHttpService;
import {BasicItemService} from '../service';
import {BaseItemController} from '../baseController';

export abstract class BaseEditItemController extends BaseItemController {
	// need to populate
	static controllerName:string;
	static $inject:any[] = ['$window', BasicItemService.serviceName, '$stateParams'];


	constructor($window,
	            public basicItemService:BasicItemService,
	            $stateParams,
				public returnUrl:string) {
		super(basicItemService, $stateParams, $window, (it) => {
			return returnUrl + '/' + it._id;
		});
	}

	save(returnUrl:string) {
		this.loading = true;

		this.basicItemService.saveItem(this.item, () => {
			this.loading = false;

			if (this.basicItemService.mode === 'router') {
				this.$window.location.href = returnUrl + '/' + this.item._id;
			}
			else {
				this.open = false;
			}
		}, (error) => {
			this.error   = error;
			this.loading = false;
		});
	}

	cancel(returnUrl:string) {
		if (this.basicItemService.mode === 'router') {
			this.$window.location.href = returnUrl + '/' + this.item._id;
		}
		else {
			this.open = false;
		}
	}
}
