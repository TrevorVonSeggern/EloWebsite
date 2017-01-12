// Created by trevor on 12/31/16.


import {CheckNumberParameter} from "../../commonFunctions";
import {Match} from "../../../database/Elo/match";
import {MatchModel} from "../../../../models/Elo/match";
import {mapObjectToObject} from "../../../database/Base/Model";

export function getList(req, res) { // get
	let limit: number = CheckNumberParameter(req.query.limit);
	let skip: number = CheckNumberParameter(req.query.skip);

	Match.all(limit, skip).then((items: MatchModel[]) => {
		res.json(items);
	}, res.send);
}

export function getOneItem(req, res) { // get
	Match.getOneById(req.params._id).then((item: any) => {
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

export function saveItem(req, res) {
	// put
	Match.getOneById(req.body._id).then((item: Match) => {
		item.startTime = req.body.startTime;
		item.endTime = req.body.endTime;
		item.teamA = req.body.teamA;
		item.teamB = req.body.teamB;
		item.eventId = req.body.eventId;
		item.winner = req.body.winner === 'true';

		item.save().then(() => {
			res.json({message: item._id + ' updated'});
		}, (error) => {
			res.send(error);
		});
	});
}

export function newItem(req, res) {
	// post
	let item = new Match();
	item.startTime = req.body.startTime;
	item.endTime = req.body.endTime;
	item.teamA = req.body.teamA;
	item.teamB = req.body.teamB;
	item.eventId = req.body.eventId;
	item.status = 0;
	item.winner = req.body.winner === 'true';

	item.save().then((savedItem: Match) => {
		let prepareToSend = <MatchModel>{};
		mapObjectToObject(savedItem, prepareToSend);
		res.json(prepareToSend);
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
