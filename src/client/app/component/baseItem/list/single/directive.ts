/**
 * Created by trevor on 5/22/16.
 */

export class BaseSingleController {
	static directiveName:string = ''; // need to populate

	scope = {
		item: '='
	};

	templateUrl:string; // need to populate
	controller; // need to populate
	controllerAs     = 'vm';
	bindToController = true;
	replace          = true;

	constructor() {
	}
}
