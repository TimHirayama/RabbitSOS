-- Migration: v1.4 Update rabbit status check constraint

-- Drop the old constraint
ALTER TABLE rabbits DROP CONSTRAINT rabbits_status_check;

-- Add the new constraint with all values
ALTER TABLE rabbits ADD CONSTRAINT rabbits_status_check 
CHECK (status IN ('open', 'reserved', 'medical', 'adopted', 'rainbow', 'closed'));
