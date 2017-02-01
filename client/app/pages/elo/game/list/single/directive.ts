import {controller} from './controller';
import {eloDefinition} from "../../../eloDefinition";
import {BaseSingleController} from "../../../../../component/baseItem/list/single/directive";

export class directive extends BaseSingleController {
	static directiveName: string = 'tvoGameItemSingle';

	templateUrl: string = eloDefinition.gameListSingle.templateUrl;
	controller = controller.$inject;

	constructor() {
		super();
	}
}