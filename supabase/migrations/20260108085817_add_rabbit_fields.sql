alter table rabbits 
add column if not exists short_description text, -- 簡介 (約20個字)
add column if not exists breed text, -- 品種
add column if not exists age_category text, -- 年紀（幼兔、年輕成兔、成兔、老兔等等）
add column if not exists weight text, -- 體重
add column if not exists litter_habits text, -- 便溺習慣
add column if not exists feed_type text, -- 飼料種類
add column if not exists introducer_name text, -- 介紹人名稱
add column if not exists introducer_org text, -- 介紹人單位
add column if not exists rescue_date date, -- 救援時間
add column if not exists intake_date date; -- 接手時間
