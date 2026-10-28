const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const names = ['settings', 'services', 'widgets', 'bookmarks', 'docker', 'kubernetes', 'proxmox'];
const original = names.map((name) => ({
  name,
  data: JSON.parse(fs.readFileSync(path.join(root, 'schemas', name + '.schema.json'), 'utf8'))
}));
const originalSnippets = JSON.parse(fs.readFileSync(path.join(root, 'snippets/gethomepage.code-snippets'), 'utf8'));
const cacheFile = path.join(root, '.translation-cache.json');
const cache = fs.existsSync(cacheFile) ? JSON.parse(fs.readFileSync(cacheFile, 'utf8')) : {};
const strings = new Set();

function visit(node) {
  if (Array.isArray(node)) {
    node.forEach(visit);
    return;
  }
  if (node && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      if (['title', 'description', 'markdownDescription'].includes(key) && typeof value === 'string') strings.add(value);
      else visit(value);
    }
  }
}
original.forEach((x) => visit(x.data));
for (const [name, s] of Object.entries(originalSnippets)) {
  strings.add(name);
  if (typeof s.description === 'string') strings.add(s.description);
  for (const line of Array.isArray(s.body) ? s.body : [s.body]) {
    for (const m of line.matchAll(/\$\{\d+:([^{}]+)\}/g)) strings.add(m[1]);
  }
}
const all = [...strings].filter((s) => s && !(s in cache));
console.log('Unique strings:', strings.size, 'remaining:', all.length);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function translate(batch) {
  const separator = '\n[END-OF-ENTRY]\n';
  const input = batch.join(separator);
  const u = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=pt&tl=en&dt=t&q=' + encodeURIComponent(input);
  const res = await fetch(u, { signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const data = await res.json();
  const output = data[0].map((x) => x[0]).join('');
  const parts = output.split(/\s*\[END-OF-ENTRY\]\s*/i);
  if (parts.length !== batch.length) throw new Error('separator mismatch ' + parts.length + '/' + batch.length);
  return parts.map((s) => s.trim());
}

async function translateOne(value) {
  const u = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=pt&tl=en&dt=t&q=' + encodeURIComponent(value);
  const res = await fetch(u, { signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const data = await res.json();
  return data[0].map((x) => x[0]).join('');
}

async function run() {
  let done = 0;
  for (let i = 0; i < all.length;) {
    const batch = all.slice(i, i + 6);
    let result;
    for (let attempt = 0; attempt < 6; attempt++) {
      try {
        result = await translate(batch);
        break;
      } catch (e) {
        console.log('Batch retry:', e.message, 'attempt', attempt + 1);
        await sleep(Math.min(120000, 5000 * Math.pow(2, attempt)));
      }
    }
    if (!result) {
      result = [];
      for (const item of batch) {
        let translated;
        for (let retry = 0; retry < 5; retry++) {
          try {
            translated = await translateOne(item);
            break;
          } catch (e) {
            console.log('Single retry:', e.message);
            await sleep(Math.min(120000, 8000 * Math.pow(2, retry)));
          }
        }
        if (!translated) throw Error('Translation unavailable; progress saved');
        result.push(translated);
        await sleep(1500);
      }
    }
    batch.forEach((item, index) => (cache[item] = result[index]));
    i += batch.length;
    done += batch.length;
    fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2) + '\n');
    console.log('Translated', done, '/', all.length);
    await sleep(2500);
  }

  function localized(node) {
    if (Array.isArray(node)) return node.map(localized);
    if (node && typeof node === 'object')
      return Object.fromEntries(
        Object.entries(node).map(([k, v]) => [k, ['title', 'description', 'markdownDescription'].includes(k) && typeof v === 'string' ? (cache[v] ?? v) : localized(v)])
      );
    return node;
  }
  for (const { name, data } of original) {
    const dir = path.join(root, 'schemas', 'en');
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, name + '.schema.json'), JSON.stringify(localized(data), null, 2) + '\n');
  }
  const snippets = {};
  for (const [name, s] of Object.entries(originalSnippets)) {
    const converted = {
      ...s,
      description: typeof s.description === 'string' ? (cache[s.description] ?? s.description) : s.description,
      body: (Array.isArray(s.body) ? s.body : [s.body]).map((line) =>
        line.replace(/\$\{(\d+):([^{}]+)\}/g, (full, n, placeholder) => '${' + n + ':' + (cache[placeholder] ?? placeholder) + '}')
      )
    };
    snippets[cache[name] ?? name] = converted;
  }
  fs.writeFileSync(path.join(root, 'snippets/en.code-snippets'), JSON.stringify(snippets, null, 2) + '\n');
  console.log('English translation completed.');
}

run().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
