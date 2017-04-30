import {Event} from '../../../models/models';
import {EventServer} from '../../database/event';
import {CheckNumberParameter} from 'web-server-database/server/helper';
import {sessionUser} from 'web-user-management/server/auth/authStrategies';

export function getList(req, res) { // get
	let limit: number = CheckNumberParameter(req.query.limit);
	let skip: number = CheckNumberParameter(req.query.skip);
	let gameId: string = req.query.gameId;
	if(gameId) {
		EventServer.allByGame(gameId, limit, skip).then((items: Event[]) => {
			res.json(items);
		}, (error) => res.json({error: true, message: error}));
	}
	else {
		EventServer.all(sessionUser(req).id, limit, skip).then((items: Event[]) => {
			res.json(items);
		}, (error) => res.json({error: true, message: error}));
	}
}

export function getOneItem(req, res) { // get
	EventServer.getOneById(req.params.id).then((item: EventServer) => {
		if (!item)
			res.send({});
		else {
			res.json(item);
		}
	}, (error) => {
		console.log(error);
		req.send(error);
	});
}

export function getSize(req, res) { // get
	EventServer.getCount().then((size) => {
		res.json({size: size});
	}, (error) => {
		res.send(error);
	});
}

export function saveItem(req, res) {
	// put
	EventServer.getOneById(req.body.id).then((item: EventServer) => {
		item.name = req.body.name;
		item.startTime = req.body.startTime;
		item.endTime = req.body.endTime;
		item.GameId = req.body.GameId;
		item.comment = req.body.comment;

		item.save().then(() => {
			res.json({message: 'updated'});
		}, (error) => {
			res.send(error);
		});
	});
}

export function newItem(req, res) {
	// post
	let item = new EventServer();
	item.name = req.body.name;
	item.startTime = req.body.startTime;
	item.endTime = req.body.endTime;
	item.comment = req.body.comment;
	item.GameId = req.body.GameId;

	item.save().then(() => {
		res.json(item);
	}, (err) => {
		res.send(err);
	});
}

export function deleteItem(req, res) { // deleteItem
	EventServer.removeById(req.params.id).then(() => {
		res.json({error: false, message: 'item has been deleted.'});
	}, (error) => {
		res.json({error: true, message: error});
	});
}
