import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { renderToStream, Document } from "@react-pdf/renderer";
import { ReceiptDocument } from "@/components/pdf/ReceiptDocument";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const donationId = params.id;

  // 1. Fetch Donation
  const { data: donation, error } = await supabase
    .from("donations")
    .select("*")
    .eq("id", donationId)
    .single();

  if (error || !donation) {
    return new NextResponse("Donation not found", { status: 404 });
  }

  // 2. Check Verification Status (Public Access Requirement)
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  const isStaff = user?.user_metadata?.role === 'admin' || user?.user_metadata?.role === 'volunteer';

  if (donation.status !== "verified" && !isStaff) {
    return new NextResponse("Receipt not available yet", { status: 403 });
  }

  // 3. Prepare Data
  let taxId = "";
  let address = "";
  
  if (donation.admin_note) {
      const note = donation.admin_note as string;
      const taxMatch = note.match(/TaxID: ([^,]+)/);
      if (taxMatch) taxId = taxMatch[1].trim();
      
      const addrMatch = note.match(/Addr: ([^,]+)/);
      if (addrMatch) address = addrMatch[1].trim();
  }

  const receiptData = {
    id: donation.id,
    donor_name: donation.donor_name,
    amount: donation.amount,
    transfer_date: donation.transfer_date,
    donor_tax_id: taxId,
    receipt_address: address,
    created_at: donation.created_at,
  };
  
  const receiptNo = `R-${donation.id.split("-")[0].toUpperCase()}`;

  // 4. Render PDF
  try {
    const stream = await renderToStream(
      <Document>
        <ReceiptDocument donation={receiptData} receiptNo={receiptNo} />
      </Document>
    );

    return new NextResponse(stream as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="receipt-${receiptNo}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);
    return new NextResponse("Error generating PDF", { status: 500 });
  }
}
