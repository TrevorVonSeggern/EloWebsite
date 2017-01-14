// Created by trevor on 12/31/16.
import express = require('express');
import {getSize, newItem, saveItem, getList, getOneItem, deleteItem, getViewList} from "./functions";
import {isLoggedIn} from "../../auth/authStrategies";

export let MatchPlayerRouter = express.Router();

// Create endpoint handlers for /users
MatchPlayerRouter.route('/')
	.get(isLoggedIn, getList)
	.put(isLoggedIn, saveItem)
	.post(isLoggedIn, newItem);

MatchPlayerRouter.route('/size').get(getSize);
MatchPlayerRouter.route('/view').get(getViewList);

MatchPlayerRouter.route('/:_id')
	.get(isLoggedIn, getOneItem)
	.delete(isLoggedIn, deleteItem);