/**
 * Created by trevor on 5/22/16.
 */

export class BaseMultipleDirective {
	static directiveName: string; // need to populate
	templateUrl: string; // need to populate
	controller; // need to populate

	scope: any = {
		mode: '=',
		events: '@'
	};

	bindToController = true;
	controllerAs = 'vm';

	constructor() {
	}
}
