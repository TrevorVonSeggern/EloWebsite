import {CheckNumberParameter} from 'web-server-database/server/helper';
import {TeamServer} from '../../database/team';
import {Team} from '../../../models/models';
import {sessionUser} from 'web-user-management/server/auth/authStrategies';
import {MatchServer} from "../../database/match";
import {PlayerServer} from "../../database/player";
import {MatchPlayerServer} from "../../database/matchPlayer";
import {isNullOrUndefined} from "util";

export function getList(req, res) { // get
	let limit: number = CheckNumberParameter(req.query.limit);
	let skip: number = CheckNumberParameter(req.query.skip);
	let userId = sessionUser(req).id;
	if (req.query.GameId) {
		let gameId: string = req.query.GameId;

		TeamServer.allByGame(userId, gameId, limit, skip).then((items: Team[]) => {
			res.json(items);
		}, (error) => res.json({error: true, message: error}));
	}
	else {
		TeamServer.all(userId, limit, skip).then((items: Team[]) => {
			res.json(items);
		}, (error) => res.json({error: true, message: error}));
	}
}

export function getOneItem(req, res) { // get
	TeamServer.getOneById(req.params.id).then((item: TeamServer) => {
		if (!item)
			res.send({});
		else
			res.json(item);
	}, (error) => req.json({error: true, message: error}));
}

export function getSize(req, res) { // get
	TeamServer.getCount().then((size) => {
		res.json({size: size});
	}, (error) => res.json({error: true, message: error}));
}

export function pastPlayers(req, res) { // get
	let dateBefore: Date = new Date(req.query.date);
	let teamId: string | number = req.query.teamId;

	let error = (errorMsg) =>
		req.json({error: true, message: errorMsg});

	if(isNullOrUndefined(req.query.date) && isNullOrUndefined(teamId))
		return error('Date and TeamId are null');

	// Get the past match
	MatchServer.getMatchBeforeDate(dateBefore, teamId).then((m) => {
		if (isNullOrUndefined(m))
			return res.json([]);
		// Get players for team
		MatchPlayerServer.getOneById(m.id.toString()).then((match) => {
			let players: (string | number)[] = [];

			let eloP = match.TeamAPlayers;
			if (teamId != match.TeamAId)
				eloP = match.TeamBPlayers;

			for (let i = 0; i < eloP.length; ++i) {
				players.push(eloP[i].PlayerId);
			}

			res.json(players);
		}, error).catch(error);
	}, error).catch(error);

	// get the players for that match.

}

export function saveItem(req, res) {
	// put
	TeamServer.getOneById(req.body.id).then((item: TeamServer) => {
		item.name = req.body.name;
		item.GameId = req.body.GameId;

		item.save().then(() => {
			res.json({message: item.name + ' updated'});
		}, (error) => {
			res.json({error: true, message: error});
		});
	});
}

export function newItem(req, res) {
	// post
	let item = new TeamServer();
	item.name = req.body.name;
	item.GameId = req.body.GameId;

	item.save().then(() => {
		res.json(item);
	}, (err) => res.json({error: true, message: err}));
}

export function deleteItem(req, res) { // deleteItem
	TeamServer.removeById(req.params.id).then(() => {
		res.json({error: false, message: 'item has been deleted.'});
	}, (error) => res.json({error: true, message: error}));
}
