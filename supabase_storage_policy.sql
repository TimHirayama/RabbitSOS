-- Allow authenticated users to upload files to 'images' bucket
-- This is required for Volunteers to upload Avatar and Daily Photos

-- 1. Policy for INSERT (Upload)
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'images');

-- 2. Policy for SELECT (View) - usually managed by bucket being public, but adding RLS for safety
CREATE POLICY "Allow public viewing of images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'images');

-- 3. Policy for UPDATE (Replace) - Allow users to update their own files?
-- Generally we might want owner access.
CREATE POLICY "Allow owners to update their own images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'images' AND auth.uid() = owner);

-- 4. Policy for DELETE
CREATE POLICY "Allow owners to delete their own images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'images' AND auth.uid() = owner);
