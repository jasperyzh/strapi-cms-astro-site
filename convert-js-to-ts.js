/**
 * Script to convert JavaScript files to TypeScript in Strapi API
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiDir = path.join(__dirname, 'strapi-cms', 'src', 'api');

// Function to convert a JS file to TS
function convertJsToTs(filePath) {
  console.log(`Converting ${filePath} to TypeScript...`);
  
  // Read the JS file content
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Convert CommonJS to ES Module syntax
  let tsContent = content;
  
  // Remove 'use strict'
  tsContent = tsContent.replace(/'use strict';(\r\n|\n|\r)/g, '');
  
  // Replace require with import
  tsContent = tsContent.replace(
    /const { (.*) } = require\(['"]@strapi\/strapi['"]\)\.factories;/g, 
    "import { factories } from '@strapi/strapi'"
  );
  
  // Replace module.exports with export default
  tsContent = tsContent.replace(
    /module\.exports = (.*)\('(.*)'\);/g, 
    "export default factories.$1('$2');"
  );
  
  // Create the TS file path
  const tsFilePath = filePath.replace('.js', '.ts');
  
  // Write the TS file
  fs.writeFileSync(tsFilePath, tsContent);
  
  // Delete the JS file
  fs.unlinkSync(filePath);
  
  console.log(`✅ Converted ${filePath} to ${tsFilePath}`);
}

// Function to recursively find and convert JS files
function findAndConvertJsFiles(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findAndConvertJsFiles(filePath);
    } else if (file.endsWith('.js')) {
      convertJsToTs(filePath);
    }
  }
}

// Start the conversion process
findAndConvertJsFiles(apiDir);
console.log('✨ Conversion complete!');
