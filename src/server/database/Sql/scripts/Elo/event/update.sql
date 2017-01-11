UPDATE `Quicksilver`.`Event`
SET
`name` = ?,
`startTime` = ?,
`endTime` = ?,
`gameId` = ?,
`userId` = ?,
`comment` = ?
WHERE `_id` = ?;

