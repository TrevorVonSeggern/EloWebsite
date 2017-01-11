// Created by trevor on 5/22/16.

import {BaseItemDirective} from '../baseDirective';

export abstract class BasicEditItemDirective extends BaseItemDirective {
	// need to populate
	static directiveName:string = undefined;
	       templateUrl:string   = undefined;
	       controller           = undefined;


	constructor() {
		super();
	}
}
