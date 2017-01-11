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

	constructor() {
	}
}

export let eloDefinition = new definition();