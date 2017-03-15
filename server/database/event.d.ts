import { ServerBaseModel } from "web-base-server-model";
import { Event } from "../../models/models";
export declare class EventServer extends ServerBaseModel implements Event {
    id: string;
    name: string;
    startTime: Date;
    endTime: Date;
    GameId: string;
    comment: string;
    constructor(instance?: any);
    static allByGame(gameId: any, limit: any, skip: any): Promise<any[]>;
    save(): Promise<void>;
    create(): Promise<void>;
    static removeById(id: string): Promise<void>;
    remove(): Promise<void>;
    static getOneByName(name: string): Promise<EventServer>;
    static getOneById(id: string): Promise<EventServer>;
    static all(userId: any, limit?: number, skip?: number): Promise<any[]>;
    static getCount(): Promise<number>;
}
