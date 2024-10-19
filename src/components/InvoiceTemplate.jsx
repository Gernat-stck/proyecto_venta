import React, { useEffect } from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  pdf,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  container: {
    flexDirection: "column",
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 48,
    height: 48,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  mutedText: {
    color: "#888",
  },
  clientInfo: {
    marginBottom: 20,
  },
  clientInfoText: {
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#f0f0f0",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 10,
    fontWeight: "bold",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  summary: {
    marginTop: 20,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
});

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const MyDocument = ({ data }) => {
  const today = new Date();
  const formattedDate = formatDate(today);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image
                source="https://scontent.fsal2-1.fna.fbcdn.net/v/t1.6435-9/107370199_102730704849659_1247036662282718029_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=-l17IGeQldMQ7kNvgG6ssWF&_nc_ht=scontent.fsal2-1.fna&oh=00_AYD1k__bDefC8EKdm7jROl3GAW7Cq2ren899psGB1vgN5g&oe=66ED1045"
                alt="Business Logo"
                style={styles.logo}
              />
              <View>
                <Text style={styles.title}>Part's Frio</Text>
                <Text style={styles.mutedText}>San Miguel, El Salvador</Text>
              </View>
            </View>
            <View style={{ textAlign: "right" }}>
              <Text style={styles.mutedText}>Invoice #0000</Text>
              <Text style={styles.mutedText}>{formattedDate}</Text>
            </View>
          </View>
          <View style={styles.clientInfo}>
            <Text style={styles.clientInfoText}>
              Cliente: {data.nombre_cliente}
            </Text>
            <Text style={styles.clientInfoText}>
              Dirección: {data.direccion}
            </Text>
            <Text style={styles.clientInfoText}>
              Teléfono: {data.numero_telefono}
            </Text>
            <Text style={styles.clientInfoText}>Email: {data.email}</Text>
            <Text style={styles.clientInfoText}>Giro: {data.giro}</Text>
            <Text style={styles.clientInfoText}>
              Documento: {data.documento}
            </Text>
            <Text style={styles.clientInfoText}>
              Registro: {data.registro_num}
            </Text>
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Item</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Cantidad</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Precio</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Total</Text>
              </View>
            </View>
            {data.cart.map((item) => (
              <View key={item.id} style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.product_name}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.quantity}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.precio_producto}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {item.precio_producto * item.quantity}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.mutedText}>Subtotal:</Text>
              <Text>{(data.total - data.total * 0.13).toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.mutedText}>Iva:</Text>
              <Text>{(data.total * 0.13).toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.mutedText}>Total:</Text>
              <Text style={styles.boldText}>{data.total.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const InvoiceTemplate = ({ data, onBlobGenerated }) => {
  useEffect(() => {
    if (data) {
      const generatePdf = async () => {
        const blob = await pdf(<MyDocument data={data} />).toBlob();
        onBlobGenerated(blob);
      };

      generatePdf();
    }
  }, [data]);

  return null;
};

export default InvoiceTemplate;
