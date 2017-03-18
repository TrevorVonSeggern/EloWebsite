import {typeName} from "../../typeName";

export class controller {
	item: any;

	displayVs(): string {
		if (!this.item || !this.item.TeamAName || !this.item.TeamBName)
			return '';
		return this.item.TeamAName + ' vs ' + this.item.TeamBName;
	}

	constructor($scope) {
	}

	static controllerName: string = typeName + 'ListSingleController';
	static $inject: any[] = ['$scope'];
}

controller.$inject.push(controller);
