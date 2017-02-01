// Created by trevor on 1/5/17.

export class IComponent {
	// names
	name: string;
	moduleName: string;
	controllerName: string;
	factoryName: string;
	serviceName: string;
	directiveName: string;
	templateName: string;

	// names
	moduleFileName: string = 'module';
	controllerFileName: string = 'controller';
	factoryFileName: string = 'factory';
	serviceFileName: string = 'service';
	directiveFileName: string = 'directive';
	templateFileName: string = 'template';

	// paths
	static rootUrlPrefix: string = '/src/client/app/';

	rootUrl: string;	// path to the directory containing all files for a component.
	moduleUrl: string;
	controllerUrl: string;
	factoryUrl: string;
	serviceUrl: string;
	directiveUrl: string;
	templateUrl: string;

	renameNames(name: string) {
		this.name = name;
		this.moduleName = name + '-module';
		this.controllerName = name + '-controller';
		this.factoryName = name + '-factory';
		this.serviceName = name + '-service';
		this.directiveName = 'tvo' + name.charAt(0).toUpperCase() + name.slice(1);
		this.templateName = name + '-template';
	}

	renameUrls() {
		this.rootUrl = '/' + this.rootUrl.split('/').filter(Boolean).join('/') + '/';

		this.moduleUrl = this.rootUrl + this.moduleFileName;
		this.controllerUrl = this.rootUrl + this.controllerFileName;
		this.factoryUrl = this.rootUrl + this.factoryFileName;
		this.serviceUrl = this.rootUrl + this.serviceFileName;
		this.directiveUrl = this.rootUrl + this.directiveFileName;
		this.templateUrl = this.rootUrl + this.templateFileName + '.html';
	}

	constructor(name: string, rootUrl: string) {
		// names for the angular modules
		this.renameNames(name);

		// urls
		this.rootUrl = IComponent.rootUrlPrefix + rootUrl;
		this.renameUrls();
	}
}
