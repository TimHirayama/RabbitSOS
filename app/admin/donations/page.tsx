import { createClient } from "@/lib/supabase/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  VerifyButton,
  IssueButton,
  RevertButton,
} from "./_components/action-buttons";
import { format } from "date-fns";
import { ExternalLink, Download } from "lucide-react";
import { ReceiptModal } from "./_components/receipt-modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AdminSearchFilters } from "@/components/admin/AdminSearchFilters";
import React from "react";
import { PaginationControls } from "./_components/pagination-controls";
import { DownloadReceiptButton } from "./_components/download-receipt-button";

const PAGE_SIZE = 20;

// Wrapper to avoid excessive client component nesting if not needed
function AddressButtonsWrapper({ id }: { id: string }) {
  return (
    <>
      <VerifyButton id={id} />
      <IssueButton id={id} />
    </>
  );
}

export default async function AdminDonationsPage(props: {
  searchParams: Promise<{
    q?: string;
    status?: string;
    page?: string;
  }>;
}) {
  const params = await props.searchParams;
  const page = Number(params.page) || 1;
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = await createClient();

  let query = supabase
    .from("donations")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  // Apply Smart Search
  const q = params.q?.trim();
  if (q) {
    const statusMap: Record<string, string> = {
      待核對: "pending",
      pending: "pending",
      已核銷: "verified",
      verified: "verified",
      有問題: "issue",
      issue: "issue",
    };
    const mappedStatus = statusMap[q] || statusMap[q.toLowerCase()];

    // Date Pattern: YYYY-MM (e.g., 2026-01)
    const datePattern = /^\d{4}-\d{2}$/;

    if (mappedStatus) {
      query = query.eq("receipt_status", mappedStatus);
    } else if (datePattern.test(q)) {
      const [year, month] = q.split("-").map(Number);
      if (!isNaN(year) && !isNaN(month)) {
        // Use string manipulation to avoid timezone issues with Date object
        const startDateStr = `${year}-${String(month).padStart(2, "0")}-01`;
        let endYear = year;
        let endMonth = month + 1;
        if (endMonth > 12) {
          endYear = year + 1;
          endMonth = 1;
        }
        const endDateStr = `${endYear}-${String(endMonth).padStart(2, "0")}-01`;

        query = query
          .gte("transfer_date", startDateStr)
          .lt("transfer_date", endDateStr);
      }
    } else {
      // Text Search (Name, Tax ID, Last 5)
      // Exclude Date column to prevent casting errors
      query = query.or(
        `donor_name.ilike.%${q}%,last_5_digits.ilike.%${q}%,donor_tax_id.ilike.%${q}%`
      );
    }
  }

  // Remove old status filter logic

  const { data: donations, count } = await query;
  const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 0;

  // Generate signed URLs for private images
  const donationsWithUrls = await Promise.all(
    (donations || []).map(async (donation) => {
      let signedUrl = null;
      if (donation.proof_image_url) {
        const { data } = await supabase.storage
          .from("receipts")
          .createSignedUrl(donation.proof_image_url, 60 * 60); // 1 hour expiry
        signedUrl = data?.signedUrl;
      }
      return { ...donation, signed_url: signedUrl };
    })
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary"; // Gray (Pending)
      case "verified":
        return "default"; // Black (Done)
      case "issue":
        return "destructive"; // Red (Issue)
      default:
        return "secondary";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "待核對";
      case "verified":
        return "已核銷";
      case "issue":
        return "有問題";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">捐款核對</h2>
        <p className="text-muted-foreground">核對銀行轉帳紀錄與回報單</p>
      </div>

      <AdminSearchFilters placeholder="搜尋捐款人、後五碼或統編..." />

      {/* Desktop Table View */}
      <div className="rounded-md border bg-white hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>日期</TableHead>
              <TableHead>捐款人</TableHead>
              <TableHead>金額</TableHead>
              <TableHead>帳號後五碼</TableHead>
              <TableHead>匯款憑證</TableHead>
              <TableHead>備註</TableHead>
              <TableHead>狀態</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donationsWithUrls?.map((donation: any) => (
              <TableRow key={donation.id}>
                <TableCell>
                  {donation.transfer_date
                    ? format(new Date(donation.transfer_date), "yyyy/MM/dd")
                    : "-"}
                  <div className="text-xs text-muted-foreground">
                    Report:{" "}
                    {format(new Date(donation.created_at), "yyyy/MM/dd")}
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {donation.donor_name}
                  <div className="text-xs text-muted-foreground">
                    {donation.donor_phone || "-"}
                  </div>
                  {donation.donor_email && (
                    <div className="text-xs text-muted-foreground">
                      {donation.donor_email}
                    </div>
                  )}
                  {donation.receipt_address && (
                    <div
                      className="text-xs text-muted-foreground truncate max-w-[150px]"
                      title={donation.receipt_address}
                    >
                      {donation.receipt_address}
                    </div>
                  )}
                  {donation.donor_tax_id && (
                    <div className="text-xs text-muted-foreground">
                      统編: {donation.donor_tax_id}
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-bold text-green-600">
                  ${donation.amount.toLocaleString()}
                </TableCell>
                <TableCell>{donation.last_5_digits || "-"}</TableCell>
                <TableCell>
                  <ReceiptModal url={donation.signed_url} />
                </TableCell>
                <TableCell className="max-w-xs text-sm">
                  {donation.note && (
                    <div className="mb-1 text-stone-700">
                      <span className="text-xs text-muted-foreground mr-1">
                        User:
                      </span>
                      {donation.note}
                    </div>
                  )}
                  {donation.admin_note && (
                    <div className="text-red-600 font-medium">
                      <span className="text-xs text-red-400 mr-1">Issue:</span>
                      {donation.admin_note}
                    </div>
                  )}
                  {!donation.note && !donation.admin_note && (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={getStatusColor(donation.receipt_status) as any}
                  >
                    {getStatusLabel(donation.receipt_status)}
                  </Badge>
                  {donation.receipt_no && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {donation.receipt_no}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {donation.receipt_status === "pending" && (
                    <div className="flex justify-end gap-2">
                      <AddressButtonsWrapper id={donation.id} />
                    </div>
                  )}
                  {donation.receipt_status === "verified" && (
                    <div className="flex flex-col gap-1 items-end">
                      <div className="flex items-center gap-1">
                        <DownloadReceiptButton donation={donation} />
                        <RevertButton id={donation.id} />
                      </div>
                    </div>
                  )}
                  {donation.receipt_status === "issue" && (
                    <div className="flex justify-end">
                      <RevertButton id={donation.id} />
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {!donations?.length && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center h-24 text-muted-foreground"
                >
                  尚無捐款回報紀錄
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-4 md:hidden">
        {donationsWithUrls?.map((donation: any) => (
          <Card key={donation.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base">
                    {donation.donor_name}
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {format(new Date(donation.transfer_date), "yyyy/MM/dd")}
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    {donation.donor_phone}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-green-600 block">
                    ${donation.amount.toLocaleString()}
                  </span>
                  <Badge
                    variant={getStatusColor(donation.receipt_status) as any}
                    className="mt-1"
                  >
                    {getStatusLabel(donation.receipt_status)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm bg-slate-50 p-3 rounded">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs">後五碼</span>
                  <span className="font-medium">
                    {donation.last_5_digits || "-"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs">統編</span>
                  <span className="font-medium">
                    {donation.donor_tax_id || "-"}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">憑證:</span>
                  <ReceiptModal url={donation.signed_url} />
                </div>

                {donation.receipt_status === "pending" && (
                  <div className="flex gap-2">
                    <AddressButtonsWrapper id={donation.id} />
                  </div>
                )}
              </div>

              {donation.receipt_status !== "pending" && donation.admin_note && (
                <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                  管理員備註: {donation.admin_note}
                </div>
              )}
              {donation.note && (
                <div className="text-xs text-stone-500 bg-stone-50 p-2 rounded border border-stone-100">
                  備註: {donation.note}
                </div>
              )}
              {donation.receipt_status === "verified" && (
                <div className="mt-2">
                  <DownloadReceiptButton donation={donation} />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        {!donations?.length && (
          <div className="text-center py-8 text-muted-foreground border rounded-lg border-dashed">
            尚無紀錄
          </div>
        )}
        <div className="mt-4">
          <PaginationControls currentPage={page} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
