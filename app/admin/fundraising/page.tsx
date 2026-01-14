import { getSiteSetting } from "@/app/admin/actions";
import { FundraisingForm } from "./_components/fundraising-form";

export default async function FundraisingPage() {
  // Fetch settings in parallel
  const [title, dateRange, income, expense, target] = await Promise.all([
    getSiteSetting(
      "fundraising_title",
      "您的愛心是給予曾經被拋棄、可能瀕死的兔兔最大支持！"
    ),
    getSiteSetting(
      "fundraising_date_range",
      "113/12/27~114/11/30止捐款+義賣之收入/支出金額"
    ),
    getSiteSetting("fundraising_income", "16622402"),
    getSiteSetting("fundraising_expense", "17538726"),
    getSiteSetting("fundraising_target", "30000000"),
  ]);

  const initialData = {
    title,
    dateRange,
    income,
    expense,
    target,
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">募資進度管理</h1>
      </div>
      <div>
        <FundraisingForm initialData={initialData} />
      </div>
    </div>
  );
}
