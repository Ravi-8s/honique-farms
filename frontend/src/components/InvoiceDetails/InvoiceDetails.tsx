import "./InvoiceDetails.css";

import {
  generateInvoicePDF,
} from "../../utils/pdf";

type Props = {
  invoice: any;
};

function InvoiceDetails({
  invoice,
}: Props) {

  return (

    <div className="invoice-container">

      <div className="invoice-header">

        <div className="company">

          <h1>{invoice.company_name}</h1>

          <p>{invoice.tagline}</p>

          <p>{invoice.address}</p>

          <p>
            {invoice.city}, {invoice.state}
          </p>

          <p>{invoice.pincode}</p>

          <p>
            Phone : {invoice.company_phone}
          </p>

          <p>
            Email : {invoice.company_email}
          </p>

        </div>

        <div className="invoice-info">

          <h2>INVOICE</h2>

          <p>

            <strong>
              Invoice No
            </strong>

            <br />

            {invoice.invoice_number}

          </p>

          <p>

            <strong>
              Invoice Date
            </strong>

            <br />

            {new Date(
              invoice.invoice_date
            ).toLocaleDateString("en-IN")}

          </p>

        </div>

      </div>

      <div className="section">

        <h3>Customer Details</h3>

        <p>

          <strong>Name :</strong>{" "}

          {invoice.customer_name}

        </p>

        <p>

          <strong>Phone :</strong>{" "}

          {invoice.phone}

        </p>

        <p>

          <strong>Email :</strong>{" "}

          {invoice.email}

        </p>

      </div>

      <div className="section">

        <h3>Items</h3>

        <table className="invoice-table">

          <thead>

            <tr>

              <th>Product</th>
              <th>Weight</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>

            </tr>

          </thead>

          <tbody>

            {invoice.items.map(
              (
                item: any,
                index: number
              ) => (

                <tr key={index}>

                  <td>{item.name}</td>

                  <td>{item.weight}</td>

                  <td>{item.quantity}</td>

                  <td>

                    ₹

                    {Number(
                      item.price
                    ).toFixed(2)}

                  </td>

                  <td>

                    ₹

                    {Number(
                      item.subtotal
                    ).toFixed(2)}

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

      <div className="total">

        <h2>

          Grand Total :

          {" "}

          ₹

          {Number(
            invoice.total_amount
          ).toFixed(2)}

        </h2>

      </div>

      <div className="actions">

        <button
          onClick={() => window.print()}
        >
          Print Invoice
        </button>

        <button
          onClick={() =>
            generateInvoicePDF(invoice)
          }
        >
          Download PDF
        </button>

      </div>

    </div>

  );

}

export default InvoiceDetails;
