import {typeName} from "../../typeName";

export class controller {

	item: any;

	displayVs(): string {
		if (!this.item || !this.item.teamA || !this.item.teamB)
			return '';
		return this.item.teamA + ' vs ' + this.item.teamB;
	}

	constructor($scope) {
	}

	static controllerName: string = typeName + 'ListSingleController';
	static $inject: any[] = ['$scope'];
}

controller.$inject.push(controller);
