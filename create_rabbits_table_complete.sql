-- Create Rabbits table if not exists with all fields
CREATE TABLE IF NOT EXISTS rabbits (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  legacy_id text,
  gender text DEFAULT 'unknown',
  description text,
  
  -- Extended fields
  short_description text,
  breed text,
  age_category text,
  weight text,
  litter_habits text,
  feed_type text,
  introducer_name text,
  introducer_org text,
  rescue_date date,
  intake_date date,
  
  -- Media
  image_urls text[] DEFAULT '{}',
  main_image_url text,
  
  -- Status
  status text DEFAULT 'open',
  is_public boolean DEFAULT false,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add comments
COMMENT ON TABLE rabbits IS '兔子資料表';

-- Add constraints if not exists (upsert)
DO $$ BEGIN
    ALTER TABLE rabbits ADD CONSTRAINT rabbits_status_check 
    CHECK (status IN ('open', 'reserved', 'medical', 'adopted', 'rainbow', 'closed'));
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Enable RLS
ALTER TABLE rabbits ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Enable read access for all users" ON rabbits;
CREATE POLICY "Enable read access for all users" ON rabbits FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable write access for admins" ON rabbits;
CREATE POLICY "Enable write access for admins" ON rabbits FOR ALL USING (
  exists (
    select 1 from profiles
    where profiles.id = auth.uid()
    and profiles.role in ('super_admin', 'admin', 'volunteer')
  )
);
