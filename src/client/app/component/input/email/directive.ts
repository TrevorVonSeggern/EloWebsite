
import {definition} from '../../../Definition';
export function InputEmailDirective() {
	return {
		scope: {
			'label': '=',
			'value': '=',
			'display': '='
		},
		controller: definition.inputEmail.controllerName,
		controllerAs: "vm",
		bindToController: true,
		templateUrl: definition.inputEmail.templateUrl
	};
}
