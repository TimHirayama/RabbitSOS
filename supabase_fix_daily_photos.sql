-- Fix missing rabbit_daily_photos table
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'rabbit_daily_photos') THEN
        -- Create table
        create table rabbit_daily_photos (
          id uuid default gen_random_uuid() primary key,
          rabbit_id uuid references rabbits(id) on delete cascade not null,
          image_url text not null,
          description text,
          sort_order int default 0,
          created_at timestamptz default now()
        );

        -- RLS
        alter table rabbit_daily_photos enable row level security;
    END IF;
END $$;

-- Re-apply policies (safe to run multiple times if we drop first, or just use IF NOT EXISTS logic but policies are tricky in DO blocks).
-- Simplest way: drop if exists and recreate.

DROP POLICY IF EXISTS "Anyone can view daily photos of open rabbits" ON rabbit_daily_photos;
create policy "Anyone can view daily photos of open rabbits"
  on rabbit_daily_photos for select using (
    exists (
      select 1 from rabbits
      where rabbits.id = rabbit_daily_photos.rabbit_id
      and rabbits.status != 'closed'
    )
  );

DROP POLICY IF EXISTS "Admins and Volunteers can do everything on daily photos" ON rabbit_daily_photos;
create policy "Admins and Volunteers can do everything on daily photos"
  on rabbit_daily_photos for all using (
    exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'volunteer'))
  );
