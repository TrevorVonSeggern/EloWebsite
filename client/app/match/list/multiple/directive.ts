import {BaseMultipleDirective} from 'web-angularjs-crud-base-items/list/multiple/directive';
import {definition} from '../../../../definition';
import {controller} from './controller';

export class directive extends BaseMultipleDirective {
	static directiveName: string = 'tvoMatchItemMultiple';
	templateUrl: string = definition.matchList.templateUrl;
	controller = controller.$inject;
	bindToController: boolean = true;
	controllerAs: string = 'vm';

	constructor() {
		super();
		this.scope.gameId = '=';
	}
}
