import { BaseEditItemController } from 'web-angularjs-crud-base-items/item/edit/controller';
import { ListFactory } from '../../list/factory';
import * as Game from '../../../game/list/factory';
import { ItemService } from '../service';
export declare class controller extends BaseEditItemController {
    Factory: ListFactory;
    itemFactory: ItemService;
    gameListFactory: Game.ListFactory;
    static controllerName: string;
    static $inject: any[];
    gameId: string;
    gameSelectList: any[];
    constructor($state: any, Factory: ListFactory, itemFactory: ItemService, $stateParams: any, gameListFactory: Game.ListFactory);
    deleteItem(returnUrl: string): void;
}
