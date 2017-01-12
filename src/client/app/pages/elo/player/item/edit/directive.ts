import {BasicEditItemDirective} from "../../../../../component/baseItem/item/edit/directive";
import {controller} from "./controller";
import {eloDefinition} from "../../../eloDefinition";

export class directive extends BasicEditItemDirective {
	static directiveName: string = 'tvoPlayerManagementItemEdit';
	controller = controller.$inject;
	templateUrl: string = eloDefinition.playerEdit.templateUrl;

	constructor() {
		super();
		this.scope.gameId = '=';
	}
}
