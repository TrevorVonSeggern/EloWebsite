UPDATE `Quicksilver`.`Match`
SET
`startTime` = ?,
`endTime` = ?,
`teamA` = ?,
`teamB` = ?,
`eventId` = ?,
`status` = ?,
`winner` = ?
WHERE `_id` = ?;

