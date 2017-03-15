import { BasicItemService } from 'web-angularjs-crud-base-items/item/service';
import { AjaxFactory } from 'web-angularjs-user-factory/AjaxFactory';
import { BasicListFactory } from 'web-angularjs-crud-base-items/list/factory';
export declare class ItemService extends BasicItemService {
    static serviceName: string;
    static $inject: any[];
    constructor(ajaxFactory: AjaxFactory, listFactory: BasicListFactory);
    saveItem(item: any, cb: () => void, failCB: (data) => void): void;
    static Service(): any[];
}
