-- Writer Studio telemetry table (already created in the demo workspace).
-- Events are inserted by pocket-portal.html through proxy.js.
CREATE TABLE IF NOT EXISTS workspace.default.portal_events (
  event_id STRING, session_id STRING, type STRING, character STRING,
  topic STRING, free_text STRING, answer_type STRING, object_id STRING,
  value STRING, ts TIMESTAMP
) USING DELTA;

-- Useful demo aggregate: 
SELECT type, character, topic, object_id, answer_type, COUNT(*) AS events
FROM workspace.default.portal_events
GROUP BY type, character, topic, object_id, answer_type;
