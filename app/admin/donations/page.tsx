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
import { VerifyButton, RejectButton } from "./_components/action-buttons";
import { ExternalLink } from "lucide-react";

export default async function AdminDonationsPage() {
  const supabase = await createClient();
  const { data: donations } = await supabase
    .from("donations")
    .select("*")
    .order("created_at", { ascending: false });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "secondary"; // Gray (Pending)
      case "verified": return "default"; // Black (Done)
      case "issue": return "destructive"; // Red (Issue)
      default: return "secondary";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "待核對";
      case "verified": return "已核銷";
      case "issue": return "有問題";
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">捐款核對</h2>
        <p className="text-muted-foreground">
          核對銀行轉帳紀錄與回報單
        </p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>日期</TableHead>
              <TableHead>捐款人</TableHead>
              <TableHead>金額</TableHead>
              <TableHead>帳號後五碼</TableHead>
              <TableHead>匯款憑證</TableHead>
              <TableHead>狀態</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donations?.map((donation) => (
              <TableRow key={donation.id}>
                <TableCell>
                   {donation.transfer_date ? new Date(donation.transfer_date).toLocaleDateString() : '-'}
                   <div className="text-xs text-muted-foreground">
                      Report: {new Date(donation.created_at).toLocaleDateString()}
                   </div>
                </TableCell>
                <TableCell className="font-medium">
                  {donation.donor_name}
                  {donation.donor_tax_id && <div className="text-xs text-muted-foreground">統編: {donation.donor_tax_id}</div>}
                </TableCell>
                <TableCell className="font-bold text-green-600">
                  ${donation.amount.toLocaleString()}
                </TableCell>
                <TableCell>{donation.last_5_digits || '-'}</TableCell>
                <TableCell>
                  {donation.proof_image_url ? (
                    <a href={donation.proof_image_url} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline">
                      查看圖片 <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(donation.receipt_status) as any}>
                    {getStatusLabel(donation.receipt_status)}
                  </Badge>
                  {donation.receipt_no && <div className="text-xs text-muted-foreground mt-1">{donation.receipt_no}</div>}
                </TableCell>
                <TableCell className="text-right">
                  {donation.receipt_status === 'pending' && (
                    <div className="flex justify-end gap-2">
                       <AddressButtonsWrapper id={donation.id} />
                    </div>
                  )}
                  {donation.receipt_status !== 'pending' && (
                     <div className="text-xs text-muted-foreground">
                        {donation.admin_note || "Completed"}
                     </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {!donations?.length && (
               <TableRow>
                  <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                     尚無捐款回報紀錄
                  </TableCell>
               </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// Wrapper to avoid excessive client component nesting if not needed, 
// strictly speaking VerifyButton and RejectButton are client components, 
// so we can use them directly.
import React from 'react';
function AddressButtonsWrapper({ id }: { id: string }) {
   return (
      <>
         <VerifyButton id={id} />
         <RejectButton id={id} />
      </>
   )
}
