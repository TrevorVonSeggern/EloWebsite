import { ServerBaseModel } from "web-base-server-model";
import { Match } from "../../models/models";
export declare class MatchServer extends ServerBaseModel implements Match {
    id: string;
    startTime: Date;
    endTime: Date;
    TeamA: string;
    TeamB: string;
    EventId: string;
    status: number;
    winner: boolean;
    constructor(instance?: any);
    static setAllStatus(matchId: any): Promise<void>;
    static processOne(): Promise<Boolean>;
    save(): Promise<void>;
    create(): Promise<void>;
    static removeById(id: string): Promise<void>;
    remove(): Promise<void>;
    static getOneById(id: string): Promise<MatchServer>;
    static all(limit?: number, skip?: number): Promise<any[]>;
    static getCount(): Promise<number>;
}
