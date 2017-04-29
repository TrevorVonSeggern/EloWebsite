import * as angular from 'angular';
import * as um from 'web-user-management/user/module';
import {IRouter} from "web-angularjs-component-definition/IRouter";
import {definition} from "./definition";
import {MatchModule} from "./app/match/module";
import {PlayerModule} from "./app/player/module";
import {TeamModule} from "./app/team/module";
import {GameModule} from "./app/game/module";
import {EventModule} from "./app/event/module";

import {InputSwitchModule} from "web-input-switch/index";
import {} from 'web-chart';

export let EloModule = angular.module('elo-module', [
	InputSwitchModule.name,
	EventModule.name,
	GameModule.name,
	TeamModule.name,
	PlayerModule.name,
	MatchModule.name,
]);

export let LoadRouter = function (stateProvider, $urlRouterProvider) {
	um.loadRouter(stateProvider, $urlRouterProvider); // user management states.

	// elo states.
	stateProvider.state('game-create', new IRouter('/game/create', definition.gameCreate));
	stateProvider.state('game-edit', new IRouter({url: '/game/edit/{id}', params: {id: {}}}, definition.gameEdit));
	stateProvider.state('game-detail', new IRouter({url: '/game/{id}', params: {id: {}}}, definition.gameDetail));
	stateProvider.state('game', new IRouter('/game', definition.game));

	stateProvider.state('event-create', new IRouter('/event/create', definition.eventCreate));
	stateProvider.state('event-edit', new IRouter({url: '/event/edit/{id}', params: {id: {}}}, definition.eventEdit));
	stateProvider.state('event-detail', new IRouter({url: '/event/{id}', params: {id: {}}}, definition.eventDetail));
	stateProvider.state('event', new IRouter('/event', definition.event));

	stateProvider.state('team-create', new IRouter('/team/create', definition.teamCreate));
	stateProvider.state('team-edit', new IRouter({url: '/team/edit/{id}', params: {id: {}}}, definition.teamEdit));
	stateProvider.state('team-detail', new IRouter({url: '/team/{id}', params: {id: {}}}, definition.teamDetail));
	stateProvider.state('team', new IRouter('/team', definition.team));

	stateProvider.state('player-create', new IRouter('/player/create', definition.playerCreate));
	stateProvider.state('player-edit', new IRouter({
		url: '/player/edit/{id}',
		params: {id: {}}
	}, definition.playerEdit));
	stateProvider.state('player-detail', new IRouter({url: '/player/{id}', params: {id: {}}}, definition.playerDetail));
	stateProvider.state('player', new IRouter('/player', definition.player));

	stateProvider.state('match-create', new IRouter('/match/create', definition.matchCreate));
	stateProvider.state('match-edit', new IRouter({url: '/match/edit/{id}', params: {id: {}}}, definition.matchEdit));
	stateProvider.state('match-detail', new IRouter({url: '/match/{id}', params: {id: {}}}, definition.matchDetail));
	stateProvider.state('match', new IRouter('/match', definition.match));
};