DELETE FROM posts 
WHERE file_url LIKE '%/migration/%' 
   OR cover_image LIKE '%/migration/%';
