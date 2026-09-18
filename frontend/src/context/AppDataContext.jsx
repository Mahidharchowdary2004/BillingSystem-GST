import React, { createContext, useState, useContext } from 'react';
import { 
  initialProducts, 
  initialSuppliers, 
  initialCustomers,
  initialB2bInvoices,
  initialB2cReceipts,
  initialProcurements
} from '../mockData';

const AppDataContext = createContext();

export const AppDataProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [customers, setCustomers] = useState(initialCustomers);
  const [b2bInvoices, setB2bInvoices] = useState(initialB2bInvoices);
  const [b2cReceipts, setB2cReceipts] = useState(initialB2cReceipts);
  const [procurements, setProcurements] = useState(initialProcurements);

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: products.length + 1 }]);
  };

  const updateProductStock = (id, quantity) => {
    setProducts(products.map(p => p.id === id ? { ...p, stock: p.stock + quantity } : p));
  };

  const addB2bInvoice = (invoice) => {
    setB2bInvoices([...b2bInvoices, { ...invoice, id: b2bInvoices.length + 1 }]);
    // Reduce stock
    invoice.items.forEach(item => updateProductStock(item.id, -item.quantity));
  };

  const addB2cReceipt = (receipt) => {
    setB2cReceipts([...b2cReceipts, { ...receipt, id: b2cReceipts.length + 1 }]);
    // Reduce stock
    receipt.items.forEach(item => updateProductStock(item.id, -item.quantity));
  };
  
  const addProcurement = (procurement) => {
    setProcurements([...procurements, { ...procurement, id: procurements.length + 1 }]);
    // Increase stock
    procurement.items.forEach(item => updateProductStock(item.id, item.quantity));
  };

  return (
    <AppDataContext.Provider value={{
      products, suppliers, customers, b2bInvoices, b2cReceipts, procurements,
      addProduct, updateProductStock, addB2bInvoice, addB2cReceipt, addProcurement
    }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => useContext(AppDataContext);
