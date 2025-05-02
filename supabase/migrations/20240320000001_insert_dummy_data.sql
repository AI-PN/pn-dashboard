-- Insert dummy navigator
INSERT INTO navigators (navigator_id, name, email)
VALUES ('123e4567-e89b-12d3-a456-426614174200', 'Alex Smith', 'alex.smith@example.com');

-- Insert patients
INSERT INTO patients (patient_id, name, date_of_birth, contact_info, navigator_id)
VALUES
  ('123e4567-e89b-12d3-a456-426614174100', 'James Martinez', '1964-04-10', 'OpenMRS ID: 100005L', '123e4567-e89b-12d3-a456-426614174200'),
  ('123e4567-e89b-12d3-a456-426614174101', 'Betty Williams', '1973-03-15', 'OpenMRS ID: 100000Y', '123e4567-e89b-12d3-a456-426614174200');

-- Insert care plans
INSERT INTO care_plans (care_plan_id, patient_id, start_date)
VALUES
  ('123e4567-e89b-12d3-a456-426614174300', '123e4567-e89b-12d3-a456-426614174100', '2025-04-09'),
  ('123e4567-e89b-12d3-a456-426614174301', '123e4567-e89b-12d3-a456-426614174101', '2025-04-09');

-- Insert conditions for James Martinez
INSERT INTO conditions (condition_id, care_plan_id, name, diagnosed_on)
VALUES
  ('123e4567-e89b-12d3-a456-426614174400', '123e4567-e89b-12d3-a456-426614174300', 'Frequency of Urination and Polyuria', NULL),
  ('123e4567-e89b-12d3-a456-426614174401', '123e4567-e89b-12d3-a456-426614174300', 'Pneumonia', NULL),
  ('123e4567-e89b-12d3-a456-426614174402', '123e4567-e89b-12d3-a456-426614174300', 'Mycetoma', NULL),
  ('123e4567-e89b-12d3-a456-426614174403', '123e4567-e89b-12d3-a456-426614174300', 'Throat pain', NULL),
  ('123e4567-e89b-12d3-a456-426614174404', '123e4567-e89b-12d3-a456-426614174300', 'Pain of breast', NULL),
  ('123e4567-e89b-12d3-a456-426614174405', '123e4567-e89b-12d3-a456-426614174300', 'Hip Pain', NULL),
  ('123e4567-e89b-12d3-a456-426614174406', '123e4567-e89b-12d3-a456-426614174300', 'Narcotic abuse', NULL),
  ('123e4567-e89b-12d3-a456-426614174407', '123e4567-e89b-12d3-a456-426614174300', 'Heart Failure (I50.9)', NULL),
  ('123e4567-e89b-12d3-a456-426614174408', '123e4567-e89b-12d3-a456-426614174300', 'Acute rheumatic fever (I00)', NULL),
  ('123e4567-e89b-12d3-a456-426614174409', '123e4567-e89b-12d3-a456-426614174300', 'Lower Respiratory Tract Infection', NULL),
  ('123e4567-e89b-12d3-a456-42661417440a', '123e4567-e89b-12d3-a456-426614174300', 'Cirrhosis of Liver', NULL),
  ('123e4567-e89b-12d3-a456-42661417440b', '123e4567-e89b-12d3-a456-426614174300', 'Mucus in Stool', NULL),
  ('123e4567-e89b-12d3-a456-42661417440c', '123e4567-e89b-12d3-a456-426614174300', 'Measles', NULL),
  ('123e4567-e89b-12d3-a456-42661417440d', '123e4567-e89b-12d3-a456-426614174300', 'calcium channel blocker allergy', NULL),
  ('123e4567-e89b-12d3-a456-42661417440e', '123e4567-e89b-12d3-a456-426614174300', 'Kaposi sarcoma oral', NULL);

