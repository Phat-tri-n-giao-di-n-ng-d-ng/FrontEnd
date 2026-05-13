const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages', 'AdminLayout');

// Target files that represent product tables with buggy image picker
const files = [
  'TabletTable.jsx',
  'Storage.jsx',
  'Ram.jsx',
  'Psus.jsx',
  'ProcessorsTable.jsx',
  'PhoneTable.jsx',
  'Pc.jsx',
  'MouseTable.jsx',
  'Mousepad.jsx',
  'MonitorsTable.jsx',
  'Mainboard.jsx',
  'LaptopTable.jsx',
  'KeyboardTable.jsx',
  'Headphone.jsx',
  'GamingGearTable.jsx',
  'Cases.jsx'
];

files.forEach(filename => {
  const filePath = path.join(dir, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Fix state update inside handleImageSelect
  content = content.replace(/\bimage: image\.url\b/g, 'imageUrl: image.url');
  
  // 2. Fix rendering references in JSX
  content = content.replace(/\bformData\.image\b/g, 'formData.imageUrl');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Successfully patched ${filename}`);
  } else {
    console.log(`ℹ️ No changes needed for ${filename}`);
  }
});
