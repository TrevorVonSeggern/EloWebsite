import { ServerBaseModel } from "web-base-server-model";
import { Player } from "../../models/models";
export declare class PlayerServer extends ServerBaseModel implements Player {
    id: string;
    name: string;
    GameId: string;
    UserId: string;
    constructor(instance?: any);
    static allByGame(userId: any, gameId: any, limit: any, skip: any): Promise<Player[]>;
    save(): Promise<void>;
    create(): Promise<void>;
    static removeById(id: string): Promise<void>;
    remove(): Promise<void>;
    static getOneById(id: string): Promise<PlayerServer>;
    static all(userId: any, limit?: number, skip?: number): Promise<any[]>;
    static getCount(): Promise<number>;
}