-- Insert conditions for Betty Williams
INSERT INTO conditions (condition_id, care_plan_id, name, diagnosed_on)
VALUES
  ('123e4567-e89b-12d3-a456-426614174500', '123e4567-e89b-12d3-a456-426614174301', 'heparin allergy', NULL),
  ('123e4567-e89b-12d3-a456-426614174501', '123e4567-e89b-12d3-a456-426614174301', 'Genital warts', NULL),
  ('123e4567-e89b-12d3-a456-426614174502', '123e4567-e89b-12d3-a456-426614174301', 'Hypertrophy of Tonsils', NULL),
  ('123e4567-e89b-12d3-a456-426614174503', '123e4567-e89b-12d3-a456-426614174301', 'Gastric ulcer', NULL),
  ('123e4567-e89b-12d3-a456-426614174504', '123e4567-e89b-12d3-a456-426614174301', 'Foreign body in eye', NULL),
  ('123e4567-e89b-12d3-a456-426614174505', '123e4567-e89b-12d3-a456-426614174301', 'Contrast Media Allergy', NULL),
  ('123e4567-e89b-12d3-a456-426614174506', '123e4567-e89b-12d3-a456-426614174301', 'Flank Pain', NULL),
  ('123e4567-e89b-12d3-a456-426614174507', '123e4567-e89b-12d3-a456-426614174301', 'Itchy Eyes', NULL),
  ('123e4567-e89b-12d3-a456-426614174508', '123e4567-e89b-12d3-a456-426614174301', 'Suspected severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) infection', NULL),
  ('123e4567-e89b-12d3-a456-426614174509', '123e4567-e89b-12d3-a456-426614174301', 'Pain in pelvis', NULL),
  ('123e4567-e89b-12d3-a456-42661417450a', '123e4567-e89b-12d3-a456-426614174301', 'Post-nasal discharge', NULL),
  ('123e4567-e89b-12d3-a456-42661417450b', '123e4567-e89b-12d3-a456-426614174301', 'Wasting syndrome', NULL),
  ('123e4567-e89b-12d3-a456-42661417450c', '123e4567-e89b-12d3-a456-426614174301', 'Numbness of Hand', NULL),
  ('123e4567-e89b-12d3-a456-42661417450d', '123e4567-e89b-12d3-a456-426614174301', 'Candidiasis, oral', NULL),
  ('123e4567-e89b-12d3-a456-42661417450e', '123e4567-e89b-12d3-a456-426614174301', 'Swollen Feet', NULL),
  ('123e4567-e89b-12d3-a456-42661417450f', '123e4567-e89b-12d3-a456-426614174301', 'Acute Cholecystitis', NULL);

-- Insert providers
INSERT INTO providers (provider_id, name, specialty, contact_info) VALUES
  ('123e4567-e89b-12d3-a456-426614174600', 'Dr. Priya Patel', 'General Medicine', 'priya.patel@hospital.org'),
  ('123e4567-e89b-12d3-a456-426614174601', 'Dr. John Lee', 'Cardiology', 'john.lee@hospital.org'),
  ('123e4567-e89b-12d3-a456-426614174602', 'Dr. Maria Gomez', 'Infectious Diseases', 'maria.gomez@hospital.org');

-- Link providers to care plans
INSERT INTO care_plan_providers (cpp_id, care_plan_id, provider_id, role) VALUES
  ('123e4567-e89b-12d3-a456-426614174700', '123e4567-e89b-12d3-a456-426614174300', '123e4567-e89b-12d3-a456-426614174600', 'Primary'),
  ('123e4567-e89b-12d3-a456-426614174701', '123e4567-e89b-12d3-a456-426614174300', '123e4567-e89b-12d3-a456-426614174601', 'Specialist'),
  ('123e4567-e89b-12d3-a456-426614174702', '123e4567-e89b-12d3-a456-426614174301', '123e4567-e89b-12d3-a456-426614174602', 'Primary');

-- Insert appointments
INSERT INTO appointments (appointment_id, patient_id, provider_id, care_plan_id, scheduled_at, location, status, needs_transport) VALUES
  ('123e4567-e89b-12d3-a456-426614174800', '123e4567-e89b-12d3-a456-426614174100', '123e4567-e89b-12d3-a456-426614174600', '123e4567-e89b-12d3-a456-426614174300', '2025-04-10 09:00:00+00', 'Room 101', 'Upcoming', true),
  ('123e4567-e89b-12d3-a456-426614174801', '123e4567-e89b-12d3-a456-426614174100', '123e4567-e89b-12d3-a456-426614174601', '123e4567-e89b-12d3-a456-426614174300', '2025-04-15 11:00:00+00', 'Room 202', 'Upcoming', false),
  ('123e4567-e89b-12d3-a456-426614174802', '123e4567-e89b-12d3-a456-426614174101', '123e4567-e89b-12d3-a456-426614174602', '123e4567-e89b-12d3-a456-426614174301', '2025-04-12 14:00:00+00', 'Room 303', 'Upcoming', true);

