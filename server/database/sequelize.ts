import {sqlize, SyncDatabase as sd} from "web-server-database/server/database/sqlize";
import * as Sequelize from 'sequelize';
import {DBUser} from 'web-user-management/server/database/sequelize/models';
import * as path from 'path';
import * as process from 'process';

let game = sqlize.define('Game', {
	name: {type: Sequelize.STRING},
	startValue: {type: Sequelize.INTEGER},
	scale: {type: Sequelize.INTEGER},
});
game.belongsTo(DBUser);

let event = sqlize.define('Event', {
	name: {type: Sequelize.STRING},
	startTime: {type: Sequelize.DATE},
	endTime: {type: Sequelize.DATE},
	comment: {type: Sequelize.STRING},
});
event.belongsTo(game);

let team = sqlize.define('Team', {
	id: {type: Sequelize.INTEGER, autoIncrement: true,primaryKey: true},
	name: {type: Sequelize.STRING},
});
team.belongsTo(game);

let player = sqlize.define('Player', {
	id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
	name: {type: Sequelize.STRING},
});
player.belongsTo(game);
player.belongsTo(DBUser); // can be associated to a user.

let match = sqlize.define('Match', {
	id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
	name: {type: Sequelize.STRING},
	status: {type: Sequelize.INTEGER},
	startTime: {type: Sequelize.DATE},
	endTime: {type: Sequelize.DATE},
	winner: {type: Sequelize.BOOLEAN},
});
match.belongsTo(team, {as: 'TeamA'});
match.belongsTo(team, {as: 'TeamB'});
match.belongsTo(event);

let eloValue = sqlize.define('EloValue', {
	eloValue: {type: Sequelize.INTEGER},
});
eloValue.belongsTo(match);
eloValue.belongsTo(player);
eloValue.belongsTo(team);

player.hasMany(eloValue);

export function SyncDatabase() {
	sd();
}

// determine if it should sync
if (path.join(process.cwd(), '/server/database') == __dirname)
	SyncDatabase();

export let DBGame = game;
export let DBEvent = event;
export let DBTeam = team;
export let DBPlayer = player;
export let DBMatch = match;
export let DBEloValue = eloValue;



export function helperFunction_createIfNotExists (ServerClass, toCreate): Promise<boolean> {
	return new Promise<boolean>((resolve, reject) => {
		let create = function () {
			toCreate.create().then(() => {
				resolve(true);
			}, reject);
		};
		if (!toCreate.id)
			return create();
		ServerClass.getOneById(toCreate.id).then((item) => {
			if (item)
				return resolve(false);
			create();
		}, reject)

	});
}
