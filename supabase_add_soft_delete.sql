-- Add deleted_at column for Soft Delete
DO $$
BEGIN
    -- Add to rabbits
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rabbits' AND column_name = 'deleted_at') THEN
        ALTER TABLE rabbits ADD COLUMN deleted_at timestamptz DEFAULT NULL;
    END IF;

    -- Add to rabbit_daily_photos
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rabbit_daily_photos' AND column_name = 'deleted_at') THEN
        ALTER TABLE rabbit_daily_photos ADD COLUMN deleted_at timestamptz DEFAULT NULL;
    END IF;
END $$;
