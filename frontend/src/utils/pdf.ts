import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generateInvoicePDF(
  invoice: any
) {

  const doc = new jsPDF();

  // ==========================
  // Company
  // ==========================

  doc.setFontSize(20);

  doc.text(
    invoice.company_name,
    14,
    20
  );

  doc.setFontSize(12);

  doc.text(
    invoice.tagline,
    14,
    28
  );

  doc.text(
    invoice.address,
    14,
    35
  );

  doc.text(
    `${invoice.city}, ${invoice.state} - ${invoice.pincode}`,
    14,
    42
  );

  doc.text(
    `Phone : ${invoice.company_phone}`,
    14,
    49
  );

  doc.text(
    `Email : ${invoice.company_email}`,
    14,
    56
  );

  // ==========================
  // Invoice
  // ==========================

  doc.setFontSize(18);

  doc.text(
    "INVOICE",
    145,
    20
  );

  doc.setFontSize(11);

  doc.text(
    `Invoice No : ${invoice.invoice_number}`,
    145,
    32
  );

  doc.text(
    `Date : ${new Date(
      invoice.invoice_date
    ).toLocaleDateString("en-IN")}`,
    145,
    40
  );

  // ==========================
  // Customer
  // ==========================

  doc.setFontSize(14);

  doc.text(
    "Customer Details",
    14,
    72
  );

  doc.setFontSize(11);

  doc.text(
    `Name : ${invoice.customer_name}`,
    14,
    82
  );

  doc.text(
    `Phone : ${invoice.phone}`,
    14,
    90
  );

  doc.text(
    `Email : ${invoice.email}`,
    14,
    98
  );

  // ==========================
  // Items
  // ==========================

  autoTable(doc, {

    startY: 110,

    head: [[
      "Product",
      "Weight",
      "Qty",
      "Price",
      "Total",
    ]],

    body: invoice.items.map(
      (item: any) => [

        item.name,

        item.weight,

        item.quantity,

        `₹${Number(
          item.price
        ).toFixed(2)}`,

        `₹${Number(
          item.subtotal
        ).toFixed(2)}`,

      ]
    ),

  });

  // ==========================
  // Grand Total
  // ==========================

  const finalY =
    (doc as any).lastAutoTable.finalY + 15;

  doc.setFontSize(14);

  doc.text(

    `Grand Total : ₹${Number(
      invoice.total_amount
    ).toFixed(2)}`,

    14,

    finalY

  );

  // ==========================
  // Footer
  // ==========================

  doc.setFontSize(10);

  doc.text(

    "Thank you for shopping with Honique Farms.",

    14,

    finalY + 20

  );

  doc.save(

    `Invoice-${invoice.invoice_number}.pdf`

  );

}
