import {definition} from '../../../Definition';
export function InputPageLinkDirective() {
	return {
		scope: {
			'label': '=',
			'href': '=',
			'disabled': '='
		},
		controller: definition.inputPageLink.controllerName,
		controllerAs: "vm",
		bindToController: true,
		replace: true,
		templateUrl: definition.inputPageLink.templateUrl
	};
}
