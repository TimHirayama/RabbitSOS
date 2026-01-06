-- Migration v1.2: Add donor contact info columns
-- Rationale: Avoid using admin_note for contact info

ALTER TABLE donations 
ADD COLUMN IF NOT EXISTS donor_email text,
ADD COLUMN IF NOT EXISTS receipt_address text;

-- Update verify function comments or triggers if necessary (none for now)
