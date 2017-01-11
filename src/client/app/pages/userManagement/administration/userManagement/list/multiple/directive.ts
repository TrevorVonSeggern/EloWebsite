/**
 * Created by trevor on 5/22/16.
 */
import {controller} from './controller';
import {definition} from "../../../../../../Definition";
import {BaseMultipleDirective} from "../../../../../../component/baseItem/list/multiple/directive";

export class directive extends BaseMultipleDirective {
	static directiveName:string     = 'tvoUserItemMultiple';
	       templateUrl:string       = definition.userManagementMultipleItem.templateUrl;
	       controller               = controller.$inject;
	       bindToController:boolean = true;
	       controllerAs:string      = 'vm';

	constructor() {
		super();
	}
}
