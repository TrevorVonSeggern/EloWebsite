SELECT
  M._id,
  M.startTime,
  M.endTime,
  E.name AS eventName,
  TA.name as teamA,
  TB.name as teamB
FROM `Match` as M

INNER JOIN Event as E on E.`_id` = M.eventId
INNER JOIN Team as TA on TA._id = M.teamA
INNER JOIN Team as TB on TB._id = M.teamB
