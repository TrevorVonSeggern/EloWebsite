
import {definition} from '../../../Definition';
export function directive() {
	return {
		scope: {
			'label': '=',
			'type': '@',
		},
		controller: definition.inputButton.controllerName,
		replace: true,
		templateUrl: definition.inputButton.templateUrl
	};
}

