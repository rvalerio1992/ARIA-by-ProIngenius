
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project root
const rootDir = path.resolve(__dirname, '..');

const srcDir = path.join(rootDir, 'server', 'api_rag', 'data');
const destDir = path.join(rootDir, 'dist', 'api_rag', 'data');

console.log(`Copying assets from ${srcDir} to ${destDir}...`);

if (!fs.existsSync(srcDir)) {
    console.error(`Source directory not found: ${srcDir}`);
    process.exit(1);
}

// Create destination directory structure
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

// Copy files
const files = fs.readdirSync(srcDir);
let count = 0;
for (const file of files) {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);

    if (fs.lstatSync(srcFile).isFile()) {
        fs.copyFileSync(srcFile, destFile);
        console.log(`Copied ${file}`);
        count++;
    }
}

console.log(`Successfully copied ${count} files.`);
