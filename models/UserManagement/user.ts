// Created by trevor on 7/28/2016.
import {IBaseModel} from '../Base/baseModel';

export let ClientSalt = '$2a$08$kEg69x2zMPcpW7HUDm9gXO';

export class UserModel implements IBaseModel {
	_id: string;
	username: string;
	password: string;
	first_name: string;
	last_name: string;
	email: string;
	role: string;
}

export let IUser = UserModel;