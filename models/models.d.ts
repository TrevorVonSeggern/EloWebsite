import { BaseModel } from 'web-base-model';
export declare class EloValue extends BaseModel {
    id: string | number;
    PlayerId: string | number;
    TeamId: string | number;
    MatchId: string | number;
    eloValue: number;
    constructor(instance?: any);
}
export declare class Event extends BaseModel {
    id: string | number;
    name: string;
    startTime: Date;
    endTime: Date;
    GameId: string | number;
    comment: string;
    constructor(instance?: any);
}
export declare class Game extends BaseModel {
    id: string | number;
    name: string;
    UserId: string | number;
    startValue: number;
    scale: number;
    constructor(instance?: any);
}
export declare class Match extends BaseModel {
    id: string | number;
    startTime: Date;
    endTime: Date;
    TeamAId: string | number;
    TeamBId: string | number;
    EventId: string | number;
    status: number;
    winner: boolean;
    constructor(instance?: any);
}
export declare class MatchPlayer extends Match implements Match {
    id: string | number;
    startTime: Date;
    endTime: Date;
    TeamAId: string | number;
    TeamBId: string | number;
    EventId: string | number;
    status: number;
    TeamAPlayers: EloValue[];
    TeamBPlayers: EloValue[];
    TeamAPlayersPrevious: EloValue[];
    TeamBPlayersPrevious: EloValue[];
    constructor(instance?: any);
}
export declare class Player extends BaseModel {
    id: string | number;
    name: string;
    GameId: string | number;
    UserId: string | number;
    constructor(instance?: any);
}
export declare class Team extends BaseModel {
    id: string | number;
    name: string;
    GameId: string | number;
    constructor(instance?: any);
}
