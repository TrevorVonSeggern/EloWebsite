UPDATE `Quicksilver`.`Match`
SET
`startTime` = ?,
`endTime` = ?,
`teamA` = ?,
`teamB` = ?,
`eventId` = ?,
`status` = ?
WHERE `_id` = ?;

