// Created by trevor on 1/26/17.

import {logs} from "../server/logs";
import {Match} from "../server/database/Elo/match";
export class processor {
	// in seconds.
	checkFrequency: number = 10;

	inProgress: boolean = false;

	constructor() {
		// this.checkElo();
		setInterval(() => {
			if (!this.inProgress) {
				// this.checkElo();
			}
			//code goes here that will be run every 5 seconds.
		}, 1000 * this.checkFrequency);
	}

	checkElo() {
		this.inProgress = true;

		Match.processOne().then((finished: boolean) => {
			// processed one.
			logs('processed one.');
		}, (error) => logs(error));

		this.inProgress = false;
	}
}