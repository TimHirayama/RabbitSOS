-- Fix missing columns for Rabbits table
DO $$
BEGIN
    -- Add short_description
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rabbits' AND column_name = 'short_description') THEN
        ALTER TABLE rabbits ADD COLUMN short_description text;
    END IF;

    -- Add breed
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rabbits' AND column_name = 'breed') THEN
        ALTER TABLE rabbits ADD COLUMN breed text;
    END IF;

    -- Add age_category
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rabbits' AND column_name = 'age_category') THEN
        ALTER TABLE rabbits ADD COLUMN age_category text;
    END IF;

    -- Add weight
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rabbits' AND column_name = 'weight') THEN
        ALTER TABLE rabbits ADD COLUMN weight text;
    END IF;

    -- Add litter_habits
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rabbits' AND column_name = 'litter_habits') THEN
        ALTER TABLE rabbits ADD COLUMN litter_habits text;
    END IF;

    -- Add feed_type
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rabbits' AND column_name = 'feed_type') THEN
        ALTER TABLE rabbits ADD COLUMN feed_type text;
    END IF;

    -- Add introducer_name
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rabbits' AND column_name = 'introducer_name') THEN
        ALTER TABLE rabbits ADD COLUMN introducer_name text;
    END IF;

    -- Add introducer_org
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rabbits' AND column_name = 'introducer_org') THEN
        ALTER TABLE rabbits ADD COLUMN introducer_org text;
    END IF;

    -- Add rescue_date
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rabbits' AND column_name = 'rescue_date') THEN
        ALTER TABLE rabbits ADD COLUMN rescue_date date;
    END IF;

    -- Add intake_date
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rabbits' AND column_name = 'intake_date') THEN
        ALTER TABLE rabbits ADD COLUMN intake_date date;
    END IF;
    
    -- Fix Constraint
    ALTER TABLE rabbits DROP CONSTRAINT IF EXISTS rabbits_status_check;
    ALTER TABLE rabbits ADD CONSTRAINT rabbits_status_check 
    CHECK (status IN ('open', 'reserved', 'medical', 'adopted', 'rainbow', 'closed'));
END $$;
