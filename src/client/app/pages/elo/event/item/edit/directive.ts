import {BasicEditItemDirective} from "../../../../../component/baseItem/item/edit/directive";
import {controller} from "./controller";
import {eloDefinition} from "../../../eloDefinition";

export class directive extends BasicEditItemDirective {
	static directiveName: string = 'tvoEventManagementItemEdit';
	controller = controller.$inject;
	templateUrl: string = eloDefinition.eventEdit.templateUrl;

	constructor() {
		super();
		this.scope.gameId = '=';
	}
}
