// Created by trevor on 12/31/16.

import {CheckNumberParameter} from 'web-server-database/server/helper';
import {GameServer} from '../../database/game';
import {Game} from '../../../models/models';
import {MatchServer} from '../../database/match';
import {processor} from '../../processor';
import logs from "web-server-database/server/logs";

export function getList(req, res) { // get
	let limit: number = CheckNumberParameter(req.query.limit);
	let skip: number = CheckNumberParameter(req.query.skip);

	GameServer.all(limit, skip).then((items: Game[]) => {
		res.json(items);
	}, res.send);
}

export function getOneItem(req, res) { // get
	GameServer.getOneById(req.params.id).then((item: GameServer) => {
		if (!item)
			res.send({});
		else
			res.json(item);
	}, (error) => {
		console.log(error);
		req.send(error);
	});
}

export function processEloGame(req, res) { // get
	GameServer.getOneById(req.params.id).then((game: GameServer) => {
		if (game === undefined)
			return res.send({error: true, message: 'Could not retrieve the game.'});
		processor.checkElo();

		res.json({error: false, message: 'updated elo for gameId: ' + game.id});
	}, (error) => {
		logs(error);
		req.send(error);
	});
}

export function getSize(req, res) { // get
	GameServer.getCount().then((size) => {
		res.json({size: size});
	}, (error) => {
		res.send(error);
	});
}

export function saveItem(req, res) {
	// put
	GameServer.getOneById(req.body.id).then((item: GameServer) => {
		item.name = req.body.name;

		if (item.startValue !== req.body.startValue || item.scale !== req.body.scale) {
			item.startValue = req.body.startValue;
			item.scale = req.body.scale;

			// set all the match statuses to 0 for processing purposes.
			MatchServer.setAllStatus(item.id).then(() => {
				processor.checkElo();
			}, (error: string) => {
				console.log(error);
			});
		}

		item.save().then(
			() => res.json({message: item.name + ' updated'}),
			(error) => res.json({error: true, message: error}));

	});
}

export function newItem(req, res) {
	// post
	let item = new GameServer();
	item.name = req.body.name;
	item.startValue = req.body.startValue;
	item.scale = req.body.scale;
	item.UserId = req.UserId;


	item.save().then(() => {
		res.json(item);
	}, (err) => res.json({error: true, message: err}));
}

export function deleteItem(req, res) { // deleteItem
	GameServer.removeById(req.params.id).then(() => {
		res.json({error: false, message: 'item has been deleted.'});
	}, (error) => {
		res.json({error: true, message: error});
	});
}
