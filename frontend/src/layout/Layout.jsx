import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Package, FileText, ShoppingCart, Truck, BarChart2 } from 'lucide-react';

const Layout = () => {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>BillingSystem</h2>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} end>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>
          <NavLink to="/inventory" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
            <Package size={20} />
            Inventory Catalog
          </NavLink>
          <NavLink to="/b2b" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
            <FileText size={20} />
            B2B Wholesale
          </NavLink>
          <NavLink to="/b2c" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
            <ShoppingCart size={20} />
            B2C Retail POS
          </NavLink>
          <NavLink to="/procurement" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
            <Truck size={20} />
            Inward Procurement
          </NavLink>
          <NavLink to="/reports" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
            <BarChart2 size={20} />
            Ledger & Reports
          </NavLink>
        </nav>
      </aside>
      <main className="main-content">
        <header className="header">
          <div className="header-title">
            <h3>Enterprise Dual-Billing Platform</h3>
          </div>
          <div className="header-user">
            <span className="badge badge-primary">Admin User</span>
          </div>
        </header>
        <div className="content-area">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
