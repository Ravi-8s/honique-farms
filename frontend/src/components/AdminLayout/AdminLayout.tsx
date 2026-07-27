import "./AdminLayout.css";

import { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

type AdminLayoutProps = {
  children: ReactNode;
};

function AdminLayout({ children }: AdminLayoutProps) {

  return (

    <div className="admin-layout">

      <Sidebar />

      <div className="admin-content">

        <Topbar />

        <main className="page-content">

          {children}

        </main>

      </div>

    </div>

  );

}

export default AdminLayout;
