SELECT * 
FROM users
JOIN jobs ON users.id = jobs.assigned_user
WHERE users.id = ${userId}
;