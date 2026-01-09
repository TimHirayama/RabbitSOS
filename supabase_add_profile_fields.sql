-- Add new columns to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS national_id TEXT,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS note TEXT,
ADD COLUMN IF NOT EXISTS role_title TEXT;

-- Comment on columns for clarity (Optional but good practice)
COMMENT ON COLUMN profiles.national_id IS '身分證字號';
COMMENT ON COLUMN profiles.role_title IS '志工角色/職稱 (自定義)';
