import {definition} from '../../../Definition';
export function InputSwitchDirective() {
	return {
		scope: {
			'label': '=',
			'value': '='
		},
		controller: definition.inputSwitch.controllerName,
		controllerAs: "vm",
		bindToController: true,
		templateUrl: definition.inputSwitch.templateUrl
	};
}
