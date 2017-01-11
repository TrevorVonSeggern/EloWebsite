// Created by trevor on 7/28/2016.

import {UserModel} from '../../../../../src/models/UserManagement/user';
import {UserFactory, User} from "../../../../../src/client/app/pages/userManagement/user/factory";

describe('User Factory Tests', () => {
	let tempUser:UserModel, $httpBackend, factory:UserFactory;

	beforeEach(() => {
		angular.mock.module('pages');
	});
	beforeEach(inject(($injector) => {

		tempUser = {
			_id: 'id',
			username: 'username',
			password: 'password',
			first_name: 'first',
			last_name: 'last',
			email: 'email',
			role: 'role'
		};

		factory = $injector.get(UserFactory.factoryName);
	}));

	describe('User class', () => {

		describe('test Constructor', ()=> {
			it('username should be defined', () => {
				var user:User = new User(tempUser, factory);
				expect(user.username).toBeDefined();
				// password should be hashed
				expect(user.password).not.toBe('password');
				expect(user.first_name).toBe('first');
				expect(user.last_name).toBe('last');
				expect(user.email).toBe('email');
				expect(user.role).toBe('role');
			});

			it('password should try to be hashed', () => {
				var user:User = new User(tempUser, factory);
				expect(user.passwordHashed).toBe(true);
			});

			it('toJson should contain the username and password', () => {
				var user:User = new User(tempUser, factory);
				user.username = '1';
				user.password = '2';
				expect(user.toJson()).toContain('username');
				expect(user.toJson()).toContain('1');
				expect(user.toJson()).toContain('password');
				expect(user.toJson()).toContain('2');
			});
		});

		describe('test undefined parameter Constructor', ()=> {
			var user:User = new User(undefined, factory);
			it('username should be undefined', () => {
				expect(user.username).toBeUndefined();
			});
		});

	});

	describe('User Factory', () => {

		describe('constructor doesn\'t load anything', () => {
			it('user should not be defined', () => {
				expect(factory.user).toBeUndefined();
			});
		});

		describe('constructor doesn\'t loads anything', () => {
			beforeEach(() => {
				factory.StoreCredentials(tempUser, 'token');
			});

			afterEach(() => {
				factory.ClearCredentials();
			});

			it('user should be defined', () => {
				expect(factory.user).toBeDefined();
				expect(factory.user.username).toBe('username');
			});

			it('token should load', () => {
				expect(factory.token).toBeDefined();
				expect(factory.token).toBe('token');
			});

			it('logged in', () => {
				expect(factory.LoggedIn).toBeDefined();
				expect(factory.LoggedIn).toBeTruthy();
			});
		});

		describe('$get exists and is initialized', () => {
			it('exists', () => {
				expect(factory.$get).toBeDefined();
			});


			it('is initialized', () => {
				expect(UserFactory.initialized).toBeDefined();
				expect(UserFactory.initialized).toBeTruthy();
			});

		})
	});

	describe('http backend testing', () => {

		beforeEach(inject(($injector) => {
			$httpBackend = $injector.get('$httpBackend');

			factory = $injector.get('UserFactory');
			// factory = new UserFactory(); // $injector.get('UserFactory');

			$httpBackend.when('GET', '/asdf')
				.respond({error: 'asdf-error'}, {'A-Token': 'xxx'});
		}));

		it('should be defined', () => {
			expect(factory).toBeDefined();
		});

		it('should call to "/asdf" with GET type', () => {
			factory.httpServerCall('/asdf', 'get', undefined, (data) => {
				expect(data).toBeDefined();
				expect(data.data).toBeDefined();
				expect(data.data.error).toBeDefined();
				expect(data.data.error).toBe('asdf-error');
				expect(data.data.error).not.toBe('error');
			});
			$httpBackend.flush();
		});

		afterEach(function () {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});
	});
});