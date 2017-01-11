// Created by trevor on 5/22/16.

import {BaseItemDirective} from '../baseDirective';

export abstract class BasicCreateItemDirective extends BaseItemDirective {
	// need to populate
	static directiveName:string = undefined;
	       controller           = undefined;
	       templateUrl:string   = undefined;

	constructor() {
		super();
	}
}
