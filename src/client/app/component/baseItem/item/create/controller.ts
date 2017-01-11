import IHttpService = angular.IHttpService;
import {BasicItemService} from '../service';
import {BaseItemController} from '../baseController';

export abstract class BasicCreateItemController extends BaseItemController {
	static controllerName:string = undefined;
	static $inject:any[]         = undefined;

	constructor(public basicItemService:BasicItemService, $stateParams, public $window, public returnUrl:string) {
		super(basicItemService, $stateParams, $window, () => {
			return returnUrl;
		});
	}

	open:boolean;

	save() {
		this.loading = true;
		this.basicItemService.createItem(this.item, (data)=> {

			this.loading = false;
			if (data)
				this.cancel();

		}, (data) => {
			if (data) {
				if (data.error)
					this.error = data.error;
				else
					this.error = data;
			}
			this.loading = false;
		});
	}

	cancel() {
		if (this.basicItemService.mode === 'router') {
			this.$window.location.href = this.returnUrl;
		}
		else {
			this.open = false;
		}
	}
}
