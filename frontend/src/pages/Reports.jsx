import React from 'react';
import { useAppData } from '../context/AppDataContext';

const Reports = () => {
  const { b2bInvoices, b2cReceipts, products, procurements } = useAppData();

  const totalB2b = b2bInvoices.reduce((acc, inv) => acc + inv.total, 0);
  const totalB2c = b2cReceipts.reduce((acc, rec) => acc + rec.total, 0);
  const totalPurchases = procurements.reduce((acc, proc) => acc + proc.total, 0);

  // Simplified Mock Tax Calculation
  const totalTaxCollected = b2bInvoices.reduce((acc, inv) => {
    return acc + inv.items.reduce((sum, item) => sum + (item.wholesalePrice * item.quantity * (item.gst / 100)), 0);
  }, 0);

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Ledger, Accounts & GST Compliance Reports</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Statutory Tax Reports</h3>
          
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ marginBottom: '0.5rem' }}>GSTR-1 Ready Export</h4>
            <p style={{ color: 'var(--text-light)', marginBottom: '1rem', fontSize: '0.9rem' }}>Summary of B2B outward supplies with HSN-wise tax summary.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'var(--secondary-color)', borderRadius: '8px' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-light)' }}>Total Taxable Value</span>
                <span style={{ fontWeight: 'bold' }}>₹{(totalB2b - totalTaxCollected).toFixed(2)}</span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-light)' }}>Total Tax Collected</span>
                <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>₹{totalTaxCollected.toFixed(2)}</span>
              </div>
              <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Export JSON</button>
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: '0.5rem' }}>GSTR-3B Summary</h4>
            <p style={{ color: 'var(--text-light)', marginBottom: '1rem', fontSize: '0.9rem' }}>Consolidated report of tax collected vs eligible Input Tax Credit (ITC).</p>
            <button className="btn" style={{ border: '1px solid var(--border-color)', width: '100%' }}>View 3B Dashboard</button>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--warning)' }}>Operational Dashboards</h3>
          
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ marginBottom: '0.5rem' }}>Daily Day-Book</h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1, padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                <span style={{ display: 'block', fontSize: '0.85rem', color: '#166534' }}>Retail POS Collection (B2C)</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#15803d' }}>₹{totalB2c.toFixed(2)}</span>
              </div>
              <div style={{ flex: 1, padding: '1rem', backgroundColor: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                <span style={{ display: 'block', fontSize: '0.85rem', color: '#1e40af' }}>Wholesale Collection (B2B)</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1d4ed8' }}>₹{totalB2b.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: '0.5rem' }}>Item Profitability Margin</h4>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Cost</th>
                    <th>Avg Sale Rate</th>
                    <th>Margin</th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 3).map(p => (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td>₹{p.costPrice}</td>
                      <td>₹{p.retailPrice}</td>
                      <td style={{ color: 'var(--success)', fontWeight: 'bold' }}>
                        {((p.retailPrice - p.costPrice) / p.costPrice * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
