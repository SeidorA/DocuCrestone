const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '../docs/documentation/sections/conections/source');
const DEST_DIR = path.join(__dirname, '../docs/documentation/sections/conections/detinations');
const OUTPUT_DIR = path.join(__dirname, '../static/api');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'connections.json');

function scanDir(dir, isSubdir = false) {
  if (!fs.existsSync(dir)) {
    console.warn(`Warning: Directory does not exist: ${dir}`);
    return [];
  }
  
  const files = fs.readdirSync(dir);
  let results = [];
  
  // If it's a subdirectory and has index.md, we only treat index.md as the connector page
  if (isSubdir && files.includes('index.md')) {
    results.push(path.join(dir, 'index.md'));
    return results;
  }

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(scanDir(fullPath, true));
    } else if (file.endsWith('.md')) {
      // Ignore index.md at the root of source or destinations
      if (!isSubdir && file === 'index.md') {
        continue;
      }
      results.push(fullPath);
    }
  }
  return results;
}

function parseFrontMatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  
  const metadata = {};
  if (match) {
    const yamlLines = match[1].split('\n');
    for (const line of yamlLines) {
      const colonIdx = line.indexOf(':');
      if (colonIdx !== -1) {
        const key = line.slice(0, colonIdx).trim();
        let value = line.slice(colonIdx + 1).trim();
        // Remove surrounding quotes if any
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        metadata[key] = value;
      }
    }
  }

  const projectRoot = path.join(__dirname, '..');
  const relativeToDocs = path.relative(path.join(projectRoot, 'docs'), filePath);
  
  // Normalize path separators to forward slashes for URLs
  let urlPath = relativeToDocs.replace(/\\/g, '/');
  
  // Remove file extension (.md)
  urlPath = urlPath.replace(/\.md$/, '');
  
  // Respect Docusaurus custom slug frontmatter if present
  if (metadata.slug) {
    if (metadata.slug.startsWith('/')) {
      urlPath = metadata.slug.slice(1);
    } else {
      const parts = urlPath.split('/');
      parts[parts.length - 1] = metadata.slug;
      urlPath = parts.join('/');
    }
  }
  
  // If it ends with /index, remove it to get cleaner URL
  if (urlPath.endsWith('/index')) {
    urlPath = urlPath.slice(0, -6);
  }
  
  const link = `/docs/${urlPath}`;
  
  // Identify ID: if the file name is index, use the folder name, otherwise the file name
  const baseName = path.basename(filePath, '.md');
  const id = baseName === 'index' ? path.basename(path.dirname(filePath)) : baseName;

  return {
    id,
    title: metadata.title || id,
    description: metadata.description || '',
    iconName: metadata.iconName || null,
    useBrand: metadata.useBrand === 'true' || metadata.useBrand === true || metadata.brand === 'true' || metadata.brand === true,
    link,
    sidebarPosition: metadata.sidebar_position ? parseInt(metadata.sidebar_position, 10) : null
  };
}

function generate() {
  console.log('Generating connections.json...');
  
  const sourceFiles = scanDir(SOURCE_DIR);
  const destFiles = scanDir(DEST_DIR);
  
  const origins = sourceFiles.map(parseFrontMatter);
  const destinations = destFiles.map(parseFrontMatter);
  
  // Sort by sidebar position if available, then by title
  const sorter = (a, b) => {
    if (a.sidebarPosition !== null && b.sidebarPosition !== null) {
      return a.sidebarPosition - b.sidebarPosition;
    }
    if (a.sidebarPosition !== null) return -1;
    if (b.sidebarPosition !== null) return 1;
    return a.title.localeCompare(b.title);
  };
  
  origins.sort(sorter);
  destinations.sort(sorter);
  
  const output = {
    origins: origins.map(({ sidebarPosition, ...rest }) => rest),
    destinations: destinations.map(({ sidebarPosition, ...rest }) => rest)
  };
  
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf8');
  console.log(`Successfully generated connections.json at ${OUTPUT_FILE}`);
  console.log(`Found ${origins.length} origins and ${destinations.length} destinations.`);
}

generate();
