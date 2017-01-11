//Created by trevor on 5/22/16.

import {controller} from './controller';
import {BasicCreateItemDirective} from "../../../../../../component/baseItem/item/create/directive";
import {definition} from "../../../../../../Definition";

export class directive extends BasicCreateItemDirective {
	static directiveName:string = 'tvoUserManagementItemCreate';
	       controller           = controller.$inject;
	       templateUrl:string   = definition.userManagementCreate.templateUrl;

	constructor() {
		super();
	}
}
