import {controller} from './controller';
import {BasicEditItemDirective} from "../../../../../../component/baseItem/item/edit/directive";
import {definition} from "../../../../../../Definition";

export class directive extends BasicEditItemDirective {
	static directiveName: string = 'tvoUserManagementItemEdit';
	controller = controller.$inject;
	templateUrl: string = definition.userManagementEdit.templateUrl;

	constructor() {
		super();
	}
}
