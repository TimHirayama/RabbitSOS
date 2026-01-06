-- Migration for SDD v1.1
-- Run this in your Supabase SQL Editor

-- 1. Updates Rabbits status check constraint
-- First drop the existing constraint
ALTER TABLE rabbits DROP CONSTRAINT IF EXISTS rabbits_status_check;

-- Add the new constraint including 'adopted' and 'rainbow'
ALTER TABLE rabbits ADD CONSTRAINT rabbits_status_check 
  CHECK (status IN ('open', 'reserved', 'medical', 'closed', 'adopted', 'rainbow'));

-- 2. Update Donations table
-- Add donor_phone for verification
ALTER TABLE donations ADD COLUMN IF NOT EXISTS donor_phone text;

-- Create index for faster lookups by phone (since it's a verification key)
CREATE INDEX IF NOT EXISTS idx_donations_donor_phone ON donations(donor_phone);

-- 3. Banners table check (Already exists in schema.sql but ensuring)
CREATE TABLE IF NOT EXISTS banners (
  id uuid default gen_random_uuid() primary key,
  title text,
  image_path text not null,
  link_url text,
  display_mode text default 'contained' check (display_mode in ('contained', 'full')),
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Enable RLS for Banners if it was just created
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

-- Add Banners Policies if they don't exist (using DO block to avoid errors if they exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'banners' AND policyname = 'Public can view active banners'
    ) THEN
        CREATE POLICY "Public can view active banners" ON banners FOR SELECT USING (is_active = true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'banners' AND policyname = 'Admins and Volunteers can manage banners'
    ) THEN
        CREATE POLICY "Admins and Volunteers can manage banners" ON banners FOR ALL USING (
            EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'volunteer'))
        );
    END IF;
END
$$;
