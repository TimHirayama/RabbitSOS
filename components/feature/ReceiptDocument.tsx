import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
import { numberToChinese } from "@/utils/numberToChinese";

// Register Font
Font.register({
  family: "NotoSansTC",
  src: "https://fonts.gstatic.com/ea/notosanstc/v1/NotoSansTC-Regular.woff2", // Example CDN, might need CORS or specific format
  // Ideally, use local file in public folder: /fonts/NotoSansTC-Regular.ttf
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
      
      {/* Header Section */}
      <View style={styles.headerContainer}>
         <View style={styles.logoContainer}>
            {/* Note: User is converting SVG to PNG for better compatibility */}
            <Image src="/logo.png" style={styles.logo} />
         </View>
         <View style={styles.headerTextContainer}>
            <Text style={styles.orgTitle}>社團法人台灣流浪兔保護協會</Text>
            <Text style={styles.receiptTitle}>台灣流浪兔保護協會收據</Text>
            <View style={styles.permitContainer}>
                <Text style={styles.permitNumber}>許可文號：衛部救字第1131365070號</Text>
                <Text style={styles.permitNumber}>立案字號：台內社字第0980148887號</Text>
            </View>
         </View>
         <View style={styles.receiptNoContainer}>
            <Text style={styles.receiptNoLabel}>NO.</Text>
            <Text style={styles.receiptNoValue}>{receiptNo}</Text>
         </View>
      </View>

      {/* Main Content Box */}
      <View style={styles.contentBox}>
         
         {/* Form Rows */}
         <View style={styles.formRow}>
            <Text style={styles.label}>捐 贈 者：</Text>
            <Text style={styles.value}>{donorName}</Text>
         </View>

         <View style={styles.formRow}>
            <Text style={styles.label}>身分證字號/統一編號：</Text>
            <Text style={styles.value}>{taxId || ""}</Text>
         </View>

         <View style={styles.formRow}>
            <Text style={styles.label}>捐贈項目：</Text>
            <Text style={styles.value}>現金 (轉帳/匯款)</Text>
         </View>

         <View style={styles.formRow}>
            <Text style={styles.label}>捐贈金額：</Text>
            <Text style={styles.amountValue}>
               新臺幣 {numberToChinese(amount)}整 (NT$ {amount.toLocaleString()})
            </Text>
         </View>

         <View style={styles.formRow}>
            <Text style={styles.label}>捐贈用途：</Text>
            <Text style={styles.value}>愛心捐贈</Text>
         </View>

         <View style={styles.formRow}>
            <Text style={styles.label}>立據日期：</Text>
            <Text style={styles.value}>{date}</Text>
         </View>

         {/* Seals Section */}
         <View style={styles.sealsContainer}>
            <View style={styles.sealBlock}>
               <Text style={styles.sealTitle}>理事長</Text>
               <View style={styles.stampBox} />
            </View>
            <View style={styles.sealBlock}>
               <Text style={styles.sealTitle}>經收人</Text>
               <View style={styles.stampBox} />
            </View>
         </View>

      </View>

      {/* Footer Info */}
      <View style={styles.footerContainer}>
         <View style={styles.orgDetails}>
             <Text>2024-2025年流浪兔、受虐兔救助工作</Text>
             <Text>(勸募日期：113.12.27-114.12.26)</Text>
             <Text style={{ marginTop: 4 }}>統一編號：26131442</Text>
             <Text>地址：台北市環河南路2段149巷7號10樓</Text>
             <Text>電話：02-22215646</Text>
             <Text>網址：https://www.rabbitsos.org</Text>
             <Text>E-mail：rabbitsos@gmail.com</Text>
         </View>
         <View style={styles.bankDetails}>
            <Text>郵政劃撥帳號：50191826</Text>
            <Text>戶名：社團法人台灣流浪兔保護協會</Text>
            <Text style={{ marginTop: 4 }}>銀行匯款：台灣銀行民權分行(004)</Text>
            <Text>帳號：046001001235</Text>
            <Text>戶名：台灣流浪兔保護協會</Text>
         </View>
      </View>

      <View style={styles.noticeContainer}>
         <Text>◎所得稅法規定，個人之捐贈總額不超過全年綜合所得20%，營利事業之捐贈總額不超過全年所得10%者，均可列入扣除額。</Text>
      </View>

    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "NotoSansTC",
    fontSize: 10, // Base font size
    color: "#333",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Center logo and text vertically
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1, // Thinner line
    borderBottomColor: "#000",
  },
  logoContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  headerTextContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  orgTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  receiptTitle: {
    fontSize: 20,
    fontWeight: "heavy", // Bolder
    marginVertical: 4,
    color: "#000",
  },
  permitContainer: {
     alignItems: "center",
  },
  permitNumber: {
    fontSize: 8,
    color: "#333",
  },
  receiptNoContainer: {
    alignItems: "flex-end",
    minWidth: 80,
  },
  receiptNoLabel: {
    fontSize: 10,
    fontWeight: "bold",
  },
  receiptNoValue: {
    fontSize: 10,
    color: "#d32f2f", // Red color for number often used
  },
  contentBox: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 20,
    position: "relative",
    height: 400, // Fixed height or minHeight
  },
  rabbitIllustration: {
    position: "absolute",
    right: 20,
    bottom: 80,
    opacity: 0.3,
    zIndex: -1,
  },
  formRow: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "flex-end", // Align bottom of text line
  },
  label: {
    width: 130, // Fixed width for alignment
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "justify", // Justify text if supported, otherwise explicit spacing
  },
  value: {
    flex: 1,
    fontSize: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 2,
    paddingLeft: 5,
  },
  amountValue: {
    flex: 1,
    fontSize: 12,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 2,
    paddingLeft: 5,
  },
  sealsContainer: {
    flexDirection: "row",
    justifyContent: "space-around", // Evenly space seals
    marginTop: 40,
  },
  sealBlock: {
    alignItems: "center",
  },
  sealTitle: {
    fontSize: 10,
    marginBottom: 5,
  },
  stampBox: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "#ddd",
    borderStyle: "dashed", // Placeholder line
  },
  footerContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 9,
    color: "#555",
  },
  orgDetails: {
    flex: 1,
  },
  bankDetails: {
    flex: 1,
    alignItems: "flex-end",
    textAlign: "right",
  },
  noticeContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
    alignItems: "center",
  },
});
