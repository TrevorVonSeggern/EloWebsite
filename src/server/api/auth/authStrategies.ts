/**
 * Created by trevor on 3/20/16.
 */

import * as passport from 'passport';
import * as CustomStrategy from 'passport-custom';
import {Token} from '../../database/UserManagement/token';
import {ServerUser} from '../../database/UserManagement/user';
import './acl_init';
import {acl} from './acl_init';

function setUserSession(req, user) {
	if (req && user && user._id) {
		req.user = user;
		req.userId = user._id.toString();
	}
}

function sessionUser(req): string|number {
	if (req && req.user && req.userId)
		return req.user;
	return undefined;
}

function AuthenticateUserFromUsername(username: string, password: string, req: any, next: () => void, not: () => void) {
	ServerUser.getOneByUsername(username).then((user: ServerUser) => {
		if (!user)
			return not();
		user.verifyPasswordClient(password).then((isMatch) => {
			if (!isMatch)
				return not();
			setUserSession(req, user);
			next();
		}, (error) => {
			console.log(error);
			not();
		});
	}, (error) => {
		console.log(error);
	});
}

function IfIsLocal(req: any, next: () => void, notLocal: () => void) {
	let username: string = req.query.username;
	let password: string = req.query.password;

	if (!username || !password)
		return notLocal();
	AuthenticateUserFromUsername(username, password, req, next, notLocal);
}
function IfIsBasic(req: any, next: () => void, notBasic: () => void) {
	let authorization = req.headers['authorization'];

	if (!authorization)
		return notBasic();
	let parts = authorization.split(' ');
	if (parts.length < 2)
		return notBasic();
	let scheme = parts[0], credentials = new Buffer(parts[1], 'base64').toString().split(':');
	if (!/Basic/i.test(scheme)) return notBasic();
	if (credentials.length < 2) return notBasic();
	if (!credentials[0] || !credentials[1]) return notBasic();

	AuthenticateUserFromUsername(credentials[0], credentials[1], req, next, notBasic);
}
function IfIsBearer(req: any, next: () => void, notBearer: () => void) {
	if (req.headers['authorization'] === undefined) {
		return notBearer();
	}
	let authorization = "" + req.headers['authorization'];
	let parts = authorization.split(' ');
	if (parts.length !== 2)
		return notBearer();
	let accessToken = parts[1];
	if (!accessToken)
		return notBearer();
	Token.getOneByValue(accessToken).then((token: Token) => {
		if (!token) // No token found
			return notBearer();
		let userId: string = token.userId;
		ServerUser.getOneById(userId).then((user: ServerUser) => {
			if (!user || !user._id) // No user found
				return notBearer();
			setUserSession(req, user);
			next();
		}, (error) => {
			console.log(error);
			notBearer();
		});
	}, (error) => {
		console.log(error);
		notBearer();
	});

}

export function AuthenticationStrategy(req, callback: () => void) {
	// add the required data for user authentication.
	IfIsBearer(req, callback, () => {
		IfIsBasic(req, callback, () => {
			IfIsLocal(req, callback, () => {
				callback();
			});
		});
	});
}

passport.use('custom', new CustomStrategy((req, callback) => {
	function deny() {
		return callback("not authorized", undefined);
	}

	function allow() {
		return callback(null, true);
	}

	function checkAcl(user) {
		let userString = 'Guest';
		let role = 'Guest';
		if (user && user._id) {
			userString = user._id.toString();
			role = user.role;
		}

		acl.addUserRoles(userString, role).then(() => {
			let url: string = req.originalUrl;
			url = url.split('/').filter(Boolean).join('/');
			url = url.split('?')[0];

			for (let i = 0; i < Object.keys(req.params).length; ++i) {
				url = url.replace(req.params[Object.keys(req.params)[i]], ':*:');
			}

			acl.isAllowed(userString, url, req.method.toLowerCase(), (err, allowed) => {
				if (err || !allowed)
					return deny();
				else {
					return allow();
				}
			}).error(() => {
				return deny();
			}).then(() => {
				return;
			});
		});
	}

	AuthenticationStrategy(req, () => {
		if (sessionUser(req))
			return checkAcl(sessionUser(req));
		else
			return checkAcl('guest');
	});
}));

export let isLoggedIn = passport.authenticate('custom', {session: false});
