import { BaseEditItemController } from 'web-angularjs-crud-base-items/item/edit/controller';
import { ListFactory } from '../../list/factory';
import * as Game from '../../../game/list/factory';
import { ItemService } from '../service';
import { UserFactory } from 'web-angularjs-user-factory/UserFactory';
export declare class controller extends BaseEditItemController {
    $scope: any;
    Factory: ListFactory;
    itemFactory: ItemService;
    gameListFactory: Game.ListFactory;
    static controllerName: string;
    static $inject: any[];
    gameId: string;
    gameSelectList: any[];
    userSelectList: any[];
    constructor($scope: any, $state: any, Factory: ListFactory, itemFactory: ItemService, $stateParams: any, gameListFactory: Game.ListFactory, userFactory: UserFactory);
    deleteItem(returnUrl: string): void;
}
