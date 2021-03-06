import {CheckNumberParameter} from 'web-server-database/server/helper';
import {PlayerServer} from '../../database/player';
import {Player} from '../../../models/models';
import {sessionUser} from 'web-user-management/server/auth/authStrategies';
import {EloValueServer} from "../../database/eloValue";

export function getList(req, res) { // get
	let limit: number = CheckNumberParameter(req.query.limit);
	let skip: number = CheckNumberParameter(req.query.skip);
	let gameId: string = req.query.GameId;
	let userId = sessionUser(req);

	if (gameId)
		PlayerServer.allByGame(userId, gameId, limit, skip).then((items: Player[]) => {
			res.json(items);
		}, (error) => res.json({error: true, message: error}));
	else
		PlayerServer.all(userId, limit, skip).then((items: Player[]) => {
			res.json(items);
		}, (error) => res.json({error: true, message: error}));
}

export function getOneItem(req, res) { // get
	PlayerServer.getOneById(req.params.id).then((item: PlayerServer) => {
		if (!item)
			return res.json({});
		item.getCurrentEloValue().then(() => {
			let result: any = item;
			result.eloValue = item._currentElo;
			res.json(item);
		}, (error) => res.json({error: true, message: error}));
	}, (error) => res.json({error: true, message: error}));
}

export function getSize(req, res) { // get
	PlayerServer.getCount().then((size) => {
		res.json({size: size});
	}, (error) => res.json({error: true, message: error}));
}

export function saveItem(req, res) {
	// put
	PlayerServer.getOneById(req.body.id).then((item: PlayerServer) => {
		item.name = req.body.name;
		item.GameId = req.body.GameId;
		item.UserId = req.body.UserId;
		if (req.body.UserId === 'null' || req.body.UserId === 'undefined' || req.body.UserId === '')
			req.body.UserId = null;

		item.save().then(() => {
			res.json({message: item.name + ' updated'});
		}, (error) => res.json({error: true, message: error}));
	});
}

export function newItem(req, res) {
	// post
	let item = new PlayerServer();
	item.name = req.body.name;
	item.GameId = req.body.GameId;
	item.UserId = req.body.UserId;

	item.save().then(() => {
		res.json(item);
	}, (err) => res.json({error: true, message: err}));
}

export function deleteItem(req, res) { // deleteItem
	PlayerServer.removeById(req.params.id).then(() => {
		res.json({error: false, message: 'item has been deleted.'});
	}, (error) => {
		res.json({error: true, message: error});
	});
}

export function getEloData(req, res) {
	EloValueServer.getPlayerCurrentEloValues(req.params.id).then((items: EloValueServer[]) => {
		let values: any[] = [];
		for (let i = 0; i < items.length; ++i) {
			let item: any = items[i];
			values.push({y: item.eloValue, x: new Date(item.Match.endTime || item.Match.createdAt)});
		}
		res.json([{
			key: 'Elo Value',
			values: values
		}]);
	});
}