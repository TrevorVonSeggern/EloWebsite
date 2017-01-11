// Created by trevor on 12/31/16.

import {IBaseModel} from "../Base/baseModel";
export class GameModel implements IBaseModel {
	_id: string;
	name: string;
	userId: string;
	startValue: number;
	scale: number;
}