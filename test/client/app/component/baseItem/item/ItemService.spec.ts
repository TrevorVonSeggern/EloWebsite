// Created by trevor on 7/29/2016.

import {BasicItemService} from '../../../../../../src/client/app/component/baseItem/item/service';

describe('Basic Item Factory', () => {
	var factory:BasicItemService, $httpBackend;

	beforeEach(angular.mock.module('pages'));
	beforeEach(angular.mock.module('components'));

	beforeEach(inject(($injector) => {
		factory = $injector.get(BasicItemService.serviceName);
	}));

	describe('check http', () => {

		beforeEach(inject(($injector) => {
			$httpBackend = $injector.get('$httpBackend');
			$httpBackend.when('GET', '/api/item/id').respond([{_id: 'id'}]);
			$httpBackend.when('PUT', '/api/item').respond([{_id: 'id2'}]);
		}));

		it('get Item should be valid', () => {
			var success:boolean = false;

			factory.getItem('id', (data) => {
				expect(data).toBeDefined();
				expect(data._id).toBe('id');
				success = true;
			}, () => {
				// don't expect to fail the http call.
				expect('false').toBe('true');
			});
			$httpBackend.flush();
			expect(success).toBeTruthy();
		});

		it('save Item should be valid', () => {
			var success:boolean = false;

			factory.saveItem({_id: 'id'}, (item) => {
				expect(item).toBeDefined();
				expect(item._id).toBe('id2');
				success = true;
			});
			$httpBackend.flush();
			expect(success).toBeTruthy();
		});

		it('create Item should be valid with array', () => {
			$httpBackend.when('POST', '/api/item').respond([{_id: 'id2'}]);

			var success:boolean = false;

			factory.createItem({_id: 'id'}, (item) => {
				expect(item).toBeDefined();
				expect(item._id).toBe('id2');
				success = true;
			});
			$httpBackend.flush();
			expect(success).toBeTruthy();
		});

		it('create Item should be valid with object', () => {
			$httpBackend.when('POST', '/api/item').respond({_id: 'id2'});

			var success:boolean = false;

			factory.createItem({_id: 'id'}, (item) => {
				expect(item).toBeDefined();
				expect(item._id).toBe('id2');
				success = true;
			});
			$httpBackend.flush();
			expect(success).toBeTruthy();
		});

		afterEach(() => {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});
	});

});