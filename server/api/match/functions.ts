// Created by trevor on 12/31/16.


import {CheckNumberParameter} from "web-server-database/server/helper";
import {MatchServer} from "../../database/match";
import {Match} from "../../../models/models";
import {processor} from "../../processor";

export function getList(req, res) { // get
	let limit: number = CheckNumberParameter(req.query.limit);
	let skip: number = CheckNumberParameter(req.query.skip);

	MatchServer.all(limit, skip).then((items: Match[]) => {
		res.json(items);
	}, res.send);
}

export function getViewList(req, res) {
	let limit: number = CheckNumberParameter(req.query.limit);
	let skip: number = CheckNumberParameter(req.query.skip);

	MatchServer.all(limit, skip).then((items: Match[]) => {
		res.json(items);
	}, res.send);
}

export function getOneItem(req, res) {
	MatchServer.getOneById(req.params.id).then((item: MatchServer) => {
		if (!item)
			res.json({});
		else
			res.json(item);
	}, (error) => req.json({error: true, message: error}));
}

export function getSize(req, res) {
	MatchServer.getCount().then((size) => res.json({size: size}), (error) => res.send(error));
}

export function saveItem(req, res) {
	// put
	MatchServer.getOneById(req.body.id).then((item: MatchServer) => {
		item.startTime = req.body.startTime;
		item.endTime = req.body.endTime;
		item.TeamAId = req.body.TeamAId;
		item.TeamBId = req.body.TeamBId;
		item.EventId = req.body.EventId;
		item.winner = req.body.winner === 'true';

		item.save().then(() => {
			processor.checkElo();
			res.json({message: item.id + ' updated'});
		}, (error) => res.json({error: true, message: error}));
	});
}

export function newItem(req, res) {
	// post
	let item = new MatchServer();
	item.startTime = req.body.startTime;
	item.endTime = req.body.endTime;
	item.TeamAId = req.body.TeamAId;
	item.TeamBId = req.body.TeamBId;
	item.EventId = req.body.EventId;
	item.status = 0;
	item.winner = req.body.winner === 'true';

	item.save().then(() => {
		res.json(item);
	}, (err) => {
		res.send(err);
	});
}

export function deleteItem(req, res) { // deleteItem
	MatchServer.removeById(req.params._id).then(() => {
		res.json({error: false, message: 'item has been deleted.'});
	}, (error) => {
		res.json({error: true, message: error});
	});
}
