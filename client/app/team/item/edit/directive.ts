import {BasicEditItemDirective} from 'web-angularjs-crud-base-items/item/edit/directive';
import {controller} from './controller';
import {definition} from '../../../../definition';

export class directive extends BasicEditItemDirective {
	static directiveName: string = 'tvoTeamManagementItemEdit';
	controller = controller.$inject;
	templateUrl: string = definition.teamEdit.templateUrl;

	constructor() {
		super();
		this.scope.gameId = '=';
	}
}
