import { ItemService } from '../service';
import * as Game from '../../../game/item/service';
import { BaseDetailItemController } from 'web-angularjs-crud-base-items/item/detail/controller';
export declare class controller extends BaseDetailItemController {
    itemService: ItemService;
    gameItemService: Game.ItemService;
    static controllerName: string;
    static $inject: any[];
    GameId: string;
    GameName: string;
    constructor($scope: any, $state: any, $stateParams: any, itemService: ItemService, gameItemService: Game.ItemService);
    itemLoadComplete(): void;
}
