import { ServerBaseModel } from "web-base-server-model";
import { MatchPlayer, EloValue } from "../../models/models";
export declare class MatchPlayerServer extends ServerBaseModel implements MatchPlayer {
    id: string;
    startTime: Date;
    endTime: Date;
    TeamA: string;
    TeamB: string;
    TeamAPrevious: string;
    TeamBPrevious: string;
    EventId: string;
    status: number;
    teamAPlayers: EloValue[];
    teamBPlayers: EloValue[];
    teamAPlayersPrevious: EloValue[];
    teamBPlayersPrevious: EloValue[];
    winner: boolean;
    constructor(instance?: any);
    save(): Promise<void>;
    create(): Promise<void>;
    static removeById(id: string): Promise<void>;
    remove(): Promise<void>;
    static getOneById(id: string): Promise<MatchPlayerServer>;
    static all(limit?: number, skip?: number): Promise<any[]>;
    static getCount(): Promise<number>;
}
