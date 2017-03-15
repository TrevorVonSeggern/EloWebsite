import {controller} from './controller';
import {BaseDetailItemDirective} from 'web-angularjs-crud-base-items/item/detail/directive';
import {definition} from "../../../../definition";

export class directive extends BaseDetailItemDirective {
	static directiveName: string = 'tvoEventItemDetail';

	templateUrl: string = definition.eventDetail.templateUrl;
	controller = controller.$inject;

	constructor() {
		super();
		this.scope.gameId = '=';
	}
}
