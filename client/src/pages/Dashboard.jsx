import React, { useEffect } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  useEffect(() => {
      // Injected from d:/demo/dashboard.js
      setTimeout(() => {

  // Dashboard Data Structure
  const menuData = [
    {
      id: 'core-crm',
      title: 'Core CRM',
      items: [
        'Lead Management',
        'Contacts & Accounts',
        'Sales Pipeline & Deals',
        'Activity & Tasks',
        'Marketing & Campaigns',
        'Communication Hub',
        'Agent',
        'Support & Helpdesk',
        'Employee Management',
        'Automation'
      ]
    },
    {
      id: 'saree-crm',
      title: 'Saree Shop CRM',
      items: [
        'Inventory Management',
        'Customer Database',
        'WhatsApp Integration',
        'Loyalty Program',
        'Buyer Preferences',
        'Size Recommendation',
        'Out Of Stock Alert',
        'Seasonal Collection',
        'Supplier Database',
        'Sale Tracker',
        'Pricing by Size',
        'Returns / Exchange',
        'Feedback Collection'
      ]
    },
    {
      id: 'core-erp',
      title: 'Core ERP',
      items: [
        'Finance & Accounting',
        'Human Resources & Payroll',
        'Purchase & Procurement',
        'Vendor Management',
        'Asset Management',
        'Reports & Analytics',
        'Billing & Payment',
        'Invoice Management',
        'Tax Operations'
      ]
    },
    {
      id: 'saree-erp',
      title: 'Saree Shop ERP',
      items: [
        'Inventory & Warehouse',
        'Manufacturing / Production',
        'Point Of Sale (POS)',
        'Quality Management',
        'Logistics & Supply Chain',
        'E-Commerce Integration',
        'Project Management'
      ]
    },
    {
      id: 'panels',
      title: 'Panels',
      items: [
        'HR Panel',
        'Sales Panel',
        'Employee Panel',
        'Finance Panel',
        'Control Panel'
      ]
    }
  ];

  // Dummy Dashboard Content Generators per Module
  const contentGenerators = {
    'core-crm': {
      title: 'Core CRM Dashboard',
      stats: [
        { label: 'Total Leads', val: '1,248', change: '+12%', isPositive: true },
        { label: 'Deals Closed', val: '142', change: '+8%', isPositive: true },
        { label: 'Sales Pipeline', val: '$2.4M', change: '+15%', isPositive: true },
        { label: 'Lead Conversion', val: '18%', change: '-2%', isPositive: false }
      ],
      chartLine1: 'M 0 100 Q 50 60 100 80 T 200 40 T 300 50 T 400 10',
      activities: [
        { icon: '📞', title: 'Call with Acme Corp', desc: 'Discussed Q3 enterprise plan', time: '10 min ago' },
        { icon: '📧', title: 'Email Sent to Cloudix', desc: 'Sent proposal PDF', time: '1 hour ago' },
        { icon: '🎉', title: 'Deal Won', desc: 'Penta Labs signed the contract', time: '3 hours ago' }
      ]
    },
    'saree-crm': {
      title: 'Saree Shop CRM',
      stats: [
        { label: 'Inventory Status', val: '84%', change: '-4%', isPositive: false },
        { label: 'Loyalty Members', val: '3,102', change: '+22%', isPositive: true },
        { label: 'WhatsApp Orders', val: '418', change: '+45%', isPositive: true },
        { label: 'Daily Sales', val: '$14k', change: '+10%', isPositive: true }
      ],
      chartLine1: 'M 0 90 Q 40 40 100 60 T 250 20 T 350 40 T 400 30',
      activities: [
        { icon: '👗', title: 'New Collection Added', desc: 'Silk Sarees Summer 2026', time: 'Just now' },
        { icon: '💬', title: 'WhatsApp Inquiry', desc: 'Customer asking for custom size', time: '5 min ago' },
        { icon: '🚨', title: 'Out of Stock Alert', desc: 'Red Kanjeevaram running low', time: '2 hours ago' }
      ]
    },
    'core-erp': {
      title: 'Core ERP Dashboard',
      stats: [
        { label: 'Finance Overview', val: '$1.8M', change: '+5%', isPositive: true },
        { label: 'Purchase Orders', val: '64', change: '-2%', isPositive: false },
        { label: 'Invoice Status', val: '92%', change: '+1%', isPositive: true },
        { label: 'Profit Analytics', val: '24%', change: '+3%', isPositive: true }
      ],
      chartLine1: 'M 0 80 Q 80 80 150 40 T 300 60 T 400 20',
      activities: [
        { icon: '💰', title: 'Invoice Paid', desc: 'INV-2026-042 settled by Client', time: '15 min ago' },
        { icon: '📝', title: 'Payroll Processed', desc: 'July 2026 salaries dispatched', time: '4 hours ago' },
        { icon: '🤝', title: 'Vendor Onboarded', desc: 'TechSupply Inc registered', time: '1 day ago' }
      ]
    },
    'saree-erp': {
      title: 'Saree Shop ERP',
      stats: [
        { label: 'Warehouse Stock', val: '12,450', change: '+2%', isPositive: true },
        { label: 'POS Sales', val: '$42k', change: '+18%', isPositive: true },
        { label: 'E-Commerce Orders', val: '842', change: '+34%', isPositive: true },
        { label: 'Quality Issues', val: '12', change: '-50%', isPositive: true }
      ],
      chartLine1: 'M 0 120 Q 50 20 150 40 T 250 80 T 400 10',
      activities: [
        { icon: '📦', title: 'Stock Delivered', desc: 'Batch 44A received at Warehouse', time: '30 min ago' },
        { icon: '🛒', title: 'E-Com Sync', desc: 'Inventory synced with Shopify', time: '1 hour ago' },
        { icon: '🚚', title: 'Logistics Update', desc: '14 shipments delivered', time: '5 hours ago' }
      ]
    },
    'panels': {
      title: 'Control Panels',
      stats: [
        { label: 'Active Employees', val: '184', change: '+2', isPositive: true },
        { label: 'System Health', val: '99.9%', change: '0%', isPositive: true },
        { label: 'Active Sessions', val: '42', change: '-5', isPositive: false },
        { label: 'Data Synced', val: '14 GB', change: '+1 GB', isPositive: true }
      ],
      chartLine1: 'M 0 50 L 100 60 L 200 40 L 300 50 L 400 30',
      activities: [
        { icon: '👤', title: 'New Employee', desc: 'John Doe onboarded', time: '2 hours ago' },
        { icon: '⚙️', title: 'System Backup', desc: 'Automated backup completed', time: '12 hours ago' },
        { icon: '🔒', title: 'Access Granted', desc: 'Admin rights given to Finance Team', time: '1 day ago' }
      ]
    },
    'default': {
      title: 'Module Overview',
      stats: [
        { label: 'Active Metric', val: '1,000', change: '+10%', isPositive: true },
        { label: 'Secondary Metric', val: '500', change: '+5%', isPositive: true },
        { label: 'Tertiary Metric', val: '250', change: '-2%', isPositive: false },
        { label: 'Quaternary Metric', val: '125', change: '+1%', isPositive: true }
      ],
      chartLine1: 'M 0 70 Q 100 20 200 60 T 400 40',
      activities: [
        { icon: '📌', title: 'General Activity', desc: 'System log event', time: 'Just now' }
      ]
    }
  };

  const sidebarNav = document.getElementById('sidebar-nav');
  const pageTitle = document.getElementById('page-title');
  const dashboardContent = document.getElementById('dashboard-content');

  // Render Sidebar
  function renderSidebar() {
    sidebarNav.innerHTML = '';
    
    menuData.forEach((menu, index) => {
      const group = document.createElement('div');
      group.className = 'nav-group';
      // Expand first group by default
      if (index === 0) group.classList.add('active');

      const header = document.createElement('div');
      header.className = 'nav-group-header';
      header.innerHTML = `
        <span>${menu.title}</span>
        <svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      `;

      header.addEventListener('click', () => {
        // Close others
        document.querySelectorAll('.nav-group').forEach(g => {
          if (g !== group) g.classList.remove('active');
        });
        // Toggle current
        group.classList.toggle('active');
      });

      const submenu = document.createElement('div');
      submenu.className = 'nav-submenu';
      
      const ul = document.createElement('ul');
      ul.className = 'nav-submenu-list';

      menu.items.forEach((item, itemIndex) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.className = 'nav-item';
        a.href = '#';
        a.textContent = item;
        
        // Make first item of first group active by default
        if (index === 0 && itemIndex === 0) a.classList.add('active');

        a.addEventListener('click', (e) => {
          e.preventDefault();
          document.querySelectorAll('.nav-item').forEach(link => link.classList.remove('active'));
          a.classList.add('active');
          loadDashboard(menu.id, item);
        });

        li.appendChild(a);
        ul.appendChild(li);
      });

      submenu.appendChild(ul);
      group.appendChild(header);
      group.appendChild(submenu);
      sidebarNav.appendChild(group);
    });
  }

  // Generate Dashboard HTML
  function getDashboardHTML(data, subtitle) {
    const statsHTML = data.stats.map(stat => `
      <div class="stat-box">
        <div class="stat-label">${stat.label}</div>
        <div class="stat-val">
          <span class="counter" data-target="${stat.val.replace(/[^0-9.]/g, '')}">${stat.val}</span>
          <span class="stat-change ${stat.isPositive ? '' : 'negative'}">${stat.change}</span>
        </div>
      </div>
    `).join('');

    const activitiesHTML = data.activities.map(act => `
      <div class="activity-item">
        <div class="activity-icon">${act.icon}</div>
        <div class="activity-content">
          <div class="activity-title">${act.title}</div>
          <div class="activity-desc">${act.desc}</div>
        </div>
        <div class="activity-time">${act.time}</div>
      </div>
    `).join('');

    return `
      <div class="dashboard-stats-row">
        ${statsHTML}
      </div>

      <div class="dashboard-panels">
        <!-- Main Chart Panel -->
        <div class="panel">
          <div class="panel-title">Analytics - ${subtitle}</div>
          <div class="chart-container">
            <svg class="chart-svg" viewBox="0 0 400 150" preserveAspectRatio="none">
              <!-- Grid Lines -->
              <line x1="0" y1="30" x2="400" y2="30" stroke="rgba(26,107,92,0.05)" />
              <line x1="0" y1="75" x2="400" y2="75" stroke="rgba(26,107,92,0.05)" />
              <line x1="0" y1="120" x2="400" y2="120" stroke="rgba(26,107,92,0.05)" />
              
              <!-- Gradient -->
              <defs>
                <linearGradient id="chartGradArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="var(--primary)" stop-opacity="0.2"/>
                  <stop offset="100%" stop-color="var(--primary)" stop-opacity="0"/>
                </linearGradient>
              </defs>
              
              <!-- Area -->
              <path class="chart-path-fill" d="${data.chartLine1} L 400 150 L 0 150 Z" fill="url(#chartGradArea)" opacity="0" style="animation: fadeIn 1s forwards 0.5s;"/>
              
              <!-- Line -->
              <path class="chart-path" d="${data.chartLine1}" fill="none" stroke="var(--primary)" stroke-width="3" stroke-linecap="round"/>
            </svg>
          </div>
        </div>

        <!-- Recent Activities Panel -->
        <div class="panel">
          <div class="panel-title">Recent Activities</div>
          <div class="activity-list">
            ${activitiesHTML}
          </div>
        </div>
      </div>
    `;
  }

  // Number Counter Animation
  function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const targetStr = counter.getAttribute('data-target');
      const target = parseFloat(targetStr);
      if (isNaN(target)) return;

      const duration = 1000;
      const stepTime = Math.abs(Math.floor(duration / 30));
      let current = 0;
      const increment = target / (duration / stepTime);
      
      // Save original text format (e.g. $1.2M -> we need to keep $ and M)
      const originalText = counter.innerText;
      const prefix = originalText.replace(/[0-9.,]/g, '').split('')[0] || '';
      const suffix = originalText.replace(/[0-9.,]/g, '').split('')[1] || originalText.replace(/[0-9.,]/g, '') || '';

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.innerText = originalText;
          clearInterval(timer);
        } else {
          // format with commas if large, or decimals
          let displayNum = current;
          if (target > 100 && target % 1 === 0) {
            displayNum = Math.floor(current).toLocaleString();
          } else {
            displayNum = current.toFixed(1);
          }
          counter.innerText = prefix + displayNum + (suffix === prefix ? '' : suffix);
        }
      }, stepTime);
    });
  }

  // Load Dashboard Content
  function loadDashboard(moduleId, itemTitle) {
    // 1. Update Title
    pageTitle.style.opacity = '0';
    pageTitle.style.transform = 'translateY(-10px)';
    
    // 2. Fade out content
    dashboardContent.style.animation = 'none';
    dashboardContent.style.opacity = '0';

    setTimeout(() => {
      const data = contentGenerators[moduleId] || contentGenerators['default'];
      pageTitle.textContent = `${data.title} - ${itemTitle}`;
      
      // Update Title animation
      pageTitle.style.opacity = '1';
      pageTitle.style.transform = 'translateY(0)';

      // 3. Inject new HTML
      dashboardContent.innerHTML = getDashboardHTML(data, itemTitle);
      
      // 4. Fade in content
      dashboardContent.style.animation = 'contentFade 0.4s ease forwards';
      
      // 5. Run number animations
      animateCounters();

    }, 300);
  }

  // Initialize
  renderSidebar();
  loadDashboard('core-crm', 'Lead Management');

});

    }, []);

  return (
    <>
      
  {/*  Particle Network Background Canvas  */}
  <ParticleBackground />

  {/*  Sticky Glassmorphism Header Navbar  */}
  <div className="navbar-wrapper">
    <div className="container-fluid">
      <nav className="navbar">
        <a href="index.html" className="navbar-brand">
          <img src="logo.png" alt="ERROR Infotech Pvt Ltd" className="brand-logo brand-logo--nav" />
        </a>

        <ul className="nav-links" id="navLinks">
          <li><a href="#" className="nav-link">Dashboard</a></li>
          <li><a href="#" className="nav-link">Settings</a></li>
          <li><a href="#" className="nav-link">Support</a></li>
        </ul>

        <div className="nav-actions">
          <div className="user-profile">
            <span className="user-name">Sarah Chen</span>
            <div className="user-avatar">SC</div>
          </div>
        </div>
      </nav>
    </div>
  </div>

  <div className="dashboard-layout">
    {/*  Sidebar  */}
    <aside className="dashboard-sidebar">
      <nav className="sidebar-nav" id="sidebar-nav">
        {/*  Sidebar items injected by JS  */}
      </nav>
    </aside>

    {/*  Main Content  */}
    <main className="dashboard-main">
      <header className="main-header">
        <h1 id="page-title">Dashboard Overview</h1>
        <div className="header-actions">
          <button className="btn-outline-glass btn-sm" id="export-btn">Export Report</button>
          <button className="btn-primary btn-sm" id="new-action-btn">+ New Action</button>
        </div>
      </header>

      <div className="dashboard-content" id="dashboard-content">
        {/*  Dashboard Widgets injected by JS  */}
      </div>
    </main>
  </div>

  
  
  

    </>
  );
};

export default Dashboard;
