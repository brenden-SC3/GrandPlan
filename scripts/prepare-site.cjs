const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '../public');
const snippet = '<script src="https://analytics.ahrefs.com/analytics.js" data-key="oJwEeCqdGchN91kTQggRTg" async></script>';
let pages = 0;

function prepare(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      prepare(file);
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith('.html')) continue;
    let html = fs.readFileSync(file, 'utf8');
    if (!/<\/head\s*>/i.test(html)) throw new Error(`Missing head closing tag: ${file}`);
    html = html.replace(/<meta\b[^>]*>/gi, tag => {
      const name = tag.match(/\bname\s*=\s*(["'])(.*?)\1/i);
      if (!name || !/^(robots|googlebot|bingbot)$/i.test(name[2])) return tag;
      return tag.replace(/\bcontent\s*=\s*(["'])(.*?)\1/i, (attribute, quote, value) => {
        const directives = value.split(',').map(item => item.trim()).filter(item => item && !/^(noindex|nofollow|none)$/i.test(item));
        return `content=${quote}${directives.length ? directives.join(', ') : 'index,follow'}${quote}`;
      });
    });
    if (!html.includes('https://analytics.ahrefs.com/analytics.js')) {
      html = html.replace(/<\/head\s*>/i, `${snippet}\n</head>`);
    }
    fs.writeFileSync(file, html);
    pages++;
  }
}

prepare(root);
if (!pages) throw new Error('No HTML pages found');
console.log(`Prepared ${pages} HTML pages for analytics and indexing.`);
