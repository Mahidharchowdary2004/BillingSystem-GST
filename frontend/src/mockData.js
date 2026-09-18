export const initialProducts = [
  { id: 1, name: "Premium Rice 5kg", hsn: "1006", gst: 5, uom: "Bag", costPrice: 200, wholesalePrice: 220, retailPrice: 250, stock: 150 },
  { id: 2, name: "Refined Oil 1L", hsn: "1507", gst: 5, uom: "Pcs", costPrice: 90, wholesalePrice: 95, retailPrice: 110, stock: 300 },
  { id: 3, name: "Washing Powder 1kg", hsn: "3402", gst: 18, uom: "Pcs", costPrice: 120, wholesalePrice: 135, retailPrice: 150, stock: 100 },
  { id: 4, name: "Chocolate Bar", hsn: "1806", gst: 18, uom: "Pcs", costPrice: 40, wholesalePrice: 45, retailPrice: 55, stock: 500 },
  { id: 5, name: "Toor Dal 1kg", hsn: "0713", gst: 0, uom: "Bag", costPrice: 110, wholesalePrice: 120, retailPrice: 140, stock: 200 },
];

export const initialSuppliers = [
  { id: 1, name: "Agro Foods Ltd", gstin: "27AADCA2230M1Z8", balance: 15000, status: "Active" },
  { id: 2, name: "FMCG Distributors", gstin: "27BBDCA2230M1Z9", balance: -5000, status: "Active" },
];

export const initialCustomers = [
  { id: 1, name: "SuperMart Retailers", gstin: "27CCADC1234M1Z1", phone: "9876543210", type: "B2B" },
  { id: 2, name: "John Doe", gstin: "", phone: "9988776655", type: "B2C" },
];

export const initialB2bInvoices = [
  { id: 1, customerId: "1", date: new Date(Date.now() - 86400000).toISOString(), items: [{ id: 1, name: "Premium Rice 5kg", wholesalePrice: 220, quantity: 10, gst: 5, uom: "Bag", hsn: "1006" }], total: 2310, status: 'Paid' },
  { id: 2, customerId: "1", date: new Date(Date.now() - 172800000).toISOString(), items: [{ id: 2, name: "Refined Oil 1L", wholesalePrice: 95, quantity: 50, gst: 5, uom: "Pcs", hsn: "1507" }], total: 4987.5, status: 'Paid' }
];

export const initialB2cReceipts = [
  { id: 1, date: new Date(Date.now() - 3600000).toISOString(), items: [{ id: 3, name: "Washing Powder 1kg", retailPrice: 150, quantity: 2 }, { id: 4, name: "Chocolate Bar", retailPrice: 55, quantity: 4 }], total: 520, paymentMode: 'Cash/UPI' },
  { id: 2, date: new Date(Date.now() - 7200000).toISOString(), items: [{ id: 1, name: "Premium Rice 5kg", retailPrice: 250, quantity: 1 }], total: 250, paymentMode: 'Cash/UPI' }
];

export const initialProcurements = [
  { id: 1, supplierId: "1", date: new Date(Date.now() - 259200000).toISOString(), items: [{ id: 5, name: "Toor Dal 1kg", costPrice: 110, quantity: 100 }], total: 11000, billNo: "SUP-101" }
];

