/**
 * Created by trevor on 6/16/16.
 */
import * as express from 'express'
import * as bodyParser from 'body-parser'; // Use the body-parser package in our application
import {client} from "./client";
import {api} from './api/api';

export let app = express.Router(); // expose the app.

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use('/api', api);

app.use('/', client);

