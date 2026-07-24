const fs = require('fs');
let content = fs.readFileSync('d:/demo/client/src/components/LiveDashboardPreview.jsx', 'utf8');

// The new sidebar implementation with state and submenus
const newSidebarAndImports = `import React, { useState } from 'react';

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
      </div>`;

// We will replace the entire sidebar logic up to the main content area
const mainContentMarker = "{/* Main Content Area */}";
const splitContent = content.split(mainContentMarker);

if (splitContent.length > 1) {
  // Use regex to remove everything from import React to the sidebar end
  const regex = /import React(?:, \{\s*useState\s*\})? from 'react';[\s\S]*?\{\/\* Main Content Area \*\/\}/;
  const newFullContent = content.replace(regex, newSidebarAndImports + '\n\n      ' + mainContentMarker);
  
  fs.writeFileSync('d:/demo/client/src/components/LiveDashboardPreview.jsx', newFullContent);
  console.log("Sidebar successfully updated!");
} else {
  console.log("Could not find Main Content Area marker");
}
