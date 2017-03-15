export declare class GameFactory {
    static factoryName: string;
    static $inject: string[];
    static initialized: boolean;
    constructor();
    $get(): this;
    static Factory(): (() => GameFactory)[];
}
