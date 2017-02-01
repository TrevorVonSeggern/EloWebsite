// Created by trevor on 12/31/16.


import {CheckNumberParameter} from "../../commonFunctions";
import {Event, EventSchema} from "../../../database/Elo/event";
import {EventModel} from "../../../../models/Elo/event";
import {mapObjectToObject} from "../../../database/Base/Model";

export function getList(req, res) { // get
	let limit: number = CheckNumberParameter(req.query.limit);
	let skip: number = CheckNumberParameter(req.query.skip);
	let gameId: string = req.query.gameId;

	Event.allByGame(gameId, limit, skip).then((items: EventModel[]) => {
		res.json(items);
	}, res.send);
}

export function getViewList(req, res) { // get
	let limit: number = CheckNumberParameter(req.query.limit);
	let skip: number = CheckNumberParameter(req.query.skip);
	let gameId: string = req.query.gameId;

	Event.viewAllByGame(gameId, limit, skip).then((items: EventModel[]) => {
		res.json(items);
	}, res.send);
}

export function getOneItem(req, res) { // get
	Event.getOneById(req.params._id).then((item: any) => {
		if (item === undefined || (item.length && item.length === 0))
			res.send({});
		else {
			let returnUser: any = {};
			if (item.length) {
				returnUser = item[0];
			} else {
				mapObjectToObject(item, returnUser);
			}
			res.json(returnUser);
		}
	}, (error) => {
		console.log(error);
		req.send(error);
	});
}

export function getSize(req, res) { // get
	Event.getCount().then((size) => {
		res.json({size: size});
	}, (error) => {
		res.send(error);
	});
}

export function saveItem(req, res) {
	// put
	Event.getOneById(req.body._id).then((item: Event) => {
		item.name = req.body.name;
		item.startTime = req.body.startTime;
		item.endTime = req.body.endTime;
		item.gameId = req.body.gameId;
		item.comment = req.body.comment;

		item.save().then(() => {
			res.json({message: item.name + ' updated'});
		}, (error) => {
			res.send(error);
		});
	});
}

export function newItem(req, res) {
	// post
	let item = new Event();
	item.name = req.body.name;
	item.startTime = req.body.startTime;
	item.endTime = req.body.endTime;
	item.gameId = req.body.gameId;
	item.comment = req.body.comment;
	item.userId = req.userId;


	item.save().then((savedItem: Event) => {
		let prepareToSend = <EventModel>{};
		mapObjectToObject(savedItem, prepareToSend);
		res.json(prepareToSend);
	}, (err) => {
		res.send(err);
	});
}

export function deleteItem(req, res) { // deleteItem
	let item = new Event();
	item.removeById(req.params._id).then(() => {
		res.json({error: false, message: 'item has been deleted.'});
	}, (error) => {
		res.json({error: true, message: error});
	});
}