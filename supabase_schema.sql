-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- 1. Profiles Table (Extends Supabase Auth)
create table profiles (
  id uuid references auth.users(id) on delete cascade not null primary key,
  email text,
  role text default 'user' check (role in ('admin', 'user', 'volunteer')),
  full_name text,
  phone text,
  created_at timestamptz default now()
);

-- 2. Rabbits Table
create table rabbits (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  status text check (status in ('open', 'reserved', 'medical', 'closed')) default 'open',
  gender text check (gender in ('M', 'F', 'unknown')),
  age_year int,
  location text,
  description text,
  image_urls text[], -- Array of image URLs, first one is cover
  is_featured boolean default false,
  created_at timestamptz default now()
);

-- 3. Posts Table (News)
create table posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  category text check (category in ('news', 'knowledge', 'event')) default 'news',
  content text,
  cover_image text,
  published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now()
);

-- 4. Donations Table
create table donations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete set null, -- Nullable for guest donations? SDD says "Link profiles.id (if guest then null)"
  donor_name text not null,
  donor_tax_id text,
  amount int not null,
  transfer_date date,
  last_5_digits text,
  proof_image_url text, -- Path in storage
  receipt_status text check (receipt_status in ('pending', 'verified', 'issue')) default 'pending',
  receipt_no text, -- Generated after verification
  admin_note text,
  created_at timestamptz default now()
);

-- RLS Policies

-- Enable RLS
alter table profiles enable row level security;
alter table rabbits enable row level security;
alter table posts enable row level security;
alter table donations enable row level security;

-- Profiles Policies
create policy "Public profiles are viewable by everyone" 
  on profiles for select using (true); 

create policy "Users can view own profile" 
  on profiles for select using (auth.uid() = id);

create policy "Users can update own profile" 
  on profiles for update using (auth.uid() = id);

create policy "Admins can update profiles" 
  on profiles for update using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins can delete profiles" 
  on profiles for delete using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins can insert profiles" 
  on profiles for insert with check (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- Rabbits Policies
create policy "Anyone can view open rabbits" 
  on rabbits for select using (status != 'closed');

create policy "Admins and Volunteers can do everything on rabbits" 
  on rabbits for all using (
    exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'volunteer'))
  );

-- Posts Policies
create policy "Anyone can view published posts" 
  on posts for select using (published = true);

create policy "Admins and Volunteers can do everything on posts" 
  on posts for all using (
    exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'volunteer'))
  );

-- Donations Policies
create policy "Users can view own donations" 
  on donations for select using (auth.uid() = user_id);

create policy "Users can insert donations" 
  on donations for insert with check (auth.uid() = user_id OR user_id is null);

create policy "Admins and Volunteers can do everything on donations" 
  on donations for all using (
    exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'volunteer'))
  );

-- Storage Buckets Setup
insert into storage.buckets (id, name, public) values ('images', 'images', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('receipts', 'receipts', false) on conflict (id) do nothing;

-- Storage Policies
-- Images: Public Read, Admin/Volunteer Write
create policy "Public Image Read" on storage.objects for select using (bucket_id = 'images');
create policy "Admin/Vol Image Write" on storage.objects for insert with check (bucket_id = 'images' and exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'volunteer')));
create policy "Admin/Vol Image Update" on storage.objects for update using (bucket_id = 'images' and exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'volunteer')));
create policy "Admin/Vol Image Delete" on storage.objects for delete using (bucket_id = 'images' and exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'volunteer')));

-- Receipts: Admin/Volunteer Read, User Insert (proof upload)
create policy "User Upload Receipt" on storage.objects for insert with check (bucket_id = 'receipts'); 
create policy "Admin/Vol Read Receipt" on storage.objects for select using (bucket_id = 'receipts' and exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'volunteer')));

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 5. Audit Logs Table
create table audit_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete set null,
  action text not null, -- e.g. 'CREATE_RABBIT', 'VERIFY_DONATION'
  target_resource text, -- e.g. 'rabbit_123'
  details jsonb, -- e.g. { "name": "小白" }
  created_at timestamptz default now()
);

-- Enable RLS for Audit Logs
alter table audit_logs enable row level security;

-- Audit Logs Policies
create policy "Admins and Volunteers can view audit logs"
  on audit_logs for select using (
    exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'volunteer'))
  );


-- 6. Banners Table (Homepage Slider)
create table banners (
  id uuid default gen_random_uuid() primary key,
  title text, -- Optional Alt Text
  image_path text not null, -- Storage Path (banners/filename)
  link_url text, -- Optional Redirect URL
  display_mode text default 'contained' check (display_mode in ('contained', 'full')),
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Enable RLS
alter table banners enable row level security;

-- Policies
create policy "Public can view active banners"
  on banners for select
  using (is_active = true);

create policy "Admins and Volunteers can manage banners"
  on banners for all
  using (
    exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'volunteer'))
  );


-- 7. Banners Storage Bucket
insert into storage.buckets (id, name, public) 
values ('banners', 'banners', true) 
on conflict (id) do nothing;

create policy "Public Access Banners"
  on storage.objects for select
  using ( bucket_id = 'banners' );

create policy "Admin Insert Banners"
  on storage.objects for insert
  with check (
    bucket_id = 'banners' AND
    exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'volunteer'))
  );

create policy "Admin Delete Banners"
  on storage.objects for delete
  using (
    bucket_id = 'banners' AND
    exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'volunteer'))
  );

-- 8. Site Settings (Key-Value Store)
create table site_settings (
  key text primary key,
  value text,
  description text,
  updated_at timestamptz default now()
);

-- RLS
alter table site_settings enable row level security;

create policy "Public Access Settings"
  on site_settings for select
  using (true);

create policy "Admin Manage Settings"
  on site_settings for all
  using (
    exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'volunteer'))
  );

-- Initialize defaults
insert into site_settings (key, value, description) 
values ('banner_layout', 'contained', 'Homepage banner layout: contained or full')
on conflict (key) do nothing;

