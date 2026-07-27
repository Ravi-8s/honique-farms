import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { getCustomerProfile } from "../services/CustomerAuthService";
import type { CustomerProfile } from "../services/CustomerAuthService";

interface CustomerContextType {
  customer: CustomerProfile | null;
  loading: boolean;
  refreshCustomer: () => Promise<void>;
  logout: () => void;
}

const CustomerContext =
  createContext<CustomerContextType | undefined>(
    undefined
  );

export function CustomerProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [customer, setCustomer] =
    useState<CustomerProfile | null>(null);

  const [loading, setLoading] =
    useState(true);

  const refreshCustomer = async () => {

    const profile =
      await getCustomerProfile();

    setCustomer(profile);

    setLoading(false);

  };

  useEffect(() => {

    refreshCustomer();

  }, []);

  const logout = () => {

    localStorage.removeItem("customerToken");

    setCustomer(null);

  };

  return (

    <CustomerContext.Provider
      value={{
        customer,
        loading,
        refreshCustomer,
        logout,
      }}
    >

      {children}

    </CustomerContext.Provider>

  );

}

export function useCustomer() {

  const context =
    useContext(CustomerContext);

  if (!context) {

    throw new Error(
      "useCustomer must be used inside CustomerProvider"
    );

  }

  return context;

}
