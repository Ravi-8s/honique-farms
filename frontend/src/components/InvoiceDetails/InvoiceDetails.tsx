type Props = {
  invoice: any;
};

function InvoiceDetails({
  invoice,
}: Props) {

  return (

    <div className="invoice-details">

      <h1>
        {invoice.company_name}
      </h1>

      <p>
        {invoice.tagline}
      </p>

      <hr />

      <h2>
        Invoice
      </h2>

      <p>

        <strong>
          Invoice Number:
        </strong>{" "}

        {invoice.invoice_number}

      </p>

      <p>

        <strong>
          Invoice Date:
        </strong>{" "}

        {new Date(
          invoice.invoice_date
        ).toLocaleDateString("en-IN")}

      </p>

      <hr />

      <h3>
        Customer Details
      </h3>

      <p>

        <strong>Name:</strong>{" "}

        {invoice.customer_name}

      </p>

      <p>

        <strong>Phone:</strong>{" "}

        {invoice.phone}

      </p>

      <p>

        <strong>Email:</strong>{" "}

        {invoice.email}

      </p>

      <hr />

      <h3>
        Items
      </h3>

      <table>

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
            (item: any, index: number) => (

              <tr key={index}>

                <td>{item.name}</td>

                <td>{item.weight}</td>

                <td>{item.quantity}</td>

                <td>

                  ₹{Number(item.price).toFixed(2)}

                </td>

                <td>

                  ₹{Number(item.subtotal).toFixed(2)}

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

      <hr />

      <h2>

        Grand Total :

        {" "}

        ₹

        {Number(
          invoice.total_amount
        ).toFixed(2)}

      </h2>

    </div>

  );

}

export default InvoiceDetails;
