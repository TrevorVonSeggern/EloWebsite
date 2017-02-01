SELECT
  M._id,
  M.startTime,
  M.endTime,
  M.winner,
  M.status,
  M.teamA,
  M.teamB,
  M.eventId,
  E.name AS eventName,
  TA.name as teamAName,
  TB.name as teamBName
FROM `Match` as M

INNER JOIN Event as E on E.`_id` = M.eventId
INNER JOIN Team as TA on TA._id = M.teamA
INNER JOIN Team as TB on TB._id = M.teamB

WHERE M.`_id` = ? LIMIT 1;
