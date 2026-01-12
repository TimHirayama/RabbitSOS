-- Create the foster_applications table
CREATE TABLE IF NOT EXISTS foster_applications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  status text DEFAULT 'pending' NOT NULL, -- pending, approved, rejected, archived
  
  -- Applicant Info
  applicant_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  occupation text,
  
  -- Experience & Environment
  experience text NOT NULL, -- Rabbit raising experience
  current_pets text NOT NULL, -- Description of current pets
  housing_environment text NOT NULL, -- Description of housing
  supplies text, -- Currently owned supplies
  
  -- Agreement
  agreement_rules boolean DEFAULT false,

  -- Evidence (Image URLs, stored as JSON array or separate columns)
  -- Storing as separate columns for simplicity in this MVP, max 3 photos as per requirement
  photo_1 text,
  photo_2 text,
  photo_3 text
);

-- Enable RLS
ALTER TABLE foster_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Allow Public Insert
CREATE POLICY "Allow public insert to foster_applications"
ON foster_applications FOR INSERT
TO public
WITH CHECK (true);

-- Policy: Allow Authenticated Select (Staff/Admin)
CREATE POLICY "Allow authenticated select foster_applications"
ON foster_applications FOR SELECT
TO authenticated
USING (true);

-- Policy: Allow Authenticated Update (Staff/Admin)
CREATE POLICY "Allow authenticated update foster_applications"
ON foster_applications FOR UPDATE
TO authenticated
USING (true);


-- Storage Bucket Setup for foster-evidence
INSERT INTO storage.buckets (id, name, public)
VALUES ('foster-evidence', 'foster-evidence', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
-- Allow public uploads
CREATE POLICY "Allow public uploads to foster-evidence"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'foster-evidence');

-- Allow public viewing
CREATE POLICY "Allow public select from foster-evidence"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'foster-evidence');
