const fs = require('fs');
const cssPath = 'd:/demo/client/src/assets/styles/styles.css';
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Fix Navigation Links spacing
css = css.replace(
  /\.nav-links \{[\s\S]*?\}/,
  `.nav-links {
    display: flex;
    gap: 2.5rem;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }`
);

// 2. Fix Hero Title size and alignment
css = css.replace(
  /\.hero-title \{[\s\S]*?\}/,
  `.hero-title {
    font-size: clamp(3.2rem, 5vw, 4.8rem);
    font-weight: 800;
    line-height: 1.1;
    color: #0f172a;
    margin-bottom: 1.5rem;
    letter-spacing: -0.02em;
  }`
);

css = css.replace(
  /\.script-accent \{[\s\S]*?\}/,
  `.script-accent {
    font-family: 'Inter', sans-serif;
    color: #1a6b5c;
    position: relative;
    display: inline-block;
    padding-left: 0.5rem;
  }`
);

// 3. Fix Button wrapping (making it a pill shape instead of circle)
css = css.replace(
  /\.btn-lg \{[\s\S]*?\}/,
  `.btn-lg {
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
    white-space: nowrap;
    border-radius: 9999px;
  }`
);

css = css.replace(
  /\.hero-cta-group \{[\s\S]*?\}/,
  `.hero-cta-group {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    animation: fadeUp 0.8s ease 1s both;
  }`
);

// 4. Improve Hero Subtitle for premium SaaS look
css = css.replace(
  /\.hero-subtitle \{[\s\S]*?\}/,
  `.hero-subtitle {
    font-size: 1.25rem;
    line-height: 1.7;
    color: #475569;
    max-width: 500px;
    margin-bottom: 2rem;
  }`
);

// 5. Replace yellow sticky note with a sleek SaaS badge
css = css.replace(
  /\.paper-note-card \{[\s\S]*?\}/,
  `.paper-note-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 1rem 1.5rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    color: #0f172a;
    box-shadow: 0 10px 25px rgba(0,0,0,0.05);
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    animation: fadeUp 1s ease 1.2s both;
  }`
);

// 6. Fix Hero Visual container to look premium
css = css.replace(
  /\.hero-visual-container \{[\s\S]*?\}/,
  `.hero-visual-container {
    position: relative;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    filter: drop-shadow(0 25px 50px rgba(0,0,0,0.15));
    animation: monitorSlideIn 1s cubic-bezier(0.22, 1, 0.36, 1) 0.6s both;
  }`
);

fs.writeFileSync(cssPath, css);
console.log('CSS improvements applied.');

// 7. Update Home.jsx to fix the paper-note-card markup
const homePath = 'd:/demo/client/src/pages/Home.jsx';
let home = fs.readFileSync(homePath, 'utf8');

const oldNoteCard = `<div className="paper-note-card">
            REAL INSIGHTS. <br />REAL GROWTH. <br />REAL RESULTS.
          </div>`;
          
const newNoteCard = `<div className="paper-note-card">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <div>
              <span style={{display: 'block', fontWeight: '800'}}>Real Insights. Real Growth.</span>
              <span style={{color: '#64748b', fontSize: '0.8rem', fontWeight: '500'}}>Trusted by 10,000+ teams</span>
            </div>
          </div>`;

home = home.replace(oldNoteCard, newNoteCard);
fs.writeFileSync(homePath, home);
console.log('Home.jsx improvements applied.');
