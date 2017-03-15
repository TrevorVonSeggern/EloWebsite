export declare class TeamFactory {
    static factoryName: string;
    static $inject: string[];
    static initialized: boolean;
    constructor();
    $get(): this;
    static Factory(): (() => TeamFactory)[];
}
