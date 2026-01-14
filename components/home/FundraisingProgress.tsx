import { getSiteSetting } from "@/app/admin/actions";
import { FundraisingCard } from "./FundraisingCard";

export async function FundraisingProgress() {
  // Fetch settings in parallel
  const [title, dateRange, incomeStr, expenseStr, targetStr] =
    await Promise.all([
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
      getSiteSetting("fundraising_target", "30000000"), // Default target for calculations
    ]);

  const income = parseInt(incomeStr, 10) || 0;
  const expense = parseInt(expenseStr, 10) || 0;
  const target = parseInt(targetStr, 10) || 100; // Avoid division by zero

  return (
    <FundraisingCard
      title={title}
      dateRange={dateRange}
      income={income}
      expense={expense}
      target={target}
    />
  );
}
