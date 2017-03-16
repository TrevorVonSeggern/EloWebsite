import { ItemService } from '../service';
import * as Game from '../../../game/item/service';
import { BaseDetailItemController } from 'web-angularjs-crud-base-items/item/detail/controller';
import { UserFactory } from 'web-angularjs-user-factory/UserFactory';
export declare class controller extends BaseDetailItemController {
    itemService: ItemService;
    gameItemService: Game.ItemService;
    userFactory: UserFactory;
    static controllerName: string;
    static $inject: any[];
    GameId: string;
    gameName: string;
    userFirstName: string;
    constructor($scope: any, $state: any, $stateParams: any, itemService: ItemService, gameItemService: Game.ItemService, userFactory: UserFactory);
    itemLoadComplete(): void;
}
