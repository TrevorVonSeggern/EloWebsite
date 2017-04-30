// Created by trevor on 12/31/16.
import express = require('express');
import {getSize, newItem, saveItem, getList, getOneItem, deleteItem} from "./functions";
import {isLoggedIn} from "web-user-management/server/auth/authStrategies";

export let EventRouter: any = express.Router();

// Create endpoint handlers for /users
EventRouter.route('/')
	.get(isLoggedIn, getList)
	.put(isLoggedIn, saveItem)
	.post(isLoggedIn, newItem);

EventRouter.route('/size').get(getSize);
EventRouter.route('/view').get(getList);

EventRouter.route('/:id')
	.get(isLoggedIn, getOneItem)
	.delete(isLoggedIn, deleteItem);