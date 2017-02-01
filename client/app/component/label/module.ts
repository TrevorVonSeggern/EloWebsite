/**
 * Created by trevor on 7/22/2016.
 */
import {LabelTextModule} from './text/module';
import {LabelDatetimeModule} from "./datetime/module";

let module = angular.module('tvo-label-module', [
	LabelTextModule.name,
	LabelDatetimeModule.name,
]);

export let LabelModule = module;
