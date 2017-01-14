// Created by trevor on 12/31/16.

import {IBaseModel} from "../Base/baseModel";

export class PlayerSelectItem {
	label: string;
	value: string;
}
export class MatchPlayerModel implements IBaseModel {
	_id: string;
	startTime: Date;
	endTime: Date;
	teamA: string;
	teamB: string;
	eventId: string;
	status: number;
	teamAPlayers: PlayerSelectItem[];
	teamBPlayers: PlayerSelectItem[];
}