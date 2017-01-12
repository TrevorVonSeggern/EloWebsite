// Created by trevor on 12/31/16.

import {IComponent} from "../../IComponent";

class definition {
	game: IComponent = new IComponent('game', 'pages/elo/game/');
	gameCreate: IComponent = new IComponent('gameCreate', 'pages/elo/game/item/create');
	gameDetail: IComponent = new IComponent('gameDetail', 'pages/elo/game/item/detail');
	gameEdit: IComponent = new IComponent('gameEdit', 'pages/elo/game/item/edit');
	gameList: IComponent = new IComponent('gameList', 'pages/elo/game/list/multiple');
	gameListSingle: IComponent = new IComponent('gameListSingle', 'pages/elo/game/list/single');

	event: IComponent = new IComponent('event', 'pages/elo/event/');
	eventCreate: IComponent = new IComponent('eventCreate', 'pages/elo/event/item/create');
	eventDetail: IComponent = new IComponent('eventDetail', 'pages/elo/event/item/detail');
	eventEdit: IComponent = new IComponent('eventEdit', 'pages/elo/event/item/edit');
	eventList: IComponent = new IComponent('eventList', 'pages/elo/event/list/multiple');
	eventListSingle: IComponent = new IComponent('eventListSingle', 'pages/elo/event/list/single');

	team: IComponent = new IComponent('team', 'pages/elo/team/');
	teamCreate: IComponent = new IComponent('teamCreate', 'pages/elo/team/item/create');
	teamDetail: IComponent = new IComponent('teamDetail', 'pages/elo/team/item/detail');
	teamEdit: IComponent = new IComponent('teamEdit', 'pages/elo/team/item/edit');
	teamList: IComponent = new IComponent('teamList', 'pages/elo/team/list/multiple');
	teamListSingle: IComponent = new IComponent('teamListSingle', 'pages/elo/team/list/single');

	player: IComponent = new IComponent('player', 'pages/elo/player/');
	playerCreate: IComponent = new IComponent('playerCreate', 'pages/elo/player/item/create');
	playerDetail: IComponent = new IComponent('playerDetail', 'pages/elo/player/item/detail');
	playerEdit: IComponent = new IComponent('playerEdit', 'pages/elo/player/item/edit');
	playerList: IComponent = new IComponent('playerList', 'pages/elo/player/list/multiple');
	playerListSingle: IComponent = new IComponent('playerListSingle', 'pages/elo/player/list/single');

	match: IComponent = new IComponent('match', 'pages/elo/match/');
	matchCreate: IComponent = new IComponent('matchCreate', 'pages/elo/match/item/create');
	matchDetail: IComponent = new IComponent('matchDetail', 'pages/elo/match/item/detail');
	matchEdit: IComponent = new IComponent('matchEdit', 'pages/elo/match/item/edit');
	matchList: IComponent = new IComponent('matchList', 'pages/elo/match/list/multiple');
	matchListSingle: IComponent = new IComponent('matchListSingle', 'pages/elo/match/list/single');

	constructor() {
	}
}

export let eloDefinition = new definition();