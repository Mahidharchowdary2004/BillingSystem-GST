import React from 'react';
import { useAppData } from '../context/AppDataContext';

const Dashboard = () => {
  const { products, b2bInvoices, b2cReceipts, procurements } = useAppData();

  const totalB2bRevenue = b2bInvoices.reduce((acc, inv) => acc + inv.total, 0);
  const totalB2cRevenue = b2cReceipts.reduce((acc, rec) => acc + rec.total, 0);
  const lowStockItems = products.filter(p => p.stock < 20);

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Business Overview Dashboard</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card">
          <h4 style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>Total B2B Revenue</h4>
          <h2>₹{totalB2bRevenue.toLocaleString()}</h2>
        </div>
        <div className="card">
          <h4 style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>Total B2C Revenue</h4>
          <h2>₹{totalB2cRevenue.toLocaleString()}</h2>
        </div>
        <div className="card">
          <h4 style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>Total Products</h4>
          <h2>{products.length}</h2>
        </div>
        <div className="card">
          <h4 style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>Total Procurements</h4>
          <h2>{procurements.length}</h2>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '1rem', color: 'var(--danger)' }}>Low Stock Alerts (Automated Reorder)</h3>
        {lowStockItems.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Current Stock</th>
                  <th>UOM</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {lowStockItems.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td style={{ color: 'var(--danger)', fontWeight: 'bold' }}>{item.stock}</td>
                    <td>{item.uom}</td>
                    <td><span className="badge badge-warning">Reorder Needed</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No low stock items currently.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
