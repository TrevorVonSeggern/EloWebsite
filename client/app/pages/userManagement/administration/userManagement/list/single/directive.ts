import {controller} from './controller';
import {definition} from "../../../../../../Definition";
import {BaseSingleController} from "../../../../../../component/baseItem/list/single/directive";

export class directive extends BaseSingleController {
	static directiveName: string = 'tvoUserItemSingle';

	templateUrl: string = definition.userManagementSingleItem.templateUrl;
	controller = controller.$inject;


	constructor() {
		super();
	}
}
