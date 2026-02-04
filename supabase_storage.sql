-- Create the storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('app-smsaudeeseguros-institucional', 'app-smsaudeeseguros-institucional', true)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security (RLS) on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to the bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'app-smsaudeeseguros-institucional' );

-- Policy: Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'app-smsaudeeseguros-institucional' );

-- Policy: Allow authenticated users to update their own uploads (or all uploads if admin)
-- For simplicity in this context, allowing authenticated users to update files in the bucket
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'app-smsaudeeseguros-institucional' );

-- Policy: Allow authenticated users to delete files
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'app-smsaudeeseguros-institucional' );
