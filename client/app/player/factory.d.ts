export declare class PlayerFactory {
    static factoryName: string;
    static $inject: string[];
    static initialized: boolean;
    constructor();
    $get(): this;
    static Factory(): (() => PlayerFactory)[];
}
