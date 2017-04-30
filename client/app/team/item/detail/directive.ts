import {controller} from './controller';
import {definition} from '../../../../definition';
import {BaseDetailItemDirective} from 'web-angularjs-crud-base-items/item/detail/directive';

export class directive extends BaseDetailItemDirective {
	static directiveName: string = 'tvoTeamItemDetail';

	templateUrl: string = definition.teamDetail.templateUrl;
	controller = controller.$inject;

	constructor() {
		super();
		this.scope.gameId = '=';
	}
}
