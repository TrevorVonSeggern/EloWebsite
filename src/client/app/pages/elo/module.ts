// Created by trevor on 12/31/16.

import IModule = angular.IModule;
import {GameModule} from "./game/module";
import {DefinitionRouter} from "../../Definition";
import {eloDefinition} from "./eloDefinition";
import {EventModule} from "./event/module";

let module: any = angular.module('elo', [
	EventModule.name,
	GameModule.name,
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
	
	
}