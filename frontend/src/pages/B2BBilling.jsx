import React, { useState } from 'react';
import { useAppData } from '../context/AppDataContext';

const B2BBilling = () => {
  const { products, customers, addB2bInvoice } = useAppData();
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [items, setItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showPreview, setShowPreview] = useState(false);

  const handleAddItem = () => {
    if (!selectedProduct) return;
    const prod = products.find(p => p.id === Number(selectedProduct));
    if (prod) {
      setItems([...items, { ...prod, quantity: Number(quantity) }]);
      setSelectedProduct('');
      setQuantity(1);
    }
  };

  const calculateTotal = () => {
    return items.reduce((acc, item) => {
      const lineTotal = item.wholesalePrice * item.quantity;
      const gstAmount = lineTotal * (item.gst / 100);
      return acc + lineTotal + gstAmount;
    }, 0);
  };

  const handlePreview = () => {
    if (!selectedCustomer || items.length === 0) return alert('Select customer and add items');
    setShowPreview(true);
  };

  const handlePrintAndSubmit = () => {
    window.print();
    // After printing, submit the data
    setTimeout(() => {
      addB2bInvoice({
        customerId: selectedCustomer,
        date: new Date().toISOString(),
        items: items,
        total: calculateTotal(),
        status: 'Paid'
      });
      setItems([]);
      setSelectedCustomer('');
      setShowPreview(false);
    }, 500);
  };

  const customerInfo = customers.find(c => c.id === Number(selectedCustomer));

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>B2B Wholesale Invoice Engine</h2>
      <div className="card">
        <h4 style={{ marginBottom: '1rem' }}>Standard GST Invoicing</h4>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ flex: 1 }}>
            <label>Select Buyer</label>
            <select style={{ width: '100%' }} value={selectedCustomer} onChange={e => setSelectedCustomer(e.target.value)}>
              <option value="">-- Select Customer --</option>
              {customers.filter(c => c.type === 'B2B').map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.gstin})</option>
              ))}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label>Transport Details</label>
            <input type="text" placeholder="Vehicle No. / E-Way Bill" style={{ width: '100%' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'flex-end' }}>
          <div style={{ flex: 2 }}>
            <label>Product</label>
            <select style={{ width: '100%' }} value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)}>
              <option value="">-- Add Product --</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name} - ₹{p.wholesalePrice} (Stock: {p.stock})</option>
              ))}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label>Qty</label>
            <input type="number" min="1" style={{ width: '100%' }} value={quantity} onChange={e => setQuantity(e.target.value)} />
          </div>
          <div>
            <button className="btn btn-primary" onClick={handleAddItem}>Add Line Item</button>
          </div>
        </div>

        {items.length > 0 && (
          <div className="table-container" style={{ marginBottom: '1.5rem' }}>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>HSN</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>GST %</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => {
                  const lineTotal = item.wholesalePrice * item.quantity;
                  const totalWithGst = lineTotal + (lineTotal * (item.gst / 100));
                  return (
                    <tr key={idx}>
                      <td>{item.name}</td>
                      <td>{item.hsn}</td>
                      <td>{item.quantity} {item.uom}</td>
                      <td>₹{item.wholesalePrice}</td>
                      <td>{item.gst}%</td>
                      <td>₹{totalWithGst.toFixed(2)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
          <h3>Total Invoice Value: <span style={{ color: 'var(--primary-color)' }}>₹{calculateTotal().toFixed(2)}</span></h3>
          <button className="btn btn-primary" onClick={handlePreview} style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}>Preview & Print Invoice</button>
        </div>
      </div>

      {showPreview && (
        <div className="modal-overlay hide-on-print" onClick={(e) => { if (e.target.className === 'modal-overlay hide-on-print') setShowPreview(false); }}>
          <div className="modal-content print-section" style={{ maxWidth: '800px', backgroundColor: 'white' }}>
            <div className="modal-header hide-on-print">
              <h3>Invoice Print Preview</h3>
              <button className="close-btn" onClick={() => setShowPreview(false)}>&times;</button>
            </div>
            
            <div className="modal-body" style={{ color: 'black' }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem', borderBottom: '2px solid #eee', paddingBottom: '1rem' }}>
                <h1 style={{ margin: 0, color: '#333' }}>TAX INVOICE</h1>
                <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>Dual-Billing & Inventory Systems Ltd.</p>
                <p style={{ margin: 0, color: '#666' }}>GSTIN: 27XYZABC1234F1Z5</p>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#555' }}>Billed To:</h4>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>{customerInfo?.name}</p>
                  <p style={{ margin: 0 }}>GSTIN: {customerInfo?.gstin}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0 }}><strong>Invoice No:</strong> INV-{Math.floor(Math.random() * 10000)}</p>
                  <p style={{ margin: 0 }}><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                </div>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem', border: '1px solid #ddd' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9f9f9' }}>
                    <th style={{ border: '1px solid #ddd', padding: '8px', color: 'black' }}>Sl No.</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', color: 'black' }}>Item Description</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', color: 'black' }}>HSN</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', color: 'black' }}>Qty</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', color: 'black' }}>Rate</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', color: 'black' }}>GST%</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', color: 'black' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => {
                    const lineTotal = item.wholesalePrice * item.quantity;
                    const totalWithGst = lineTotal + (lineTotal * (item.gst / 100));
                    return (
                      <tr key={idx}>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{idx + 1}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.name}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.hsn}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.quantity} {item.uom}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>₹{item.wholesalePrice}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.gst}%</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>₹{totalWithGst.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td colSpan="6" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right', fontWeight: 'bold' }}>Grand Total</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold', fontSize: '1.2rem' }}>₹{calculateTotal().toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
              <div style={{ fontSize: '0.8rem', color: '#666', textAlign: 'center', marginTop: '3rem' }}>
                <p>This is a computer generated invoice.</p>
              </div>
            </div>

            <div className="modal-footer hide-on-print">
              <button className="btn" onClick={() => setShowPreview(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handlePrintAndSubmit}>Confirm & Print</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default B2BBilling;
