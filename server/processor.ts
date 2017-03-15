// Created by trevor on 1/26/17.

import {MatchServer} from "./database/match";
import logs from "web-server-database/server/logs";

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
			//code goes here that will be run every x seconds.
		}, 1000 * this.checkFrequency);
	}

	static checkElo() {
		this.inProgress = true;

		// processed one match.
		MatchServer.processOne().then((matchProcessed: boolean) => {
			if(matchProcessed) // process the rest of the matches.
				processor.checkElo();
			else
				this.inProgress = false;
		}, (error) => logs(error));
	}
}