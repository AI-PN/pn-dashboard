-- Create enum types for status fields
CREATE TYPE appointment_status AS ENUM ('Upcoming', 'Completed');
CREATE TYPE transport_status AS ENUM ('Scheduled', 'Done');
CREATE TYPE task_status AS ENUM ('To Do', 'Done');
CREATE TYPE goal_status AS ENUM ('Pending', 'Achieved');
CREATE TYPE provider_role AS ENUM ('Primary', 'Specialist');
CREATE TYPE message_sender AS ENUM ('Patient', 'LLM');
CREATE TYPE transport_mode AS ENUM ('Taxi', 'Van');

-- Create tables
CREATE TABLE IF NOT EXISTS navigators (
    navigator_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS patients (
    patient_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    contact_info VARCHAR(255),
    navigator_id UUID REFERENCES navigators(navigator_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS care_plans (
    care_plan_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(patient_id) ON DELETE CASCADE,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS conditions (
    condition_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    care_plan_id UUID REFERENCES care_plans(care_plan_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    diagnosed_on DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS medications (
    medication_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    care_plan_id UUID REFERENCES care_plans(care_plan_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    dosage VARCHAR(100),
    frequency VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS providers (
    provider_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    specialty VARCHAR(255),
    contact_info VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS care_plan_providers (
    cpp_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    care_plan_id UUID REFERENCES care_plans(care_plan_id) ON DELETE CASCADE,
    provider_id UUID REFERENCES providers(provider_id) ON DELETE CASCADE,
    role provider_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(care_plan_id, provider_id)
);

CREATE TABLE IF NOT EXISTS health_goals (
    goal_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    care_plan_id UUID REFERENCES care_plans(care_plan_id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    target_date DATE,
    status goal_status NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS appointments (
    appointment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(patient_id) ON DELETE CASCADE,
    provider_id UUID REFERENCES providers(provider_id) ON DELETE CASCADE,
    care_plan_id UUID REFERENCES care_plans(care_plan_id) ON DELETE CASCADE,
    scheduled_at TIMESTAMP WITH TIME ZONE,
    location VARCHAR(255),
    status appointment_status NOT NULL DEFAULT 'Upcoming',
    needs_transport BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transports (
    transport_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_id UUID REFERENCES appointments(appointment_id) ON DELETE CASCADE,
    mode transport_mode,
    pickup_time TIMESTAMP WITH TIME ZONE,
    status transport_status NOT NULL DEFAULT 'Scheduled',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks (
    task_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    care_plan_id UUID REFERENCES care_plans(care_plan_id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    due_date DATE,
    assigned_navigator_id UUID REFERENCES navigators(navigator_id),
    assigned_patient_id UUID REFERENCES patients(patient_id),
    status task_status NOT NULL DEFAULT 'To Do',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CHECK (
        (assigned_navigator_id IS NOT NULL) OR 
        (assigned_patient_id IS NOT NULL)
    )
);

CREATE TABLE IF NOT EXISTS chats (
    chat_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(patient_id) ON DELETE CASCADE,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
    message_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chat_id UUID REFERENCES chats(chat_id) ON DELETE CASCADE,
    sender message_sender NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_patients_navigator_id ON patients(navigator_id);
CREATE INDEX IF NOT EXISTS idx_care_plans_patient_id ON care_plans(patient_id);
CREATE INDEX IF NOT EXISTS idx_conditions_care_plan_id ON conditions(care_plan_id);
CREATE INDEX IF NOT EXISTS idx_medications_care_plan_id ON medications(care_plan_id);
CREATE INDEX IF NOT EXISTS idx_care_plan_providers_care_plan_id ON care_plan_providers(care_plan_id);
CREATE INDEX IF NOT EXISTS idx_care_plan_providers_provider_id ON care_plan_providers(provider_id);
CREATE INDEX IF NOT EXISTS idx_health_goals_care_plan_id ON health_goals(care_plan_id);
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_provider_id ON appointments(provider_id);
CREATE INDEX IF NOT EXISTS idx_appointments_care_plan_id ON appointments(care_plan_id);
CREATE INDEX IF NOT EXISTS idx_transports_appointment_id ON transports(appointment_id);
CREATE INDEX IF NOT EXISTS idx_tasks_care_plan_id ON tasks(care_plan_id);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_navigator_id ON tasks(assigned_navigator_id);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_patient_id ON tasks(assigned_patient_id);
CREATE INDEX IF NOT EXISTS idx_chats_patient_id ON chats(patient_id);
CREATE INDEX IF NOT EXISTS idx_messages_chat_id ON messages(chat_id);

-- Create updated_at trigger function
DROP FUNCTION IF EXISTS update_updated_at_column();
CREATE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_navigators_updated_at') THEN
        CREATE TRIGGER update_navigators_updated_at
            BEFORE UPDATE ON navigators
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_patients_updated_at') THEN
        CREATE TRIGGER update_patients_updated_at
            BEFORE UPDATE ON patients
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_care_plans_updated_at') THEN
        CREATE TRIGGER update_care_plans_updated_at
            BEFORE UPDATE ON care_plans
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_conditions_updated_at') THEN
        CREATE TRIGGER update_conditions_updated_at
            BEFORE UPDATE ON conditions
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_medications_updated_at') THEN
        CREATE TRIGGER update_medications_updated_at
            BEFORE UPDATE ON medications
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_providers_updated_at') THEN
        CREATE TRIGGER update_providers_updated_at
            BEFORE UPDATE ON providers
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_care_plan_providers_updated_at') THEN
        CREATE TRIGGER update_care_plan_providers_updated_at
            BEFORE UPDATE ON care_plan_providers
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_health_goals_updated_at') THEN
        CREATE TRIGGER update_health_goals_updated_at
            BEFORE UPDATE ON health_goals
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_appointments_updated_at') THEN
        CREATE TRIGGER update_appointments_updated_at
            BEFORE UPDATE ON appointments
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_transports_updated_at') THEN
        CREATE TRIGGER update_transports_updated_at
            BEFORE UPDATE ON transports
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_tasks_updated_at') THEN
        CREATE TRIGGER update_tasks_updated_at
            BEFORE UPDATE ON tasks
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_chats_updated_at') THEN
        CREATE TRIGGER update_chats_updated_at
            BEFORE UPDATE ON chats
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$; 