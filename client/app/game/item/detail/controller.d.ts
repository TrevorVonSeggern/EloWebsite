import { ItemService } from '../service';
import { BaseDetailItemController } from 'web-angularjs-crud-base-items/item/detail/controller';
import { AjaxFactory } from 'web-angularjs-user-factory/AjaxFactory';
export declare class controller extends BaseDetailItemController {
    itemService: ItemService;
    ajaxFactory: AjaxFactory;
    static controllerName: string;
    static $inject: any[];
    processGame(): void;
    constructor($scope: any, $state: any, $stateParams: any, itemService: ItemService, ajaxFactory: AjaxFactory);
}
