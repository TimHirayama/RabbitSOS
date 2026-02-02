import { z } from "zod";

// Comprehensive Schema for Adoption Application
export const adoptionApplicationSchema = z.object({
  // Hidden / Context fields
  rabbitName: z.string(),
  rabbitId: z.string().optional(), // Passed from hidden input if we add it

  // 1. 個人基本資料
  applicantName: z.string().min(2, "請填寫真實姓名"),
  gender: z.enum(["male", "female", "other"] as const, {
    message: "請選擇性別",
  }),
  age: z.string().min(1, "請填寫年齡"),
  occupation: z.string().min(1, "請填寫職業"),
  salary: z.string().min(1, "請填寫經濟狀況概略"), // e.g., 穩定收入, 學生...
  phone: z.string().min(8, "請填寫聯絡電話"),
  email: z.string().email("請填寫正確的 Email"),
  lineId: z.string().optional(),
  address: z.string().min(5, "請填寫居住地址"),
  fbLink: z.string().optional(),

  // 2. 居住環境與家庭狀況
  housingType: z.enum(["owned", "rented", "dorms", "family"] as const, {
    message: "請選擇居住類型",
  }),
  roommates: z.string().min(1, "請說明居住成員（獨居/家人/室友）"),
  landlordConsent: z.enum(["yes", "no", "na"] as const, {
    message: "房東/室友是否同意？",
  }),
  familyConsent: z.enum(["yes", "no", "discussing"] as const, {
    message: "家人是否同意？",
  }),

  // 3. 飼養經驗
  experience: z.string().min(1, "請選擇飼養經驗"),
  currentPets: z.string().optional(), // 目前家中寵物
  pastPets: z.string().optional(), // 過去飼養寵物

  // 4. 飼養觀念與環境規劃
  rabbitSpace: z.string().min(10, "請詳述兔子活動空間規劃 (籠養/圍欄/放養)"),
  acAvailable: z.enum(["yes", "no"] as const, {
    message: "夏天是否有冷氣？",
  }),
  dailyTime: z.string().min(1, "每日陪伴時間"),

  // 5. 情境題 (考驗決心)
  scenarioAllergy: z.string().min(5, "若家人/伴侶過敏怎麼辦？"),
  scenarioMoving: z.string().min(5, "若搬家/結婚/懷孕怎麼辦？"),
  scenarioDestructive: z.string().min(5, "若兔子破壞家具/咬線怎麼辦？"),
  scenarioMedical: z.string().min(5, "若兔子生病需高額醫藥費怎麼辦？"),

  // 6. 其他
  vetKnowledge: z.string().min(5, "您知道哪裡有兔科醫院嗎？請列舉"),
  agreeToVisit: z
    .boolean()
    .refine((val) => val === true, "需同意配合家訪/回訪"),
  agreeToSign: z
    .boolean()
    .refine((val) => val === true, "需同意簽署認養切結書"),
});

export type AdoptionApplicationData = z.infer<typeof adoptionApplicationSchema>;
