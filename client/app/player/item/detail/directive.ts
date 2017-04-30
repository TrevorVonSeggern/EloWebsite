import {controller} from './controller';
import {definition} from '../../../../definition';
import {BaseDetailItemDirective} from 'web-angularjs-crud-base-items/item/detail/directive';

export class directive extends BaseDetailItemDirective {
	static directiveName: string = 'tvoPlayerItemDetail';

	templateUrl: string = definition.playerDetail.templateUrl;
	controller = controller.$inject;

	constructor() {
		super();
		this.scope.gameId = '=';
	}
}
