//Created by trevor on 5/22/16.

import {controller} from './controller';
import {eloDefinition} from "../../../eloDefinition";
import {BasicCreateItemDirective} from "../../../../../component/baseItem/item/create/directive";

export class directive extends BasicCreateItemDirective {
	static directiveName: string = 'tvoTeamItemCreate';
	controller = controller.$inject;
	templateUrl: string = eloDefinition.teamCreate.templateUrl;

	constructor() {
		super();
		this.scope.gameId = '=';
	}
}
