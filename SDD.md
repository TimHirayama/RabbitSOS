# Software Design Document (SDD): 台灣流浪兔保護協會 官網改版
系統專案名稱：RabbitSOS Modernization
版本：v1.0
技術棧：Next.js (React), Supabase (DB/Auth/Storage), TailwindCSS (Shadcn/UI)
## 1. 系統架構 (System Architecture)
本系統採用 Serverless 架構，以前後端分離 (Headless) 的概念進行設計。
- **Frontend**: Next.js 14+ (App Router), TailwindCSS + Shadcn/UI, React Query
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **PDF Engine**: @react-pdf/renderer (Client-side generation)
## 2. 資料庫設計 (Database Schema)
資料表位於 Supabase public schema 下。
- **profiles**: 使用者資料 (id, email, role['admin', 'user'], full_name, phone)
- **rabbits**: 兔子資料 (id, name, status['open', 'reserved', 'medical', 'closed'], gender, age_year, location, description, image_urls[])
- **posts**: 公告與衛教 (id, title, category, content, cover_image, published)
- **donations**: 匯款紀錄 (id, donor_name, amount, transfer_date, last_5_digits, proof_image_url, receipt_status, receipt_no)
## 3. 功能模組 (Module Design)
### 3.1 認養中心 (/rabbits)
- 列表頁：Grid View，側邊欄篩選 (地區、性別)。
- 內頁：詳細資料、Lightbox 圖片瀏覽。
### 3.2 捐款系統 (/donate/report)
- 訪客填寫匯款回報單 -> 上傳截圖至 Supabase Storage。
- 自動/手動核銷後，生成 PDF 電子收據 (需支援金額大寫轉換)。
### 3.3 後台管理 (/admin) - [尚未實作]
- 權限：Require role='admin'
- 功能：兔子 CRUD、捐款核銷列表、公告發布。
## 4. 設計規範 (Design System)
- **Colors**: Primary: Orange-500 (#F97316), Secondary: Stone-100.
- **Font**: Inter (英), Noto Sans TC (中)。
