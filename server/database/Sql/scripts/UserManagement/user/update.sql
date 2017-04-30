UPDATE `Quicksilver`.`User`
SET
`_id` = ?,
`username` = ?,
`password` = ?,
`first_name` = ?,
`last_name` = ?,
`email` = ?,
`role` = ?
WHERE `_id` = ?;
