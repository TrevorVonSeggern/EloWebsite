import {controller} from './controller';
import {BaseDetailItemDirective} from 'web-angularjs-crud-base-items/item/detail/directive';
import {definition} from "../../../../definition";

export class directive extends BaseDetailItemDirective {
	static directiveName: string = 'tvoMatchItemDetail';

	templateUrl: string = definition.matchDetail.templateUrl;
	controller = controller.$inject;

	constructor() {
		super();
		this.scope.gameId = '=';
	}
}
