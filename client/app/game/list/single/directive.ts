import {controller} from './controller';
import {BaseSingleController} from 'web-angularjs-crud-base-items/list/single/directive';
import {definition} from "../../../../definition";

export class directive extends BaseSingleController {
	static directiveName: string = 'tvoGameItemSingle';

	templateUrl: string = definition.gameListSingle.templateUrl;
	controller = controller.$inject;

	constructor() {
		super();
	}
}
