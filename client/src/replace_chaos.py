import sys

with open('d:/demo/client/src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

start_idx = content.find('    {/* Chaos Sticky Video Section */}')
end_idx = content.find('  </section>', start_idx) + len('  </section>')

if start_idx == -1 or end_idx == -1:
    print('Could not find section boundaries')
    sys.exit(1)

replacement = """    {/* Accordion Sticky Video Section replacing Chaos */}
  <section className="accordion-section" id="chaos">
    <div className="container accordion-container">
      <div className="accordion-heading-row">
        <h2 className="chaos-title" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)' }}>
          Everything you need to <span className="script-accent" spellCheck={false} style={{ fontSize: '1.15em' }}>scale</span>
        </h2>
        <p className="chaos-subtitle">Your team deserves better than scattered data and missed follow-ups.</p>
      </div>

      <div className="accordion-wrapper">
        {/* Panel 1 */}
        <div 
          className="accordion-panel active"
          onClick={(e) => {
            document.querySelectorAll('.accordion-panel').forEach(p => p.classList.remove('active'));
            e.currentTarget.classList.add('active');
          }}
          onMouseEnter={(e) => {
            document.querySelectorAll('.accordion-panel').forEach(p => p.classList.remove('active'));
            e.currentTarget.classList.add('active');
          }}
        >
          <div className="panel-vertical-title">AGENT DASHBOARD</div>
          <div className="panel-inner">
            <div className="panel-video-container">
              <video className="panel-video" src="/video/video1.mp4" autoPlay loop muted playsInline></video>
            </div>
            <div className="panel-content">
              <div className="panel-num">00-1</div>
              <h3 className="panel-title">AGENT DASHBOARD</h3>
              <div className="panel-desc-container">
                <div className="panel-micro">Monitor your daily activities,assigned tasks,and overall performance in one place.</div>
                <div className="panel-desc">Manage every task, conversation, and customer interaction from one intelligent workspace. Stay organized with real-time updates, priority reminders, and AI-powered recommendations that help you close more deals with confidence.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 2 */}
        <div 
          className="accordion-panel"
          onClick={(e) => {
            document.querySelectorAll('.accordion-panel').forEach(p => p.classList.remove('active'));
            e.currentTarget.classList.add('active');
          }}
          onMouseEnter={(e) => {
            document.querySelectorAll('.accordion-panel').forEach(p => p.classList.remove('active'));
            e.currentTarget.classList.add('active');
          }}
        >
          <div className="panel-vertical-title">LEAD PIPELINE</div>
          <div className="panel-inner">
            <div className="panel-video-container">
              <video className="panel-video" src="/video/video2.mp4" autoPlay loop muted playsInline></video>
            </div>
            <div className="panel-content">
              <div className="panel-num">00-2</div>
              <h3 className="panel-title">LEAD PIPELINE</h3>
              <div className="panel-desc-container">
                <div className="panel-micro">Track leads through every stage, from initial contact to successful conversion.</div>
                <div className="panel-desc">Visualize every opportunity from first contact to final conversion. Track lead progress, identify bottlenecks, automate follow-ups, and keep your sales process moving with complete transparency.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 3 */}
        <div 
          className="accordion-panel"
          onClick={(e) => {
            document.querySelectorAll('.accordion-panel').forEach(p => p.classList.remove('active'));
            e.currentTarget.classList.add('active');
          }}
          onMouseEnter={(e) => {
            document.querySelectorAll('.accordion-panel').forEach(p => p.classList.remove('active'));
            e.currentTarget.classList.add('active');
          }}
        >
          <div className="panel-vertical-title">LEAD QUEUE</div>
          <div className="panel-inner">
            <div className="panel-video-container">
              <video className="panel-video" src="/video/video3.mp4" autoPlay loop muted playsInline></video>
            </div>
            <div className="panel-content">
              <div className="panel-num">00-3</div>
              <h3 className="panel-title">LEAD QUEUE</h3>
              <div className="panel-desc-container">
                <div className="panel-micro">View and manage the latest leads generated across all connected channels.</div>
                <div className="panel-desc">Discover your newest customer opportunities in one place. Instantly review incoming leads, prioritize high-value prospects, and respond faster with intelligent lead management tools designed for growing businesses.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 4 */}
        <div 
          className="accordion-panel"
          onClick={(e) => {
            document.querySelectorAll('.accordion-panel').forEach(p => p.classList.remove('active'));
            e.currentTarget.classList.add('active');
          }}
          onMouseEnter={(e) => {
            document.querySelectorAll('.accordion-panel').forEach(p => p.classList.remove('active'));
            e.currentTarget.classList.add('active');
          }}
        >
          <div className="panel-vertical-title">LEAD ANALYTICS</div>
          <div className="panel-inner">
            <div className="panel-video-container">
              <video className="panel-video" src="/video/video4.mp4" autoPlay loop muted playsInline></video>
            </div>
            <div className="panel-content">
              <div className="panel-num">00-4</div>
              <h3 className="panel-title">LEAD ANALYTICS</h3>
              <div className="panel-desc-container">
                <div className="panel-micro">Analyze lead performance, conversion trends, and source-wise insights</div>
                <div className="panel-desc">Turn your sales data into actionable insights. Monitor lead performance, analyze conversion trends, compare acquisition channels, and make data-driven decisions that accelerate business growth.</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>"""

new_content = content[:start_idx] + replacement + content[end_idx:]

gsap_start = new_content.find('  // 13. Chaos Sticky Video — GSAP ScrollTrigger Pin')
if gsap_start != -1:
    gsap_end = new_content.find('  function createToastContainer()', gsap_start)
    if gsap_end != -1:
        new_content = new_content[:gsap_start] + new_content[gsap_end:]
    else:
        print('Could not find end of GSAP block')

gsap_start_2 = new_content.find('  // ── Parallax on chaos bg blobs ──')
if gsap_start_2 != -1:
    gsap_end_2 = new_content.find('  // ── Stagger reveal for feature bar items ──', gsap_start_2)
    if gsap_end_2 != -1:
        new_content = new_content[:gsap_start_2] + new_content[gsap_end_2:]

with open('d:/demo/client/src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(new_content)
print('Replaced section successfully')
