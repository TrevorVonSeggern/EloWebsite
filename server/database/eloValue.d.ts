import { ServerBaseModel } from "web-base-server-model";
import { EloValue } from "../../models/models";
export declare class EloValueServer extends ServerBaseModel implements EloValue {
    id: string;
    PlayerId: string;
    MatchId: string;
    TeamId: string;
    eloValue: number;
    constructor(instance?: any);
    save(): Promise<void>;
    create(): Promise<void>;
    static removeById(id: string): Promise<void>;
    remove(): Promise<void>;
    static getOneById(id: string): Promise<EloValueServer>;
    static all(limit?: number, skip?: number): Promise<any[]>;
    static getCount(): Promise<number>;
}
