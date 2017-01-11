import {BaseMultipleDirective} from "../../../../../component/baseItem/list/multiple/directive";
import {eloDefinition} from "../../../eloDefinition";
import {controller} from "./controller";
/**
 * Created by trevor on 5/22/16.
 */

export class directive extends BaseMultipleDirective {
	static directiveName: string = 'tvoGameItemMultiple';
	templateUrl: string = eloDefinition.gameList.templateUrl;
	controller = controller.$inject;
	bindToController: boolean = true;
	controllerAs: string = 'vm';

	constructor() {
		super();
	}
}
