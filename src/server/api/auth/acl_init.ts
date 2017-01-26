///<reference path="../../../models/UserManagement/user.ts"/>
/**
 * Created by trevor on 7/12/2016.
 */
import {HashStringClient, ServerUser} from '../../database/UserManagement/user';
import * as AclLib from 'acl';
import {Permissions, Roles} from './acl_permissions';

//noinspection JSPotentiallyInvalidConstructorUsage
export let acl: any = new AclLib(new AclLib.memoryBackend());

function addAdminUserToAdminRole(): void {
	// manage the acl for the new user.
	ServerUser.getOneByUsername('admin').then((user: ServerUser) => {
		if (user) {
			acl.addUserRoles(user._id, Roles.admin).then(() => {
			}, (error) => {
				console.log(error);
			});
		}
	}, (error) => {
		console.log(error);
	});
}

ServerUser.getOneByUsername('admin').then((scannedUser: ServerUser) => {
	if (scannedUser)
		return addAdminUserToAdminRole();

	let user = new ServerUser();
	// username and password are admin.
	user.username = 'admin';
	user.email = 'admin@example.com';
	user.first_name = 'admin';
	user.last_name = 'admin';
	user.role = 'Administrator';
	HashStringClient('admin').then((hash: string) => {
		user.password = hash;
		user.save().then(addAdminUserToAdminRole, (error) => {
			console.log(error);
		});
	}, (error: string) => {
		console.log(error);
	});
}, (error) => {
	console.log(error);
});

acl.addUserRoles('Guest', 'Guest').then(() => {
	for (let i: number = 0; i < Permissions.length; ++i) {
		acl.allow(Permissions[i].role, Permissions[i].url, Permissions[i].type);
	}
});


