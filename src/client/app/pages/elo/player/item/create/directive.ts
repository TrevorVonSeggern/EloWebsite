//Created by trevor on 5/22/16.

import {controller} from './controller';
import {eloDefinition} from "../../../eloDefinition";
import {BasicCreateItemDirective} from "../../../../../component/baseItem/item/create/directive";

export class directive extends BasicCreateItemDirective {
	static directiveName: string = 'tvoPlayerItemCreate';
	controller = controller.$inject;
	templateUrl: string = eloDefinition.playerCreate.templateUrl;

	constructor() {
		super();
		this.scope.gameId = '=';
	}
}
