
import {definition} from '../../../Definition';
export function InputDatetimeDirective() {
	return {
		scope: {
			'label': '=',
			'value': '=',
			'display': '='
		},
		controller: definition.inputDatetime.controllerName,
		controllerAs: "vm",
		bindToController: true,
		templateUrl: definition.inputDatetime.templateUrl
	};
}
