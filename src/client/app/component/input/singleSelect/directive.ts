import {controller} from './controller';
import {definition} from '../../../Definition';

export function directive() {
	return {
		scope: {
			'label': '=',
			'value': '=',
			'list': '=',
			'selected': '='
		},
		controller: controller.controllerName,
		controllerAs: "vm",
		bindToController: true,
		templateUrl: definition.inputSingleSelect.templateUrl,
		replace: true
	};
}
