import { BaseMultipleController } from 'web-angularjs-crud-base-items/list/multiple/controller';
import { AjaxFactory } from 'web-angularjs-user-factory/AjaxFactory';
import { ListFactory } from '../factory';
export declare class controller extends BaseMultipleController {
    factory: ListFactory;
    static controllerName: string;
    static $inject: any[];
    listenerGUID: string;
    constructor(ajaxFactory: AjaxFactory, factory: ListFactory, $state: any);
}
