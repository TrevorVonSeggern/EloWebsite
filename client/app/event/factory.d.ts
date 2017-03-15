export declare class EventFactory {
    static factoryName: string;
    static $inject: string[];
    static initialized: boolean;
    constructor();
    $get(): this;
    static Factory(): (() => EventFactory)[];
}
