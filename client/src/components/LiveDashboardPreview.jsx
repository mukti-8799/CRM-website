import React, { useState } from 'react';

const LiveDashboardPreview = () => {
  const [expandedMenu, setExpandedMenu] = useState('Panels');

  const modules = [
    {
      name: 'Core CRM', 
      icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>,
      subItems: ['Lead Management', 'Contacts & Accounts', 'Sales Pipeline & Deals', 'Activity & Tasks', 'Marketing & Campaigns', 'Communication Hub', 'Agent', 'Support & Helpdesk', 'Employee Management', 'Automation']
    },
    {
      name: 'Saree Shop CRM',
      icon: <rect x="3" y="3" width="7" height="7"></rect>, 
      subItems: ['Inventory Management', 'Customer Database', 'WhatsApp Integration', 'Loyalty Program', 'Buyer Preferences', 'Size Recommendation', 'Out of Stock Alert', 'Seasonal Collection', 'Supplier Database', 'Sale Tracker', 'Pricing by Size', 'Returns/Exchange', 'Feedback Collection']
    },
    {
      name: 'Core ERP', 
      icon: <rect x="3" y="3" width="7" height="7"></rect>,
      subItems: ['Finance & Accounting', 'Human Resources (HRM) & Payroll', 'Purchase & Procurement', 'Vendor Management', 'Asset Management', 'Reports & Analytics', 'Billing & Payment Logic', 'Invoice Management', 'Tax Operations']
    },
    {
      name: 'Saree Shop ERP',
      icon: <rect x="3" y="3" width="7" height="7"></rect>,
      subItems: ['Inventory & Warehouse', 'Manufacturing / Production', 'Point of Sale (POS)', 'Quality Management', 'Logistics & Supply Chain', 'E-Commerce Integration', 'Project Management']
    },
    {
      name: 'Panels', 
      icon: <rect x="3" y="3" width="7" height="7"></rect>,
      subItems: ['HR / Manager Panel', 'Sales Panel', 'Employee Panel', 'Finance & Account Panel', 'Control Panel']
    },
    {
      name: 'Mobile App', 
      icon: <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
    },
    {
      name: 'Integrations & API', 
      icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
    },
    {
      name: 'Customize your menu', 
      icon: <circle cx="12" cy="12" r="3"></circle>
    }
  ];

  return (
    <div style={{
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      background: '#f2f5f9', 
      borderRadius: '0 0 var(--radius-xl) var(--radius-xl)',
      overflow: 'hidden',
      fontFamily: '"Inter", sans-serif'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '240px', 
        background: '#f8fafc', 
        borderRight: '1px solid #e2e8f0',
        display: 'flex', 
        flexDirection: 'column', 
        padding: '1rem 0',
        overflowY: 'auto'
      }}>
        <div style={{padding: '0.5rem 1.2rem', marginBottom: '1rem'}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </div>
        
        <div style={{padding: '0 1.2rem', fontSize: '0.65rem', fontWeight: '700', color: '#94a3b8', letterSpacing: '1px', marginBottom: '0.5rem'}}>MAIN</div>
        <div style={{
          margin: '0 0.8rem', padding: '0.6rem 0.8rem', background: '#1a6b5c', color: 'white', 
          borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          Dashboard
        </div>
        
        <div style={{padding: '0 1.2rem', fontSize: '0.65rem', fontWeight: '700', color: '#94a3b8', letterSpacing: '1px', marginTop: '1.5rem', marginBottom: '0.5rem'}}>MODULES</div>
        {modules.map((item, idx) => {
          const isActive = expandedMenu === item.name;
          const hasSubItems = item.subItems && item.subItems.length > 0;
          return (
            <div key={idx} style={{display: 'flex', flexDirection: 'column'}}>
              <div 
                onClick={() => hasSubItems && setExpandedMenu(isActive ? '' : item.name)}
                style={{
                  margin: '0 0.8rem', padding: '0.6rem 0.8rem', 
                  color: isActive ? 'white' : '#475569', 
                  background: isActive ? '#1a6b5c' : 'transparent',
                  borderRadius: '8px',
                  fontSize: '0.8rem', fontWeight: '700', 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer'
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: '0.6rem'}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {item.icon}
                    {item.name === 'Core CRM' && <circle cx="9" cy="7" r="4"></circle>}
                    {(item.name.includes('Saree') || item.name === 'Core ERP' || item.name === 'Panels') && <><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></>}
                    {item.name === 'Customize your menu' && <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>}
                  </svg>
                  {item.name === 'Saree Shop CRM' ? 'SAREE SHOP CRM' : item.name === 'Saree Shop ERP' ? 'SAREE SHOP ERP' : item.name}
                </div>
                {hasSubItems && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{transform: isActive ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s'}}>
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                )}
              </div>
              
              {isActive && hasSubItems && (
                <div style={{display: 'flex', flexDirection: 'column', marginTop: '0.2rem', marginBottom: '0.5rem', paddingLeft: '1.2rem', position: 'relative'}}>
                  <div style={{position: 'absolute', left: '1.2rem', top: '0', bottom: '0', width: '1px', background: '#dcfce7'}}></div>
                  {item.subItems.map((sub, sidx) => (
                    <div key={sidx} style={{
                      padding: '0.45rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#64748b', cursor: 'pointer', zIndex: 1
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
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
        
        {/* Navbar */}
        <div style={{
          height: '60px', background: '#fff', borderBottom: '1px solid #e2e8f0', 
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem',
          flexShrink: 0
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.8rem'}}>
            <div style={{width: '32px', height: '32px', background: '#1a6b5c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.8rem'}}>ES</div>
            <div style={{fontWeight: '800', fontSize: '1rem', letterSpacing: '-0.5px'}}>ERISCALE</div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '1.2rem'}}>
            <div style={{border: '1px solid #e2e8f0', borderRadius: '20px', padding: '0.4rem 1rem', fontSize: '0.85rem', fontWeight: '600', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              Select Category
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f8fafc', padding: '0.3rem 0.8rem 0.3rem 0.3rem', borderRadius: '20px'}}>
              <div style={{width: '28px', height: '28px', background: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.8rem'}}>A</div>
              <span style={{fontSize: '0.85rem', fontWeight: '700', color: '#0f172a'}}>Admin User</span>
            </div>
          </div>
        </div>

        {/* Scrollable Dashboard Area */}
        <div style={{flex: 1, overflowY: 'auto', padding: '1.5rem 1.5rem 3rem'}}>
          
          {/* Header */}
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem'}}>
            <div>
              <div style={{fontSize: '0.85rem', color: '#1a6b5c', fontWeight: '600', marginBottom: '0.3rem'}}>Welcome back 👋</div>
              <h1 style={{fontSize: '1.8rem', fontWeight: '800', margin: 0, color: '#0f172a', letterSpacing: '-0.5px'}}>Dashboard</h1>
            </div>
            <div style={{display: 'flex', gap: '0.8rem'}}>
              <div style={{background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', width: '200px'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input type="text" placeholder="Search..." style={{border: 'none', background: 'none', outline: 'none', fontSize: '0.85rem', width: '100%'}} />
              </div>
              <div style={{background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                Last 30 Days
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
          </div>

          {/* Stat Cards Row */}
          <div style={{display: 'flex', gap: '1rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem'}}>
            {[
              {title: 'TOTAL CUSTOMERS', val: '36', trend: '+12.8%', color: '#10b981', icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>},
              {title: 'TOTAL LEADS', val: '555', trend: '+18.2%', color: '#10b981', icon: <circle cx="12" cy="12" r="10"></circle>},
              {title: 'ACTIVE DEALS', val: '7', trend: '+7.4%', color: '#10b981', icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>},
              {title: 'MONTHLY REVENUE', val: 'Rs. 11.2L', trend: '+21.6%', color: '#10b981', icon: <line x1="12" y1="1" x2="12" y2="23"></line>},
              {title: 'PENDING PAYMENTS', val: '4', trend: '-4.1%', color: '#ef4444', icon: <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>},
              {title: 'TASKS TODAY', val: '1', trend: '+9.3%', color: '#10b981', icon: <polyline points="9 11 12 14 22 4"></polyline>},
              {title: 'CUSTOMER GROWTH', val: '1594 records', trend: '+5.6%', color: '#10b981', icon: <line x1="7" y1="17" x2="17" y2="7"></line>}
            ].map((stat, idx) => (
              <div key={idx} style={{
                background: '#fff', borderRadius: '12px', padding: '1rem', minWidth: '150px', 
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)', flex: '1 0 auto'
              }}>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem'}}>
                  <div style={{width: '28px', height: '28px', background: stat.color === '#ef4444' ? '#fee2e2' : '#dcfce7', color: stat.color === '#ef4444' ? '#ef4444' : '#10b981', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      {stat.icon}
                      {stat.title === 'TOTAL CUSTOMERS' && <circle cx="9" cy="7" r="4"></circle>}
                      {stat.title === 'MONTHLY REVENUE' && <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>}
                      {stat.title === 'PENDING PAYMENTS' && <line x1="1" y1="10" x2="23" y2="10"></line>}
                      {stat.title === 'TASKS TODAY' && <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>}
                      {stat.title === 'CUSTOMER GROWTH' && <polyline points="7 7 17 7 17 17"></polyline>}
                    </svg>
                  </div>
                  <div style={{fontSize: '0.6rem', fontWeight: '700', color: '#94a3b8', maxWidth: '80px', lineHeight: '1.2'}}>{stat.title}</div>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-end', gap: '0.5rem'}}>
                  <div style={{fontSize: stat.val.includes('Rs') || stat.val.includes('records') ? '1.1rem' : '1.4rem', fontWeight: '800', color: '#0f172a', lineHeight: '1'}}>
                    {stat.val.includes('records') ? <>{stat.val.split(' ')[0]} <span style={{fontSize: '0.8rem', fontWeight: '600'}}>{stat.val.split(' ')[1]}</span></> : stat.val}
                  </div>
                  <div style={{fontSize: '0.65rem', fontWeight: '700', color: stat.color, marginBottom: '0.1rem'}}>
                    {stat.trend.startsWith('+') ? '↗' : '↘'} {stat.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modules Row */}
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem'}}>
            {[
              {title: 'CORE CRM', desc: 'Leads, contacts, deals, billing, reports and automation in one command center'},
              {title: 'BUSINESS VERTICALS', desc: 'Service, retail, manufacturing, education, health, travel and more'},
              {title: 'INVENTORY SIGNALS', desc: 'Products, low stock, stock value and fulfillment health'}
            ].map((mod, idx) => (
              <div key={idx} style={{background: '#fff', borderRadius: '12px', padding: '1rem 1.2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'}}>
                <div style={{fontSize: '0.65rem', fontWeight: '700', color: '#1a6b5c', letterSpacing: '0.5px', marginBottom: '0.5rem'}}>{mod.title}</div>
                <div style={{fontSize: '0.75rem', color: '#475569', lineHeight: '1.5'}}>{mod.desc}</div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div style={{display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem'}}>
            <div style={{background: '#fff', borderRadius: '12px', padding: '1.2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'}}>
              <div style={{fontSize: '0.6rem', fontWeight: '700', color: '#1a6b5c', letterSpacing: '0.5px', marginBottom: '0.2rem'}}>CONVERSION JOURNEY</div>
              <div style={{fontSize: '1rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem'}}>Sales Funnel</div>
              <div style={{display: 'flex', gap: '1rem', marginBottom: '1.5rem'}}>
                <div style={{flex: 1, border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.8rem'}}>
                  <div style={{fontSize: '0.6rem', fontWeight: '700', color: '#64748b', marginBottom: '0.3rem'}}>TOTAL FLOW</div>
                  <div style={{fontSize: '1.2rem', fontWeight: '800', color: '#0f172a'}}>583</div>
                </div>
                <div style={{flex: 1, border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.8rem'}}>
                  <div style={{fontSize: '0.6rem', fontWeight: '700', color: '#64748b', marginBottom: '0.3rem'}}>TOP STAGE</div>
                  <div style={{fontSize: '1.2rem', fontWeight: '800', color: '#0f172a'}}>Lead</div>
                </div>
              </div>
              {/* Funnel SVG Mockup */}
              <svg width="100%" height="80" viewBox="0 0 200 100" preserveAspectRatio="none">
                <polygon points="0,0 200,0 160,30 40,30" fill="#dcfce7" />
                <polygon points="40,35 160,35 120,65 80,65" fill="#10b981" />
                <polygon points="80,70 120,70 105,100 95,100" fill="#1a6b5c" />
              </svg>
            </div>
            
            <div style={{background: '#fff', borderRadius: '12px', padding: '1.2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'relative'}}>
              <div style={{fontSize: '0.6rem', fontWeight: '700', color: '#1a6b5c', letterSpacing: '0.5px', marginBottom: '0.2rem'}}>MONTHLY REVENUE + GROWTH COMPARISON</div>
              <div style={{fontSize: '1rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.5rem'}}>Revenue Analytics</div>
              
              <div style={{display: 'flex', height: '140px', position: 'relative'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingRight: '1rem', color: '#94a3b8', fontSize: '0.6rem', fontWeight: '600'}}>
                  <span>368</span>
                  <span>257</span>
                </div>
                <div style={{flex: 1, position: 'relative'}}>
                  <div style={{position: 'absolute', top: '0', left: '0', right: '0', borderTop: '1px solid #f1f5f9'}}></div>
                  <div style={{position: 'absolute', bottom: '0', left: '0', right: '0', borderTop: '1px solid #f1f5f9'}}></div>
                  <svg width="100%" height="100%" viewBox="0 0 400 140" preserveAspectRatio="none" style={{position: 'absolute'}}>
                    <path d="M 0 140 L 40 135 L 80 125 L 120 120 L 160 110 L 200 100 L 240 90 L 280 85 L 320 75 L 360 65 L 400 55" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="6,6" />
                    {[0,40,80,120,160,200,240,280,320,360,400].map((x, i) => (
                      <circle key={i} cx={x} cy={140 - (i * 8) - (i>1?5:0) - (i>4?5:0) - (i>7?5:0)} r="4" fill="#10b981" />
                    ))}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LiveDashboardPreview;
