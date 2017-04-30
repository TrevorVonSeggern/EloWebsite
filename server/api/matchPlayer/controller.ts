// Created by trevor on 12/31/16.
import express = require('express');
import {getSize, newItem, saveItem, getList, getOneItem, deleteItem, getViewList} from "./functions";
import {isLoggedIn} from "web-user-management/server/auth/authStrategies";
import {IRouter} from "express-serve-static-core";

export let MatchPlayerRouter:IRouter = express.Router();

// Create endpoint handlers for /users
MatchPlayerRouter.route('/')
	.get(isLoggedIn, getList)
	.put(isLoggedIn, saveItem)
	.post(isLoggedIn, newItem);

MatchPlayerRouter.route('/size').get(getSize);
MatchPlayerRouter.route('/view').get(getViewList);

MatchPlayerRouter.route('/:id')
	.get(isLoggedIn, getOneItem)
	.delete(isLoggedIn, deleteItem);