import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
import { numberToChinese } from "@/utils/numberToChinese";

// Register Font
Font.register({
  family: "NotoSansTC",
  src: "https://fonts.gstatic.com/ea/notosanstc/v1/NotoSansTC-Regular.woff2", // Example CDN, might need CORS or specific format
  // Ideally, use local file in public folder: /fonts/NotoSansTC-Regular.ttf
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
    fontFamily: "NotoSansTC",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  label: {
    width: 80,
    fontSize: 12,
    fontWeight: "bold",
  },
  value: {
    flex: 1,
    fontSize: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 2,
  },
  amountRow: {
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
    flexDirection: "row",
    alignItems: "center",
  },
  amountText: {
    fontSize: 14,
    marginRight: 20,
  },
  footer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
  },
  stampArea: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  stampImage: {
    position: "absolute",
    width: 80,
    height: 80,
    opacity: 0.8,
    top: -30,
    left: 10,
  },
  orgInfo: {
    marginTop: 40,
    fontSize: 10,
    color: "#555",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
});

interface ReceiptProps {
  receiptNo: string;
  date: string;
  donorName: string;
  taxId?: string;
  amount: number;
}

export const ReceiptDocument = ({ receiptNo, date, donorName, taxId, amount }: ReceiptProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>社團法人台灣流浪兔保護協會</Text>
        <Text style={styles.subtitle}>捐款收據</Text>
      </View>

      {/* Meta */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
         <Text style={{ fontSize: 10 }}>收據編號: {receiptNo}</Text>
         <Text style={{ fontSize: 10 }}>日期: {date}</Text>
      </View>

      {/* Content */}
      <View style={styles.row}>
        <Text style={styles.label}>捐款人：</Text>
        <Text style={styles.value}>{donorName}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>統一編號：</Text>
        <Text style={styles.value}>{taxId || "N/A"}</Text>
      </View>

      <View style={styles.amountRow}>
        <Text style={styles.amountText}>捐款金額：</Text>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
           新台幣 {numberToChinese(amount)} ({amount.toLocaleString()}元)
        </Text>
      </View>

      <View style={styles.row}>
         <Text style={styles.label}>說明：</Text>
         <Text style={styles.value}>保育捐款 / 醫療費用</Text>
      </View>
      
      <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 10 }}>感謝您的愛心支持，本收據可依所得稅法規定列舉扣除。</Text>
      </View>

      {/* Stamps */}
      <View style={styles.footer}>
         <View style={styles.stampArea}>
             <Text style={{ fontSize: 10 }}>經手人</Text>
             {/* <Image src="/seal_handler.png" style={styles.stampImage} /> */}
         </View>
         <View style={styles.stampArea}>
             <Text style={{ fontSize: 10 }}>會計</Text>
         </View>
         <View style={styles.stampArea}>
             <Text style={{ fontSize: 10 }}>理事長</Text>
             {/* <Image src="/seal_director.png" style={styles.stampImage} /> */}
         </View>
         <View style={{ position: "absolute", right: 50, top: -20, opacity: 0.5 }}>
             {/* Org Stamp */}
             {/* <Image src="/seal_association.png" style={{ width: 100, height: 100 }} /> */}
         </View>
      </View>

      {/* Org Info */}
      <View style={styles.orgInfo}>
          <Text>地址：台北市某某區某某路123號</Text>
          <Text>電話：(02) 1234-5678</Text>
          <Text>立案字號：台內社字第0980123456號</Text>
      </View>
    </Page>
  </Document>
);
