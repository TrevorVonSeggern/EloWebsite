// Created by trevor on 12/31/16.
import express = require('express');
import {getSize, newItem, saveItem, getList, getOneItem, deleteItem} from "./functions";
import {isLoggedIn} from "../../auth/authStrategies";

export let MatchRouter = express.Router();

// Create endpoint handlers for /users
MatchRouter.route('/')
	.get(isLoggedIn, getList)
	.put(isLoggedIn, saveItem)
	.post(isLoggedIn, newItem);

MatchRouter.route('/size').get(getSize);

MatchRouter.route('/:_id')
	.get(isLoggedIn, getOneItem)
	.delete(isLoggedIn, deleteItem);