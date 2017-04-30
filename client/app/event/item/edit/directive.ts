import {BasicEditItemDirective} from 'web-angularjs-crud-base-items/item/edit/directive';
import {controller} from './controller';
import {definition} from "../../../../definition";

export class directive extends BasicEditItemDirective {
	static directiveName: string = 'tvoEventManagementItemEdit';
	controller = controller.$inject;
	templateUrl: string = definition.eventEdit.templateUrl;

	constructor() {
		super();
		this.scope.gameId = '=';
	}
}
