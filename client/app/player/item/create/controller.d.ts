import { BasicCreateItemController } from 'web-angularjs-crud-base-items/item/create/controller';
import { ItemService } from '../service';
import { ListFactory } from '../../../game/list/factory';
import { UserFactory } from 'web-angularjs-user-factory/UserFactory';
export declare class controller extends BasicCreateItemController {
    itemFactory: ItemService;
    static controllerName: string;
    static $inject: any[];
    loading: boolean;
    gameId: string;
    gameSelectList: any[];
    userSelectList: any[];
    constructor(itemFactory: ItemService, $stateParams: any, $state: any, gameListFactory: ListFactory, userFactory: UserFactory);
}
