// Created by trevor on 12/31/16.
import express = require('express');
import {getSize, newItem, saveItem, getList, getOneItem, deleteItem, processEloGame} from './functions';
import {isLoggedIn} from 'web-user-management/server/auth/authStrategies';

export let GameRouter: any = express.Router();

// Create endpoint handlers for /users
GameRouter.route('/')
	.get(isLoggedIn, getList)
	.put(isLoggedIn, saveItem)
	.post(isLoggedIn, newItem);

GameRouter.route('/size').get(getSize);
GameRouter.route('/process/:id').get(processEloGame);

GameRouter.route('/:id')
	.get(isLoggedIn, getOneItem)
	.delete(isLoggedIn, deleteItem);