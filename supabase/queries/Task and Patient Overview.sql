SELECT
  t.task_id,
  t.description,
  t.due_date,
  t.status,
  p.patient_id,
  p.name AS patient_name
FROM tasks t
LEFT JOIN care_plans cp ON t.care_plan_id = cp.care_plan_id
LEFT JOIN patients p ON cp.patient_id = p.patient_id
WHERE t.assigned_navigator_id = '123e4567-e89b-12d3-a456-426614174200' -- Replace with your navigator_id
ORDER BY t.due_date ASC NULLS LAST, t.status, t.task_id;