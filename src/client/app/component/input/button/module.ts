import IModule = angular.IModule;
import {definition} from '../../../Definition';
import {controller} from './controller';
import {directive} from './directive';
import {DeleteModule} from './delete/module';
import {CreateModule} from './create/module';

var module:IModule = angular.module(definition.inputButton.moduleName, [
	DeleteModule.name,
	CreateModule.name,
]);

module.controller(definition.inputButton.controllerName, ['$scope', controller]);
module.directive(definition.inputButton.directiveName, directive);
