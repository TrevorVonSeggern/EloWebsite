
import {definition} from '../../../Definition';
export function InputPhoneDirective() {
	return {
		scope: {
			'label': '=',
			'value': '=',
			'display': '='
		},
		controller: definition.inputPhone.controllerName,
		controllerAs: 'vm',
		bindToController: true,
		templateUrl: definition.inputPhone.templateUrl
	};
}
