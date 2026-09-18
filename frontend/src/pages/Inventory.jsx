import React, { useState } from 'react';
import { useAppData } from '../context/AppDataContext';

const Inventory = () => {
  const { products, addProduct } = useAppData();
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', hsn: '', gst: 0, uom: 'Pcs', costPrice: 0, wholesalePrice: 0, retailPrice: 0, stock: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({
      ...newProduct,
      gst: Number(newProduct.gst),
      costPrice: Number(newProduct.costPrice),
      wholesalePrice: Number(newProduct.wholesalePrice),
      retailPrice: Number(newProduct.retailPrice),
      stock: Number(newProduct.stock),
    });
    setShowModal(false);
    setNewProduct({name: '', hsn: '', gst: 0, uom: 'Pcs', costPrice: 0, wholesalePrice: 0, retailPrice: 0, stock: 0});
  };

  return (
    <div>
      <div className="responsive-flex" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
        <h2>Inventory Cataloging</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add Product</button>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>HSN Code</th>
                <th>GST %</th>
                <th>UOM</th>
                <th>Cost Price</th>
                <th>B2B Rate</th>
                <th>B2C MRP</th>
                <th>In Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.hsn}</td>
                  <td>{p.gst}%</td>
                  <td>{p.uom}</td>
                  <td>₹{p.costPrice}</td>
                  <td>₹{p.wholesalePrice}</td>
                  <td>₹{p.retailPrice}</td>
                  <td>
                    <span className={`badge ${p.stock < 20 ? 'badge-warning' : 'badge-success'}`}>
                      {p.stock} {p.uom}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={(e) => { if (e.target.className === 'modal-overlay') setShowModal(false); }}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Product</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Product Name</label>
                  <input required type="text" style={{ width: '100%' }} value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} placeholder="Enter product name" />
                </div>
                <div className="form-row">
                  <div>
                    <label>HSN Code</label>
                    <input required type="text" style={{ width: '100%' }} value={newProduct.hsn} onChange={e => setNewProduct({...newProduct, hsn: e.target.value})} placeholder="e.g. 1006" />
                  </div>
                  <div>
                    <label>GST Tax Slab (%)</label>
                    <select style={{ width: '100%' }} value={newProduct.gst} onChange={e => setNewProduct({...newProduct, gst: e.target.value})}>
                      <option value="0">0%</option>
                      <option value="5">5%</option>
                      <option value="12">12%</option>
                      <option value="18">18%</option>
                      <option value="28">28%</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div>
                    <label>UOM (Units)</label>
                    <input required type="text" style={{ width: '100%' }} placeholder="e.g. Bag, Box, Pcs" value={newProduct.uom} onChange={e => setNewProduct({...newProduct, uom: e.target.value})} />
                  </div>
                  <div>
                    <label>Initial Stock</label>
                    <input required type="number" style={{ width: '100%' }} value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} placeholder="0" />
                  </div>
                </div>
                
                <h4 style={{ margin: '1.5rem 0 1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-glass)' }}>Dual Pricing Matrix</h4>
                
                <div className="form-row" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem' }}>Cost Price</label>
                    <input required type="number" style={{ width: '100%' }} value={newProduct.costPrice} onChange={e => setNewProduct({...newProduct, costPrice: e.target.value})} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem' }}>Wholesale (B2B)</label>
                    <input required type="number" style={{ width: '100%' }} value={newProduct.wholesalePrice} onChange={e => setNewProduct({...newProduct, wholesalePrice: e.target.value})} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem' }}>Retail (B2C)</label>
                    <input required type="number" style={{ width: '100%' }} value={newProduct.retailPrice} onChange={e => setNewProduct({...newProduct, retailPrice: e.target.value})} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
