-- Add new columns with safe defaults
ALTER TABLE rabbits 
ADD COLUMN IF NOT EXISTS color text DEFAULT 'unknown',
ADD COLUMN IF NOT EXISTS discovery_location text;

-- Add comment
COMMENT ON COLUMN rabbits.color IS '兔子花色 (White, Brown, Grey, Black, Bicolor, etc.)';
COMMENT ON COLUMN rabbits.discovery_location IS '發現地點 (Discovery Location)';

-- Update RLS if needed (usually existing policies cover all columns, but good to check)
-- Existing policies are FOR SELECT/ALL using (true) for admins, so no change needed.
