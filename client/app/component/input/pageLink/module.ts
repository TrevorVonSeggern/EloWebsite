import {definition} from '../../../Definition';
import {InputPageLinkController} from './controller';
import {InputPageLinkDirective} from './directive';
import {IModule} from "angular";

let module:IModule = angular.module(definition.inputPageLink.moduleName, []);
module.controller(definition.inputPageLink.controllerName, ['$scope', InputPageLinkController]);
module.directive(definition.inputPageLink.directiveName, InputPageLinkDirective);
