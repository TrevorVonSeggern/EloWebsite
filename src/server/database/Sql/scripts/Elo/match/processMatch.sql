# get the match id, teamA, and teamB values.
SET @MatchId = NULL;
SET @MatchEndTime = NULL;
SET @TeamAId = NULL;
SET @TeamBId = NULL;
SET @TeamASkill = 0;
SET @TeamBSkill = 0;
SELECT
  @MatchId := _id,
  @TeamAId := teamA,
  @TeamBId := teamB,
  @MatchEndTime := `Match`.endTime
FROM `Match`
WHERE `Match`.status LIKE 0
ORDER BY `Match`.endTime
LIMIT 1;

#get the default elo value
SET @DefaultElo = 1200;
SET @ScaleElo = 400;
SET @Winner = 0.5;
SELECT
  @DefaultElo := G.startValue,
  @ScaleElo := G.scale,
  @Winner := M.winner
FROM `Match` AS M
  INNER JOIN Quicksilver.Event AS E ON E.`_id` = M.`eventId`
  INNER JOIN Quicksilver.Game AS G ON G.`_id` = E.`gameId`
WHERE M.`_id` = @MatchId;

#temp table of players
DROP TEMPORARY TABLE IF EXISTS ps;
CREATE TEMPORARY TABLE ps (
  eloId    VARCHAR(30) NOT NULL,
  playerId VARCHAR(30) NOT NULL,
  teamId   VARCHAR(30) NOT NULL,
  eloValue DECIMAL
);

INSERT INTO ps (eloId, playerId, teamId)
  SELECT
    _id,
    playerId,
    teamId
  FROM `EloValue`
  WHERE `EloValue`.matchId = @MatchId;

#update elo value with last one.
UPDATE ps
SET ps.eloValue = COALESCE(
    (
      SELECT E.eloValue
      FROM EloValue AS E
        INNER JOIN `Match` AS M ON M.`_id` != @MatchId
      WHERE E.playerId = ps.playerId AND M.status LIKE 1 AND M.endTime < @MatchEndTime
      ORDER BY M.endTime DESC
      LIMIT 1
    ), @DefaultElo);

SELECT * FROM ps;

# update team a skill value
SET @TeamASkill = (SELECT SUM(eloValue)
                   FROM ps
                   WHERE teamId LIKE @TeamAId);
SET @TeamBSkill = (SELECT SUM(eloValue)
                   FROM ps
                   WHERE teamId LIKE @TeamBId);
SET @TeamATransform = POW(10, (@TeamASkill) / 400);
SET @TeamBTransform = POW(10, (@TeamBSkill) / 400);
SET @TeamAExpectedScore = @TeamATransform / (@TeamATransform + @TeamBTransform);
SET @TeamBExpectedScore = @TeamBTransform / (@TeamBTransform + @TeamATransform);
SET @TeamAScore = CAST(COALESCE(@Winner, 0.5) AS DECIMAL(8,2));
SET @TeamBScore = 1 - @TeamAScore;
SET @TeamASkillChange = @ScaleElo * (@TeamAScore - @TeamAExpectedScore);
SET @TeamBSkillChange = @ScaleElo * (@TeamBScore - @TeamBExpectedScore);
SELECT @TeamASkillChange;

SET @TeamASize = CAST((SELECT COUNT(*)
                       FROM ps
                       WHERE teamId LIKE @TeamAId) AS DECIMAL(8, 2));
SET @TeamBSize = CAST((SELECT COUNT(*)
                       FROM ps
                       WHERE teamId LIKE @TeamBId) AS DECIMAL(8, 2));
SET @PlayerAChange = @TeamASkillChange / @TeamASize;
SET @PlayerBChange = @TeamBSkillChange / @TeamBSize;

# update the elo values.
UPDATE EloValue as E, ps
    SET E.eloValue = ps.eloValue + @PlayerAChange
WHERE E.matchId = @MatchId AND E.teamId = @TeamAId AND ps.eloId = E.`_id`;
UPDATE EloValue as E, ps
    SET E.eloValue = ps.eloValue + @PlayerBChange
WHERE E.matchId = @MatchId AND E.teamId = @TeamBId AND ps.eloId = E.`_id`;

# update the match status
UPDATE `Match` as M
  SET M.status = 1
WHERE M.`_id` = @MatchId;

SELECT @PlayerAChange;
