// Created by trevor on 12/29/16.

import {IBaseModel} from "../Base/baseModel";
export class ClientModel implements IBaseModel {
	_id: string;
	name: string;
	url: string;
	redirect_uri: string;
	response_type: string;
	client_id: string;
	scope: string;
	state: string;
}