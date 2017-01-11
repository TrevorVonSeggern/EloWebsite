// Created by trevor on 7/28/2016.
import {IBaseModel} from '../Base/baseModel';

export class TokenModel implements IBaseModel {
	_id: string;
	value: string;
	userId: string;
	clientId: string;
}