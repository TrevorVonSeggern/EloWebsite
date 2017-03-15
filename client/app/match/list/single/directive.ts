import {controller} from './controller';
import {definition} from '../../../../definition';
import {BaseSingleController} from 'web-angularjs-crud-base-items/list/single/directive';

export class directive extends BaseSingleController {
	static directiveName: string = 'tvoMatchItemSingle';

	templateUrl: string = definition.matchListSingle.templateUrl;
	controller = controller.$inject;

	constructor() {
		super();
	}
}
