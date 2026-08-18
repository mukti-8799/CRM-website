import React, { useState } from 'react';

const CRMDashboardPreview = () => {
  const [expandedMenu, setExpandedMenu] = useState('Panels');
  const [activePage, setActivePage] = useState('Dashboard');

  const modules = [
    { name: 'Finance & Accounting', icon: <><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></> },
    { name: 'Tax Operations', icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></> },
    { name: 'Human Resources (HRM)', icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></> },
    { name: 'Inventory & Warehouse', icon: <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></> },
    { name: 'Sales & CRM', icon: <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></> },
    { name: 'Purchase & Procurement', icon: <><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></> },
    { name: 'Manufacturing / Production', icon: <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></> },
    { name: 'Project Management', icon: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></> },
    { name: 'Point of Sale (POS)', icon: <><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></> },
    { name: 'Asset Management', icon: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></> },
    { name: 'Quality Management', icon: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></> },
    { name: 'Logistics & Supply Chain', icon: <><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></> },
    { name: 'E-Commerce Integration', icon: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></> },
    { name: 'Reports & Analytics', icon: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></> },
    { name: 'Communication & Notifications', icon: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></> },
    { name: 'Document Management', icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></> },
    { name: 'Multi-Branch Management', icon: <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></> },
    { name: 'Admin & Security', icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></> },
    { name: 'Mobile App', icon: <><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></> },
    { name: 'Accounting Operations', icon: <><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><line x1="2" y1="10" x2="22" y2="10"/></> },
    { name: 'Billing Logic & Subscriptions', icon: <><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><line x1="2" y1="10" x2="22" y2="10"/></> },
    { name: 'Technology Stack', icon: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></> },
    { name: 'Payment Operations', icon: <><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><line x1="2" y1="10" x2="22" y2="10"/></> },
    { name: 'Company Settings & Branding', icon: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></> }
  ];

  // Helper to generate deterministic dummy data based on page name
  const getDummyData = (pageName) => {
    let hash = 0;
    for (let i = 0; i < pageName.length; i++) {
      hash = pageName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const absHash = Math.abs(hash);
    return {
      total: (absHash % 5000) + 100,
      active: (absHash % 1000) + 50,
      pending: (absHash % 100) + 5,
      growth: ((absHash % 300) / 10).toFixed(1)
    };
  };

  const renderContent = () => {
    if (activePage === 'Dashboard') {
      return (
        <>
          {/* Header */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: '800', margin: '0 0 0.2rem 0', color: '#0f172a' }}>Good Morning, John</h1>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Your latest system updates here</div>
          </div>

          {/* Quick Overview */}
          <div style={{ 
            background: 'linear-gradient(90deg, #eef2ff 0%, #f3e8ff 50%, #dcfce7 100%)', 
            borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.2rem' }}>Quick Overview</div>
            <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1.2rem' }}>Business performance summary across all modules</div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
              {[
                { title: 'Total Revenue', main: '₹59.4K', sub: '(8 Orders)' },
                { title: 'Total Orders', main: '8', sub: '(0 Pending)' },
                { title: 'Total Vendors', main: '1', sub: 'Registered Vendors' },
                { title: 'Total Employees', main: '1', sub: 'Active Team Members' },
                { title: 'Total Inventory', main: '2', sub: 'Items in Catalog' }
              ].map((stat, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: '12px', padding: '1rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem', marginBottom: '0.2rem' }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a' }}>{stat.main}</span>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{stat.sub}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#475569', fontWeight: '500' }}>{stat.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 1: Revenue by Dept + Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.5rem' }}>Revenue By Department</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                <div style={{ width: '180px', height: '180px', position: 'relative' }}>
                  <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 14.5 10" fill="none" stroke="#f59e0b" strokeWidth="4" />
                    <path d="M32.5 12.0845 a 15.9155 15.9155 0 0 1 -10 19" fill="none" stroke="#10b981" strokeWidth="4" />
                    <path d="M22.5 31.0845 a 15.9155 15.9155 0 0 1 -17 -5" fill="none" stroke="#6366f1" strokeWidth="4" />
                    <path d="M5.5 26.0845 a 15.9155 15.9155 0 0 1 2 -18" fill="none" stroke="#a855f7" strokeWidth="4" />
                    <path d="M7.5 8.0845 a 15.9155 15.9155 0 0 1 10.5 -6" fill="none" stroke="#ef4444" strokeWidth="4" />
                  </svg>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', flex: 1 }}>
                  {[
                    { label: 'Sales', color: '#3b82f6' },
                    { label: 'Operations', color: '#8b5cf6' },
                    { label: 'Finance', color: '#10b981' },
                    { label: 'Marketing', color: '#f59e0b' },
                    { label: 'HR', color: '#ec4899' },
                    { label: 'IT', color: '#eab308' }
                  ].map((l, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: l.color }}></div>
                      <span style={{ fontSize: '0.85rem', color: '#475569' }}>{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { title: 'Total Orders', val: '8', tag: '+12%', green: true },
                { title: 'Pending POs', val: '0', tag: '', green: false, desc: 'Awaiting action' },
                { title: 'Employees', val: '1', tag: '+2%', green: true },
                { title: 'Inventory Items', val: '2', tag: '', green: false, desc: 'Active SKUs' }
              ].map((c, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: '16px', padding: '1.2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a' }}>{c.val}</span>
                      {c.tag && <span style={{ background: '#dcfce7', color: '#10b981', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '700' }}>{c.tag}</span>}
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a' }}>{c.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>{c.desc || 'All time activity'}</div>
                  </div>
                  <div style={{ alignSelf: 'flex-end', width: '20px', height: '20px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginTop: '0.5rem' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Business Overview + Revenue By Category */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.5rem' }}>Business Overview</div>
              
              <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '2%', paddingBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8' }}>
                  <span>80</span><span>70</span><span>60</span><span>50</span><span>40</span><span>30</span><span>20</span><span>10</span><span>0</span>
                </div>
                <div style={{ width: '20px' }}></div>
                {['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun'].map((m, i) => {
                  const h1 = 30 + Math.sin(i)*20 + 30;
                  const h2 = 10 + Math.cos(i)*10 + 20;
                  const h3 = 20 + Math.sin(i*2)*15 + 30;
                  return (
                    <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '2px', height: '100%', position: 'relative' }}>
                      <div style={{ width: '30%', height: `${h2}%`, background: '#a855f7', borderRadius: '2px 2px 0 0' }}></div>
                      <div style={{ width: '30%', height: `${h1}%`, background: '#f97316', borderRadius: '2px 2px 0 0' }}></div>
                      <div style={{ width: '30%', height: `${h3}%`, background: '#22c55e', borderRadius: '2px 2px 0 0' }}></div>
                      <span style={{ position: 'absolute', bottom: '-1.5rem', fontSize: '0.7rem', color: '#94a3b8' }}>{m}</span>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem' }}>
                {[
                  { label: 'Total Revenue', val: '₹24.5L', color: '#22c55e', icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/> },
                  { label: 'Total Expenses', val: '₹8.2L', color: '#a855f7', icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/> },
                  { label: 'Net Profit', val: '₹16.3L', color: '#f97316', icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/> }
                ].map((l, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: l.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">{l.icon}</svg>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a' }}>{l.val}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{l.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.5rem' }}>Revenue By Category</div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ width: '160px', height: '160px', position: 'relative' }}>
                  <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 12 25" fill="none" stroke="#f97316" strokeWidth="5" />
                    <path d="M30 27.0845 a 15.9155 15.9155 0 0 1 -24 0" fill="none" stroke="#8b5cf6" strokeWidth="5" />
                    <path d="M6 27.0845 a 15.9155 15.9155 0 0 1 12 -25" fill="none" stroke="#22c55e" strokeWidth="5" />
                  </svg>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a' }}>₹24.5L</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Total Revenue</div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1.5rem' }}>
                {[
                  { label: 'Product Sales', color: '#f97316', pct: '48.6%', arrow: 'up' },
                  { label: 'Service Revenue', color: '#8b5cf6', pct: '38.4%', arrow: 'down' },
                  { label: 'Other Income', color: '#22c55e', pct: '13.0%', arrow: 'up' }
                ].map((l, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: l.color }}></div>
                      <span style={{ fontSize: '0.85rem', color: '#475569' }}>{l.label}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', color: l.arrow === 'up' ? '#10b981' : '#ef4444' }}>
                      {l.arrow === 'up' ? '^ ' : 'v '} {l.pct}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      );
    }

    const data = getDummyData(activePage);

    return (
      <>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: '800', margin: '0 0 0.2rem 0', color: '#0f172a' }}>Good Morning, John</h1>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Your latest system updates here</div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', marginRight: '1rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>BUSINESS</span>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.3rem 0.6rem', fontSize: '0.85rem', fontWeight: '600', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', minWidth: '130px', justifyContent: 'space-between', background: '#fff' }}>
                All Businesses
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>SUB BUSINESS</span>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.3rem 0.6rem', fontSize: '0.85rem', fontWeight: '600', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', minWidth: '130px', justifyContent: 'space-between', background: '#fff' }}>
                All Sub Businesses
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Table Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#64748b' }}>LAYOUT: TABLE</div>
            <div style={{ fontSize: '0.9rem', color: '#475569' }}>{activePage} directory and records.</div>
          </div>
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <div style={{ background: '#8b5cf6', border: '1px solid #8b5cf6', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '1.06rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Print Report
            </div>
            <div style={{ background: '#fff', border: '1px solid #8b5cf6', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '1.06rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#8b5cf6', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Export CSV
            </div>
            <div style={{ background: '#8b5cf6', border: '1px solid #8b5cf6', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '1.06rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              + Add New
            </div>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '1.06rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Sort by column
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '1.06rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Asc
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {[
            { title: 'Total Records', val: data.total, color: '#8b5cf6', bg: '#f3e8ff', icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></> },
            { title: 'Active', val: data.active, color: '#10b981', bg: '#dcfce7', icon: <polyline points="20 6 9 17 4 12"/> },
            { title: 'Pending', val: data.pending, color: '#ef4444', bg: '#fee2e2', icon: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></> },
            { title: 'Completed', val: Math.floor(data.total * 0.4), color: '#3b82f6', bg: '#dbeafe', icon: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></> }
          ].map((stat, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', minWidth: '200px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', flex: '1 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #e2e8f0' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: stat.bg, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', border: `2px solid ${stat.color}` }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{stat.icon}</svg>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.2rem' }}>{stat.val.toLocaleString()}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#64748b' }}>{stat.title}</div>
            </div>
          ))}
        </div>

        {/* Dummy Table */}
        <div style={{ background: '#fff', borderRadius: '12px', padding: '1.2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', flex: 1 }}>
          <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem' }}>Recent {activePage} Records</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1.06rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                <th style={{ padding: '0.8rem' }}>ID</th>
                <th style={{ padding: '0.8rem' }}>Name / Description</th>
                <th style={{ padding: '0.8rem' }}>Status</th>
                <th style={{ padding: '0.8rem' }}>Date</th>
                <th style={{ padding: '0.8rem', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.8rem', color: '#8b5cf6', fontWeight: '600' }}>#REQ-{(data.total + i * 13) % 9999}</td>
                  <td style={{ padding: '0.8rem', fontWeight: '500', color: '#0f172a' }}>Sample Entry for {activePage} {i}</td>
                  <td style={{ padding: '0.8rem' }}>
                    <span style={{
                      background: i % 3 === 0 ? '#fee2e2' : i % 2 === 0 ? '#dcfce7' : '#fef3c7',
                      color: i % 3 === 0 ? '#ef4444' : i % 2 === 0 ? '#10b981' : '#d97706',
                      padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.88rem', fontWeight: '700'
                    }}>
                      {i % 3 === 0 ? 'Failed' : i % 2 === 0 ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                  <td style={{ padding: '0.8rem', color: '#64748b' }}>2026-08-0{i}</td>
                  <td style={{ padding: '0.8rem', textAlign: 'right', color: '#3b82f6', fontWeight: '600', cursor: 'pointer' }}>View</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <div style={{
      width: '100%',
      minWidth: '950px',
      height: '100%',
      minHeight: '100%',
      display: 'flex',
      background: '#fafbfc',
      borderRadius: '0 0 var(--radius-xl) var(--radius-xl)',
      overflow: 'hidden',
      fontFamily: '"Inter", sans-serif'
    }}>
      {/* Sidebar */}
      <div className="dashboard-scroll-area" data-lenis-prevent="true" style={{
        width: '240px',
        background: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem 0',
        overflowY: 'auto'
      }}>
        <div style={{ padding: '0.5rem 1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '28px', height: '28px', background: '#fff', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: '800' }}>T2000</span>
          </div>
          <div>
            <div style={{ fontWeight: '800', fontSize: '1.1rem', letterSpacing: '-0.5px', color: '#0f172a' }}>eriscale</div>
            <div style={{ fontSize: '0.6rem', color: '#94a3b8', marginTop: '-3px' }}>studio.</div>
          </div>
        </div>

        <div style={{ padding: '0 1.2rem', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', letterSpacing: '1px', marginBottom: '0.5rem' }}>MAIN MENU</div>
        <div
          onClick={() => setActivePage('Dashboard')}
          style={{
            margin: '0 0.8rem', padding: '0.6rem 0.8rem',
            background: activePage === 'Dashboard' ? '#f3e8ff' : 'transparent',
            color: activePage === 'Dashboard' ? '#7c3aed' : '#475569',
            borderRadius: '8px', fontSize: '1.0rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          Dashboard & Analytics
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto' }}><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>

        <div style={{ padding: '0 1.2rem', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', letterSpacing: '1px', marginTop: '1.5rem', marginBottom: '0.5rem' }}>CORE MODULES</div>
        {modules.map((item, idx) => {
          const isExpanded = expandedMenu === item.name;
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isActiveGroup = activePage === item.name || (hasSubItems && item.subItems.includes(activePage));

          return (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                onClick={() => {
                  if (hasSubItems) {
                    setExpandedMenu(isExpanded ? '' : item.name);
                  }
                  setActivePage(item.name);
                }}
                style={{
                  margin: '0 0.8rem', padding: '0.6rem 0.8rem',
                  color: (activePage === item.name || (!hasSubItems && isActiveGroup)) ? '#7c3aed' : '#475569',
                  background: activePage === item.name ? '#f3e8ff' : 'transparent',
                  borderRadius: '8px',
                  fontSize: '0.9rem', fontWeight: '600',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {item.icon}
                  </svg>
                  {item.name}
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isExpanded && hasSubItems ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>

              {isExpanded && hasSubItems && (
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '0.2rem', marginBottom: '0.5rem', paddingLeft: '1.2rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '1.2rem', top: '0', bottom: '0', width: '1px', background: '#e2e8f0' }}></div>
                  {item.subItems.map((sub, sidx) => (
                    <div
                      key={sidx}
                      onClick={() => setActivePage(sub)}
                      style={{
                        padding: '0.45rem 1rem', fontSize: '0.85rem', fontWeight: '600',
                        color: activePage === sub ? '#7c3aed' : '#64748b',
                        background: activePage === sub ? '#f8fafc' : 'transparent',
                        borderRadius: '0 8px 8px 0',
                        cursor: 'pointer', zIndex: 1
                      }}>
                      {sub}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Navbar */}
        <div style={{
          height: '70px', background: '#fff', borderBottom: '1px solid #e2e8f0',
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 1.5rem',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {[
                <><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></>,
                <><polyline points="20 6 9 17 4 12"/></>,
                <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"/></>,
                <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/><circle cx="18" cy="6" r="3" fill="#ef4444" stroke="#fff"/></>,
                <><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></>
              ].map((icon, i) => (
                <div key={i} style={{ width: '36px', height: '36px', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', cursor: 'pointer', position: 'relative' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {icon}
                  </svg>
                </div>
              ))}
            </div>

            <div style={{ width: '1px', height: '30px', background: '#e2e8f0', margin: '0 0.5rem' }}></div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
              <div style={{ width: '36px', height: '36px', background: '#8b5cf6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '800', fontSize: '0.9rem' }}>JS</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#0f172a', lineHeight: '1.2' }}>John Smith</span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>@admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Dashboard Area */}
        <style>{`
          .dashboard-scroll-area::-webkit-scrollbar { display: none; }
          .dashboard-scroll-area { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        <div className="dashboard-scroll-area" data-lenis-prevent="true" style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1.5rem 3rem' }}>
          {renderContent()}
        </div>

      </div>
    </div>
  );
};

export default CRMDashboardPreview;
