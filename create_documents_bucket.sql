-- Create a new public bucket for documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- Policy: Allow public to view files
CREATE POLICY "Public Access Documents"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'documents');

-- Policy: Allow authenticated users (admins) to upload files
CREATE POLICY "Authenticated Insert Documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'documents');

-- Policy: Allow authenticated users (admins) to update files
CREATE POLICY "Authenticated Update Documents"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'documents');

-- Policy: Allow authenticated users (admins) to delete files
CREATE POLICY "Authenticated Delete Documents"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'documents');
