-- Update the check constraint for posts category to support new types
-- Previous allowed values: ('news', 'knowledge', 'event')
-- New allowed values: ('news', 'knowledge', 'event', 'top', 'found', 'fundraising')

ALTER TABLE posts
DROP CONSTRAINT IF EXISTS posts_category_check;

ALTER TABLE posts
ADD CONSTRAINT posts_category_check 
CHECK (category IN ('news', 'knowledge', 'event', 'top', 'found', 'fundraising'));
