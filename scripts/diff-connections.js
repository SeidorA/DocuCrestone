const fs = require('fs');
const path = require('path');

// Helper to fetch current production JSON without external dependencies
function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const https = require('https');
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to fetch: ${res.statusCode}`));
        return;
      }
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  const newFilePath = path.join(__dirname, '../static/api/connections.json');
  if (!fs.existsSync(newFilePath)) {
    console.log('No local connections.json found.');
    return;
  }
  
  const newJSON = JSON.parse(fs.readFileSync(newFilePath, 'utf8'));
  let oldJSON;
  try {
    oldJSON = await fetchJSON('https://crestone-help.seidoranalytics.com/api/connections.json');
  } catch (e) {
    console.log('Could not fetch production connections, skipping comparison:', e.message);
    return;
  }
  
  let markdown = '';
  
  function compare(type, oldList = [], newList = []) {
    const oldMap = new Map(oldList.map(item => [item.id, item]));
    const newMap = new Map(newList.map(item => [item.id, item]));
    
    const added = [];
    const removed = [];
    const modified = [];
    
    for (const item of newList) {
      if (!oldMap.has(item.id)) {
        added.push(item);
      } else {
        const oldItem = oldMap.get(item.id);
        const changes = [];
        for (const key of ['title', 'iconName', 'useBrand', 'link']) {
          if (oldItem[key] !== item[key]) {
            changes.push(`- **${key}**: "${oldItem[key] || 'none'}" ➔ "${item[key] || 'none'}"`);
          }
        }
        if (changes.length > 0) {
          modified.push({ item, changes });
        }
      }
    }
    
    for (const item of oldList) {
      if (!newMap.has(item.id)) {
        removed.push(item);
      }
    }
    
    if (added.length > 0 || removed.length > 0 || modified.length > 0) {
      markdown += `### 📂 ${type === 'origins' ? 'Orígenes' : 'Destinos'}\n\n`;
      if (added.length > 0) {
        markdown += `**➕ Nuevos:**\n`;
        added.forEach(item => {
          markdown += `- \`${item.id}\` (**${item.title}**) - Icono: \`${item.iconName}\`\n`;
        });
        markdown += `\n`;
      }
      if (removed.length > 0) {
        markdown += `**❌ Eliminados:**\n`;
        removed.forEach(item => {
          markdown += `- \`${item.id}\` (**${item.title}**)\n`;
        });
        markdown += `\n`;
      }
      if (modified.length > 0) {
        markdown += `**✏️ Modificados:**\n`;
        modified.forEach(({ item, changes }) => {
          markdown += `- \`${item.id}\` (**${item.title}**):\n`;
          changes.forEach(change => {
            markdown += `  ${change}\n`;
          });
        });
        markdown += `\n`;
      }
    }
  }
  
  compare('origins', oldJSON.origins, newJSON.origins);
  compare('destinations', oldJSON.destinations, newJSON.destinations);
  
  if (markdown) {
    const fullMarkdown = `## 🔄 Cambios detectados en la lista de conexiones\n\n` + markdown;
    fs.writeFileSync(path.join(__dirname, '../connections_diff.md'), fullMarkdown, 'utf8');
    console.log('Successfully generated connections_diff.md');
  } else {
    console.log('No changes detected in connections list.');
  }
}

run().catch(console.error);
