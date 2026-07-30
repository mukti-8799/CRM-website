import sys
import re

with open('d:/demo/client/src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove onClick and onMouseEnter attributes
# We can use regex to remove these specifically from accordion panels
content = re.sub(
    r'\s*onClick=\{\(e\) => \{\s*document\.querySelectorAll\(\'\.accordion-panel\'\)\.forEach\(p => p\.classList\.remove\(\'active\'\)\);\s*e\.currentTarget\.classList\.add\(\'active\'\);\s*\}\}',
    '',
    content
)

content = re.sub(
    r'\s*onMouseEnter=\{\(e\) => \{\s*document\.querySelectorAll\(\'\.accordion-panel\'\)\.forEach\(p => p\.classList\.remove\(\'active\'\)\);\s*e\.currentTarget\.classList\.add\(\'active\'\);\s*\}\}',
    '',
    content
)

# 2. Inject GSAP ScrollTrigger Logic
gsap_logic = """
  // ── GSAP ScrollTrigger for Accordion Section ──
  const accordionSection = document.querySelector('.accordion-section');
  const panels = document.querySelectorAll('.accordion-panel');
  if (accordionSection && panels.length > 0) {
    ScrollTrigger.create({
      trigger: accordionSection,
      start: 'center center',
      end: '+=2000',
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const total = panels.length;
        let activeIdx = Math.floor(progress * total);
        if (activeIdx >= total) activeIdx = total - 1;
        
        panels.forEach((p, i) => {
          if (i === activeIdx) {
            if (!p.classList.contains('active')) p.classList.add('active');
          } else {
            if (p.classList.contains('active')) p.classList.remove('active');
          }
        });
      }
    });
  }
"""

insertion_point = "  // ── Stagger reveal for feature bar items ──"
if insertion_point in content:
    content = content.replace(insertion_point, gsap_logic + "\n" + insertion_point)
else:
    print("Could not find insertion point")
    sys.exit(1)

with open('d:/demo/client/src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated Home.jsx for scroll-based accordion.")
