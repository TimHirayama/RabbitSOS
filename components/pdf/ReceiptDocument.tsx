/* eslint-disable jsx-a11y/alt-text */
"use client";

import React from "react";
import {
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { format } from "date-fns";

// Register Font
Font.register({
  family: "Noto Sans TC",
  src: "/fonts/NotoSansTC-Regular.woff",
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Noto Sans TC",
    fontSize: 12,
    color: "#333",
  },
  header: {
    marginBottom: 30,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#ea580c", // Orange-600
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    fontSize: 10,
    color: "#666",
  },
  section: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#f9fafb", // Gray-50
    borderRadius: 8,
  },
  row: {
    flexDirection: "row",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 4,
  },
  label: {
    width: "30%",
    fontWeight: "bold",
    color: "#555",
  },
  value: {
    width: "70%",
    color: "#000",
  },
  footer: {
    marginTop: 50,
    textAlign: "center",
    fontSize: 10,
    color: "#888",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 20,
  },
  stampArea: {
    marginTop: 30,
    marginBottom: 10,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  stampText: {
    fontSize: 14,
    color: "#ea580c",
    borderWidth: 2,
    borderColor: "#ea580c",
    padding: 10,
    borderRadius: 4,
    opacity: 0.5,
  },
});

interface DonationData {
  id: string;
  donor_name: string;
  amount: number;
  transfer_date: string;
  donor_tax_id?: string;
  receipt_address?: string;
  created_at: string;
}

interface ReceiptDocumentProps {
  donation: DonationData;
  receiptNo: string;
}

export const ReceiptDocument = ({ donation, receiptNo }: ReceiptDocumentProps) => (
  <Page size="A4" style={styles.page}>
    {/* Header */}
    <View style={styles.header}>
      <Text style={styles.title}>RabbitSOS 兔兔救援協會</Text>
      <Text style={styles.subtitle}>捐款收據 Donation Receipt</Text>
    </View>

    {/* Meta */}
    <View style={styles.meta}>
      <Text>收據號碼: {receiptNo}</Text>
      <Text>列印日期: {format(new Date(), "yyyy-MM-dd")}</Text>
    </View>

    {/* Content */}
    <View style={styles.section}>
      <View style={styles.row}>
        <Text style={styles.label}>捐款人姓名</Text>
        <Text style={styles.value}>{donation.donor_name}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>捐款金額</Text>
        <Text style={styles.value}>NT$ {donation.amount.toLocaleString()}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>捐款日期</Text>
        <Text style={styles.value}>{donation.transfer_date}</Text>
      </View>

      {donation.donor_tax_id && (
        <View style={styles.row}>
          <Text style={styles.label}>統一編號</Text>
          <Text style={styles.value}>{donation.donor_tax_id}</Text>
        </View>
      )}

      <View style={styles.row}>
        <Text style={styles.label}>捐款項目</Text>
        <Text style={styles.value}>一般捐款 (流浪兔救援與照護)</Text>
      </View>
    </View>

    <Text style={{ fontSize: 10, color: "#666", marginBottom: 5 }}>
      * 本收據可作為所得稅列舉扣除額憑證。
    </Text>
    <Text style={{ fontSize: 10, color: "#666" }}>
      * 感謝您的愛心支持，讓我們能幫助更多流浪兔。
    </Text>

    {/* Stamp / Signature Area */}
    <View style={styles.stampArea}>
      {/* Placeholder for real stamp image if available */}
      <Text style={styles.stampText}>RabbitSOS 財務印鑑章</Text>
    </View>

    {/* Footer */}
    <View style={styles.footer}>
      <Text>RabbitSOS 兔兔救援協會</Text>
      <Text>Email: donate@rabbitsos.org | Website: rabbitsos.org</Text>
      <Text>內政部立案字號：台內社字第 0000000000 號</Text>
    </View>
  </Page>
);
