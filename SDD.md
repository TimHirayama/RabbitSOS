# Software Design Document (SDD): 台灣流浪兔保護協會 官網改版
系統專案名稱：RabbitSOS Modernization
版本：v1.1 (Revised)
技術棧：Next.js (React), Supabase (DB/Auth/Storage), TailwindCSS (Shadcn/UI)

## 1. 系統架構 (System Architecture)
本系統採用 Serverless 架構，以前後端分離 (Headless) 的概念進行設計。
- **Frontend**: Next.js 14+ (App Router), TailwindCSS + Shadcn/UI, React Query
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **PDF Engine**: @react-pdf/renderer (Client-side generation for on-demand download)

## 2. 資料庫設計 (Database Schema)
資料表位於 Supabase public schema 下。

- **profiles**: 系統使用者 (id, email, role['admin', 'user'], full_name, created_at)
- **banners**: 首頁輪播圖 (id, title, image_url, link_url, sort_order, is_active)
- **rabbits**: 兔子資料
  - id, name, gender, age_year, location, description, image_urls[]
  - status: ['open'(開放), 'reserved'(預訂), 'medical'(醫療), 'adopted'(已送養/成功案例), 'rainbow'(當天使)]
- **posts**: 文章與公告
  - id, title, content, cover_image, file_url (for PDF), published_at
  - category: ['news'(公告), 'knowledge'(衛教), 'rescue'(救援紀錄), 'financial'(財務徵信)]
- **donations**: 匯款與收據紀錄
  - id, donor_name, donor_phone (Index, for security check), donor_tax_id
  - amount, transfer_date, last_5_digits, receipt_title
  - proof_image_url (匯款截圖)
  - receipt_status: ['pending', 'verified', 'issue']
  - receipt_no (Generated after verification)

## 3. 功能模組 (Module Design)

### 3.1 認養中心 (/rabbits)
- **列表頁**：Grid View，側邊欄篩選 (地區、性別、年齡)。
- **特殊視圖**：
  - 天使專區：Filter `status = 'rainbow'`
  - 成功案例：Filter `status = 'adopted'`
- **內頁**：詳細資料、Lightbox 圖片瀏覽、社群分享。

### 3.2 捐款與收據系統 (/donate)
- **匯款回報 (/donate/report)**：
  - 訪客填寫回報單 (必填手機號碼) -> 上傳截圖至 Supabase Storage。
- **收據查詢與下載 (/donate/lookup)** (Guest Access):
  - **安全驗證**：User must input [Name] + [Phone] + [Last 5 Digits OR Date].
  - **下載功能**：驗證通過後顯示列表，點擊 "Download PDF" 即時生成收據。
  - **不寄送 Email**：為節省系統資源與避免擋信，採主動查詢制。

### 3.3 後台管理 (/admin)
- **權限**：Require role='admin'
- **Banner 管理**：上傳圖片、拖拉排序 (Drag & Drop)。
- **兔子管理**：CRUD，支援手機上傳照片。
- **核銷作業**：
  - 檢視 `donations` (status='pending')。
  - 管理員核對金額後，點擊 "Verify" -> 系統生成 `receipt_no`。

## 4. 設計規範 (Design System)
- **Colors**: Primary: Orange-500 (#F97316), Secondary: Stone-100.
- **Font**: Inter (英), Noto Sans TC (中)。
- **UI Components**: Shadcn/UI (Card, Dialog, Form, DataTable).
