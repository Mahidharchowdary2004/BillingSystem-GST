import React, { useState } from 'react';
import { useAppData } from '../context/AppDataContext';

const B2CBilling = () => {
  const { products, addB2cReceipt } = useAppData();
  const [items, setItems] = useState([]);
  const [barcodeInput, setBarcodeInput] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleBarcodeSubmit = (e) => {
    e.preventDefault();
    if (!barcodeInput) return;
    
    // Simulate barcode mapping (id or part of name)
    const prod = products.find(p => p.id === Number(barcodeInput) || p.name.toLowerCase().includes(barcodeInput.toLowerCase()));
    
    if (prod) {
      const existing = items.find(i => i.id === prod.id);
      if (existing) {
        setItems(items.map(i => i.id === prod.id ? { ...i, quantity: i.quantity + 1 } : i));
      } else {
        setItems([...items, { ...prod, quantity: 1 }]);
      }
    } else {
      alert("Product not found");
    }
    setBarcodeInput('');
  };

  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + (item.retailPrice * item.quantity), 0);
  };

  const handlePreview = () => {
    if (items.length === 0) return;
    setShowPreview(true);
  };

  const handlePrintAndSubmit = () => {
    window.print();
    // After printing, submit the data
    setTimeout(() => {
      addB2cReceipt({
        date: new Date().toISOString(),
        items: items,
        total: calculateTotal(),
        paymentMode: 'Cash/UPI'
      });
      setItems([]);
      setShowPreview(false);
    }, 500);
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>B2C Retail POS Engine</h2>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 2 }}>
          <div className="card">
            <form onSubmit={handleBarcodeSubmit} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <input 
                autoFocus
                type="text" 
                placeholder="Scan Barcode or type Product ID (e.g. 1, 2, 3)" 
                style={{ flex: 1, padding: '1rem', fontSize: '1.2rem', borderRadius: '8px', border: '2px solid var(--primary-color)' }}
                value={barcodeInput}
                onChange={e => setBarcodeInput(e.target.value)}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0 2rem' }}>Add Item</button>
            </form>

            <div className="table-container" style={{ minHeight: '300px' }}>
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>MRP</th>
                    <th>Qty</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={idx}>
                      <td style={{ fontSize: '1.1rem', fontWeight: '500' }}>{item.name}</td>
                      <td>₹{item.retailPrice}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <button onClick={() => {
                            if(item.quantity > 1) {
                               setItems(items.map(i => i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i))
                            } else {
                               setItems(items.filter(i => i.id !== item.id))
                            }
                          }} className="btn" style={{ padding: '0.2rem 0.5rem' }}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => setItems(items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))} className="btn" style={{ padding: '0.2rem 0.5rem' }}>+</button>
                        </div>
                      </td>
                      <td style={{ fontWeight: 'bold' }}>₹{(item.retailPrice * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                        Cart is empty. Scan items to add.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div className="card" style={{ backgroundColor: 'var(--text-main)', color: 'white', position: 'sticky', top: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', color: '#94a3b8' }}>Checkout Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem' }}>
              <span>Total Items</span>
              <span>{items.reduce((acc, i) => acc + i.quantity, 0)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
              <span>Subtotal</span>
              <span>₹{calculateTotal().toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 'bold', borderTop: '1px solid #334155', paddingTop: '1rem' }}>
              <span>Net Payable</span>
              <span style={{ color: '#4ade80' }}>₹{calculateTotal().toFixed(2)}</span>
            </div>
            
            <button className="btn" onClick={handlePreview} style={{ width: '100%', padding: '1rem', fontSize: '1.2rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', marginBottom: '1rem' }}>
              Preview Thermal Receipt
            </button>
            <div style={{ textAlign: 'center', fontSize: '0.9rem', color: '#94a3b8' }}>
              Optimized for 2-inch / 3-inch Thermal Printers
            </div>
          </div>
        </div>
      </div>

      {showPreview && (
        <div className="modal-overlay hide-on-print" onClick={(e) => { if (e.target.className === 'modal-overlay hide-on-print') setShowPreview(false); }}>
          <div className="modal-content thermal-receipt print-section" style={{ maxWidth: '350px', backgroundColor: 'white' }}>
            <div className="modal-header hide-on-print">
              <h3>Receipt Preview</h3>
              <button className="close-btn" onClick={() => setShowPreview(false)}>&times;</button>
            </div>
            
            <div className="modal-body" style={{ color: 'black', fontFamily: 'monospace', padding: '1rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '1rem', borderBottom: '1px dashed #333', paddingBottom: '0.5rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>SUPERMART RETAIL</h3>
                <p style={{ margin: 0, fontSize: '0.8rem' }}>GSTIN: 27XYZABC1234F1Z5</p>
                <p style={{ margin: 0, fontSize: '0.8rem' }}>{new Date().toLocaleString()}</p>
              </div>
              
              <table style={{ width: '100%', fontSize: '0.9rem', marginBottom: '1rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px dashed #333' }}>
                    <th style={{ textAlign: 'left', padding: '4px 0', background: 'none', color: 'black', fontWeight: 'normal' }}>Item</th>
                    <th style={{ textAlign: 'right', padding: '4px 0', background: 'none', color: 'black', fontWeight: 'normal' }}>Qty</th>
                    <th style={{ textAlign: 'right', padding: '4px 0', background: 'none', color: 'black', fontWeight: 'normal' }}>Amt</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={idx}>
                      <td style={{ padding: '4px 0', border: 'none' }}>{item.name.substring(0, 15)}</td>
                      <td style={{ textAlign: 'right', padding: '4px 0', border: 'none' }}>{item.quantity}</td>
                      <td style={{ textAlign: 'right', padding: '4px 0', border: 'none' }}>{(item.retailPrice * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ borderTop: '1px dashed #333', paddingTop: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.1rem' }}>
                  <span>TOTAL:</span>
                  <span>₹{calculateTotal().toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                  <span>Items: {items.reduce((acc, i) => acc + i.quantity, 0)}</span>
                  <span>Mode: Cash/UPI</span>
                </div>
              </div>

              <div style={{ textAlign: 'center', fontSize: '0.8rem', marginTop: '2rem' }}>
                <p style={{ margin: 0 }}>Thank you for shopping!</p>
                <p style={{ margin: 0 }}>Visit Again</p>
              </div>
            </div>

            <div className="modal-footer hide-on-print">
              <button className="btn" onClick={() => setShowPreview(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handlePrintAndSubmit}>Print Receipt</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default B2CBilling;
