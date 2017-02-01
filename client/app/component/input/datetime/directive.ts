import {definition} from '../../../Definition';
export function InputDatetimeDirective() {
	return {
		scope: {
			'label': '=',
			'value': '=',
			'display': '='
		},
		controller: definition.inputDatetime.controllerName,
		bindToController: true,
		controllerAs: 'vm',
		templateUrl: definition.inputDatetime.templateUrl,
		replace: true

	};
}
