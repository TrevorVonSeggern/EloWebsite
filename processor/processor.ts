// Created by trevor on 1/26/17.

import {logs} from "../server/logs";
import {Match} from "../server/database/Elo/match";
export class processor {
	// in seconds.
	checkFrequency: number = 10;

	static inProgress: boolean = false;

	constructor() {
		processor.checkElo();
		setInterval(() => {
			if (!processor.inProgress) {
				// processor.checkElo();
			}
			//code goes here that will be run every 5 seconds.
		}, 1000 * this.checkFrequency);
	}

	static checkElo() {
		this.inProgress = true;

		// processed one match.
		Match.processOne().then((matchProcessed: boolean) => {
			if(matchProcessed) // process the rest of the matches.
				processor.checkElo();
			else
				this.inProgress = false;
		}, (error) => logs(error));
	}
}