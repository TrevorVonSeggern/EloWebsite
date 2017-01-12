// Created by trevor on 5/20/16.

import IModule = angular.IModule;
import IHttpService = angular.IHttpService;
import {UserModel, ClientSalt} from "../../../../../models/UserManagement/user";

export class User implements UserModel {
	_id: string;
	username: string = undefined;
	password: string = undefined;
	first_name: string = undefined;
	last_name: string = undefined;
	email: string = undefined;
	role: string = undefined;

	passwordHashed: boolean = false;

	LoginModel() {
		return {username: this.username, password: this.password}
	};

	constructor(user: UserModel, public userFactory: UserFactory) {
		if (!user) return;

		let keys = Object.keys(this);
		for (let i: number = 0; i < keys.length; ++i) {
			if (user[keys[i]] !== undefined && (typeof user[keys[i]]) !== 'function')
				this[keys[i]] = user[keys[i]];
		}

		this.hashPassword();
	}

	hashPassword() {
		if (this.passwordHashed || !this.password || this.password === '') {
			this.passwordHashed = true;
			return this.password;
		}
		this.password = this.userFactory.HashString(this.password);
		this.passwordHashed = true;
	}

	toJson() {
		return JSON.stringify(this);
	}

	getBland(): any {
		return {
			_id: this._id,
			username: this.username,
			password: this.password,
			first_name: this.first_name,
			last_name: this.last_name,
			email: this.email,
			role: this.role
		};
	}
}

export class UserFactory {
	static factoryName: string = 'UserFactory';
	static $inject: string[] = ['bcrypt', '$http'];

	static initialized = false;

	user: UserModel;
	token: string;
	LoggedIn: boolean = false;

	constructor(public bcrypt, public $http) {
		this.LoadCredentials();
		UserFactory.initialized = true;
	}

	Initialize() {
		if (!UserFactory.initialized || !this.user)
			this.LoadCredentials();
	}

	getSelectList(resolve: (list: any[]) => void, reject: (error: string) => void) {
		this.httpServerCall('/api/user/', 'get', undefined, (data) => {
			let list = data.data;
			let resultList = [];
			for (let i = 0; i < list.length; i++) {
				resultList.push(new Object({label: list[i].first_name, value: list[i]._id}));
			}
			resolve(resultList);
		}, (error) => {
			reject(error);
		});
	}

	getOneById(id:string, resolve: (list: any) => void, reject: (error: string) => void) {
		this.httpServerCall('/api/user/' + id, 'get', undefined, (data) => {
			resolve(data.data);
		}, (error) => {
			reject(error);
		});
	}

	StoreCredentials(user: UserModel, token: string) {
		if (!user || !token)
			return;
		this.user = user;
		this.token = token;
		this.LoggedIn = true;
		user.password = '';
		if (user['userFactory'] != undefined)
			user['userFactory'] = undefined;
		localStorage.setItem('user', angular.toJson(user));
		localStorage.setItem('token', token);
	}

	ClearCredentials() {
		this.user = undefined;
		this.token = undefined;
		this.LoggedIn = false;
		localStorage.removeItem('token');
		localStorage.removeItem('user')
	}

	LoadCredentials() {
		let token = localStorage.getItem('token');
		let user = undefined;
		if (localStorage.getItem('user') !== undefined)
			user = angular.fromJson(localStorage.getItem('user'));

		if (!token || !user || !user.username)
			return this.LoggedIn = false;

		this.token = token;
		this.setUser(user);
		this.LoggedIn = true;
	}

	setUser(user: User): User {
		return this.user = user;
	}

	httpServerCall(url: string, method: string, data: any, success: (any) => void, failure: (any) => void = undefined) {
		url = url.replace('//', '/');
		let headers = {'Content-Type': 'application/x-www-form-urlencoded'};
		if (this.token) {
			headers['Authorization'] = 'Bearer ' + this.token;
		}

		let options = {
			url: url,
			method: method,
			headers: headers
		};
		if (data) {
			if (options.method.toUpperCase() === 'GET') {
				options['params'] = data;
			}
			else {
				options['data'] = $.param(data);
			}
		}
		this.$http(options).then((response) => {
			success && success(response);
		}, (error) => {
			failure && failure(error);
		});
	}

	ChangePassword(pswd: string, newPassword: string,
				   success: () => void,
				   failure: (message: string) => void = undefined) {
		this.httpServerCall(
			'/api/user/ChangePassword', 'put',
			{
				username: this.user.username,
				old_password: pswd,
				password: newPassword
			},
			(response: any) => {
				if (!response || !response.data)
					return failure('Server error.');
				if (response.data.error)
					return failure(response.data.message);
				if (response.data.success)
					return success();
				failure("not a success");
			}, failure);
	}

	HashString(toHash: string): string {
		if (this.bcrypt === undefined)
			return toHash;
		return this.bcrypt.hashSync(toHash, ClientSalt);
	}

	$get() {
		return this;
	}

	static Factory() {
		return ['bcrypt', '$http', function (bcrypt, http) {
			return new UserFactory(bcrypt, http);
		}];
	}
}
