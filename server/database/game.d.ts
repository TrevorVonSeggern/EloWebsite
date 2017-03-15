import { ServerBaseModel } from "web-base-server-model";
import { Game } from "../../models/models";
export declare class GameServer extends ServerBaseModel implements Game {
    id: string;
    name: string;
    UserId: string;
    startValue: number;
    scale: number;
    constructor(instance?: any);
    save(): Promise<void>;
    create(): Promise<void>;
    static removeById(id: string): Promise<void>;
    remove(): Promise<void>;
    static getOneById(id: string): Promise<GameServer>;
    static all(userId: any, limit?: number, skip?: number): Promise<any[]>;
    static getCount(): Promise<number>;
}
