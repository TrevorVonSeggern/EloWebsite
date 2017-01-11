// Created by trevor on 7/29/2016.

import {BasicListFactory} from '../../../../../../src/client/app/component/baseItem/list/factory';

describe('Base List Factory', () => {
	var factory:BasicListFactory;

	beforeEach(() => {
		factory = new BasicListFactory();
	});

	describe('Check Event Management', () => {

		it('should monitor added items when events are added and not when removed', () => {
			var listenerHit:number = 0;
			factory.AddListener('key', function () {
				listenerHit++;
			});
			factory.AddedItem();
			expect(listenerHit).toBe(1);
			factory.RemoveListener('key');
			factory.AddedItem();
			expect(listenerHit).toBe(1);
		});
	});
});