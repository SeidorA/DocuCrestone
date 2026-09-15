const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '../docs/documentation/sections/conections/source');
const DEST_DIR = path.join(__dirname, '../docs/documentation/sections/conections/detinations');
const OUTPUT_DIR = path.join(__dirname, '../static/api');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'connections.json');

const DESTINATION_TAG_MAP = {
  'hana': 'Suite SAP',
  'sybase-destination': 'Suite SAP',
  'sqlserver': 'Bases de datos relacionales',
  'mysql-destination': 'Bases de datos relacionales',
  'oracle-destination': 'Bases de datos relacionales',
  'postgresql-destination': 'Bases de datos relacionales',
  'db2-destination': 'Bases de datos relacionales',
  'AzureSQL': 'Bases de datos relacionales',
  'aws': 'Storage',
  'Azure': 'Storage',
  'gcp': 'Storage',
  'fileserver': 'Storage',
  'snowflake': 'Data warehouses / lakehouses',
  'redshift': 'Data warehouses / lakehouses',
  'gcs': 'Data warehouses / lakehouses',
  'databricks': 'Data warehouses / lakehouses',
  'fabric': 'Data warehouses / lakehouses',
  'teradata': 'Data warehouses / lakehouses'
};

function getCategoryLabel(dirPath) {
  const catPath = path.join(dirPath, '_category_.json');
  if (fs.existsSync(catPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(catPath, 'utf8'));
      if (data.label) return data.label;
    } catch (e) {}
  }
  return path.basename(dirPath).replace(/_/g, ' ');
}

function scanDir(dir, isSubdir = false) {
  if (!fs.existsSync(dir)) {
    console.warn(`Warning: Directory does not exist: ${dir}`);
    return [];
  }
  
  const files = fs.readdirSync(dir);
  let results = [];
  
  // If it's a connector subdirectory (like snowflake) that has index.md as the main connector doc
  if (isSubdir && files.includes('index.md') && (dir.endsWith('snowflake') || dir.endsWith('snowflake/'))) {
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

function parseFrontMatter(filePath, baseDir) {
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

  // Determine tag/category from folder structure, metadata, or fallback map
  let tag = metadata.tag || metadata.category || '';
  if (!tag && baseDir) {
    const relativeToBase = path.relative(baseDir, filePath);
    const dirName = path.dirname(relativeToBase);
    if (dirName && dirName !== '.') {
      const topDir = dirName.split(path.sep)[0];
      const topDirPath = path.join(baseDir, topDir);
      tag = getCategoryLabel(topDirPath);
    }
  }
  if (!tag) {
    tag = DESTINATION_TAG_MAP[id] || '';
  }

  return {
    id,
    title: metadata.title || id,
    description: metadata.description || '',
    iconName: metadata.iconName || null,
    useBrand: metadata.useBrand === 'true' || metadata.useBrand === true || metadata.brand === 'true' || metadata.brand === true,
    link,
    tag,
    sidebarPosition: metadata.sidebar_position ? parseInt(metadata.sidebar_position, 10) : null
  };
}

function generate() {
  console.log('Generating connections.json...');
  
  const sourceFiles = scanDir(SOURCE_DIR);
  const destFiles = scanDir(DEST_DIR);
  
  const origins = sourceFiles.map((file) => parseFrontMatter(file, SOURCE_DIR));
  const destinations = destFiles.map((file) => parseFrontMatter(file, DEST_DIR));
  
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
