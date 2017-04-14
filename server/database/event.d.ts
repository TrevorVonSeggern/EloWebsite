import { ServerBaseModel } from "web-base-server-model";
import { Event } from "../../models/models";
export declare class EventServer extends ServerBaseModel implements Event {
    id: string | number;
    name: string;
    startTime: Date;
    endTime: Date;
    GameId: string | number;
    comment: string;
    constructor(instance?: any);
    static allByGame(gameId: string | number, limit: number, skip: number): Promise<any[]>;
    save(): Promise<void>;
    create(): Promise<void>;
    static removeById(id: string | number): Promise<void>;
    remove(): Promise<void>;
    static getOneByName(name: string): Promise<EventServer>;
    static getOneById(id: string | number): Promise<EventServer>;
    static all(userId: any, limit?: number, skip?: number): Promise<any[]>;
    static getCount(): Promise<number>;
}
