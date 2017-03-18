// Created by trevor on 12/31/16.
import {mapObjectToObject, BaseModel} from 'web-base-model';

export class EloValue extends BaseModel {
	id: string | number = null;
	PlayerId: string | number = null;
	TeamId: string | number = null;
	MatchId: string | number = null;
	eloValue: number = null;

	constructor(instance?) {
		super(instance);
	}
}

export class Event extends BaseModel {
	id: string | number;
	name: string;
	startTime: Date;
	endTime: Date;
	GameId: string | number;
	comment: string;

	constructor(instance?) {
		super(instance);
	}
}

export class Game extends BaseModel {
	id: string | number;
	name: string;
	UserId: string | number;
	startValue: number;
	scale: number;

	constructor(instance?) {
		super(instance);
	}
}

export class Match extends BaseModel {
	id: string | number;
	startTime: Date;
	endTime: Date;
	TeamAId: string | number;
	TeamBId: string | number;
	EventId: string | number;
	status: number;
	winner: boolean;

	constructor(instance?) {
		super(instance);
	}
}

export class MatchPlayer extends Match implements Match {
	id: string | number;
	startTime: Date;
	endTime: Date;
	TeamAId: string | number;
	TeamBId: string | number;
	EventId: string | number;
	status: number;
	TeamAPlayers: EloValue[];
	TeamBPlayers: EloValue[];
	TeamAPlayersPrevious: EloValue[];
	TeamBPlayersPrevious: EloValue[];

	constructor(instance?) {
		super(instance);
	}
}

export class Player extends BaseModel {
	id: string | number;
	name: string;
	GameId: string | number;
	UserId: string | number;

	constructor(instance?) {
		super(instance);
	}
}

export class Team extends BaseModel {
	id: string | number;
	name: string;
	GameId: string | number;

	constructor(instance?) {
		super(instance);
	}
}