"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { ReceiptDocument } from "@/components/feature/ReceiptDocument";
import { format } from "date-fns";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => (
      <Button 
        size="sm" 
        variant="outline" 
        className="h-7 text-xs flex items-center gap-1 border-green-200 text-green-700 bg-green-50 hover:bg-green-100" 
        disabled
      >
        <Loader2 className="h-3 w-3 animate-spin"/> 
        準備中...
      </Button>
    ),
  }
);

interface DownloadReceiptButtonProps {
  donation: {
    id: string;
    receipt_no: string | null;
    created_at: string | null; // Allow null to be safe, though usually present
    donor_name: string;
    donor_tax_id: string | null;
    amount: number;
  }
}

export function DownloadReceiptButton({ donation }: DownloadReceiptButtonProps) {
  // Safe date parsing
  const dateStr = donation.created_at 
    ? format(new Date(donation.created_at), "yyyy-MM-dd") 
    : format(new Date(), "yyyy-MM-dd");

  return (
    <PDFDownloadLink
        document={
            <ReceiptDocument
                receiptNo={donation.receipt_no || "N/A"}
                date={dateStr}
                donorName={donation.donor_name}
                taxId={donation.donor_tax_id || undefined}
                amount={donation.amount}
            />
        }
        fileName={`donation_receipt_${donation.receipt_no || donation.id}.pdf`}
    >
        {/* @ts-ignore - render props type mismatch often happens with this lib */}
        {({ blob, url, loading, error }: any) => (
            <Button 
                size="sm" 
                variant="outline" 
                className="h-7 text-xs flex items-center gap-1 border-green-200 text-green-700 bg-green-50 hover:bg-green-100"
                disabled={loading}
            >
                {loading ? (
                    <>
                        <Loader2 className="h-3 w-3 animate-spin" />
                        產生中
                    </>
                ) : (
                    <>
                        <Download className="h-3 w-3" />
                        下載收據
                    </>
                )}
            </Button>
        )}
    </PDFDownloadLink>
  );
}
