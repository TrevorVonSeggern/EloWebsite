/**
 * Created by trevor on 7/6/2016.
 */
let lazyLoader: any = require('gulp-load-plugins')({lazy: true});

export function log(msg) {
	if (typeof(msg) === 'object') {
		for (let item in msg) {
			if (msg.hasOwnProperty(item)) {
				lazyLoader.util.log(lazyLoader.util.colors.blue(msg[item]));
			}
		}
	} else {
		lazyLoader.util.log(lazyLoader.util.colors.blue(msg));
	}
}