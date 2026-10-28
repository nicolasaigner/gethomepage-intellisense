#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const registryFile = path.join(root, 'src/locales.json');
const registry = JSON.parse(fs.readFileSync(registryFile, 'utf8'));
const args = process.argv.slice(2);
const flag = (name) => { const i = args.indexOf(name); return i < 0 ? undefined : args[i + 1]; };
const locale = flag('--locale');
const from = flag('--from') ?? registry.default;
if (!locale || !/^[a-z]{2,3}(?:-[A-Z][a-z]{3})?(?:-[A-Z]{2}|-[0-9]{3})?$/.test(locale)) {
  console.error('Usage: npm run locale:add -- --locale fr-FR [--from en]');
  process.exit(1);
}
if (!registry.locales.includes(from) || registry.locales.some((item) => item.toLowerCase() === locale.toLowerCase())) {
  console.error('Invalid source or existing destination locale.');
  process.exit(1);
}
const source = path.join(root, 'schemas', from);
const target = path.join(root, 'schemas', locale);
const snippetSource = path.join(root, 'snippets', from + '.code-snippets');
const snippetTarget = path.join(root, 'snippets', locale + '.code-snippets');
if (fs.existsSync(target) || fs.existsSync(snippetTarget) || !fs.existsSync(source) || !fs.existsSync(snippetSource)) {
  console.error('Missing source files or existing destination. Nothing changed.');
  process.exit(1);
}
fs.cpSync(source, target, { recursive: true, errorOnExist: true, force: false });
fs.copyFileSync(snippetSource, snippetTarget, fs.constants.COPYFILE_EXCL);
registry.locales.push(locale);
registry.locales.sort();
fs.writeFileSync(registryFile, JSON.stringify(registry, null, 2) + '\n');
console.log('Created ' + locale + ' from ' + from + '. Translate schemas/' + locale + '/ and snippets/' + locale + '.code-snippets, then run npm test.');
