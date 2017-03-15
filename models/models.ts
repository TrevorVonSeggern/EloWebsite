// Created by trevor on 12/31/16.
import {mapObjectToObject, BaseModel} from 'web-base-model';

export class EloValue extends BaseModel {
	id: string = null;
	PlayerId: string = null;
	TeamId: string = null;
	MatchId: string = null;
	eloValue: number = null;

	constructor(instance?) {
		super(instance);
	}
}

export class Event extends BaseModel {
	id: string;
	name: string;
	startTime: Date;
	endTime: Date;
	GameId: string;
	comment: string;

	constructor(instance?) {
		super(instance);
	}
}

export class Game extends BaseModel {
	id: string;
	name: string;
	UserId: string;
	startValue: number;
	scale: number;

	constructor(instance?) {
		super(instance);
	}
}

export class Match extends BaseModel {
	id: string;
	startTime: Date;
	endTime: Date;
	TeamA: string;
	TeamB: string;
	EventId: string;
	status: number;
	winner: boolean;

	constructor(instance?) {
		super(instance);
	}
}

export class MatchPlayer extends Match {
	id: string;
	startTime: Date;
	endTime: Date;
	TeamA: string;
	TeamB: string;
	EventId: string;
	status: number;
	teamAPlayers: EloValue[];
	teamBPlayers: EloValue[];

	constructor(instance?) {
		super(instance);
	}
}

export class Player extends BaseModel {
	id: string;
	name: string;
	GameId: string;
	UserId: string;

	constructor(instance?) {
		super(instance);
	}
}

export class Team extends BaseModel {
	id: string;
	name: string;
	GameId: string;

	constructor(instance?) {
		super(instance);
	}
}