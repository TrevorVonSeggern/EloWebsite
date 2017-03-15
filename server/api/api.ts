/**
 * Created by trevor on 3/20/16.
 */
let express = require('express');
let passport = require('passport');

import {eloRouter} from "./router";

// init the api
export let api = express.Router();
api.use(passport.initialize());

let router = express.Router();

router.use('/elo', eloRouter);

api.use('/', router);
