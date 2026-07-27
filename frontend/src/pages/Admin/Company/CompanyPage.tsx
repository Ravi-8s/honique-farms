import { useEffect, useState } from "react";

import AdminLayout from "../../../components/AdminLayout/AdminLayout";

import "./CompanyPage.css";

function CompanyPage() {

  const [company, setCompany] = useState<any>(null);

  useEffect(() => {
    loadCompany();
  }, []);

  async function loadCompany() {

    const response = await fetch(
      "http://localhost:5000/company"
    );

    const data = await response.json();

    setCompany(data);

  }

  async function saveCompany() {

    await fetch(
      "http://localhost:5000/company",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(company),
      }
    );

    alert("Company Settings Updated");

  }

  if (!company) {

    return (

      <AdminLayout>

        <div className="company-page">

          <h2>Loading...</h2>

        </div>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      <div className="company-page">

        <h1>Company Settings</h1>

        <div className="company-form">

          <label>Company Name</label>
          <input
            value={company.company_name}
            onChange={(e) =>
              setCompany({
                ...company,
                company_name: e.target.value,
              })
            }
          />

          <label>Tagline</label>
          <input
            value={company.tagline}
            onChange={(e) =>
              setCompany({
                ...company,
                tagline: e.target.value,
              })
            }
          />

          <label>Owner Name</label>
          <input
            value={company.owner_name}
            onChange={(e) =>
              setCompany({
                ...company,
                owner_name: e.target.value,
              })
            }
          />

          <label>Phone</label>
          <input
            value={company.phone}
            onChange={(e) =>
              setCompany({
                ...company,
                phone: e.target.value,
              })
            }
          />

          <label>Email</label>
          <input
            value={company.email}
            onChange={(e) =>
              setCompany({
                ...company,
                email: e.target.value,
              })
            }
          />

          <label>Website</label>
          <input
            value={company.website}
            onChange={(e) =>
              setCompany({
                ...company,
                website: e.target.value,
              })
            }
          />

          <label>Address</label>
          <textarea
            value={company.address}
            onChange={(e) =>
              setCompany({
                ...company,
                address: e.target.value,
              })
            }
          />

          <label>City</label>
          <input
            value={company.city}
            onChange={(e) =>
              setCompany({
                ...company,
                city: e.target.value,
              })
            }
          />

          <label>State</label>
          <input
            value={company.state}
            onChange={(e) =>
              setCompany({
                ...company,
                state: e.target.value,
              })
            }
          />

          <label>Pincode</label>
          <input
            value={company.pincode}
            onChange={(e) =>
              setCompany({
                ...company,
                pincode: e.target.value,
              })
            }
          />

          <label>FSSAI Number</label>
          <input
            value={company.fssai_number}
            onChange={(e) =>
              setCompany({
                ...company,
                fssai_number: e.target.value,
              })
            }
          />

          <label>GST Number</label>
          <input
            value={company.gst_number}
            onChange={(e) =>
              setCompany({
                ...company,
                gst_number: e.target.value,
              })
            }
          />

          <label>UPI ID</label>
          <input
            value={company.upi_id}
            onChange={(e) =>
              setCompany({
                ...company,
                upi_id: e.target.value,
              })
            }
          />

          <button
            className="add-btn"
            onClick={saveCompany}
          >
            Save Settings
          </button>

        </div>

      </div>

    </AdminLayout>

  );

}

export default CompanyPage;
