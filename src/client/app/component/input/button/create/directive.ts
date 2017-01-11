import {definition} from '../../../../Definition';
export function directive() {
	return {
		controller: definition.inputCreateButton.controllerName,
		templateUrl: definition.inputCreateButton.templateUrl,

		scope: {},
		replace: true,
	};
}

