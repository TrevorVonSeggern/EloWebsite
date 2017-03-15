import { BasicListFactory } from 'web-angularjs-crud-base-items/list/factory';
import { AjaxFactory } from 'web-angularjs-user-factory/AjaxFactory';
export declare class ListFactory extends BasicListFactory {
    itemFactory: AjaxFactory;
    static factoryName: string;
    static $inject: any[];
    constructor(itemFactory: AjaxFactory);
    getItemCount(cb: (count) => void): void;
    static factory(): any[];
}
