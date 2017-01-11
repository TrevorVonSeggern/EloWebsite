// Created by trevor on 12/31/16.

import {IBaseModel} from "../Base/baseModel";
export class EloValueModel implements IBaseModel {
	_id: string;
	playerId: string;
	matchId: string;
	eloValue: number;
}