/**
 * Created by trevor on 7/22/2016.
 */

import {ServerUser} from '../../../database/UserManagement/user';
import {Token} from '../../../database/UserManagement/token';
import {Client} from '../../../database/UserManagement/client';
import * as Request from 'request';
import {acl} from '../acl_init';
import {UserModel} from "../../../../models/UserManagement/user";
import {Roles} from "../acl_permissions";
import {NewUID} from "../../../database/Base/Model";

export function changePassword(req, res) {
	let username = req.body.username,
		newPassword = req.body.password,
		oldPassword = req.body.old_password;

	ServerUser.getOneByUsername(username).then((user: ServerUser) => {
		if (!user)
			return res.json({error: true, message: 'no user for ' + username});
		user.verifyPassword(oldPassword).then((isMatch: boolean) => {
			if (isMatch) {
				user.password = newPassword;

				user.save().then(() => {
					res.json({success: true});
				}, () => {
					res.json({error: true, message: 'Failed to change password.'});
				});
			}
			else
				res.json({error: true, message: 'Wrong password.'});
		}, (error) => {
			console.log(error);
		})
	}, (error) => {
		res.json({error: true, message: error});
	});
}

function LoginUser(req, res) {
	let username = req.body.username, password = req.body.password;

	function errorFunction(error) {
		console.log(error);
		res.send(error);
	}

	// if there is a user with the username...
	ServerUser.getOneByUsername(username).then((user: ServerUser) => {
		if (!user)
			return res.json({error: 'Invalid username'});

		user.verifyPassword(password).then((isMatch: any) => {
			if (!isMatch)
				return res.json({error: 'Password does not match the username.'});

			acl.addUserRoles(user._id, user.role).then(() => {
				// Valid user... get the token for the user...
				Token.getOneByUserId(user._id).then((token: Token) => {
					if (token) {
						user.password = ''; // don't send the password (even if it's hashed.)
						let sendUser: UserModel = <UserModel>{};
						user.mapToObject(sendUser);
						res.json({
							message: 'You are logged in, user.',
							token: token.value,
							user: sendUser
						});
					}
					else {
						Client.getOneByName('localAuth').then((clientDb: any) => {
							if (!clientDb) {
								console.log('could not get the local authentication "client"');
								return res.send('Error on the server');
							}
							token = new Token();
							token.value = NewUID();
							token.userId = user._id;
							token.clientId = clientDb._id;
							token.save().then(() => {
								let responseUser: UserModel = <UserModel>{};
								responseUser._id = user._id;
								responseUser.password = '';
								responseUser.email = user.email;
								responseUser.first_name = user.first_name;
								responseUser.last_name = user.last_name;
								responseUser.role = user.role;
								responseUser.username = user.username;
								res.json({
									message: 'Hey look new shark bait!',
									token: token.value,
									user: responseUser
								});
							}, errorFunction);
						}, errorFunction);
					}
				}, errorFunction);
			}, errorFunction)
		}, errorFunction); // manage the acl for the new user.
	}, errorFunction)
}

function RegisterNewUser(req, res) {
	let user = new ServerUser();
	user.username = req.body.username;
	user.password = req.body.password;
	user.first_name = req.body.first_name;
	user.last_name = req.body.last_name;
	user.email = req.body.email;
	user.role = Roles.guest;
	ServerUser.getOneByUsername(user.username).then((dbUser: ServerUser) => {
		if (!dbUser) {
			user.save().then(() => {
				LoginUser(req, res);
			}, res.send);
		} else {
			res.json({error: 'Invalid username.'})
		}
	}, res.send);
}

export function loginUser(req, res) {
	LoginUser(req, res);
}

export function postRegisterNewUser(req, res) {
	RegisterNewUser(req, res);
}

export function loginOAuth2(req, res) {
	let accessToken = req.body.access_token;
	new Request({
		uri: 'https://www.googleapis.com/oauth2/v2/userinfo',
		headers: {
			'Authorization': 'Bearer ' + accessToken
		}
	}, function (error, reqres, body) {
		if (!error && reqres.statusCode == 200) {
			let data = JSON.parse(body);
			req.body.username = data.email;
			req.body.password = data.id;
			req.body.first_name = data.given_name;
			req.body.last_name = data.family_name;
			req.body.email = data.email;

			ServerUser.getOneByUsername(data.email).then((user: ServerUser) => {
				if (user)
					LoginUser(req, res);
				else
					RegisterNewUser(req, res);
			}, res.send);
		}
		else {
			res.json({error: body}); // Show the HTML for the Google homepage.
		}

	});
}
