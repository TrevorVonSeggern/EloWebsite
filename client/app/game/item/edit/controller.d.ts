import { BaseEditItemController } from 'web-angularjs-crud-base-items/item/edit/controller';
import { ListFactory } from '../../list/factory';
import { ItemService } from '../service';
export declare class controller extends BaseEditItemController {
    Factory: ListFactory;
    itemFactory: ItemService;
    static controllerName: string;
    static $inject: any[];
    constructor($state: any, Factory: ListFactory, itemFactory: ItemService, $stateParams: any);
    roleList: {
        label: string;
        value: string;
    }[];
    deleteItem(returnUrl: string): void;
}
