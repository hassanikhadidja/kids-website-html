const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) files.push(...walk(full, []));
    else if (name.endsWith('.html')) files.push(full);
  }
  return files;
}

function assetPrefix(filePath) {
  const rel = path.relative(ROOT, filePath);
  const depth = rel.split(path.sep).length - 1;
  return depth > 0 ? '../'.repeat(depth) : '';
}

function patchFile(filePath) {
  let text = fs.readFileSync(filePath, 'utf8');
  const orig = text;
  const prefix = assetPrefix(filePath);
  const hasNav = text.includes('id="mainNav"') || text.includes("id='mainNav'");
  if (!hasNav) return false;

  const cssLink = `<link rel="stylesheet" href="${prefix}site-menu.css">`;
  if (!text.includes('site-menu.css')) {
    text = text.replace('</head>', `${cssLink}\n</head>`);
  }

  text = text.replace(
    /<a class="icon-btn" href="(?:\.\.\/)?home-page\.html" aria-label="Menu">\s*([\s\S]*?)<\/a>/g,
    '<button class="icon-btn" type="button" id="menuOpenBtn" aria-label="Menu">$1</button>'
  );

  const scriptTag = `<script src="${prefix}site-menu.js"></script>`;
  if (!text.includes('site-menu.js')) {
    if (text.includes('site-footer.js')) {
      text = text.replace(`<script src="${prefix}site-footer.js"></script>`, `${scriptTag}\n<script src="${prefix}site-footer.js"></script>`);
    } else if (text.includes('cart-drawer.js')) {
      text = text.replace(`<script src="${prefix}cart-drawer.js"></script>`, `${scriptTag}\n<script src="${prefix}cart-drawer.js"></script>`);
    } else {
      text = text.replace('</body>', `${scriptTag}\n</body>`);
    }
  }

  if (text !== orig) {
    fs.writeFileSync(filePath, text, 'utf8');
    return true;
  }
  return false;
}

function stripHomeMenu(filePath) {
  let text = fs.readFileSync(filePath, 'utf8');
  const cssStart = text.indexOf('  .mobile-menu{');
  const cssEnd = text.indexOf('  /* ---------- cart drawer ---------- */');
  if (cssStart !== -1 && cssEnd !== -1) {
    text = text.slice(0, cssStart) + text.slice(cssEnd);
  }

  const menuStart = text.indexOf('  <!-- mobile menu -->');
  const menuEnd = text.indexOf('  <!-- cart drawer -->');
  if (menuStart !== -1 && menuEnd !== -1) {
    text = text.slice(0, menuStart) + text.slice(menuEnd);
  }

  const jsStart = text.indexOf('  // mobile menu toggle');
  const jsEnd = text.indexOf('  function closeSearch(){');
  if (jsStart !== -1 && jsEnd !== -1) {
    text = text.slice(0, jsStart) + text.slice(jsEnd);
  }

  text = text.replace(
    /if\(e\.key === 'Escape'\)\{\s*if\(cartDrawer\.classList\.contains\('is-open'\)\) closeCart\(\);\s*else if\(mainNav\.classList\.contains\('is-search-active'\)\) closeSearch\(\);\s*else if\(mobileMenu\.classList\.contains\('is-open'\)\)\{\s*if\(menuPanelStack\.length > 1\) popMenuPanel\(\);\s*else closeMenu\(\);\s*\}\s*\}/,
    "if(e.key === 'Escape'){\n      if(cartDrawer.classList.contains('is-open')) closeCart();\n      else if(mainNav.classList.contains('is-search-active')) closeSearch();\n    }"
  );

  fs.writeFileSync(filePath, text, 'utf8');
}

const updated = walk(ROOT).filter(patchFile).map((f) => path.relative(ROOT, f));
stripHomeMenu(path.join(ROOT, 'home-page.html'));
if (!updated.includes('home-page.html')) updated.push('home-page.html (menu stripped)');

console.log('Updated', updated.length, 'files');
updated.forEach((f) => console.log(' -', f));
