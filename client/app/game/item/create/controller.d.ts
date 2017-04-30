import { BasicCreateItemController } from 'web-angularjs-crud-base-items/item/create/controller';
import { ItemService } from '../service';
export declare class controller extends BasicCreateItemController {
    itemFactory: ItemService;
    static controllerName: string;
    static $inject: any[];
    loading: boolean;
    constructor(itemFactory: ItemService, $stateParams: any, $state: any);
}
