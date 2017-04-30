//Created by trevor on 5/22/16.

import {controller} from './controller';
import {definition} from '../../../../definition';
import {BasicCreateItemDirective} from 'web-angularjs-crud-base-items/item/create/directive';

export class directive extends BasicCreateItemDirective {
	static directiveName: string = 'tvoTeamItemCreate';
	controller = controller.$inject;
	templateUrl: string = definition.teamCreate.templateUrl;

	constructor() {
		super();
		this.scope.gameId = '=';
	}
}
