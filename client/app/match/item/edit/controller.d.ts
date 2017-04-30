import { BaseEditItemController } from 'web-angularjs-crud-base-items/item/edit/controller';
import { ListFactory } from '../../list/factory';
import * as Event from '../../../event/list/factory';
import * as Team from '../../../team/list/factory';
import * as Player from '../../../player/list/factory';
import { MatchPlayerService } from '../matchPlayerService';
export declare class controller extends BaseEditItemController {
    Factory: ListFactory;
    itemFactory: MatchPlayerService;
    eventListFactory: Event.ListFactory;
    playerListFactory: Player.ListFactory;
    teamListFactory: Team.ListFactory;
    static controllerName: string;
    static $inject: any[];
    gameId: string;
    eventSelectList: any[];
    teamSelectList: any[];
    playerSelectList: any[];
    addPlayerTeamA(): void;
    removePlayerTeamA(index: number): void;
    addPlayerTeamB(): void;
    removePlayerTeamB(index: number): void;
    protected itemLoadComplete(): void;
    constructor($state: any, Factory: ListFactory, itemFactory: MatchPlayerService, $stateParams: any, eventListFactory: Event.ListFactory, playerListFactory: Player.ListFactory, teamListFactory: Team.ListFactory);
    deleteItem(returnUrl: string): void;
}
