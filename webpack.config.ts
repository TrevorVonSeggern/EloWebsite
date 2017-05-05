// Created by trevor on 5/1/17.
import * as web from 'web-server-database/webpack.config';

let pack: any = web.default;
pack.entry.shift();
delete pack.resolve.modulesDirectories;
pack.resolve.extensions.shift();
pack.plugins = [];
pack.context = __dirname;
module.exports = pack;
