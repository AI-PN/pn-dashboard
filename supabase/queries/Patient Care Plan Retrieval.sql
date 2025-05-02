SELECT
  cp.care_plan_id,
  cp.start_date,
  cp.end_date,
  p.patient_id,
  p.name AS patient_name,
  p.date_of_birth,
  p.contact_info,
  c.condition_id,
  c.name AS condition_name,
  c.diagnosed_on,
  m.medication_id,
  m.name AS medication_name,
  m.dosage,
  m.frequency,
  pr.provider_id,
  pr.name AS provider_name,
  pr.specialty,
  cpp.role AS provider_role,
  hg.goal_id,
  hg.description AS goal_description,
  hg.target_date AS goal_target_date,
  hg.status AS goal_status,
  a.appointment_id,
  a.scheduled_at,
  a.location,
  a.status AS appointment_status,
  a.needs_transport,
  t.transport_id,
  t.mode AS transport_mode,
  t.pickup_time,
  t.status AS transport_status,
  tsk.task_id,
  tsk.description AS task_description,
  tsk.due_date AS task_due_date,
  tsk.status AS task_status
FROM care_plans cp
JOIN patients p ON cp.patient_id = p.patient_id
LEFT JOIN conditions c ON c.care_plan_id = cp.care_plan_id
LEFT JOIN medications m ON m.care_plan_id = cp.care_plan_id
LEFT JOIN care_plan_providers cpp ON cpp.care_plan_id = cp.care_plan_id
LEFT JOIN providers pr ON pr.provider_id = cpp.provider_id
LEFT JOIN health_goals hg ON hg.care_plan_id = cp.care_plan_id
LEFT JOIN appointments a ON a.care_plan_id = cp.care_plan_id
LEFT JOIN transports t ON t.appointment_id = a.appointment_id
LEFT JOIN tasks tsk ON tsk.care_plan_id = cp.care_plan_id
WHERE cp.care_plan_id = '123e4567-e89b-12d3-a456-426614174300'; -- Replace with your care_plan_id