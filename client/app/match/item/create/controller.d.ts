import { BasicCreateItemController } from 'web-angularjs-crud-base-items/item/create/controller';
import { MatchPlayerService } from '../matchPlayerService';
import * as Event from '../../../event/list/factory';
import * as Team from '../../../team/list/factory';
import * as Player from '../../../player/list/factory';
export declare class controller extends BasicCreateItemController {
    itemFactory: MatchPlayerService;
    static controllerName: string;
    static $inject: any[];
    loading: boolean;
    gameId: string;
    gameSelectList: any[];
    teamSelectList: any[];
    eventSelectList: any[];
    playerSelectList: any[];
    addPlayerTeamA(): void;
    removePlayerTeamA(index: number): void;
    addPlayerTeamB(): void;
    removePlayerTeamB(index: number): void;
    constructor(itemFactory: MatchPlayerService, $stateParams: any, $state: any, eventListFactory: Event.ListFactory, teamListFactory: Team.ListFactory, playerListFactory: Player.ListFactory);
}
