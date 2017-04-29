import { ServerBaseModel } from "web-base-server-model";
import { Player } from "../../models/models";
import { GameServer } from "./game";
export declare class PlayerServer extends ServerBaseModel implements Player {
    id: string;
    name: string;
    GameId: string;
    UserId: string;
    _currentElo: number;
    constructor(instance?: any);
    static allByGame(userId: any, gameId: any, limit: any, skip: any): Promise<Player[]>;
    static getAllPlayersInMatch(matchId: string | number): Promise<PlayerServer[]>;
    save(): Promise<void>;
    create(): Promise<void>;
    static removeById(id: string): Promise<void>;
    remove(): Promise<void>;
    static getOneById(id: string | number): Promise<PlayerServer>;
    static all(userId: any, limit?: number, skip?: number): Promise<any[]>;
    static getCount(): Promise<number>;
    getGame(): Promise<GameServer>;
    getCurrentEloValue(game?: GameServer): Promise<number>;
}
