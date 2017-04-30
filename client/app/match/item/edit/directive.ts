import {BasicEditItemDirective} from 'web-angularjs-crud-base-items/item/edit/directive';
import {controller} from './controller';
import {definition} from '../../../../definition';

export class directive extends BasicEditItemDirective {
	static directiveName: string = 'tvoMatchManagementItemEdit';
	controller = controller.$inject;
	templateUrl: string = definition.matchEdit.templateUrl;

	constructor() {
		super();
		this.scope.gameId = '=';
	}
}
