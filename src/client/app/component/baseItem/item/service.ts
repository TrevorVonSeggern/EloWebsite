// Created by trevor on 5/31/16.

import {BasicListFactory} from '../list/factory';
import {IBaseModel} from '../../../../../models/Base/baseModel';
import {UserFactory} from "../../../pages/userManagement/user/factory";

export class BasicItemService {
	static serviceName: string = 'basicItemItemService';
	static $inject: any[] = [
		UserFactory.factoryName,
		BasicListFactory.factoryName
	];

	mode: string = 'router'; // can be 'router' or 'event' driven

	constructor(public userFactory: UserFactory,
				public listFactory: BasicListFactory,
				public navBaseUrl,
				public dataBaseUrl) {
	}

	getMode(controller: any, $stateParams) {
		if (controller.id !== undefined) {
			return this.mode = 'event';
		}
		else {
			return this.mode = 'router';
		}
	}

	$get() {
		return this;
	}

	getItem(id: string, cb: (data: any) => void, failCB: (error: any) => void) {
		if (id === undefined || id.indexOf('placeholder') !== -1) {
			return cb({});
		}
		this.userFactory.httpServerCall(
			this.dataBaseUrl + '/' + id,
			'get',
			undefined,
			(data) => {
				if (data && data.data && (data.data.length || !data.data.error)) {
					cb && cb(data.data);
				}
				else {
					failCB && failCB(data.data);
				}
			});
	};

	saveItem(item: any, cb: (item) => void, failCB: (data) => void = undefined) {
		this.userFactory.httpServerCall(this.dataBaseUrl, 'PUT', item, (response) => {
			if (response.data.error)
				return failCB && failCB(response.data);
			this.listFactory.AddedItem();
			item = response.data[0];
			cb && cb(item);
		}, () => {
			failCB && failCB(undefined);
		});
	};

	deleteItem(item: IBaseModel, cb: () => void, failCB: (data) => void = undefined) {
		if (!item || !item._id)
			return failCB && failCB(undefined);

		this.userFactory.httpServerCall(
			this.dataBaseUrl + '/' + item._id,
			'DELETE',
			item,
			(response) => {
				if (response.data.error)
					return failCB && failCB(response.data);
				this.listFactory.AddedItem();
				item = undefined;
				cb && cb();
			}, () => {
				failCB && failCB(undefined);
			});
	};

	createItem(item: any, cb: (item) => void, failCB: (data) => void = undefined) {
		this.userFactory.httpServerCall(
			this.dataBaseUrl,
			'POST',
			item,
			(response) => {
				if (response.data.error)
					return failCB && failCB(response.data);
				this.listFactory.AddedItem();
				if (response.data.length)
					item = response.data[0];
				else
					item = response.data;
				cb && cb(item);
			}, (error) => {
				failCB && failCB(error);
			});
	};

	static BasicItemService() {
		return [UserFactory.factoryName,
			BasicListFactory.factoryName, function (uf, blf) {
				return new BasicItemService(uf, blf, '/#/nav', '/api/item');
			}];
	}

	getId(controller: any, $stateParams: any) {
		if (this.mode === 'router') {
			return $stateParams.id;
		}
		else {
			return controller.id;
		}
	}
}

BasicItemService.$inject.push(BasicItemService);
