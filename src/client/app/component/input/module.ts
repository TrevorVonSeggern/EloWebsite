import IModule = angular.IModule;
import {definition} from '../../Definition';
import './button/module'
import './email/module'
import './pageLink/module'
import './password/module'
import './datetime/module'
import './switch/module'
import './phone/module'
import './slider/module'
import './text/module'
import {SingleSelectModule} from './singleSelect/module';

let conf = definition;
export let InputSuiteModule: IModule = angular.module('tvo-input-suite-module',
	[
		conf.inputButton.moduleName,
		conf.inputEmail.moduleName,
		conf.inputPageLink.moduleName,
		conf.inputPassword.moduleName,
		conf.inputPhone.moduleName,
		conf.inputDatetime.moduleName,
		conf.inputSlider.moduleName,
		conf.inputSwitch.moduleName,
		conf.inputText.moduleName,
		SingleSelectModule.name
	]);
