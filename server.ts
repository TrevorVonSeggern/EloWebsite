// Created by trevor on 3/14/17.
import {App} from 'web-server-database/server/App';
import {MatchPlayerRouter} from './server/api/matchPlayer/controller';
import {GameRouter} from './server/api/game/controller';
import {EventRouter} from './server/api/event/controller';
import {TeamRouter} from './server/api/team/controller';
import {PlayerRouter} from './server/api/player/controller';
import {MatchRouter} from './server/api/match/controller';
import * as userServer from 'web-user-management/server';

import {processor} from './server/processor';
let pro = new processor();

import {SyncDatabase} from 'web-server-database/server/database/sqlize';
import logs from "web-server-database/server/logs";

SyncDatabase();

App.APIModules.push({name: 'game', router: GameRouter});
App.APIModules.push({name: 'event', router: EventRouter});
App.APIModules.push({name: 'team', router: TeamRouter});
App.APIModules.push({name: 'player', router: PlayerRouter});
App.APIModules.push({name: 'match', router: MatchRouter});
App.APIModules.push({name: 'match_player', router: MatchPlayerRouter});

logs('started at time: ' + new Date().toString());

App.APIModules.concat(userServer.default.APIModules); // load the user management modules

if (process.cwd() === __dirname)
	App.listen();
