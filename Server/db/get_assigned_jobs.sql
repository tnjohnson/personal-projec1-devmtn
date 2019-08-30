SELECT  
    administrator, 
    assigned_user, 
    completed, 
    description, 
    users.id as user_id,
    jobs.id as job_id, 
    job_title, 
    notes, 
    user_name, 
    user_role
FROM users
JOIN jobs ON users.id = jobs.assigned_user
WHERE users.id = ${userId} AND completed = false
;

-- SELECT * 
-- FROM users
-- JOIN jobs ON users.id = jobs.assigned_user
-- WHERE users.id = ${userId} AND completed = false
-- ;