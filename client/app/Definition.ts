import {eloDefinition} from "./pages/elo/eloDefinition";
import {IComponent} from "./IComponent";
/**
 * Created by trevor on 3/24/16.
 */


// This class is translation class for the $routeProvider and a IComponent.
// so that i can make any component lazy loaded.
export class DefinitionRouter {
	controller: string;
	controllerAs: string = 'vm';
	// template:string = 'not loaded yet.';
	templateUrl: any; // = 'text!client/app/components/nav/template.html';
	component: IComponent;

	constructor(public url: string, component: IComponent) {
		this.controller = component.controllerName;
		this.templateUrl = () => {
			return component.templateUrl;
		};
		this.component = component;
	}
}

let umBaseUrl: string = 'pages/userManagement/administration/userManagement/';

export class DefinitionConfiguration {
	elo = eloDefinition;

	administration: IComponent = new IComponent('administration', 'pages/userManagement/administration/');

	userManagement: IComponent = new IComponent('user-management', umBaseUrl);
	userManagementStatus: IComponent = new IComponent('user-management-status', umBaseUrl + 'status');
	userManagementList: IComponent = new IComponent('user-management-list', umBaseUrl + 'list/multiple');
	userManagementMultipleItem: IComponent = new IComponent('user-management-multiple-item', umBaseUrl + 'list/multiple');
	userManagementSingleItem: IComponent = new IComponent('user-management-single-item', umBaseUrl + 'list/single');

	userManagementDetail: IComponent = new IComponent('user-management-detail', umBaseUrl + 'item/detail');
	userManagementCreate: IComponent = new IComponent('user-management-create', umBaseUrl + 'item/create');
	userManagementEdit: IComponent = new IComponent('user-management-edit', umBaseUrl + 'item/edit');

	// Standard Pages
	home: IComponent = new IComponent('home', 'pages/home');
	banner: IComponent = new IComponent('banner', 'pages/home/banner');
	user: IComponent = new IComponent('user', 'pages/userManagement/user');
	login: IComponent = new IComponent('login', 'pages/userManagement/user/login');
	register: IComponent = new IComponent('register', 'pages/userManagement/user/register');
	account: IComponent = new IComponent('account', 'pages/userManagement/user/account');
	accountChangePassword: IComponent = new IComponent('account', 'pages/userManagement/user/changepassword');
	authentication: IComponent = new IComponent('auth', 'pages/userManagement/account');


	// Standard Component
	// input component
	inputSingleSelect: IComponent = new IComponent('input-single-select', 'component/input/singleSelect');
	inputText: IComponent = new IComponent('text', 'component/input/text');
	inputButton: IComponent = new IComponent('button', 'component/input/button');
	inputDeleteButton: IComponent = new IComponent('deleteButton', 'component/input/button/delete');
	inputCreateButton: IComponent = new IComponent('createButton', 'component/input/button/create');
	inputEmail: IComponent = new IComponent('email', 'component/input/email');
	inputPageLink: IComponent = new IComponent('pageLink', 'component/input/pageLink');
	inputPassword: IComponent = new IComponent('password', 'component/input/password');
	inputPhone: IComponent = new IComponent('phone', 'component/input/phone');
	inputSlider: IComponent = new IComponent('slider', 'component/input/slider');
	inputSwitch: IComponent = new IComponent('switch', 'component/input/switch');
	inputDatetime: IComponent = new IComponent('datetime', 'component/input/datetime');
	// labeling component
	labelText: IComponent = new IComponent('label-text', 'component/label/text');
	labelDatetime: IComponent = new IComponent('label-datetime', 'component/label/datetime');
	// api component
	nav: IComponent = new IComponent('nav', 'component/nav/');

	constructor() {
	}
}

export let definition: DefinitionConfiguration = new DefinitionConfiguration();