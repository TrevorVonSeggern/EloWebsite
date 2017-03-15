import {BaseMultipleDirective} from 'web-angularjs-crud-base-items/list/multiple/directive';
import {definition} from '../../../../definition';
import {controller} from './controller';

export class directive extends BaseMultipleDirective {
	static directiveName: string = 'tvoTeamItemMultiple';
	templateUrl: string = definition.teamList.templateUrl;
	controller = controller.$inject;
	bindToController: boolean = true;
	controllerAs: string = 'vm';

	constructor() {
		super();
		this.scope.gameId = '=';
	}
}
