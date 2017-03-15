import { BaseModel } from 'web-base-model';
export declare class EloValue extends BaseModel {
    id: string;
    PlayerId: string;
    TeamId: string;
    MatchId: string;
    eloValue: number;
    constructor(instance?: any);
}
export declare class Event extends BaseModel {
    id: string;
    name: string;
    startTime: Date;
    endTime: Date;
    GameId: string;
    comment: string;
    constructor(instance?: any);
}
export declare class Game extends BaseModel {
    id: string;
    name: string;
    UserId: string;
    startValue: number;
    scale: number;
    constructor(instance?: any);
}
export declare class Match extends BaseModel {
    id: string;
    startTime: Date;
    endTime: Date;
    TeamA: string;
    TeamB: string;
    EventId: string;
    status: number;
    winner: boolean;
    constructor(instance?: any);
}
export declare class MatchPlayer extends Match {
    id: string;
    startTime: Date;
    endTime: Date;
    TeamA: string;
    TeamB: string;
    EventId: string;
    status: number;
    teamAPlayers: EloValue[];
    teamBPlayers: EloValue[];
    constructor(instance?: any);
}
export declare class Player extends BaseModel {
    id: string;
    name: string;
    GameId: string;
    UserId: string;
    constructor(instance?: any);
}
export declare class Team extends BaseModel {
    id: string;
    name: string;
    GameId: string;
    constructor(instance?: any);
}
