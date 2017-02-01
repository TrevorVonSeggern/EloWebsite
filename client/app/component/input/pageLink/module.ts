import IModule = angular.IModule;
import {definition} from '../../../Definition';
import {InputPageLinkController} from './controller';
import {InputPageLinkDirective} from './directive';

var module:IModule = angular.module(definition.inputPageLink.moduleName, []);
module.controller(definition.inputPageLink.controllerName, ['$scope', InputPageLinkController]);
module.directive(definition.inputPageLink.directiveName, InputPageLinkDirective);
