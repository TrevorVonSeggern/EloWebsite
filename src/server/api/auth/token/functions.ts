/**
 * Created by trevor on 3/21/16.
 */
// Load required packages

import {Token} from '../../../database/UserManagement/token';

// Create endpoint /api/clients for GET
export function getList(req, res) {
	// Use the Client model to find all clients
	Token.all().then(res.json, res.send);
}
