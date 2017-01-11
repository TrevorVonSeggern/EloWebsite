// Created by trevor on 7/29/2016.

export class BaseItemDirective {
	controllerAs:string      = 'vm';
	bindToController:boolean = true;

	scope = {
		id: '=',
		events: '=',
		open: '=',
	};
}
