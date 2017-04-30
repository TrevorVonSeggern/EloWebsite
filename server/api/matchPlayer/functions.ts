import {CheckNumberParameter} from 'web-server-database/server/helper';
import {Match} from '../../../models/models';
import {processor} from '../../processor';
import {MatchPlayerServer} from '../../database/matchPlayer';
import {sessionUser} from 'web-user-management/server/auth/authStrategies';

export function getList(req, res) { // get
	let limit: number = CheckNumberParameter(req.query.limit);
	let skip: number = CheckNumberParameter(req.query.skip);

	MatchPlayerServer.all(limit, skip).then((items: Match[]) => {
		res.json(items);
	}, res.send);
}

export function getViewList(req, res) { // get
	let limit: number = CheckNumberParameter(req.query.limit);
	let skip: number = CheckNumberParameter(req.query.skip);
	// let user = sessionUser(req);
	MatchPlayerServer.viewAll('0', limit, skip).then((items: Match[]) => {
		res.json(items);
	}, res.send);
}

export function getOneItem(req, res) { // get
	MatchPlayerServer.getOneById(req.params.id).then((item: any) => {
		if (item === undefined || (item.length && item.length === 0))
			res.send({});
		else {
			let returnItem: any = {};
			if (item.length) {
				returnItem = item[0];
			} else {
				returnItem = new Match(item);
			}
			res.json(returnItem);
		}
	}, (error) => {
		console.log(error);
		req.send(error);
	});
}

export function getSize(req, res) { // get
	MatchPlayerServer.getCount().then((size) => {
		res.json({size: size});
	}, (error) => {
		res.send(error);
	});
}

function validateTeamSelectList(list) {
	if (!list)
		return [];
	for (let i = 0; i < list.length; ++i) {
		if (!list[i].hasOwnProperty('PlayerId')) {
			list.splice(i, 1);
			i--;
		}
	}
	if (Array.isArray(list)) {
		let good = true;
		for (let i = 0; i < list.length; ++i) {
			let item = list[i];
			if (!item.hasOwnProperty('PlayerId')) { // should remove bad items instead of completely fail.
				good = false;
				break;
			}
		}
		if (good)
			return list;
		return [];
	} else {
		return [];
	}
}

export function saveItem(req, res) {
	// put
	MatchPlayerServer.getOneById(req.body.id).then((item: MatchPlayerServer) => {
		item.startTime = req.body.startTime;
		item.endTime = req.body.endTime;
		item.TeamAPrevious = item.TeamAId;
		item.TeamBPrevious = item.TeamBId;
		item.TeamAId = req.body.TeamAId;
		item.TeamBId = req.body.TeamBId;
		item.EventId = req.body.EventId;
		item.winner = req.body.winner === 'true' || req.body.winner === true;
		item.TeamAPlayers = item.TeamAPlayers || [];
		item.TeamBPlayers = item.TeamBPlayers || [];
		item.TeamAPlayersPrevious = item.TeamAPlayersPrevious || [];
		item.TeamBPlayersPrevious = item.TeamBPlayersPrevious || [];

		for (let i = 0; i < item.TeamAPlayers.length; ++i) {
			item.TeamAPlayersPrevious.push(item.TeamAPlayers[i]);
		}
		for (let i = 0; i < item.TeamBPlayers.length; ++i) {
			item.TeamBPlayersPrevious.push(item.TeamBPlayers[i]);
		}
		item.TeamAPlayers = validateTeamSelectList(req.body.TeamAPlayers);
		item.TeamBPlayers = validateTeamSelectList(req.body.TeamBPlayers);

		item.save().then(() => {
			res.json({message: 'updated'});
		}, (error) => {
			res.json({error: true, message: error});
		});
	});
}

export function newItem(req, res) {
	// post
	let item = new MatchPlayerServer();
	item.startTime = req.body.startTime;
	item.endTime = req.body.endTime;
	item.TeamAPrevious = '';
	item.TeamBPrevious = '';
	item.TeamAId = req.body.TeamAId;
	item.TeamBId = req.body.TeamBId;
	item.EventId = req.body.EventId;
	item.winner = req.body.winner === 'true';
	item.TeamAPlayers = [];
	item.TeamBPlayers = [];
	item.TeamAPlayersPrevious = [];
	item.TeamBPlayersPrevious = [];
	item.TeamAPlayers = validateTeamSelectList(req.body.TeamAPlayers);
	item.TeamBPlayers = validateTeamSelectList(req.body.TeamBPlayers);

	item.save().then(() => {
		processor.checkElo();
		res.json(item);
	}, (err) => {
		res.send(err);
	});
}

export function deleteItem(req, res) { // deleteItem
	MatchPlayerServer.removeById(req.params.id).then(() => {
		res.json({error: false, message: 'item has been deleted.'});
	}, (error) => {
		res.json({error: true, message: error});
	});
}
