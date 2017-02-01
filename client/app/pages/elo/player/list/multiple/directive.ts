import {BaseMultipleDirective} from "../../../../../component/baseItem/list/multiple/directive";
import {eloDefinition} from "../../../eloDefinition";
import {controller} from "./controller";

export class directive extends BaseMultipleDirective {
	static directiveName: string = 'tvoPlayerItemMultiple';
	templateUrl: string = eloDefinition.playerList.templateUrl;
	controller = controller.$inject;
	bindToController: boolean = true;
	controllerAs: string = 'vm';

	constructor() {
		super();
		this.scope.gameId = '=';
	}
}
