-- Add avatar columns to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS avatar_color TEXT;

COMMENT ON COLUMN profiles.avatar_url IS '大頭貼圖片網址';
COMMENT ON COLUMN profiles.avatar_color IS '大頭貼背景色碼 (若無圖片時使用)';
