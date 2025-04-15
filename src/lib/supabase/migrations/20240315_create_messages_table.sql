-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  is_read BOOLEAN DEFAULT false
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS messages_patient_id_idx ON messages(patient_id);
CREATE INDEX IF NOT EXISTS messages_sender_id_idx ON messages(sender_id);
CREATE INDEX IF NOT EXISTS messages_created_at_idx ON messages(created_at);

-- Enable Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view messages for their patients"
  ON messages FOR SELECT
  USING (
    auth.uid() = sender_id OR
    patient_id IN (
      SELECT id FROM patients WHERE doctor_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert messages"
  ON messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id AND
    patient_id IN (
      SELECT id FROM patients WHERE doctor_id = auth.uid()
    )
  );

-- Add function to notify when new message is inserted
CREATE OR REPLACE FUNCTION notify_new_message()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify(
    'new_message',
    json_build_object(
      'id', NEW.id,
      'patient_id', NEW.patient_id,
      'sender_id', NEW.sender_id,
      'content', NEW.content,
      'created_at', NEW.created_at
    )::text
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for new messages
CREATE TRIGGER on_new_message
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_message();

-- Grant necessary permissions
GRANT ALL ON messages TO authenticated;
GRANT ALL ON messages TO service_role;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role; 