// Created by trevor on 12/31/16.
import express = require('express');
import {getSize, newItem, saveItem, getList, getOneItem, deleteItem, getViewList} from "./functions";
import {isLoggedIn} from "../../auth/authStrategies";

export let EventRouter = express.Router();

// Create endpoint handlers for /users
EventRouter.route('/')
	.get(isLoggedIn, getList)
	.put(isLoggedIn, saveItem)
	.post(isLoggedIn, newItem);

EventRouter.route('/size').get(getSize);
EventRouter.route('/view').get(getViewList);

EventRouter.route('/:_id')
	.get(isLoggedIn, getOneItem)
	.delete(isLoggedIn, deleteItem);