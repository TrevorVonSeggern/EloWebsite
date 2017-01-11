/**
 * Created by trevor on 3/20/16.
 */

import {ServerUser} from '../../../database/UserManagement/user';
import bcrypt = require('bcrypt-nodejs');
import {UserModel} from "../../../../models/UserManagement/user";
import {CheckNumberParameter} from "../../commonFunctions";

export function getUserList(req, res) { // get
	let limit: number = CheckNumberParameter(req.query.limit);
	let skip: number = CheckNumberParameter(req.query.skip);

	ServerUser.all(limit, skip).then((users: UserModel[]) => {
		for (let i: number = 0; i < users.length; ++i) {
			users[i].password = '';
		}
		res.json(users);
	}, res.send);
}

export function getOneUser(req, res) { // get
	ServerUser.getOneById(req.params.user_id).then((user: any) => {
		if (user === undefined || (user.length && user.length === 0))
			res.send({});
		else {
			let returnUser: any = {};
			if (user.length) {
				returnUser = user[0];
			} else {
				user.mapToObject(returnUser);
			}
			returnUser.password = '';
			res.json(returnUser);
		}
	}, (error) => {
		console.log(error);
		req.send(error);
	});
}

export function getSize(req, res) { // get
	ServerUser.getCount().then((size) => {
		res.json({size: size});
	}, (error) => {
		res.send(error);
	});
}

export function saveUser(req, res) {
	// put
	ServerUser.getOneById(req.body._id).then((user: ServerUser) => {
		user.username = req.body.username;
		user.first_name = req.body.first_name;
		user.last_name = req.body.last_name;
		user.role = req.body.role;
		user.email = req.body.email;

		// if password is not blank, update it.
		if (req.body.password && req.body.password.length > 0)
			user.password = req.body.password;

		user.save().then(() => {
			res.json({message: user.username + ' updated'});
		}, (error) => {
			res.send(error);
		});
	});
}

export function newUser(req, res) { // post
	let user = new ServerUser();
	user.username = req.body.username;
	user.first_name = req.body.first_name;
	user.last_name = req.body.last_name;
	user.role = req.body.role;
	user.email = req.body.email;
	user.password = req.body.password;

	user.save().then((savedUser: ServerUser) => {
		let prepareToSend = <UserModel>{};
		savedUser.mapToObject(prepareToSend);
		res.json(prepareToSend);
	}, (err) => {
		res.send(err);
	});
}

export function deleteUser(req, res) { // deleteItem
	ServerUser.getOneById(req.params.user_id).then((user: ServerUser) => {
		user.remove().then(() => {
			res.json({error: false, message: 'User has been deleted.'});
		}, (error) => {
			res.json({error: true, message: error});
		});
	}, (error) => {
		res.json({error: true, message: error});
	});

}
