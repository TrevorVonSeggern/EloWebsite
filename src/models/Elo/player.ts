// Created by trevor on 12/31/16.

import {IBaseModel} from "../Base/baseModel";
export class PlayerModel implements IBaseModel {
	_id: string;
	name: string;
	gameId: string;
	userId: string;
}