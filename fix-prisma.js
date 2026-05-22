const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/app/**/page.tsx');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('new PrismaClient()')) {
    // Remove PrismaClient import
    content = content.replace(/import \{ PrismaClient \} from "@prisma\/client";\n?/, '');
    
    // Replace new PrismaClient() with import prisma
    content = content.replace(/const prisma = new PrismaClient\(\);/, 'import prisma from "@/lib/prisma";');
    
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
