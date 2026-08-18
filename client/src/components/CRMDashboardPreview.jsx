import React, { useState } from 'react';

const ERPDashboardPreview = () => {
    const [expandedMenu, setExpandedMenu] = useState('Panels');
    const [activePage, setActivePage] = useState('Dashboard');

    const modules = [
        {
            name: 'Core CRM',
            icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>,
            subItems: ['Lead Management', 'Contacts & Accounts', 'Sales Pipeline & Deals', 'Activity & Tasks', 'Marketing & Campaigns', 'Communication Hub', 'Agent', 'Support & Helpdesk', 'Employee Management', 'Automation']
        },
        {
            name: 'CA CRM',
            icon: <rect x="3" y="3" width="7" height="7"></rect>,
            subItems: ['Client Onboarding', 'Document Management', 'Task Tracking', 'Billing & Invoicing', 'Client Communication', 'Meeting Scheduling', 'Service Requests', 'Tax Reminders', 'Audit Tracking', 'Compliance Status']
        },
        {
            name: 'Core ERP',
            icon: <rect x="3" y="3" width="7" height="7"></rect>,
            subItems: ['Finance & Accounting', 'Human Resources (HRM) & Payroll', 'Purchase & Procurement', 'Vendor Management', 'Asset Management', 'Reports & Analytics', 'Billing & Payment Logic', 'Invoice Management', 'Tax Operations']
        },
        {
            name: 'CA ERP',
            icon: <rect x="3" y="3" width="7" height="7"></rect>,
            subItems: ['Practice Management', 'Financial Accounting', 'Time & Expense Tracking', 'Staff Allocation', 'Workflow Automation', 'Reporting & Analytics', 'Regulatory Updates']
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
            const funnelStages = [
                { label: 'Lead', pct: 100, count: 6, color: '#6366f1' },
                { label: 'Contacted', pct: 67, count: 4, color: '#10b981' },
                { label: 'Meeting', pct: 67, count: 4, color: '#f59e0b' },
                { label: 'Quotation', pct: 17, count: 1, color: '#ef4444' },
                { label: 'Won Deal', pct: 17, count: 1, color: '#8b5cf6' },
            ];
            const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
            const revData = [3, 3.5, 4, 4.2, 5, 5.5, 6, 6.5, 7, 7.5, 8];
            const growthData = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15];
            const chartH = 120, chartW = 400, maxVal = 20;
            const toY = v => chartH - (v / maxVal) * chartH;
            const revPoints = revData.map((v, i) => `${(i / (revData.length - 1)) * chartW},${toY(v)}`).join(' ');
            const growthPoints = growthData.map((v, i) => `${(i / (growthData.length - 1)) * chartW},${toY(v)}`).join(' ');
            const growthArea = [1.5, 1.8, 2, 2.1, 2.3, 2.5, 2.8, 3.2, 3.5, 3.8, 4, 4.5, 5];
            const areaW = 400, areaH = 140, maxA = 6;
            const toAY = v => areaH - (v / maxA) * areaH;
            const areaPoints = growthArea.map((v, i) => `${(i / (growthArea.length - 1)) * areaW},${toAY(v)}`).join(' ');
            const areaFill = `${areaPoints} ${areaW},${areaH} 0,${areaH}`;
            const donutData = [
                { label: 'Customers', count: 8, color: '#6366f1' },
                { label: 'Leads', count: 6, color: '#10b981' },
                { label: 'Deals', count: 4, color: '#f59e0b' },
                { label: 'Tasks', count: 1, color: '#06b6d4' },
            ];
            const totalDonut = donutData.reduce((a, b) => a + b.count, 0);
            let cumAngle = -Math.PI / 2;
            const donutPaths = donutData.map(d => {
                const angle = (d.count / totalDonut) * 2 * Math.PI;
                const x1 = 60 + 40 * Math.cos(cumAngle);
                const y1 = 60 + 40 * Math.sin(cumAngle);
                cumAngle += angle;
                const x2 = 60 + 40 * Math.cos(cumAngle);
                const y2 = 60 + 40 * Math.sin(cumAngle);
                const large = angle > Math.PI ? 1 : 0;
                return { ...d, path: `M 60 60 L ${x1} ${y1} A 40 40 0 ${large} 1 ${x2} ${y2} Z` };
            });
            const employees = [
                { rank: 1, name: 'Rahul Shah', tasks: 18, sales: 12, perf: 94 },
                { rank: 2, name: 'Priya Mehta', tasks: 15, sales: 10, perf: 88 },
                { rank: 3, name: 'Arjun Patel', tasks: 12, sales: 8, perf: 80 },
                { rank: 4, name: 'Sneha Joshi', tasks: 10, sales: 7, perf: 75 },
            ];
            const activities = [
                { icon: '\U0001F4DE', text: 'Called Rahul from ABC Corp', time: '2m ago', color: '#dcfce7' },
                { icon: '\U0001F4E7', text: 'Email sent to Priya Deals', time: '15m ago', color: '#dbeafe' },
                { icon: '\u2705', text: 'Task completed: Follow-up #24', time: '1h ago', color: '#f3e8ff' },
                { icon: '\U0001F4BC', text: 'Deal won: Sneha Enterprises', time: '2h ago', color: '#fef3c7' },
                { icon: '\U0001F4DD', text: 'Note added for Arjun Patel', time: '3h ago', color: '#fee2e2' },
            ];
            return (
                <>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
                        <div>
                            <div style={{ fontSize: '1.33rem', color: '#1a6b5c', fontWeight: '600', marginBottom: '0.3rem' }}>Welcome back \u270B</div>
                            <h1 style={{ fontSize: '2.81rem', fontWeight: '800', margin: 0, color: '#0f172a', letterSpacing: '-0.5px' }}>Dashboard</h1>
                        </div>
                        <div style={{ display: 'flex', gap: '0.8rem' }}>
                            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', width: '200px' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                <input type="text" placeholder="Search..." style={{ border: 'none', background: 'none', outline: 'none', fontSize: '1.33rem', width: '100%' }} />
                            </div>
                            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '1.33rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                Last 30 Days
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </div>
                        </div>
                    </div>

                    {/* Stat Cards Row */}
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                        {[
                            { title: 'TOTAL CUSTOMERS', val: '8', trend: '+12.8%', color: '#10b981', icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path> },
                            { title: 'TOTAL LEADS', val: '6', trend: '+18.2%', color: '#10b981', icon: <circle cx="12" cy="12" r="10"></circle> },
                            { title: 'ACTIVE DEALS', val: '4', trend: '+7.4%', color: '#10b981', icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline> },
                            { title: 'MONTHLY REVENUE', val: 'Rs. 2.9L', trend: '+21.6%', color: '#10b981', icon: <line x1="12" y1="1" x2="12" y2="23"></line> },
                            { title: 'PENDING PAYMENTS', val: '1', trend: '-4.1%', color: '#ef4444', icon: <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect> },
                            { title: 'TASKS TODAY', val: '1', trend: '+9.3%', color: '#10b981', icon: <polyline points="9 11 12 14 22 4"></polyline> },
                            { title: 'CUSTOMER GROWTH', val: '76 records', trend: '+5.6%', color: '#10b981', icon: <line x1="7" y1="17" x2="17" y2="7"></line> }
                        ].map((stat, idx) => (
                            <div key={idx} style={{
                                background: '#fff', borderRadius: '12px', padding: '1rem', minWidth: '150px',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.05)', flex: '1 0 auto'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                                    <div style={{ width: '28px', height: '28px', background: stat.color === '#ef4444' ? '#fee2e2' : '#dcfce7', color: stat.color === '#ef4444' ? '#ef4444' : '#10b981', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            {stat.icon}
                                            {stat.title === 'TOTAL CUSTOMERS' && <circle cx="9" cy="7" r="4"></circle>}
                                            {stat.title === 'MONTHLY REVENUE' && <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>}
                                            {stat.title === 'PENDING PAYMENTS' && <line x1="1" y1="10" x2="23" y2="10"></line>}
                                            {stat.title === 'TASKS TODAY' && <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>}
                                            {stat.title === 'CUSTOMER GROWTH' && <polyline points="7 7 17 7 17 17"></polyline>}
                                        </svg>
                                    </div>
                                    <div style={{ fontSize: '0.94rem', fontWeight: '700', color: '#94a3b8', maxWidth: '80px', lineHeight: '1.2' }}>{stat.title}</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
                                    <div style={{ fontSize: stat.val.includes('Rs') || stat.val.includes('records') ? '1.1rem' : '1.4rem', fontWeight: '800', color: '#0f172a', lineHeight: '1' }}>
                                        {stat.val.includes('records') ? <>{stat.val.split(' ')[0]} <span style={{ fontSize: '1.25rem', fontWeight: '600' }}>{stat.val.split(' ')[1]}</span></> : stat.val}
                                    </div>
                                    <div style={{ fontSize: '1.01rem', fontWeight: '700', color: stat.color, marginBottom: '0.1rem' }}>
                                        {stat.trend.startsWith('+') ? '\u2197' : '\u2198'} {stat.trend}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* HR Summary Row */}
                    <div style={{ background: '#fff', borderRadius: '12px', padding: '1.2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '1.5rem' }}>
                        <div style={{ fontSize: '0.94rem', fontWeight: '700', color: '#1a6b5c', letterSpacing: '0.5px', marginBottom: '0.2rem' }}>HR SUMMARY</div>
                        <div style={{ fontSize: '1.56rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem' }}>Employee Activity Today</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                            <div style={{ border: '1px solid #f1f5f9', borderRadius: '12px', padding: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: '#dcfce7', color: '#10b981', padding: '0.8rem', borderRadius: '12px' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
                                </div>
                                <div>
                                    <div style={{ fontSize: '1.01rem', fontWeight: '700', color: '#64748b', marginBottom: '0.2rem' }}>CHECKED IN TODAY</div>
                                    <div style={{ fontSize: '2.35rem', fontWeight: '800', color: '#0f172a' }}>0</div>
                                </div>
                            </div>
                            <div style={{ border: '1px solid #f1f5f9', borderRadius: '12px', padding: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: '#fef3c7', color: '#f59e0b', padding: '0.8rem', borderRadius: '12px' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                </div>
                                <div>
                                    <div style={{ fontSize: '1.01rem', fontWeight: '700', color: '#64748b', marginBottom: '0.2rem' }}>PENDING LEAVES</div>
                                    <div style={{ fontSize: '2.35rem', fontWeight: '800', color: '#0f172a' }}>0</div>
                                </div>
                            </div>
                            <div style={{ border: '1px solid #f1f5f9', borderRadius: '12px', padding: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: '#dbeafe', color: '#3b82f6', padding: '0.8rem', borderRadius: '12px' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                                </div>
                                <div>
                                    <div style={{ fontSize: '1.01rem', fontWeight: '700', color: '#64748b', marginBottom: '0.2rem' }}>PENDING TASKS</div>
                                    <div style={{ fontSize: '2.35rem', fontWeight: '800', color: '#0f172a' }}>1</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modules Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                        {[
                            { title: 'CORE CRM', desc: 'Leads, contacts, deals, billing, reports and automation in one command center' },
                            { title: 'BUSINESS VERTICALS', desc: 'Service, retail, manufacturing, education, health, travel and more' },
                            { title: 'INVENTORY SIGNALS', desc: 'Products, low stock, stock value and fulfillment health' }
                        ].map((mod, idx) => (
                            <div key={idx} style={{ background: '#fff', borderRadius: '12px', padding: '1rem 1.2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                <div style={{ fontSize: '1.01rem', fontWeight: '700', color: '#1a6b5c', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>{mod.title}</div>
                                <div style={{ fontSize: '1.17rem', color: '#475569', lineHeight: '1.5' }}>{mod.desc}</div>
                            </div>
                        ))}
                    </div>

                    {/* Row 1: Sales Funnel + Revenue Analytics */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '1.2rem', marginBottom: '1.2rem' }}>
                        <div style={{ background: '#fff', borderRadius: '14px', padding: '1.4rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                            <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#1a6b5c', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '0.2rem' }}>CONVERSION JOURNEY</div>
                            <div style={{ fontSize: '1.62rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem' }}>Sales Funnel</div>
                            <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1rem' }}>
                                <div style={{ flex: 1, border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.6rem 0.8rem' }}>
                                    <div style={{ fontSize: '0.81rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.2rem' }}>TOTAL FLOW</div>
                                    <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a' }}>16</div>
                                </div>
                                <div style={{ flex: 1, border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.6rem 0.8rem' }}>
                                    <div style={{ fontSize: '0.81rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.2rem' }}>TOP STAGE</div>
                                    <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a' }}>Lead</div>
                                </div>
                            </div>
                            {funnelStages.map((stage, i) => (
                                <div key={i} style={{ marginBottom: '0.55rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                                        <div>
                                            <div style={{ fontSize: '1.02rem', fontWeight: '700', color: '#0f172a' }}>{stage.label}</div>
                                            <div style={{ fontSize: '0.81rem', color: '#94a3b8' }}>{stage.pct}% conversion</div>
                                        </div>
                                        <div style={{ fontSize: '1.06rem', fontWeight: '700', color: '#64748b' }}>{stage.count}</div>
                                    </div>
                                    <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${stage.pct}%`, background: stage.color, borderRadius: '9999px' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ background: '#fff', borderRadius: '14px', padding: '1.4rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                            <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#1a6b5c', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '0.2rem' }}>MONTHLY REVENUE + GROWTH COMPARISON</div>
                            <div style={{ fontSize: '1.62rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.8rem' }}>Revenue Analytics</div>
                            <div style={{ position: 'relative', height: `${chartH + 24}px` }}>
                                <svg width="100%" height={chartH} viewBox={`0 0 ${chartW} ${chartH}`} preserveAspectRatio="none" style={{ display: 'block' }}>
                                    {[0, 0.25, 0.5, 0.75, 1].map((f, i) => (
                                        <line key={i} x1="0" y1={chartH * f} x2={chartW} y2={chartH * f} stroke="#f1f5f9" strokeWidth="1" />
                                    ))}
                                    <defs>
                                        <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <polygon points={`${revPoints} ${chartW},${chartH} 0,${chartH}`} fill="url(#revGrad)" />
                                    <polyline points={revPoints} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                                    {revData.map((v, i) => (
                                        <circle key={i} cx={(i / (revData.length - 1)) * chartW} cy={toY(v)} r="4" fill="#3b82f6" />
                                    ))}
                                    <polyline points={growthPoints} fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="7,4" strokeLinejoin="round" strokeLinecap="round" />
                                    {growthData.map((v, i) => (
                                        <circle key={i} cx={(i / (growthData.length - 1)) * chartW} cy={toY(v)} r="4" fill="#10b981" />
                                    ))}
                                </svg>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                                    {months.map((m, i) => (
                                        <span key={i} style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '600' }}>{m}</span>
                                    ))}
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1.2rem', marginTop: '0.6rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <div style={{ width: '28px', height: '3px', background: '#3b82f6', borderRadius: '2px' }} />
                                    <span style={{ fontSize: '0.88rem', fontWeight: '600', color: '#64748b' }}>Revenue</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <div style={{ width: '28px', height: '3px', background: '#10b981', borderRadius: '2px' }} />
                                    <span style={{ fontSize: '0.88rem', fontWeight: '600', color: '#64748b' }}>Growth</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Customer Growth + Customer Category Donut */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.2rem', marginBottom: '1.2rem' }}>
                        <div style={{ background: '#fff', borderRadius: '14px', padding: '1.4rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                            <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#1a6b5c', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '0.2rem' }}>AREA CHART</div>
                            <div style={{ fontSize: '1.62rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.8rem' }}>Customer Growth</div>
                            <svg width="100%" height={areaH} viewBox={`0 0 ${areaW} ${areaH}`} preserveAspectRatio="none" style={{ display: 'block' }}>
                                <defs>
                                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
                                    </linearGradient>
                                </defs>
                                {[0, 0.25, 0.5, 0.75, 1].map((f, i) => (
                                    <line key={i} x1="0" y1={areaH * f} x2={areaW} y2={areaH * f} stroke="#f1f5f9" strokeWidth="1" />
                                ))}
                                <polygon points={areaFill} fill="url(#areaGrad)" />
                                <polyline points={areaPoints} fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="6,3" strokeLinejoin="round" strokeLinecap="round" />
                                {growthArea.map((v, i) => (
                                    <circle key={i} cx={(i / (growthArea.length - 1)) * areaW} cy={toAY(v)} r="4" fill="#10b981" />
                                ))}
                            </svg>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem', marginTop: '1rem' }}>
                                {[{ label: 'NEW CUSTOMERS', val: '8' }, { label: 'REPEAT BUYERS', val: '56%' }, { label: 'CHURN RISK', val: '2' }].map((m, i) => (
                                    <div key={i} style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.5px', marginBottom: '0.2rem' }}>{m.label}</div>
                                        <div style={{ fontSize: '1.62rem', fontWeight: '800', color: '#0f172a' }}>{m.val}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ background: '#fff', borderRadius: '14px', padding: '1.4rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                            <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#1a6b5c', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '0.2rem' }}>LIVE BREAKDOWN</div>
                            <div style={{ fontSize: '1.62rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem' }}>Customer Category</div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                                    <svg width="120" height="120" viewBox="0 0 120 120">
                                        {donutPaths.map((d, i) => (
                                            <path key={i} d={d.path} fill={d.color} stroke="#fff" strokeWidth="2" />
                                        ))}
                                        <circle cx="60" cy="60" r="28" fill="#fff" />
                                        <text x="60" y="56" textAnchor="middle" style={{ fontSize: '14px', fontWeight: '800', fill: '#0f172a' }}>{totalDonut}</text>
                                        <text x="60" y="70" textAnchor="middle" style={{ fontSize: '8px', fill: '#94a3b8' }}>Customers</text>
                                    </svg>
                                </div>
                                <div style={{ width: '100%' }}>
                                    {donutData.map((d, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.25rem 0', borderBottom: i < donutData.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: d.color }} />
                                                <span style={{ fontSize: '0.98rem', color: '#475569', fontWeight: '600' }}>{d.label}</span>
                                            </div>
                                            <span style={{ fontSize: '1.02rem', fontWeight: '800', color: '#0f172a' }}>{d.count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row 3: Employee Leaderboard + Activity Timeline */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.2rem' }}>
                        <div style={{ background: '#fff', borderRadius: '14px', padding: '1.4rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                            <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#1a6b5c', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '0.2rem' }}>LEADERBOARD</div>
                            <div style={{ fontSize: '1.62rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.8rem' }}>Employee Performance</div>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1.02rem' }}>
                                <thead>
                                    <tr style={{ color: '#94a3b8', fontWeight: '700', borderBottom: '1px solid #f1f5f9' }}>
                                        <th style={{ padding: '0.4rem 0.6rem', textAlign: 'left' }}>RANK</th>
                                        <th style={{ padding: '0.4rem 0.6rem', textAlign: 'left' }}>EMPLOYEE</th>
                                        <th style={{ padding: '0.4rem 0.6rem', textAlign: 'center' }}>TASKS</th>
                                        <th style={{ padding: '0.4rem 0.6rem', textAlign: 'center' }}>SALES</th>
                                        <th style={{ padding: '0.4rem 0.6rem', textAlign: 'right' }}>PERFORMANCE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((e, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid #f8fafc' }}>
                                            <td style={{ padding: '0.6rem', color: '#1a6b5c', fontWeight: '800' }}>#{e.rank}</td>
                                            <td style={{ padding: '0.6rem', fontWeight: '700', color: '#0f172a' }}>{e.name}</td>
                                            <td style={{ padding: '0.6rem', textAlign: 'center', color: '#475569' }}>{e.tasks}</td>
                                            <td style={{ padding: '0.6rem', textAlign: 'center', color: '#475569' }}>{e.sales}</td>
                                            <td style={{ padding: '0.6rem', textAlign: 'right' }}>
                                                <span style={{ background: e.perf >= 90 ? '#dcfce7' : e.perf >= 80 ? '#fef3c7' : '#fee2e2', color: e.perf >= 90 ? '#10b981' : e.perf >= 80 ? '#d97706' : '#ef4444', padding: '0.15rem 0.5rem', borderRadius: '99px', fontSize: '0.94rem', fontWeight: '700' }}>{e.perf}%</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div style={{ background: '#fff', borderRadius: '14px', padding: '1.4rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                            <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#1a6b5c', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '0.2rem' }}>LIVE CRM FEED</div>
                            <div style={{ fontSize: '1.62rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.8rem' }}>Activity Timeline</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                                {activities.map((a, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.12rem', flexShrink: 0 }}>{a.icon}</div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontSize: '0.98rem', fontWeight: '600', color: '#0f172a', lineHeight: 1.3 }}>{a.text}</div>
                                            <div style={{ fontSize: '0.81rem', color: '#94a3b8', marginTop: '0.1rem' }}>{a.time}</div>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
                    <div>
                        <div style={{ fontSize: '1.06rem', color: '#1a6b5c', fontWeight: '600', marginBottom: '0.3rem' }}>Viewing Data For</div>
                        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', margin: 0, color: '#0f172a', letterSpacing: '-0.5px' }}>{activePage}</h1>
                    </div>
                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', width: '200px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            <input type="text" placeholder="Search..." style={{ border: 'none', background: 'none', outline: 'none', fontSize: '1.06rem', width: '100%' }} />
                        </div>
                        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '1.06rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155', whiteSpace: 'nowrap' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            Export
                        </div>
                        <div style={{ background: '#1a6b5c', border: '1px solid #1a6b5c', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '1.06rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                            + Add New
                        </div>
                    </div>
                </div>

                {/* Stat Cards */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                    <div style={{ background: '#fff', borderRadius: '12px', padding: '1rem', minWidth: '150px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', flex: '1 0 auto' }}>
                        <div style={{ fontSize: '0.81rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem' }}>TOTAL ENTRIES</div>
                        <div style={{ fontSize: '1.88rem', fontWeight: '800', color: '#0f172a' }}>{data.total.toLocaleString()}</div>
                        <div style={{ fontSize: '0.88rem', color: '#10b981', fontWeight: '600' }}>Γåù {data.growth}%</div>
                    </div>
                    <div style={{ background: '#fff', borderRadius: '12px', padding: '1rem', minWidth: '150px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', flex: '1 0 auto' }}>
                        <div style={{ fontSize: '0.81rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem' }}>ACTIVE / RESOLVED</div>
                        <div style={{ fontSize: '1.88rem', fontWeight: '800', color: '#0f172a' }}>{data.active.toLocaleString()}</div>
                        <div style={{ fontSize: '0.88rem', color: '#10b981', fontWeight: '600' }}>Steady</div>
                    </div>
                    <div style={{ background: '#fff', borderRadius: '12px', padding: '1rem', minWidth: '150px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', flex: '1 0 auto' }}>
                        <div style={{ fontSize: '0.81rem', fontWeight: '700', color: '#94a3b8', marginBottom: '0.5rem' }}>PENDING ACTION</div>
                        <div style={{ fontSize: '1.88rem', fontWeight: '800', color: '#0f172a' }}>{data.pending.toLocaleString()}</div>
                        <div style={{ fontSize: '0.88rem', color: '#ef4444', fontWeight: '600' }}>Needs Attention</div>
                    </div>
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
                                    <td style={{ padding: '0.8rem', color: '#1a6b5c', fontWeight: '600' }}>#REQ-{(data.total + i * 13) % 9999}</td>
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
            background: '#f2f5f9',
            borderRadius: '0 0 var(--radius-xl) var(--radius-xl)',
            overflow: 'hidden',
            fontFamily: '"Inter", sans-serif'
        }}>
            {/* Sidebar */}
            <div className="dashboard-scroll-area" style={{
                width: '240px',
                background: '#f8fafc',
                borderRight: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                padding: '1rem 0',
                overflowY: 'auto'
            }}>
                <div style={{ padding: '0.5rem 1.2rem', marginBottom: '1rem' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </div>

                <div style={{ padding: '0 1.2rem', fontSize: '0.81rem', fontWeight: '700', color: '#94a3b8', letterSpacing: '1px', marginBottom: '0.5rem' }}>MAIN</div>
                <div
                    onClick={() => setActivePage('Dashboard')}
                    style={{
                        margin: '0 0.8rem', padding: '0.6rem 0.8rem',
                        background: activePage === 'Dashboard' ? '#1a6b5c' : 'transparent',
                        color: activePage === 'Dashboard' ? 'white' : '#475569',
                        borderRadius: '8px', fontSize: '1.06rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                    Dashboard
                </div>

                <div style={{ padding: '0 1.2rem', fontSize: '0.81rem', fontWeight: '700', color: '#94a3b8', letterSpacing: '1px', marginTop: '1.5rem', marginBottom: '0.5rem' }}>MODULES</div>
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
                                    color: (activePage === item.name || (!hasSubItems && isActiveGroup)) ? 'white' : '#475569',
                                    background: activePage === item.name ? '#1a6b5c' : 'transparent',
                                    borderRadius: '8px',
                                    fontSize: '1.0rem', fontWeight: '700',
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        {item.icon}
                                        {item.name === 'Core CRM' && <circle cx="9" cy="7" r="4"></circle>}
                                        {(item.name.includes('CA') || item.name === 'Core ERP' || item.name === 'Panels') && <><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></>}
                                        {item.name === 'Customize your menu' && <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>}
                                    </svg>
                                    {item.name === 'CA CRM' ? 'CA CRM' : item.name === 'CA ERP' ? 'CA ERP' : item.name}
                                </div>
                                {hasSubItems && (
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s' }}>
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                )}
                            </div>

                            {isExpanded && hasSubItems && (
                                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '0.2rem', marginBottom: '0.5rem', paddingLeft: '1.2rem', position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '1.2rem', top: '0', bottom: '0', width: '1px', background: '#dcfce7' }}></div>
                                    {item.subItems.map((sub, sidx) => (
                                        <div
                                            key={sidx}
                                            onClick={() => setActivePage(sub)}
                                            style={{
                                                padding: '0.45rem 1rem', fontSize: '0.94rem', fontWeight: '600',
                                                color: activePage === sub ? '#1a6b5c' : '#64748b',
                                                background: activePage === sub ? '#f1f5f9' : 'transparent',
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
                    height: '60px', background: '#fff', borderBottom: '1px solid #e2e8f0',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem',
                    flexShrink: 0
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <div style={{ width: '32px', height: '32px', background: '#1a6b5c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.0rem' }}>ES</div>
                        <div style={{ fontWeight: '800', fontSize: '1.25rem', letterSpacing: '-0.5px' }}>ERISCALE</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                        <div style={{ border: '1px solid #e2e8f0', borderRadius: '20px', padding: '0.4rem 1rem', fontSize: '1.06rem', fontWeight: '600', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
                            Select Category
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f8fafc', padding: '0.3rem 0.8rem 0.3rem 0.3rem', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                            <div style={{ width: '28px', height: '28px', background: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.0rem' }}>A</div>
                            <span style={{ fontSize: '1.06rem', fontWeight: '700', color: '#0f172a' }}>Admin User</span>
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

export default ERPDashboardPreview;

