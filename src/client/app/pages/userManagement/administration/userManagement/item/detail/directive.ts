import {controller} from './controller';
import {BaseDetailItemDirective} from "../../../../../../component/baseItem/item/detail/directive";
import {definition} from "../../../../../../Definition";

export class directive extends BaseDetailItemDirective {
	static directiveName:string = 'tvoUserManagementItemDetail';

	templateUrl:string = definition.userManagementDetail.templateUrl;
	controller         = controller.$inject;

	constructor() {
		super();
	}
}
