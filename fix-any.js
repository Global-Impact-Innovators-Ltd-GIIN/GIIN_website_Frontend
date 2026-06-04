const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/app/**/dashboards/**/page.tsx');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Pattern 1: .map(param =>
  const pattern1 = /\.map\(\s*([a-zA-Z0-9_]+)\s*=>/g;
  if (pattern1.test(content)) {
    content = content.replace(pattern1, '.map(($1: any) =>');
    changed = true;
  }

  // Pattern 2: .map((param, i) =>
  const pattern2 = /\.map\(\s*\(\s*([a-zA-Z0-9_]+)\s*,\s*([a-zA-Z0-9_]+)\s*\)\s*=>/g;
  if (pattern2.test(content)) {
    content = content.replace(pattern2, '.map(($1: any, $2: any) =>');
    changed = true;
  }

  // Pattern 3: .map((param) =>
  const pattern3 = /\.map\(\s*\(\s*([a-zA-Z0-9_]+)\s*\)\s*=>/g;
  if (pattern3.test(content)) {
    content = content.replace(pattern3, '.map(($1: any) =>');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Fixed any types in ${file}`);
  }
});
