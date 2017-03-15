import {directive} from './directive';
import {typeName} from "../../typeName";
import * as angular from 'angular';

let module = angular.module(typeName + 'List-Multiple-Module', []);

module.directive(directive.directiveName, function () {
	return new directive();
});

export let MultipleItemModule = module;