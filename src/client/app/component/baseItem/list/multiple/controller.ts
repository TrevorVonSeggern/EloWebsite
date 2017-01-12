import IHttpService = angular.IHttpService;
import IWindowService = angular.IWindowService;

export function generateGUID() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}

	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		s4() + '-' + s4() + s4() + s4();
}

export abstract class BaseMultipleController {
	static controllerName: string = 'Base_Item_Multiple_Controller';
	static $inject: any[] = ['UserFactory', '$window'];
	loading: boolean = true;

	constructor(public userFactory,
				public $window: IWindowService,
				public itemsUrl: string) {
		this.itemId = '';
	}

	mode: string; // router, or substitute
	baseName: string;

	eventDetailFocused: boolean = false;
	eventCreateFocused: boolean = false;
	itemId: string = undefined;

	items: any[] = [];
	PAGE_SIZE: number = 100;

	listenerGUID: string = generateGUID();

	loadMore() {
		this.loading = true;
		this.userFactory.httpServerCall(this.itemsUrl, 'GET', {
			limit: this.PAGE_SIZE,
			skip: this.items.length
		}, (response) => {
			this.loading = false;
			let nItems = response.data;

			for (let i: number = 0; i < nItems.length; ++i) {
				this.items.push(nItems[i]);

			}
		}, (error) => {
			console.log(error);
			this.loading = false;
		});
	}

	selectItem(id: string): any {
		if (this.mode === 'router') {
			this.$window.location.assign('/#/' + this.baseName + '/' + id);
		}
		else if (this.mode == 'substitute') {
			this.eventDetailFocused = true;
			this.itemId = id;
		}
	}

	create(route: string) {
		if (this.mode === 'substitute')
			this.eventCreateFocused = true;
		else if (this.mode === 'router') {
			this.$window.location.href = route;
		}
	}
}

BaseMultipleController.$inject.push(BaseMultipleController);
