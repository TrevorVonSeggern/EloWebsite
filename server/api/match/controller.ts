// Created by trevor on 12/31/16.
import express = require('express');
import {getSize, newItem, saveItem, getList, getOneItem, deleteItem, getViewList} from "./functions";
import {isLoggedIn} from "web-user-management/server/auth/authStrategies";

export let MatchRouter: any = express.Router();

// Create endpoint handlers for /users
MatchRouter.route('/')
	.get(isLoggedIn, getList)
	.put(isLoggedIn, saveItem)
	.post(isLoggedIn, newItem);

MatchRouter.route('/size').get(getSize);
MatchRouter.route('/view').get(getViewList);

MatchRouter.route('/:id')
	.get(isLoggedIn, getOneItem)
	.delete(isLoggedIn, deleteItem);