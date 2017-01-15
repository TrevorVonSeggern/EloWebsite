// Created by trevor on 12/31/16.

import {IBaseModel} from "../Base/baseModel";
import {EloValue} from "../../server/database/Elo/eloValue";

export class PlayerSelectItem {
	id: string;
}
export class MatchPlayerModel implements IBaseModel {
	_id: string;
	startTime: Date;
	endTime: Date;
	teamA: string;
	teamB: string;
	eventId: string;
	status: number;
	teamAPlayers: EloValue[];
	teamBPlayers: EloValue[];
}