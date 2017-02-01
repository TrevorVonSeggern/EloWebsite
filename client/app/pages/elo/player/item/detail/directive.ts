import {controller} from './controller';
import {eloDefinition} from "../../../eloDefinition";
import {BaseDetailItemDirective} from "../../../../../component/baseItem/item/detail/directive";

export class directive extends BaseDetailItemDirective {
	static directiveName: string = 'tvoPlayerItemDetail';

	templateUrl: string = eloDefinition.playerDetail.templateUrl;
	controller = controller.$inject;

	constructor() {
		super();
		this.scope.gameId = '=';
	}
}
