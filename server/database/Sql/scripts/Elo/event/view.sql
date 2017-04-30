SELECT
  E._id,
  E.name as name,
  G.name as gameName,
  E.startTime,
  E.endTime
FROM `Event` as E

INNER JOIN Game as G on G.`_id` = E.gameId
