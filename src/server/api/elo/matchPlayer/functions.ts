// Created by trevor on 12/31/16.


import {CheckNumberParameter} from "../../commonFunctions";
import {Match} from "../../../database/Elo/match";
import {MatchModel} from "../../../../models/Elo/match";
import {mapObjectToObject} from "../../../database/Base/Model";
import {MatchPlayer} from "../../../database/Elo/matchPlayer";

export function getList(req, res) { // get
	let limit: number = CheckNumberParameter(req.query.limit);
	let skip: number = CheckNumberParameter(req.query.skip);

	Match.all(limit, skip).then((items: MatchModel[]) => {
		res.json(items);
	}, res.send);
}

export function getViewList(req, res) { // get
	let limit: number = CheckNumberParameter(req.query.limit);
	let skip: number = CheckNumberParameter(req.query.skip);

	Match.viewAll(limit, skip).then((items: MatchModel[]) => {
		res.json(items);
	}, res.send);
}

export function getOneItem(req, res) { // get
	MatchPlayer.getOneById(req.params._id).then((item: any) => {
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
	Match.getCount().then((size) => {
		res.json({size: size});
	}, (error) => {
		res.send(error);
	});
}

function validateTeamSelectList(list) {
	if (!list)
		return [];
	for (let i = 0; i < list.length; ++i) {
		if (!list[i]['playerId']) {
			list.splice(i, 1);
			i--;
		}
	}
	if (Array.isArray(list)) {
		let good = true;
		for (let i = 0; i < list.length; ++i) {
			let item = list[i];
			if (!item['playerId']) { // should remove bad items instead of completely fail.
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
	MatchPlayer.getOneById(req.body._id).then((item: MatchPlayer) => {
		item.startTime = req.body.startTime;
		item.endTime = req.body.endTime;
		item.teamAPrevious = item.teamA;
		item.teamBPrevious = item.teamB;
		item.teamA = req.body.teamA;
		item.teamB = req.body.teamB;
		item.eventId = req.body.eventId;
		item.winner = req.body.winner === 'true';
		for (let i = 0; i < item.teamAPlayers.length; ++i) {
			item.teamAPlayersPrevious.push(item.teamAPlayers[i]);
		}
		for (let i = 0; i < item.teamBPlayers.length; ++i) {
			item.teamBPlayersPrevious.push(item.teamBPlayers[i]);
		}
		item.teamAPlayers = validateTeamSelectList(req.body.teamAPlayers);
		item.teamBPlayers = validateTeamSelectList(req.body.teamBPlayers);

		item.save().then(() => {
			res.json({message: item._id + ' updated'});
		}, (error) => {
			res.send(error);
		});
	});
}

export function newItem(req, res) {
	// post
	let item = new MatchPlayer();
	item.startTime = req.body.startTime;
	item.endTime = req.body.endTime;
	item.teamAPrevious = '';
	item.teamBPrevious = '';
	item.teamA = req.body.teamA;
	item.teamB = req.body.teamB;
	item.eventId = req.body.eventId;
	item.winner = req.body.winner === 'true';
	item.teamAPlayersPrevious = [];
	item.teamBPlayersPrevious = [];
	item.teamAPlayers = validateTeamSelectList(req.body.teamAPlayers);
	item.teamBPlayers = validateTeamSelectList(req.body.teamBPlayers);

	item.save().then((savedItem: Match) => {
		res.json(savedItem);
	}, (err) => {
		res.send(err);
	});
}

export function deleteItem(req, res) { // deleteItem
	let item = new Match();
	item.removeById(req.params._id).then(() => {
		res.json({error: false, message: 'item has been deleted.'});
	}, (error) => {
		res.json({error: true, message: error});
	});
}