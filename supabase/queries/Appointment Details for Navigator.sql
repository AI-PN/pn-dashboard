SELECT
  a.appointment_id,
  a.scheduled_at,
  a.location,
  a.status AS appointment_status,
  a.needs_transport,
  p.patient_id,
  p.name AS patient_name,
  cp.care_plan_id,
  pr.provider_id,
  pr.name AS provider_name,
  pr.specialty
FROM appointments a
JOIN care_plans cp ON a.care_plan_id = cp.care_plan_id
JOIN patients p ON cp.patient_id = p.patient_id
JOIN providers pr ON a.provider_id = pr.provider_id
WHERE p.navigator_id = '123e4567-e89b-12d3-a456-426614174200' -- Replace with your navigator_id
ORDER BY a.scheduled_at ASC, p.name;