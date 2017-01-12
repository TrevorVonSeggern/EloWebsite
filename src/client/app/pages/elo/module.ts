// Created by trevor on 12/31/16.

import IModule = angular.IModule;
import {DefinitionRouter} from "../../Definition";
import {eloDefinition} from "./eloDefinition";

import {EventModule} from "./event/module";
import {TeamModule} from "./team/module";
import {GameModule} from "./game/module";
import {PlayerModule} from "./player/module";

let module: any = angular.module('elo', [
	EventModule.name,
	GameModule.name,
	TeamModule.name,
	PlayerModule.name,
]);

export let EloModule = module;

export function loadEloRouter(stateProvider) {
	stateProvider.state('gameCreate', new DefinitionRouter('/game/create', eloDefinition.gameCreate));
	stateProvider.state('gameEdit', new DefinitionRouter('/game/edit/:id', eloDefinition.gameEdit));
	stateProvider.state('game', new DefinitionRouter('/game', eloDefinition.game));
	stateProvider.state('gameDetail', new DefinitionRouter('/game/:id', eloDefinition.gameDetail));

	stateProvider.state('eventCreate', new DefinitionRouter('/event/create', eloDefinition.eventCreate));
	stateProvider.state('eventEdit', new DefinitionRouter('/event/edit/:id', eloDefinition.eventEdit));
	stateProvider.state('event', new DefinitionRouter('/event', eloDefinition.event));
	stateProvider.state('eventDetail', new DefinitionRouter('/event/:id', eloDefinition.eventDetail));

	stateProvider.state('teamCreate', new DefinitionRouter('/team/create', eloDefinition.teamCreate));
	stateProvider.state('teamEdit', new DefinitionRouter('/team/edit/:id', eloDefinition.teamEdit));
	stateProvider.state('team', new DefinitionRouter('/team', eloDefinition.team));
	stateProvider.state('teamDetail', new DefinitionRouter('/team/:id', eloDefinition.teamDetail));

	stateProvider.state('playerCreate', new DefinitionRouter('/player/create', eloDefinition.playerCreate));
	stateProvider.state('playerEdit', new DefinitionRouter('/player/edit/:id', eloDefinition.playerEdit));
	stateProvider.state('player', new DefinitionRouter('/player', eloDefinition.player));
	stateProvider.state('playerDetail', new DefinitionRouter('/player/:id', eloDefinition.playerDetail));

}