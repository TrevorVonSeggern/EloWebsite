import { ServerBaseModel } from "web-base-server-model";
import { EloValue } from "../../models/models";
import { GameServer } from "./game";
export declare class EloValueServer extends ServerBaseModel implements EloValue {
    id: string | number;
    PlayerId: string | number;
    MatchId: string | number;
    TeamId: string | number;
    eloValue: number;
    constructor(instance?: any);
    save(): Promise<void>;
    create(): Promise<void>;
    static removeById(id: string | number): Promise<void>;
    remove(): Promise<void>;
    static getOneById(id: string | number): Promise<EloValueServer>;
    static all(limit?: number, skip?: number): Promise<any[]>;
    static allByMatchId(matchId: string | number, limit?: number, skip?: number): Promise<EloValueServer[]>;
    static getCount(): Promise<number>;
    static getPlayerCurrentElo(playerId: string | number, game?: GameServer): Promise<number>;
    static getPlayerCurrentEloValues(playerId: string | number): Promise<EloValueServer[]>;
}
