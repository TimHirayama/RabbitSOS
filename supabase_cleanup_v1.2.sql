-- Cleanup Migration: Parse old admin_note data into new columns
-- This is a one-time script to fix existing records that were created before v1.2

-- 1. Update donor_email from admin_note
UPDATE donations
SET donor_email = substring(admin_note from 'Email: ([^\n]*)')
WHERE admin_note LIKE '%[User Submission]%' AND donor_email IS NULL;

-- 2. Update receipt_address from admin_note
UPDATE donations
SET receipt_address = substring(admin_note from 'Address: ([^\n]*)')
WHERE admin_note LIKE '%[User Submission]%' AND receipt_address IS NULL;

-- 3. Clear admin_note if it was just a system generated note (Note: None)
UPDATE donations
SET admin_note = NULL
WHERE admin_note LIKE '%[User Submission]%Note: None%';

-- 4. If there was a real note, extract it (Optional advanced parsing, or just leave it for manual review if rare)
-- For now, let's just clean up the obvious system notes.
