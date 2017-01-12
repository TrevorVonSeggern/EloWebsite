/**
 * Created by trevor on 7/22/2016.
 */
import IModule = angular.IModule;
import {LabelTextModule} from './text/module';
import {LabelDatetimeModule} from "./datetime/module";

let module: IModule = angular.module('tvo-label-module', [
	LabelTextModule.name,
	LabelDatetimeModule.name,
]);

export let LabelModule = module;
