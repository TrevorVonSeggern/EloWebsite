/// <reference types="sequelize" />
import * as Sequelize from 'sequelize';
export declare function SyncDatabase(): void;
export declare let DBGame: Sequelize.Model<{}, {}>;
export declare let DBEvent: Sequelize.Model<{}, {}>;
export declare let DBTeam: Sequelize.Model<{}, {}>;
export declare let DBPlayer: Sequelize.Model<{}, {}>;
export declare let DBMatch: Sequelize.Model<{}, {}>;
export declare let DBEloValue: Sequelize.Model<{}, {}>;
export declare function helperFunction_createIfNotExists(ServerClass: any, toCreate: any): Promise<boolean>;
