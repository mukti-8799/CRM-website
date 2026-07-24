const fs = require('fs');
let content = fs.readFileSync('d:/demo/client/src/pages/Home.jsx', 'utf8');

const regex = /<button className="btn-outline-glass btn-lg" onClick="showToast\('Playing interactive video demo\.\.\.'\)">[\s\S]*?<span>Cloudix<\/span>\s*<\/div>/;

const toInsert = `<button className="btn-outline-glass btn-lg" onClick="showToast('Playing interactive video demo...')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              <span>Watch Demo</span>
            </button>
          </div>

          {/*  Handwritten Paper Note Artifact  */}
          <div className="paper-note-card">
            REAL INSIGHTS. <br />REAL GROWTH. <br />REAL RESULTS.
          </div>
        </div>

        {/*  Right Hero Visual Monitor Frame  */}
        <div className="hero-visual-container reveal">
          <div className="monitor-frame">
            <div className="monitor-header">
              <div className="window-dots">
                <div className="dot dot-red"></div>
                <div className="dot dot-yellow"></div>
                <div className="dot dot-green"></div>
              </div>
              <div style={{fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600'}}>Error Infotech Dashboard</div>
              <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Sarah Chen ▾</div>
            </div>
            <div style={{padding: '0', display: 'flex', height: '460px'}}>
              <img src="/dashboard-screenshot.png" alt="Dashboard" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0 0 var(--radius-xl) var(--radius-xl)'}} />
            </div>
          </div>
        </div>

      </div>
    </div>
  </header>

  {/*  Logo Ribbon Bar Section (Light Contrast Bar)  */}
  <section className="logo-ribbon-section">
    <div className="container">
      <div className="logo-ribbon-container">
        <div className="ribbon-heading">
          TRUSTED BY TEAMS THAT GROW FAST
        </div>
        <div className="logos-wrapper">
          <div className="logo-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon></svg>
            <span>Acme Corp.</span>
          </div>
          <div className="logo-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>
            <span>Cloudix</span>
          </div>`;

content = content.replace(regex, toInsert);
fs.writeFileSync('d:/demo/client/src/pages/Home.jsx', content);
console.log("Regex Fix applied!");
