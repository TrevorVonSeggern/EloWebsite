/**
 * Created by trevor on 3/20/16.
 */
import express = require('express');
import * as passport from 'passport';
import {ClientRouter} from './auth/client/controller';
import {UserRouter} from './auth/user/controller';
import {isLoggedIn} from './auth/authStrategies';
import {eloRouter} from "./elo/router";
import {privateLogs} from "../logs";

// init the api
export let api = express();
api.use(passport.initialize());

api.all('/*', (req: any, res, next: () => void) => {
	// CORS headers
	res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');

	if (req.method == 'OPTIONS')
		return res.status(200).end();
	next();
});

let router = express.Router();

router.use('/user', UserRouter);
router.use('/client', ClientRouter);
router.use('/elo', eloRouter);
router.get('/logs', isLoggedIn, function (req, res) {
	res.json(privateLogs);
});
router.get('/', function (req, res) {
	res.json({message: 'You are running dangerously low on beer!'});
});
api.use('/', router);
