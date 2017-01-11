UPDATE `Quicksilver`.`Client`
SET
`_id` = ?,
`name` = ?,
`url` = ?,
`redirect_uri` = ?,
`response_type` = ?,
`client_id` = ?,
`scope` = ?,
`state` = ?
WHERE `_id` = ?;
