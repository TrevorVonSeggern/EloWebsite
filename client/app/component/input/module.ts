import IModule = angular.IModule;
import {definition} from '../../Definition';
import './pageLink/module'
import './datetime/module'
import './switch/module'
import './phone/module'
import './slider/module'
import {SingleSelectModule} from './singleSelect/module';

let conf = definition;
export let InputSuiteModule: IModule = angular.module('tvo-input-suite-module',
	[
		conf.inputPageLink.moduleName,
		conf.inputPhone.moduleName,
		conf.inputDatetime.moduleName,
		conf.inputSlider.moduleName,
		conf.inputSwitch.moduleName,
		SingleSelectModule.name
	]);
