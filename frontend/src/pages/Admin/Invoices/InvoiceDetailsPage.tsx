import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import InvoiceDetails from "../../../components/InvoiceDetails/InvoiceDetails";

import {
  getInvoiceById,
} from "../../../services/api";

function InvoiceDetailsPage() {

  const { id } = useParams();

  const [invoice, setInvoice] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadInvoice();

  }, []);

  async function loadInvoice() {

    try {

      const data =
        await getInvoiceById(
          Number(id)
        );

      setInvoice(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  if (loading) {

    return <h2>Loading...</h2>;

  }

  if (!invoice) {

    return <h2>Invoice not found.</h2>;

  }

  return (

    <InvoiceDetails
      invoice={invoice}
    />

  );

}

export default InvoiceDetailsPage;
