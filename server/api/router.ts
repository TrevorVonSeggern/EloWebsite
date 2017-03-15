// Created by trevor on 12/31/16.
import express = require('express');

export let eloRouter: any = express.Router();


eloRouter.get('/', (req, res) => {
	res.json({
		endPoints: [
			'game', 'event', 'match', 'team', 'player', 'eloValue'
		]
	});
});