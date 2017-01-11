import {controller} from './controller';
import {definition} from '../../../Definition';

export function directive() {
	return {
		scope: {
			'label': '=',
			'value': '='
		},
		controller: controller.controllerName,
		controllerAs: "vm",
		bindToController: true,
		replace: true,
		templateUrl: definition.labelText.templateUrl
	};
}
