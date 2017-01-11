import {definition} from '../../../../Definition';
export function directive() {
	return {
		scope: {},
		controller: definition.inputDeleteButton.controllerName,
		templateUrl: definition.inputDeleteButton.templateUrl,
		replace: true,
	};
}

