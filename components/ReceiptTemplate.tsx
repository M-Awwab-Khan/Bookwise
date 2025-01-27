import {
  View,
  Text,
  Page,
  Document,
  StyleSheet,
  Font,
  Svg,
  Path,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import path from "path";

// Register fonts if needed
Font.register({
  family: "IBM Plex Sans",
  fonts: [
    {
      src: path.join(process.cwd(), "public/fonts/IBMPlexSans-Regular.ttf"),
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#1a1d29",
    padding: 40,
    color: "#ffffff",
    fontFamily: "IBM Plex Sans",
  },
  container: {
    flex: 1,
    maxWidth: 600,
    margin: "0 auto",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  logoText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 8,
  },
  title: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  receiptInfo: {
    color: "#9ca3af",
    fontSize: 12,
    marginBottom: 32,
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "medium",
    marginBottom: 16,
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 32,
  },
  gridItem: {
    width: "48%", // Fixed width to ensure two columns
    backgroundColor: "#22263a",
    borderRadius: 4,
    padding: 12,
  },
  label: {
    color: "#9ca3af",
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    color: "#ffffff",
    fontSize: 14,
  },
  terms: {
    marginBottom: 32,
  },
  termItem: {
    color: "#9ca3af",
    fontSize: 12,
    marginBottom: 8,
    flexDirection: "row",
  },
  bullet: {
    marginRight: 8,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#374151",
    paddingTop: 16,
  },
  footerText: {
    color: "#9ca3af",
    fontSize: 12,
    marginBottom: 4,
  },
  highlight: {
    color: "#ffffff",
  },
});

const BookIcon = () => (
  <Svg width="40" height="32" viewBox="0 0 40 32" fill="none">
    <Path
      opacity="0.5"
      d="M20 9.99988V31.8888C29.8889 26.4443 38.2223 29.9999 40 31.9999V9.99987C33 5.99986 21.8148 6.62951 20 9.99988Z"
      fill="#DBE5FF"
    />
    <Path
      d="M20 10.0001V31.889C26.3333 23.6668 34.3334 25.6668 36.8889 26.1112V4.33343C31 2.44453 21.8148 6.62973 20 10.0001Z"
      fill="#F0F4FF"
    />
    <Path
      d="M20 9.74947V31.5556C23.4089 23.6965 32.4261 22.9217 34.2222 23.0324V0.00865083C29.9996 -0.257008 20.8797 5.65389 20 9.74947Z"
      fill="url(#paint0_linear_5984_2811)"
    />
    <Path
      opacity="0.5"
      d="M20 9.99988V31.8888C10.1111 26.4443 1.77775 29.9999 -3.43323e-05 31.9999V9.99987C6.99998 5.99986 18.1852 6.62951 20 9.99988Z"
      fill="#DBE5FF"
    />
    <Path
      d="M20 10.0001V31.889C13.6667 23.6668 5.66664 25.6668 3.11108 26.1112V4.33343C8.99998 2.44453 18.1852 6.62973 20 10.0001Z"
      fill="#F0F4FF"
    />
    <Path
      d="M20 9.74947V31.5556C16.5911 23.6965 7.57386 22.9217 5.77775 23.0324V0.00865083C10.0004 -0.257008 19.1203 5.65389 20 9.74947Z"
      fill="url(#paint1_linear_5984_2811)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_5984_2811"
        x1="20"
        y1="18.7778"
        x2="34.2222"
        y2="18.7778"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FAFBFF" stop-opacity="0.49" />
        <stop offset="1" stop-color="#FAFBFF" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_5984_2811"
        x1="20"
        y1="18.7778"
        x2="5.77775"
        y2="18.7778"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FAFBFF" stop-opacity="0.49" />
        <stop offset="1" stop-color="#FAFBFF" />
      </linearGradient>
    </defs>
  </Svg>
);

interface ReceiptTemplateProps {
  receiptId: string;
  bookTitle: string;
  author: string;
  genre: string;
  borrowDate: Date;
  dueDate: Date;
  duration: number;
}

export function ReceiptTemplate({
  receiptId,
  bookTitle,
  author,
  genre,
  borrowDate,
  dueDate,
  duration,
}: ReceiptTemplateProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <BookIcon />
            <Text style={styles.logoText}>BookWise</Text>
          </View>

          <Text style={styles.title}>Borrow Receipt</Text>
          <Text style={styles.receiptInfo}>
            Receipt ID: {receiptId}
            {"\n"}
            Date Issued: {format(new Date(), "dd/MM/yyyy")}
          </Text>

          <Text style={styles.sectionTitle}>Book Details:</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Title</Text>
              <Text style={styles.value}>{bookTitle}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Author</Text>
              <Text style={styles.value}>{author}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Genre</Text>
              <Text style={styles.value}>{genre}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Borrowed on</Text>
              <Text style={styles.value}>
                {format(borrowDate, "dd/MM/yyyy")}
              </Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Due Date</Text>
              <Text style={styles.value}>{format(dueDate, "dd/MM/yyyy")}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Duration</Text>
              <Text style={styles.value}>{duration} Days</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Terms</Text>
          <View style={styles.terms}>
            <View style={styles.termItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.footerText}>
                Please return the book by the due date.
              </Text>
            </View>
            <View style={styles.termItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.footerText}>
                Lost or damaged books may incur replacement costs.
              </Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Thank you for using <Text style={styles.highlight}>BookWise</Text>
              !
            </Text>
            <Text style={styles.footerText}>
              Website:{" "}
              <Text style={styles.highlight}>bookwise.example.com</Text>
            </Text>
            <Text style={styles.footerText}>
              Email:{" "}
              <Text style={styles.highlight}>support@bookwise.example.com</Text>
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
