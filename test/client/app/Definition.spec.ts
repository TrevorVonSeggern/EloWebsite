import {definition} from '../../../src/client/app/Definition';
import {IComponent} from "../../../src/client/app/IComponent";
describe('Definition', () => {
	describe('definition should exist', () => {
		it('exists', () => {
			expect(definition).toBeDefined();

			it('component should exits', () => {
				expect(IComponent).toBeDefined();
			});
		});
	});

	describe('check new "a" component', () => {
		beforeEach(() => {
			definition['a'] = new IComponent('a', '/a');
		});

		it('has an "a" component', () => {
			expect(definition['a']).toBeDefined();
		});

		it('check validity of component module names', () => {
			var object: string = 'module';
			expect(definition['a'][object + 'Name']).toBe('a-' + object);
			expect(definition['a'][object + 'FileName']).toBe('module');
			expect(definition['a'][object + 'Url']).toBe('/src/client/app/a/' + object);
		});

		it('check validity of component controller names', () => {
			var object: string = 'controller';
			expect(definition['a'][object + 'Name']).toBe('a-' + object);
			expect(definition['a'][object + 'FileName']).toBe(object);
			expect(definition['a'][object + 'Url']).toBe('/src/client/app/a/' + object);
		});

		it('check validity of component directive names', () => {
			var object = 'directive';
			expect(definition['a'][object + 'Name']).toBe('tvoA');
			expect(definition['a'][object + 'FileName']).toBe(object);
			expect(definition['a'][object + 'Url']).toBe('/src/client/app/a/' + object);
		});

		it('check validity of component factory names', () => {
			var object: string = 'factory';
			expect(definition['a'][object + 'Name']).toBe('a-factory');
			expect(definition['a'][object + 'FileName']).toBe('factory');
			expect(definition['a'][object + 'Url']).toBe('/src/client/app/a/factory');
		});

		it('check validity of component service names', () => {
			var object: string = 'service';
			expect(definition['a'][object + 'Name']).toBe('a-' + object);
			expect(definition['a'][object + 'FileName']).toBe(object);
			expect(definition['a'][object + 'Url']).toBe('/src/client/app/a/' + object);
		});

		it('check validity of template names', () => {
			var object: string = 'template';
			expect(definition['a'][object + 'Name']).toBe('a-template');
			expect(definition['a'][object + 'FileName']).toBe('template');
			expect(definition['a'][object + 'Url']).toBe('/src/client/app/a/template.html');
		});
	});
});
