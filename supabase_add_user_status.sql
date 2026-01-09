-- Add status column to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';

COMMENT ON COLUMN profiles.status IS '帳號狀態 (active, suspended)';

ALTER TABLE profiles ADD CONSTRAINT profiles_status_check 
CHECK (status IN ('active', 'suspended'));
