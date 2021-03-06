import { ServerBaseModel } from "web-base-server-model";
import { Team } from "../../models/models";
export declare class TeamServer extends ServerBaseModel implements Team {
    id: string;
    name: string;
    GameId: string | number;
    constructor(instance?: any);
    static allByGame(userId: any, gameId: any, limit: any, skip: any): Promise<Team[]>;
    save(): Promise<void>;
    create(): Promise<void>;
    createIfNotExists(): Promise<boolean>;
    static removeById(id: string): Promise<void>;
    remove(): Promise<void>;
    static getOneById(id: string): Promise<TeamServer>;
    static all(userId: any, limit?: number, skip?: number): Promise<any[]>;
    static getCount(): Promise<number>;
}
