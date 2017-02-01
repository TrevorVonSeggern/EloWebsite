/**
 * Created by trevor on 3/22/16.
 */

import {isLoggedIn} from "../authStrategies";
let express = require('express');
let controller = require('./functions');

export let router = express.Router();

router.route('/').get(isLoggedIn, controller.getList);
