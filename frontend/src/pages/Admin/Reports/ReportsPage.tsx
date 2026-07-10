import { useEffect, useState } from "react";
import "./ReportsPage.css";

function ReportsPage() {

  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    loadSummary();
  }, []);

  async function loadSummary() {

    const response = await fetch(
      "http://localhost:5000/reports/summary"
    );

    const data = await response.json();

    setSummary(data);

  }

  if (!summary) {

    return (

      <div className="reports-page">

        <h2>Loading...</h2>

      </div>

    );

  }

  return (

    <div className="reports-page">

      <h1>Business Reports</h1>

      <div className="summary-grid">

        <div className="summary-card">

          <h3>Total Revenue</h3>

          <h2>

            ₹

            {summary.totalRevenue.toLocaleString("en-IN")}

          </h2>

        </div>

        <div className="summary-card">

          <h3>Total Expenses</h3>

          <h2>

            ₹

            {summary.totalExpenses.toLocaleString("en-IN")}

          </h2>

        </div>

        <div className="summary-card">

          <h3>Net Profit</h3>

          <h2>

            ₹

            {summary.profit.toLocaleString("en-IN")}

          </h2>

        </div>

        <div className="summary-card">

          <h3>Profit Margin</h3>

          <h2>

            {summary.profitMargin}%

          </h2>

        </div>

        <div className="summary-card">

          <h3>Total Orders</h3>

          <h2>

            {summary.totalOrders}

          </h2>

        </div>

        <div className="summary-card">

          <h3>Total Customers</h3>

          <h2>

            {summary.totalCustomers}

          </h2>

        </div>

      </div>

    </div>

  );

}

export default ReportsPage;
