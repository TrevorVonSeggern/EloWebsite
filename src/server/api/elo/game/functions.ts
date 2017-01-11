// Created by trevor on 12/31/16.

import {CheckNumberParameter} from "../../commonFunctions";
import {Game} from "../../../database/Elo/game";
import {GameModel} from "../../../../models/Elo/game";
import {mapObjectToObject} from "../../../database/Base/Model";
import {Match} from "../../../database/Elo/match";

export function getList(req, res) { // get
	let limit: number = CheckNumberParameter(req.query.limit);
	let skip: number = CheckNumberParameter(req.query.skip);

	Game.all(limit, skip).then((items: GameModel[]) => {
		res.json(items);
	}, res.send);
}

export function getOneItem(req, res) { // get
	Game.getOneById(req.params._id).then((item: any) => {
		if (item === undefined || (item.length && item.length === 0))
			res.send({});
		else {
			let returnUser: any = {};
			if (item.length) {
				returnUser = item[0];
			} else {
				mapObjectToObject(item, returnUser);
			}
			returnUser.password = '';
			res.json(returnUser);
		}
	}, (error) => {
		console.log(error);
		req.send(error);
	});
}

export function getSize(req, res) { // get
	Game.getCount().then((size) => {
		res.json({size: size});
	}, (error) => {
		res.send(error);
	});
}

export function saveItem(req, res) {
	// put
	Game.getOneById(req.body._id).then((item: Game) => {
		item.name = req.body.name;

		if (item.startValue !== req.body.startValue || item.scale !== req.body.scale) {
			item.startValue = req.body.startValue;
			item.scale = req.body.scale;
			// set all the match statuses to 0 for processing purposes.
			Match.setAllStatus(item._id).then(() => {
			}, (error: string) => {
				console.log(error);
			});
		}

		item.save().then(() => {
			res.json({message: item.name + ' updated'});
		}, (error) => {
			res.send(error);
		});

	});
}

export function newItem(req, res) {
	// post
	let item = new Game();
	item.name = req.body.name;
	item.startValue = req.body.startValue;
	item.scale = req.body.scale;
	item.userId = req.userId;


	item.save().then((savedItem: Game) => {
		let prepareToSend = <GameModel>{};
		mapObjectToObject(savedItem, prepareToSend);
		res.json(prepareToSend);
	}, (err) => {
		res.send(err);
	});
}

export function deleteItem(req, res) { // deleteItem
	let item = new Game();
	item.removeById(req.params._id).then(() => {
		res.json({error: false, message: 'item has been deleted.'});
	}, (error) => {
		res.json({error: true, message: error});
	});
}
