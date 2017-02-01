/**
 * Created by Trevor Von Seggern on 11/30/2015.
 */
import {definition} from '../../Definition';
export function navDirective() {
	return {
		controller: definition.nav.controllerName,
		controllerAs: 'vm',
		templateUrl: definition.nav.templateUrl
	};
}
