import * as fs from 'fs';
import * as path from 'path';
import {MatchServer} from "../server/database/match";
import {TeamServer} from "../server/database/team";
import {GameServer} from "../server/database/game";
import {EventServer} from "../server/database/event";
import {PlayerServer} from "../server/database/player";
import {EloValueServer} from "../server/database/eloValue";

// read the input file.
let file = fs.readFileSync(path.join(__dirname, 'basketball', 'basketball.csv'), 'utf8');
let lines = file.split('\n');

let game = new GameServer({id: 1, name: 'Basketball', startValue: 1200, scale: 17});
let event = new EventServer({id: 1, name: 'Basketball', GameId: game.id});

game.createIfNotExists().then(() => {
	event.createIfNotExists().then(() => {
		parseAllLines();
	});
});

function parseAllLines() {
	let lookAtOne = (i: number = 0) => {
		if (i < lines.length) {
			if (lines[i] !== "") {
				parseLine(lines[i]).then(() => {
					lookAtOne(i + 1);
				}, (error: string) => {
					console.log(error);
					lookAtOne(i + 1);
				});
			}
		}
	};
	lookAtOne(0);
}

function parseLine(line: string): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		let parts = line.split(',');
		parts[0] = parts[0].split('\t')[1];
		// get matchId
		let m = new MatchServer();
		m.id = parts[0];
		m.startTime = new Date(parseInt(parts[1]), parseInt(parts[2]), parseInt(parts[3]));
		m.endTime = m.startTime;
		m.winner = parseInt(parts[5]) > parseInt(parts[9]);
		m.EventId = event.id;
		m.status = 1;

		let home = new TeamServer();
		home.id = parts[4];
		home.name = parts[4];
		home.GameId = game.id;
		let away = new TeamServer();
		away.id = parts[8];
		away.name = parts[8];
		away.GameId = game.id;
		let limit = 2;

		away.createIfNotExists().then(() => checkLimit(), checkLimit);
		home.createIfNotExists().then(() => checkLimit(), checkLimit);

		function parsePlayerData(): Promise<void> {
			return new Promise<void>((resolve, reject) => {
				let awayStartIndex = 0;
				for (let i = 13; i < parts.length; ++i) {
					if (parts[i] == away.id) {
						awayStartIndex = i;
						break;
					}
				}
				awayStartIndex++;

				let players: PlayerServer[] = [];
				let eloValues: EloValueServer[] = [];

				for (let i = 13; i < awayStartIndex - 1; i += 3) {
					let player = new PlayerServer();
					player.id = parts[i];
					player.name = parts[i];
					player.GameId = game.id;
					let elo = new EloValueServer();
					elo.MatchId = m.id;
					elo.TeamId = home.id;
					elo.eloValue = parseInt(parts[i + 2]);
					elo.PlayerId = player.id;

					players.push(player);
					eloValues.push(elo);
				}

				for (let i = awayStartIndex; i < parts.length; i += 3) {
					let player = new PlayerServer();
					player.id = parts[i];
					player.name = parts[i];
					player.GameId = game.id;
					let elo = new EloValueServer();
					elo.MatchId = m.id;
					elo.TeamId = away.id;
					elo.eloValue = parseInt(parts[i + 2]);
					elo.PlayerId = player.id;

					players.push(player);
					eloValues.push(elo);
				}

				let playerLimit = players.length;

				function checkPlayerLimit() {
					playerLimit--;
					if (playerLimit <= 0) {
						resolve();
					}
				}

				function processPlayerElo(player: PlayerServer, elo: EloValueServer) {
					player.createIfNotExists().then(() => {
						elo.create().then(checkPlayerLimit, reject);
					}, reject);
				}

				for (let i = 0; i < playerLimit; ++i) {
					processPlayerElo(players[i], eloValues[i]);
				}
			});
		}

		function checkLimit() {
			limit--;
			if (limit <= 0) {
				m.TeamAId = home.id;
				m.TeamBId = away.id;
				m.createIfNotExist().then((created: boolean) => {
					if (!created)
						return;
					parsePlayerData().then(() => {
						console.log('m: ' + m.id);
						resolve();
					}, () => {
						reject();
						console.log('error creating match...');
					});
				});
			}
		}
	});

}


