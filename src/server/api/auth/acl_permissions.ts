/**
 * Created by trevor on 7/22/2016.
 */

export const Roles = {
	admin: 'Administrator',
	user: 'User',
	guest: 'Guest'
};

export const Permissions = [
	{role: Roles.admin, url: 'api', type: 'get'},
	{role: Roles.user, url: 'api', type: 'get'},

	{role: Roles.admin, url: 'api/logs', type: 'get'},

	{role: Roles.admin, url: 'api/user/ChangePassword', type: 'put'},
	{role: Roles.user, url: 'api/user/ChangePassword', type: 'put'},
	{role: Roles.guest, url: 'api/user/ChangePassword', type: 'put'},

	{role: Roles.admin, url: 'api/user/ChangePassword/:*:', type: 'put'},

	{role: Roles.admin, url: 'api/user/size', type: 'get'},
	{role: Roles.admin, url: 'api/user/:*:', type: 'get'},
	{role: Roles.admin, url: 'api/user/:*:', type: 'delete'},
	{role: Roles.admin, url: 'api/user', type: 'get'},
	{role: Roles.admin, url: 'api/user', type: 'put'},
	{role: Roles.admin, url: 'api/user', type: 'post'},

	{role: Roles.admin, url: 'api/elo/game/size', type: 'get'},
	{role: Roles.admin, url: 'api/elo/game/:*:', type: 'get'},
	{role: Roles.admin, url: 'api/elo/game/:*:', type: 'delete'},
	{role: Roles.admin, url: 'api/elo/game', type: 'get'},
	{role: Roles.admin, url: 'api/elo/game', type: 'put'},
	{role: Roles.admin, url: 'api/elo/game', type: 'post'},

	{role: Roles.user, url: 'api/elo/game/size', type: 'get'},
	{role: Roles.user, url: 'api/elo/game/:*:', type: 'get'},
	{role: Roles.user, url: 'api/elo/game/:*:', type: 'delete'},
	{role: Roles.user, url: 'api/elo/game', type: 'get'},
	{role: Roles.user, url: 'api/elo/game', type: 'put'},
	{role: Roles.user, url: 'api/elo/game', type: 'post'},

	{role: Roles.admin, url: 'api/elo/event/size', type: 'get'},
	{role: Roles.admin, url: 'api/elo/event/:*:', type: 'get'},
	{role: Roles.admin, url: 'api/elo/event/:*:', type: 'delete'},
	{role: Roles.admin, url: 'api/elo/event', type: 'get'},
	{role: Roles.admin, url: 'api/elo/event', type: 'put'},
	{role: Roles.admin, url: 'api/elo/event', type: 'post'},

	{role: Roles.user, url: 'api/elo/event/size', type: 'get'},
	{role: Roles.user, url: 'api/elo/event/:*:', type: 'get'},
	{role: Roles.user, url: 'api/elo/event/:*:', type: 'delete'},
	{role: Roles.user, url: 'api/elo/event', type: 'get'},
	{role: Roles.user, url: 'api/elo/event', type: 'put'},
	{role: Roles.user, url: 'api/elo/event', type: 'post'},
];
