import {controller} from './controller';
import {eloDefinition} from "../../../eloDefinition";
import {BaseDetailItemDirective} from "../../../../../component/baseItem/item/detail/directive";

export class directive extends BaseDetailItemDirective {
	static directiveName: string = 'tvoGameItemDetail';

	templateUrl: string = eloDefinition.gameDetail.templateUrl;
	controller = controller.$inject;

	constructor() {
		super();
	}
}
