import * as angular from 'angular';
import {directive} from './directive';
import {typeName} from '../../typeName';

export let MultipleItemModule = angular.module(typeName + 'List-Multiple-Module', []);

MultipleItemModule.directive(directive.directiveName, function () {
	return new directive();
});
