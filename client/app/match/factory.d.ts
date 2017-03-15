export declare class MatchFactory {
    static factoryName: string;
    static $inject: string[];
    static initialized: boolean;
    constructor();
    $get(): this;
    static Factory(): (() => MatchFactory)[];
}
