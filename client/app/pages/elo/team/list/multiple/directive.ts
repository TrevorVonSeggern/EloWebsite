import {BaseMultipleDirective} from "../../../../../component/baseItem/list/multiple/directive";
import {eloDefinition} from "../../../eloDefinition";
import {controller} from "./controller";

export class directive extends BaseMultipleDirective {
	static directiveName: string = 'tvoTeamItemMultiple';
	templateUrl: string = eloDefinition.teamList.templateUrl;
	controller = controller.$inject;
	bindToController: boolean = true;
	controllerAs: string = 'vm';

	constructor() {
		super();
		this.scope.gameId = '=';
	}
}
