import {definition} from '../../../Definition';
export function InputPasswordDirective() {
	return {
		scope: {
			'label': '=',
			'value': '='
		},
		controller: definition.inputPassword.controllerName,
		controllerAs: 'vm',
		bindToController: true,
		replace: true,
		templateUrl: definition.inputPassword.templateUrl
	};
}

