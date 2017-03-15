// Created by trevor on 12/31/16.
import express = require('express');
import {getSize, newItem, saveItem, getList, getOneItem, deleteItem} from "./functions";
import {isLoggedIn} from "web-user-management/server/auth/authStrategies";
import {IRouter} from "express-serve-static-core";

export let PlayerRouter:IRouter = express.Router();

// Create endpoint handlers for /users
PlayerRouter.route('/')
	.get(isLoggedIn, getList)
	.put(isLoggedIn, saveItem)
	.post(isLoggedIn, newItem);

PlayerRouter.route('/size').get(getSize);

PlayerRouter.route('/:id')
	.get(isLoggedIn, getOneItem)
	.delete(isLoggedIn, deleteItem);