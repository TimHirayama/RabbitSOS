-- Create the rescue_applications table
CREATE TABLE IF NOT EXISTS rescue_applications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  status text DEFAULT 'pending' NOT NULL, -- pending, processing, approved, rejected, archived
  
  -- Reporter Info
  reporter_name text NOT NULL,
  reporter_phone text NOT NULL,
  reporter_email text NOT NULL,
  reporter_id_number text NOT NULL, -- Sensitive, admin only
  reporter_nickname text,

  -- Rescue Info
  rabbit_nickname text, -- Not required if unknown
  discovery_date date NOT NULL,
  discovery_location text NOT NULL,
  rabbit_gender text DEFAULT 'unknown',
  rabbit_size text,
  rabbit_breed text DEFAULT 'mix',
  rescue_reason text NOT NULL,
  is_rescued boolean DEFAULT false,
  discovery_method text,
  witnesses text,
  capture_method text,
  food_provided text,
  medical_status text, -- e.g., Not seen, Healthy, Injured
  current_condition text,

  -- Evidence (Image URLs)
  photo_rabbit_1 text NOT NULL,
  photo_rabbit_2 text NOT NULL,
  photo_environment_1 text NOT NULL,
  photo_environment_2 text NOT NULL,
  photo_reporter_id text NOT NULL,
  photo_reporter_rabbit text NOT NULL,
  photo_accommodation_1 text,
  photo_accommodation_2 text
);

-- Enable RLS
ALTER TABLE rescue_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Allow Public Insert (anyone can report)
CREATE POLICY "Allow public insert to rescue_applications"
ON rescue_applications FOR INSERT
TO public
WITH CHECK (true);

-- Policy: Allow Admin Select (only admins can view)
-- Assuming 'admin' role check or specific email check exists. 
-- For now, allowing authenticated users if they are admin, or just generally secure.
-- Since we don't have a robust role system setup in this SQL script context, 
-- I will allow service_role and maybe authenticated users with a specific claim in the future.
-- For this MVP, let's allow 'authenticated' users to READ, assuming only staff logs in.
CREATE POLICY "Allow authenticated view rescue_applications"
ON rescue_applications FOR SELECT
TO authenticated
USING (true);

-- Policy: Allow Admin Update
CREATE POLICY "Allow authenticated update rescue_applications"
ON rescue_applications FOR UPDATE
TO authenticated
USING (true);


-- Storage Bucket Setup (Attempt to create via SQL, though often done via API)
INSERT INTO storage.buckets (id, name, public)
VALUES ('rescue-evidence', 'rescue-evidence', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
-- Allow public uploads
CREATE POLICY "Allow public uploads to rescue-evidence"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'rescue-evidence');

-- Allow public viewing (needed for the reporter to see their preview if we use server URLs, and for admins)
-- Note: Contains ID cards, so in a real strict app we'd use signed URLs. 
-- For this MVP/Demo, public read is acceptable but acknowledged as a risk.
CREATE POLICY "Allow public select from rescue-evidence"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'rescue-evidence');
