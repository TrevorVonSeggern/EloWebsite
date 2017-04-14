import { ServerBaseModel } from "web-base-server-model";
import { Match } from "../../models/models";
import { GameServer } from "./game";
import { EventServer } from "./event";
export declare class MatchServer extends ServerBaseModel implements Match {
    id: string | number;
    startTime: Date;
    endTime: Date;
    TeamAId: string | number;
    TeamBId: string | number;
    EventId: string | number;
    status: number;
    winner: boolean;
    constructor(instance?: any);
    static setAllStatus(matchId: any): Promise<void>;
    static processOne(): Promise<Boolean>;
    save(): Promise<void>;
    create(): Promise<void>;
    static removeById(id: string | number): Promise<void>;
    remove(): Promise<void>;
    static getOneById(id: string | number): Promise<MatchServer>;
    private static getOneToProcess();
    static all(userId: any, limit?: number, skip?: number): Promise<any[]>;
    static getCount(): Promise<number>;
    getEvent(): Promise<EventServer>;
    getGame(): Promise<GameServer>;
}
