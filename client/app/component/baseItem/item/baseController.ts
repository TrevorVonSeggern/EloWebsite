// Created by trevor on 7/29/2016.
import IHttpService = angular.IHttpService;
import {BasicItemService} from './service';

export abstract class BaseItemController {
	static controllerName: string = undefined;
	static $inject: any[] = undefined;

	itemId: string;
	item: any = {};
	loading: boolean = false;
	error: string = undefined;
	open: boolean;

	protected itemLoadComplete() {
		// this can be overloaded
	}

	protected itemIsEmpty(): boolean {
		return JSON.stringify(this.item) == '{}';
	}

	constructor(public basicItemService: BasicItemService, $stateParams, public $window, returnUrlFunction: (item) => string) {
		basicItemService.getMode(this, $stateParams);
		this.itemId = basicItemService.getId(this, $stateParams);
		this.loading = true;
		basicItemService.getItem(this.itemId, (data) => {
			this.item = data;
			this.loading = false;
			this.itemLoadComplete();
		}, (data) => {
			if (data && data.exists === false) {
				return this.cancel(returnUrlFunction(this.item));
			}
			this.loading = false;
		})
	}

	cancel(returnUrl: string) {
		if (this.basicItemService.mode === 'router') {
			this.$window.location.href = (returnUrl);
		}
		else {
			this.open = false;
		}
	};
}
