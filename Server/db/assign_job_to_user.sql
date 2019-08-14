UPDATE jobs
SET assigned_user = ${userId}
WHERE id = ${jobId};