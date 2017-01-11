import {definition} from '../../../Definition';
export function InputTextDirective() {
	return {
		scope: {
			'label': '=',
			'value': '='
		},
		controller: definition.inputText.controllerName,
		controllerAs: "vm",
		bindToController: true,
		replace: true,
		templateUrl: definition.inputText.templateUrl
	};
}
