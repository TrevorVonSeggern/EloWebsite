/**
 * Created by trevor on 5/22/16.
 */
import {BaseDetailItemController} from './controller';
import {BaseItemDirective} from '../baseDirective';

export class BaseDetailItemDirective extends BaseItemDirective {
	// implement
	// set this to something else
	static directiveName:string = 'tvoBaseItem';
	       controller           = BaseDetailItemController.$inject;
	       templateUrl:string   = undefined;


	constructor() {
		super();
	}
}
