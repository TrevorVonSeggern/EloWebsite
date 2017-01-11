/**
 * Created by trevor on 3/20/16.
 */

import * as express from 'express';
import {Client} from '../../../database/UserManagement/client';
import './init';

export let ClientRouter = express.Router();

// Create endpoint so that I don't have to program stuff for the button when it's dynamic...
ClientRouter.route('/') .get(function (req, res) {
	function exec(clients) {
		res.json(clients);
	}

	function fail(error) {
		res.send(error);
	}

	if (req.query.name) {
		Client.getOneByName(req.query.name).then(exec, fail);
	} else {
		let client = new Client();
		client.all(undefined, undefined).then(exec, fail);
	}
});
