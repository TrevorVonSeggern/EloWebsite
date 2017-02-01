/**
 * Created by trevor on 5/31/16.
 */
import {MultipleItemModule} from './multiple/module';
import {SingleItemModule} from './single/module';

let module: IModule = angular.module('userManagementListModule', [
	SingleItemModule.name,
	MultipleItemModule.name,
]);

export let ListModule = module;