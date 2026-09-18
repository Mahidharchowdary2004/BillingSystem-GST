import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Package, FileText, ShoppingCart, Truck, BarChart2, Menu } from 'lucide-react';

const Layout = ({ onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="app-container">
      {/* Mobile Overlay */}
      <div 
        className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`} 
        onClick={closeMobileMenu}
      ></div>

      <aside className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <h2>BillingSystem</h2>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/" onClick={closeMobileMenu} className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} end>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>
          <NavLink to="/inventory" onClick={closeMobileMenu} className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
            <Package size={20} />
            Inventory Catalog
          </NavLink>
          <NavLink to="/b2b" onClick={closeMobileMenu} className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
            <FileText size={20} />
            B2B Wholesale
          </NavLink>
          <NavLink to="/b2c" onClick={closeMobileMenu} className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
            <ShoppingCart size={20} />
            B2C Retail POS
          </NavLink>
          <NavLink to="/procurement" onClick={closeMobileMenu} className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
            <Truck size={20} />
            Inward Procurement
          </NavLink>
          <NavLink to="/reports" onClick={closeMobileMenu} className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
            <BarChart2 size={20} />
            Ledger & Reports
          </NavLink>
        </nav>
      </aside>
      <main className="main-content">
        <header className="header">
          <div className="header-title" style={{ display: 'flex', alignItems: 'center' }}>
            <button className="header-menu-btn" onClick={toggleMobileMenu}>
              <Menu size={24} />
            </button>
            <h3>Enterprise Dual-Billing Platform</h3>
          </div>
          <div className="header-user" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className="badge badge-primary hide-on-print">Admin User</span>
            {onLogout && (
              <button onClick={onLogout} className="btn hide-on-print" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>Logout</button>
            )}
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
