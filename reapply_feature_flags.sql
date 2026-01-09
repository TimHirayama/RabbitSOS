-- Ensure feature flags exist and are enabled
-- Added 'label' column as it is required
INSERT INTO feature_flags (key, label, description, is_enabled)
VALUES
  ('module_volunteers', '人員管理', '人員管理模組', true),
  ('module_donations', '捐款管理', '捐款管理模組', true),
  ('module_articles', '公告管理', '公告管理模組', true)
ON CONFLICT (key) DO UPDATE SET 
    is_enabled = EXCLUDED.is_enabled,
    label = EXCLUDED.label;
