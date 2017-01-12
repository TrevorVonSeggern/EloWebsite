// Created by trevor on 12/31/16.
import express = require('express');
import {GameRouter} from "./game/controller";
import {EventRouter} from "./event/controller";
import {TeamRouter} from "./team/controller";

export let eloRouter = express();

eloRouter.use('/game', GameRouter);
eloRouter.use('/event', EventRouter);
eloRouter.use('/team', TeamRouter);

eloRouter.get('/', (req, res) => {
	res.json({
		endPoints: [
			'game', 'event', 'match', 'team', 'player', 'eloValue'
		]
	});
});