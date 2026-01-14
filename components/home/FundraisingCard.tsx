import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface FundraisingCardProps {
  title: string;
  dateRange: string;
  income: number;
  expense: number;
  target: number;
  hideActions?: boolean;
}

export function FundraisingCard({
  title,
  dateRange,
  income,
  expense,
  target,
  hideActions = false,
}: FundraisingCardProps) {
  // Calculate percentages (capped at 100)
  const safeTarget = target > 0 ? target : 100;
  const incomePercent = Math.min((income / safeTarget) * 100, 100);
  const expensePercent = Math.min((expense / safeTarget) * 100, 100);

  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm space-y-6">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-stone-800 leading-snug">
          {title}
        </h3>

        <p className="text-sm text-stone-500">{dateRange}</p>

        {/* Income Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-stone-700">
              收入: {income.toLocaleString()}
            </span>
          </div>
          <Progress
            value={incomePercent}
            className="h-3 bg-stone-100 [&>div]:bg-orange-400"
          />
        </div>

        {/* Expense Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-stone-700">
              支出: {expense.toLocaleString()}
            </span>
          </div>
          <Progress
            value={expensePercent}
            className="h-3 bg-stone-100 [&>div]:bg-blue-500"
          />
        </div>
      </div>

      {!hideActions && (
        <div className="space-y-3 pt-2">
          <Button
            className="w-full text-lg font-bold bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-md shadow-orange-100 py-6"
            asChild
          >
            <Link href="/donate">幫助兔寶!</Link>
          </Button>
          <Button
            variant="outline"
            className="w-full text-lg font-medium border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700 rounded-full py-6"
            asChild
          >
            <Link href="/posts?category=fundraising">捐款/捐贈募資名單</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
