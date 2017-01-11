/**
 * Created by trevor on 3/20/16.
 */

import * as express from 'express';
import {isLoggedIn} from "../authStrategies";
import {getSize, getUserList, getOneUser, saveUser, deleteUser, newUser} from "./functions";
import {changePassword, postRegisterNewUser, loginOAuth2, loginUser} from './authFunctions';

export let UserRouter = express.Router();

// Create endpoint handlers for /users
UserRouter.route('/')
	.get(isLoggedIn, getUserList)
	.put(isLoggedIn, saveUser)
	.post(isLoggedIn, newUser);

UserRouter.route('/size').get(isLoggedIn, getSize);
UserRouter.route('/login').put(loginUser);
UserRouter.route('/register').post(postRegisterNewUser);
UserRouter.route('/loginGoogle').put(loginOAuth2);
UserRouter.route('/ChangePassword').put(isLoggedIn, changePassword);

UserRouter.route('/:user_id')
	.get(isLoggedIn, getOneUser)
	.delete(isLoggedIn, deleteUser);