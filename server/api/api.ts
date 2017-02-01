/**
 * Created by trevor on 3/20/16.
 */
let express = require('express');
let passport = require('passport');
import {ClientRouter} from './auth/client/controller';
import {UserRouter} from './auth/user/controller';
import {isLoggedIn} from './auth/authStrategies';
import {eloRouter} from "./elo/router";
import {privateLogs} from "../logs";

// init the api
export let api = express();
api.use(passport.initialize());

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
