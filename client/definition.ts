// Created by trevor on 12/31/16.

import {IComponent} from 'web-angularjs-component-definition/IComponent';

let rootDir = 'client/app/';

export class Definition {
	game: IComponent = new IComponent('game', rootDir + 'game');
	gameCreate: IComponent = new IComponent('gameCreate', rootDir + 'game/item/create');
	gameDetail: IComponent = new IComponent('gameDetail', rootDir + 'game/item/detail');
	gameEdit: IComponent = new IComponent('gameEdit', rootDir + 'game/item/edit');
	gameList: IComponent = new IComponent('gameList', rootDir + 'game/list/multiple');
	gameListSingle: IComponent = new IComponent('gameListSingle', rootDir + 'game/list/single');

	event: IComponent = new IComponent('event', rootDir + 'event/');
	eventCreate: IComponent = new IComponent('eventCreate', rootDir + 'event/item/create');
	eventDetail: IComponent = new IComponent('eventDetail', rootDir + 'event/item/detail');
	eventEdit: IComponent = new IComponent('eventEdit', rootDir + 'event/item/edit');
	eventList: IComponent = new IComponent('eventList', rootDir + 'event/list/multiple');
	eventListSingle: IComponent = new IComponent('eventListSingle', rootDir + 'event/list/single');

	team: IComponent = new IComponent('team', rootDir + 'team/');
	teamCreate: IComponent = new IComponent('teamCreate', rootDir + 'team/item/create');
	teamDetail: IComponent = new IComponent('teamDetail', rootDir + 'team/item/detail');
	teamEdit: IComponent = new IComponent('teamEdit', rootDir + 'team/item/edit');
	teamList: IComponent = new IComponent('teamList', rootDir + 'team/list/multiple');
	teamListSingle: IComponent = new IComponent('teamListSingle', rootDir + 'team/list/single');

	player: IComponent = new IComponent('player', rootDir + 'player/');
	playerCreate: IComponent = new IComponent('playerCreate', rootDir + 'player/item/create');
	playerDetail: IComponent = new IComponent('playerDetail', rootDir + 'player/item/detail');
	playerEdit: IComponent = new IComponent('playerEdit', rootDir + 'player/item/edit');
	playerList: IComponent = new IComponent('playerList', rootDir + 'player/list/multiple');
	playerListSingle: IComponent = new IComponent('playerListSingle', rootDir + 'player/list/single');

	match: IComponent = new IComponent('match', rootDir + 'match/');
	matchCreate: IComponent = new IComponent('matchCreate', rootDir + 'match/item/create');
	matchDetail: IComponent = new IComponent('matchDetail', rootDir + 'match/item/detail');
	matchEdit: IComponent = new IComponent('matchEdit', rootDir + 'match/item/edit');
	matchList: IComponent = new IComponent('matchList', rootDir + 'match/list/multiple');
	matchListSingle: IComponent = new IComponent('matchListSingle', rootDir + 'match/list/single');

	constructor() {
	}
}

export let definition = new Definition();