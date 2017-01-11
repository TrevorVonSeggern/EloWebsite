/**
 * Created by trevor on 7/22/2016.
 */
import IModule = angular.IModule;
import {LabelTextModule} from './text/module';

var module:IModule = angular.module('tvo-label-module', [
	LabelTextModule.name,
]);

export var LabelModule = module;
