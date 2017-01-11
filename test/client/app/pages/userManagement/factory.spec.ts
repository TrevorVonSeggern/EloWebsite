import {definition} from '../../../../../src/client/app/Definition';

describe('User Management Factory', () => {
	var factory;

	beforeEach(angular.mock.module('pages'));

	beforeEach(angular.mock.module(function ($provide) {
		$provide.value('UserFactory', {
			httpServerCall: function (a, b, c, cb) {
				cb({data: {size: -2}});
			}
		});
	}));

	beforeEach(inject(function ($injector) {
		factory = $injector.get(definition.userManagement.factoryName);
	}));

	describe('definition test', () => {
		it('should be defined', () => {
			expect(factory).toBeDefined();
		});
	});

	describe('should be -2', () => {
		it('size should be -2', () => {
			factory.getUserCount(function (data) {
				expect(data).toBeDefined();
				expect(data).toBe(-2)
			});
		});
		it('should not be -3', () => {
			factory.getUserCount(function (data) {
				expect(data).toBeDefined();
				expect(data).not.toBe(-3)
			});
		});
	});

});