-- Insert transports for appointments needing transport
INSERT INTO transports (transport_id, appointment_id, mode, pickup_time, status) VALUES
  ('123e4567-e89b-12d3-a456-426614174900', '123e4567-e89b-12d3-a456-426614174800', 'Taxi', '2025-04-10 08:30:00+00', 'Scheduled'),
  ('123e4567-e89b-12d3-a456-426614174901', '123e4567-e89b-12d3-a456-426614174802', 'Van', '2025-04-12 13:15:00+00', 'Scheduled');

-- Insert medications
INSERT INTO medications (medication_id, care_plan_id, name, dosage, frequency) VALUES
  ('123e4567-e89b-12d3-a456-426614174a00', '123e4567-e89b-12d3-a456-426614174300', 'Lisinopril', '10mg', 'Once daily'),
  ('123e4567-e89b-12d3-a456-426614174a01', '123e4567-e89b-12d3-a456-426614174300', 'Metformin', '500mg', 'Twice daily'),
  ('123e4567-e89b-12d3-a456-426614174a02', '123e4567-e89b-12d3-a456-426614174301', 'Amoxicillin', '250mg', 'Three times daily');

-- Insert health goals
INSERT INTO health_goals (goal_id, care_plan_id, description, target_date, status) VALUES
  ('123e4567-e89b-12d3-a456-426614174b00', '123e4567-e89b-12d3-a456-426614174300', 'Reduce blood pressure to <130/80', '2025-06-01', 'Pending'),
  ('123e4567-e89b-12d3-a456-426614174b01', '123e4567-e89b-12d3-a456-426614174301', 'Achieve normal blood sugar levels', '2025-05-15', 'Pending');

-- Insert tasks
INSERT INTO tasks (task_id, care_plan_id, description, due_date, assigned_navigator_id, assigned_patient_id, status) VALUES
  ('123e4567-e89b-12d3-a456-426614174c00', '123e4567-e89b-12d3-a456-426614174300', 'Schedule follow-up with cardiologist', '2025-04-20', '123e4567-e89b-12d3-a456-426614174200', NULL, 'To Do'),
  ('123e4567-e89b-12d3-a456-426614174c01', '123e4567-e89b-12d3-a456-426614174301', 'Bring medication list to next appointment', '2025-04-12', NULL, '123e4567-e89b-12d3-a456-426614174101', 'To Do');

-- Insert chats
INSERT INTO chats (chat_id, patient_id, started_at, last_activity_at) VALUES
  ('123e4567-e89b-12d3-a456-426614174d00', '123e4567-e89b-12d3-a456-426614174100', '2025-04-09 08:00:00+00', '2025-04-09 08:10:00+00'),
  ('123e4567-e89b-12d3-a456-426614174d01', '123e4567-e89b-12d3-a456-426614174101', '2025-04-09 09:00:00+00', '2025-04-09 09:05:00+00');

-- Insert messages
INSERT INTO messages (message_id, chat_id, sender, sent_at, content) VALUES
  ('123e4567-e89b-12d3-a456-426614174e00', '123e4567-e89b-12d3-a456-426614174d00', 'Patient', '2025-04-09 08:01:00+00', 'Hi, I have a question about my medication.'),
  ('123e4567-e89b-12d3-a456-426614174e01', '123e4567-e89b-12d3-a456-426614174d00', 'LLM', '2025-04-09 08:02:00+00', 'Sure, what would you like to know?'),
  ('123e4567-e89b-12d3-a456-426614174e02', '123e4567-e89b-12d3-a456-426614174d01', 'Patient', '2025-04-09 09:01:00+00', 'Can I get a transport for my next appointment?'),
  ('123e4567-e89b-12d3-a456-426614174e03', '123e4567-e89b-12d3-a456-426614174d01', 'LLM', '2025-04-09 09:02:00+00', 'Yes, I will arrange that for you.'); 