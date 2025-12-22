"use client";
import { createContext, useContext, useState } from "react";
import SellPropertiesServices from "../Services/SellPropertiesServices";

const SellPropertiesContext = createContext();

export const SellPropertiesProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
  });
  const [error, setError] = useState(null);

  const getAllProperties = async (page = 1) => {
  setLoading(true);
  try {
    const response = await SellPropertiesServices.getAll(page);
    console.log('API Response:', response);

    let propertiesData = [];
    let paginationData = {};

    if (response && Array.isArray(response.data)) {
      propertiesData = response.data;
      paginationData = {
        current_page: page,
        last_page: 1, 
        per_page: propertiesData.length,
        total: propertiesData.length,
      };
    }

    setProperties(propertiesData);
    setPagination({
      current_page: paginationData.current_page || 1,
      last_page: paginationData.last_page || 1,
      total: paginationData.total || propertiesData.length,
      per_page: paginationData.per_page || 10,
    });

    setError(null);
  } catch (err) {
    console.error("Failed to fetch properties:", err);
    setError("Failed to load properties");
  } finally {
    setLoading(false);
  }
};
  return (
    <SellPropertiesContext.Provider
      value={{ properties, loading, pagination, error, getAllProperties }}
    >
      {children}
    </SellPropertiesContext.Provider>
  );
};

export const useSellProperties = () => useContext(SellPropertiesContext);
