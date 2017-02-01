/**
 * Created by trevor on 5/31/16.
 */
import {MultipleItemModule} from './multiple/module';
import {SingleItemModule} from './single/module';
import {typeName} from "../typeName";
import {ListFactory} from "./factory";

let module: IModule = angular.module(typeName + 'ListModule', [
	SingleItemModule.name,
	MultipleItemModule.name,
]);

module.factory(ListFactory.factoryName, ListFactory.factory());

export let ListModule = module;