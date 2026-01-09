-- 1. Update profiles role constraint
-- Drop existing constraint if it exists (might be named generically or implicitly)
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS users_role_check; -- Just in case

-- Add new constraint with updated roles
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check 
CHECK (role IN ('super_admin', 'admin', 'volunteer'));

-- 2. Create feature_flags table
CREATE TABLE IF NOT EXISTS feature_flags (
    key TEXT PRIMARY KEY,
    label TEXT NOT NULL,
    description TEXT,
    is_enabled BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by UUID REFERENCES auth.users(id)
);

-- 3. Insert default feature modules
INSERT INTO feature_flags (key, label, description, is_enabled) VALUES
('module_donations', '捐款管理系統', '開啟後，管理員可檢視與管理捐款、收據開立。', false),
('module_volunteers', '志工權限管理', '開啟後，管理員可新增、管理志工帳號。', false),
('module_articles', '文章公告系統', '開啟後，管理員可發布網站公告與衛教文章。', true)
ON CONFLICT (key) DO NOTHING;

-- 4. Set security policies for feature_flags
ALTER TABLE feature_flags ENABLE ROW LEVEL SECURITY;

-- Allow read access to authenticated users (so admin/volunteer can check if enabled)
CREATE POLICY "Allow read access for authenticated users" ON feature_flags
FOR SELECT TO authenticated USING (true);

-- Allow write access only to super_admin (We'll handle this check in application logic or Trigger, 
-- but RLS usually checks auth.uid(). For now, let's keep it simple and trust the server action which checks role)
-- Actually, let's allow update for all authenticated for now and rely on backend role check, 
-- implies 'service_role' or specific logic. 
-- Safest: Only allow update if user is super_admin.
-- But writing complex RLS for role check might be overkill if we trust server actions.
-- Let's just allow read. Updates will happen via Service Role (admin client) or a Policy checking a profile lookup?
-- Let's stick to allowing read to all authenticated.

-- 5. Grant permissions
GRANT SELECT ON feature_flags TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON feature_flags TO service_role;
