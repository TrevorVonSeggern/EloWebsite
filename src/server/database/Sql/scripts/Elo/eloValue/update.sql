UPDATE `Quicksilver`.`EloValue`
SET
`playerId` = ?,
`teamId` = ?,
`matchId` = ?,
`eloValue` = ?
WHERE `_id` = ?;

