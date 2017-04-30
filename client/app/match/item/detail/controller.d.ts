import { MatchPlayerService } from '../matchPlayerService';
import * as Game from '../../../game/item/service';
import { BaseDetailItemController } from 'web-angularjs-crud-base-items/item/detail/controller';
export declare class controller extends BaseDetailItemController {
    itemService: MatchPlayerService;
    gameItemService: Game.ItemService;
    static controllerName: string;
    static $inject: any[];
    displayVs(): string;
    winnerText(): string;
    gameId: string;
    gameName: string;
    constructor($scope: any, $state: any, $stateParams: any, itemService: MatchPlayerService, gameItemService: Game.ItemService);
    itemLoadComplete(): void;
}
