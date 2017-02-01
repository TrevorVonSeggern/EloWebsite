/**
 * Created by trevor on 5/31/16.
 */
import {directive} from './directive';
import {typeName} from "../../typeName";
import {IModule} from "angular";

let module: IModule = angular.module(typeName + 'List-Multiple-Module', []);

module.directive(directive.directiveName, function () {
	return new directive();
});

export let MultipleItemModule = module;