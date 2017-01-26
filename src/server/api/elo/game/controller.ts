// Created by trevor on 12/31/16.
import express = require('express');
import {getSize, newItem, saveItem, getList, getOneItem, deleteItem, processEloGame} from "./functions";
import {isLoggedIn} from "../../auth/authStrategies";

export let GameRouter = express.Router();

// Create endpoint handlers for /users
GameRouter.route('/')
	.get(isLoggedIn, getList)
	.put(isLoggedIn, saveItem)
	.post(isLoggedIn, newItem);

GameRouter.route('/size').get(getSize);
GameRouter.route('/process/:_id').get(processEloGame);

GameRouter.route('/:_id')
	.get(isLoggedIn, getOneItem)
	.delete(isLoggedIn, deleteItem);