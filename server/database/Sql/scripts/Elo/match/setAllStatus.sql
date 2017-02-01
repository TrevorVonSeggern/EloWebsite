UPDATE `Quicksilver`.`Match` as m
INNER JOIN `Quicksilver`.`Event` as e ON eventId = e._id
SET
m.`status` = 0
WHERE e.gameId = ?;