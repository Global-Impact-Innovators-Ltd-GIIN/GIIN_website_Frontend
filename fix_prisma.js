const fs = require('fs');
const path = require('path');

function walk(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walk(filepath, filelist);
    } else if (filepath.endsWith('.ts') || filepath.endsWith('.tsx')) {
      filelist.push(filepath);
    }
  }
  return filelist;
}

const apiDir = path.join(__dirname, 'src', 'app', 'api');
const files = walk(apiDir);

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('new PrismaClient')) {
    content = content.replace(/import\s+\{\s*PrismaClient\s*\}\s+from\s+['"]@prisma\/client['"];?/g, 'import prisma from "@/lib/prisma";');
    content = content.replace(/import\s+\{\s*PrismaPg\s*\}\s+from\s+['"]@prisma\/adapter-pg['"];?/g, '');
    content = content.replace(/import\s+\{\s*Pool\s*\}\s+from\s+['"]pg['"];?/g, '');
    content = content.replace(/const\s+pool\s*=\s*new\s+Pool\([^)]+\);?/g, '');
    content = content.replace(/const\s+adapter\s*=\s*new\s+PrismaPg\([^)]+\);?/g, '');
    content = content.replace(/const\s+prisma\s*=\s*new\s+PrismaClient\([^)]*\);?/g, '');
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
