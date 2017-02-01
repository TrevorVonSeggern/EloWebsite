/**
 * Created by trevor on 7/14/2016.
 */
import IModule = angular.IModule;

import {NavModule} from './nav/module';
import {InputSuiteModule} from './input/module';
import {LabelModule} from './label/module';
import {BaseItemModule} from './baseItem/module';

let module: any = angular.module('components', [
	NavModule.name,
	InputSuiteModule.name,
	LabelModule.name,
	BaseItemModule.name,
]);

export let ComponentsModule = module;