const fs = require('fs');

let homeContent = fs.readFileSync('d:/demo/client/src/pages/Home.jsx', 'utf8');

// Add import if not exists
if (!homeContent.includes('import LiveDashboardPreview')) {
  homeContent = homeContent.replace(
    "import Footer from '../components/Footer';",
    "import Footer from '../components/Footer';\nimport LiveDashboardPreview from '../components/LiveDashboardPreview';"
  );
}

// Replace img tag with LiveDashboardPreview
const imgTagRegex = /<img src="\/dashboard-screenshot\.png"[^>]+>/;

if (imgTagRegex.test(homeContent)) {
  homeContent = homeContent.replace(imgTagRegex, '<LiveDashboardPreview />');
  fs.writeFileSync('d:/demo/client/src/pages/Home.jsx', homeContent);
  console.log('Successfully updated Home.jsx');
} else {
  console.log('Could not find img tag in Home.jsx');
}
