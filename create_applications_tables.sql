-- Create rescue_applications table
CREATE TABLE IF NOT EXISTS rescue_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'archived')),
  
  -- Reporter Info
  reporter_name TEXT NOT NULL,
  reporter_phone TEXT NOT NULL,
  reporter_email TEXT,
  reporter_id_number TEXT,
  reporter_nickname TEXT,
  
  -- Rabbit Info
  rabbit_nickname TEXT,
  discovery_date DATE,
  discovery_location TEXT,
  rabbit_gender TEXT,
  rabbit_size TEXT,
  rabbit_breed TEXT,
  rescue_reason TEXT,
  is_rescued BOOLEAN DEFAULT false,
  
  -- Details
  discovery_method TEXT,
  witnesses TEXT,
  capture_method TEXT,
  food_provided TEXT,
  medical_status TEXT,
  current_condition TEXT,
  
  -- Photos (URL paths)
  photo_rabbit_1 TEXT,
  photo_rabbit_2 TEXT,
  photo_environment_1 TEXT,
  photo_environment_2 TEXT,
  photo_reporter_id TEXT,
  photo_reporter_rabbit TEXT,
  photo_accommodation_1 TEXT,
  photo_accommodation_2 TEXT
);

-- Create adoption_applications table
CREATE TABLE IF NOT EXISTS adoption_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'withdrawn')),
  
  -- Link to Rabbit
  rabbit_id UUID REFERENCES rabbits(id),
  rabbit_name TEXT, -- Snapshot in case referenced rabbit changes or is null
  
  -- Core Applicant Info (extracted for easier searching/filtering)
  applicant_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  line_id TEXT,
  fb_link TEXT,
  address TEXT,
  
  -- Full Application Data
  data JSONB NOT NULL -- Stores the entire form response including housing details, QA, etc.
);

-- Set up RLS (Row Level Security)
ALTER TABLE rescue_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE adoption_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can view all, Insert is public (or authenticated users)
-- For now allowing public insert for these forms as they might be public facing
CREATE POLICY "Enable insert for everyone" ON rescue_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable select for admins" ON rescue_applications FOR SELECT USING (auth.role() = 'authenticated'); -- Assuming admins are authenticated

CREATE POLICY "Enable insert for everyone" ON adoption_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable select for admins" ON adoption_applications FOR SELECT USING (auth.role() = 'authenticated');
