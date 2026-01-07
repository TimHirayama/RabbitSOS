# Project Progress & Tasks

## Completed Tasks

### 1. Git Push Troubleshooting
- [x] Fix HTTP 400 RPC failed error during git push
    - [x] Check git status and logs
    - [x] Increase http.postBuffer and retry push

### 2. Security Upgrade: Session Cookies
- [x] Enforce session cookies for Supabase Auth
    - [x] Modify `lib/supabase/server.ts` to remove maxAge
    - [x] Modify `lib/supabase/middleware.ts` to remove maxAge

### 3. Homepage Redesign
- [x] Implement News & Video Section
    - [x] Create `components/home/NewsSection.tsx`
    - [x] Fetch/Mock data for news
- [x] Implement Environment Gallery
    - [x] Create `components/home/EnvironmentGallery.tsx`
- [x] Implement Location Section
    - [x] Create `components/home/LocationSection.tsx` with Google Maps
- [x] Update Navbar & Logo
    - [x] Replace logo with `public/logo.svg`
    - [x] Implement "breaking out" overlap effect
    - [x] **Remove "Newbie/Knowledge" section** per user request
- [x] Update Featured Rabbits
    - [x] Update card design to match target
    - [x] Increase display count
    - [x] **Add default Rabbit Icon** for missing images
- [x] Update Footer Design
    - [x] Switch to orange theme
    - [x] Adjust layout to 4 columns
- [x] Assemble Homepage
    - [x] Update `app/(public)/page.tsx` structure

### 4. Complete Public Pages
- [x] Implement Public Posts Pages
    - [x] Create `app/(public)/posts/page.tsx` (List with Category Filter)
    - [x] Create `app/(public)/posts/[id]/page.tsx` (Detail View)
- [x] Implement Static Footer Pages
    - [x] Update Footer links (`/donate/report` -> `/donate`)
    - [x] Create `app/(public)/about/page.tsx`
    - [x] Create `app/(public)/contact/page.tsx`
    - [x] Create `app/(public)/privacy/page.tsx`
- [x] **Rabbit List Pages Enhancement**
    - [x] Add default Rabbit Icon for missing images in `/rabbits` and Admin Panel

## Pending / Next Steps

### 1. Admin Panel Enhancements (Potential)
- [ ] Improve Rabbit Management (Image Upload via Storage)
- [ ] Banner Management
- [ ] Post Management (TinyMCE or Markdown Editor)

### 2. User Dashboard (if applicable)
- [ ] Donation History for logged-in users?

### 3. System
- [ ] Final Deployment Check
