// Created by trevor on 12/31/16.

import {IBaseModel} from "../Base/baseModel";
export class EventModel implements IBaseModel {
	_id: string;
	name: string;
	startTime: Date;
	endTime: Date;
	gameId: string;
	userId: string;
	comment: string;
}