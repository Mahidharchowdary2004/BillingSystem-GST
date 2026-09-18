import React, { useState } from 'react';
import { useAppData } from '../context/AppDataContext';

const Procurement = () => {
  const { suppliers, products, addProcurement } = useAppData();
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [items, setItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [buyingRate, setBuyingRate] = useState(0);

  const handleAddItem = () => {
    if (!selectedProduct || quantity <= 0) return;
    const prod = products.find(p => p.id === Number(selectedProduct));
    if (prod) {
      setItems([...items, { ...prod, quantity: Number(quantity), costPrice: Number(buyingRate) }]);
      setSelectedProduct('');
      setQuantity(1);
      setBuyingRate(0);
    }
  };

  const handleProductSelect = (e) => {
    const val = e.target.value;
    setSelectedProduct(val);
    const prod = products.find(p => p.id === Number(val));
    if (prod) setBuyingRate(prod.costPrice);
  };

  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + (item.costPrice * item.quantity), 0);
  };

  const handleSubmit = () => {
    if (!selectedSupplier || items.length === 0) return alert('Select supplier and add items');
    
    addProcurement({
      supplierId: selectedSupplier,
      date: new Date().toISOString(),
      items: items,
      total: calculateTotal(),
      status: 'Stock Incremented'
    });
    setItems([]);
    setSelectedSupplier('');
    alert('Purchase Inward Successful. Stock Updated!');
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Inward Procurement & Supplier Tracking</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div className="card">
          <h4 style={{ marginBottom: '1rem' }}>Purchase Order / Inward Bill</h4>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Select Supplier</label>
            <select style={{ width: '100%', padding: '0.5rem' }} value={selectedSupplier} onChange={e => setSelectedSupplier(e.target.value)}>
              <option value="">-- Select Supplier --</option>
              {suppliers.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.gstin})</option>
              ))}
            </select>
          </div>

          <div className="responsive-flex" style={{ gap: '1rem', marginBottom: '1.5rem', alignItems: 'flex-end' }}>
            <div style={{ flex: 2 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Product</label>
              <select style={{ width: '100%', padding: '0.5rem' }} value={selectedProduct} onChange={handleProductSelect}>
                <option value="">-- Add Product --</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name} (Cur. Cost: ₹{p.costPrice})</option>
                ))}
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Qty Purchased</label>
              <input type="number" min="1" style={{ width: '100%', padding: '0.5rem' }} value={quantity} onChange={e => setQuantity(e.target.value)} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Landed Rate</label>
              <input type="number" min="0" style={{ width: '100%', padding: '0.5rem' }} value={buyingRate} onChange={e => setBuyingRate(e.target.value)} />
            </div>
            <div>
              <button className="btn btn-primary" onClick={handleAddItem}>Add Line</button>
            </div>
          </div>

          {items.length > 0 && (
            <div className="table-container" style={{ marginBottom: '1.5rem' }}>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Buying Rate</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.name}</td>
                      <td>{item.quantity} {item.uom}</td>
                      <td>₹{item.costPrice}</td>
                      <td>₹{(item.costPrice * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="responsive-flex" style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
            <h3>Invoice Total: <span style={{ color: 'var(--primary-color)' }}>₹{calculateTotal().toFixed(2)}</span></h3>
            <button className="btn btn-primary" onClick={handleSubmit} style={{ padding: '0.75rem 2rem' }}>Submit & Update Stock</button>
          </div>
        </div>

        <div className="card">
          <h4 style={{ marginBottom: '1rem' }}>Supplier Ledger Summary</h4>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Supplier</th>
                  <th>Balance Due</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map(s => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td style={{ color: s.balance > 0 ? 'var(--danger)' : 'var(--success)', fontWeight: 'bold' }}>
                      ₹{Math.abs(s.balance).toLocaleString()} {s.balance > 0 ? 'Dr' : 'Cr'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Procurement;
