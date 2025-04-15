-- Create tables
CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Active', 'Pending', 'Stable')),
    last_visit TIMESTAMP WITH TIME ZONE NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    time TIMESTAMP WITH TIME ZONE NOT NULL,
    priority TEXT NOT NULL CHECK (priority IN ('High', 'Medium', 'Low')),
    status TEXT NOT NULL CHECK (status IN ('Pending', 'Completed')),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content TEXT NOT NULL,
    sender_type TEXT NOT NULL CHECK (sender_type IN ('patient', 'doctor')),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_patients_status ON patients(status);
CREATE INDEX idx_tasks_patient_id ON tasks(patient_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_messages_patient_id ON messages(patient_id);
CREATE INDEX idx_messages_doctor_id ON messages(doctor_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_patients_updated_at
    BEFORE UPDATE ON patients
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
    BEFORE UPDATE ON tasks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_messages_updated_at
    BEFORE UPDATE ON messages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO patients (name, age, status, last_visit, image_url) VALUES
('John Smith', 45, 'Active', NOW() - INTERVAL '5 days', '/avatars/john-smith.jpg'),
('Sarah Johnson', 32, 'Pending', NOW() - INTERVAL '3 days', '/avatars/sarah-johnson.jpg'),
('Robert Chen', 58, 'Stable', NOW() - INTERVAL '7 days', '/avatars/robert-chen.jpg'),
('Maria Garcia', 29, 'Active', NOW() - INTERVAL '2 days', '/avatars/maria-garcia.jpg');

INSERT INTO tasks (title, time, priority, status, patient_id) 
SELECT 
    'Follow up on medication change',
    NOW() + INTERVAL '2 hours',
    'High',
    'Pending',
    id
FROM patients
WHERE name = 'John Smith';

INSERT INTO tasks (title, time, priority, status, patient_id)
SELECT 
    'Review lab results',
    NOW() + INTERVAL '4 hours',
    'Medium',
    'Pending',
    id
FROM patients
WHERE name = 'Sarah Johnson'; 