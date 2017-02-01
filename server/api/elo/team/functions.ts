// Created by trevor on 12/31/16.


import {CheckNumberParameter} from "../../commonFunctions";
import {Team, TeamSchema} from "../../../database/Elo/team";
import {TeamModel} from "../../../../models/Elo/team";
import {mapObjectToObject} from "../../../database/Base/Model";

export function getList(req, res) { // get
	let limit: number = CheckNumberParameter(req.query.limit);
	let skip: number = CheckNumberParameter(req.query.skip);
	let gameId: string = req.query.gameId;

	Team.allByGame(gameId, limit, skip).then((items: TeamModel[]) => {
		res.json(items);
	}, res.send);
}

export function getOneItem(req, res) { // get
	Team.getOneById(req.params._id).then((item: any) => {
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
	Team.getCount().then((size) => {
		res.json({size: size});
	}, (error) => {
		res.send(error);
	});
}

export function saveItem(req, res) {
	// put
	Team.getOneById(req.body._id).then((item: Team) => {
		item.name = req.body.name;
		item.gameId = req.body.gameId;

		item.save().then(() => {
			res.json({message: item.name + ' updated'});
		}, (error) => {
			res.send(error);
		});
	});
}

export function newItem(req, res) {
	// post
	let item = new Team();
	item.name = req.body.name;
	item.gameId = req.body.gameId;

	item.save().then((savedItem: Team) => {
		let prepareToSend = <TeamModel>{};
		mapObjectToObject(savedItem, prepareToSend);
		res.json(prepareToSend);
	}, (err) => {
		res.send(err);
	});
}

export function deleteItem(req, res) { // deleteItem
	let item = new Team();
	item.removeById(req.params._id).then(() => {
		res.json({error: false, message: 'item has been deleted.'});
	}, (error) => {
		res.json({error: true, message: error});
	});
}
