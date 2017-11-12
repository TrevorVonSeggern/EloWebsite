// Created by trevor on 12/31/16.
import express = require('express');
import {getSize, newItem, saveItem, getList, getOneItem, deleteItem, pastPlayers} from "./functions";
import {isLoggedIn} from "web-user-management/server/auth/authStrategies";

export let TeamRouter: any = express.Router();

// Create endpoint handlers for /users
TeamRouter.route('/')
	.get(isLoggedIn, getList)
	.put(isLoggedIn, saveItem)
	.post(isLoggedIn, newItem);

TeamRouter.route('/size').get(getSize);

TeamRouter.route('/pastPlayers').get(pastPlayers);

TeamRouter.route('/:id')
	.get(isLoggedIn, getOneItem)
	.delete(isLoggedIn, deleteItem);