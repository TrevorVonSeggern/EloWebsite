//Created by trevor on 5/22/16.

import {controller} from './controller';
import {BasicCreateItemDirective} from 'web-angularjs-crud-base-items/item/create/directive';
import {definition} from "../../../../definition";

export class directive extends BasicCreateItemDirective {
	static directiveName: string = 'tvoEventItemCreate';
	controller = controller.$inject;
	templateUrl: string = definition.eventCreate.templateUrl;

	constructor() {
		super();
		this.scope.gameId = '=';
	}
}
