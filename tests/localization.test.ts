import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as path from 'node:path';
import registry from '../src/locales.json';
import { resolveLocale } from '../src/localization';

test('locale detection and fallback', () => {
  assert.equal(resolveLocale('en'), 'en');
  assert.equal(resolveLocale('en-US'), 'en');
  assert.equal(resolveLocale('pt-BR'), 'pt-BR');
  assert.equal(resolveLocale('pt-PT'), 'pt-BR');
  assert.equal(resolveLocale(''), registry.default);
  assert.equal(resolveLocale('zz-ZZ'), registry.default);
  for (const locale of registry.locales) assert.equal(resolveLocale(locale), locale);
});

function strip(node: unknown): unknown {
  if (Array.isArray(node)) return node.map(strip);
  if (node && typeof node === 'object') {
    return Object.fromEntries(
      Object.entries(node)
        .filter(([key]) => !['description', 'title', 'markdownDescription'].includes(key))
        .map(([key, value]) => [key, strip(value)])
    );
  }
  return node;
}

const root = process.cwd();
for (const name of ['settings', 'services', 'widgets', 'bookmarks', 'docker', 'kubernetes', 'proxmox']) {
  test(name + ' schemas have identical validation', () => {
    const en = JSON.parse(fs.readFileSync(path.join(root, 'schemas', 'en', name + '.schema.json'), 'utf8'));
    for (const locale of registry.locales) {
      const translated = JSON.parse(fs.readFileSync(path.join(root, 'schemas', locale, name + '.schema.json'), 'utf8'));
      assert.deepEqual(strip(en), strip(translated), locale + ' validation differs for ' + name);
    }
  });
}

test('all locales have snippet collections with the same entry count', () => {
  const en = JSON.parse(fs.readFileSync(path.join(root, 'snippets', 'en.code-snippets'), 'utf8')) as Record<string, unknown>;
  for (const locale of registry.locales) {
    const translated = JSON.parse(fs.readFileSync(path.join(root, 'snippets', locale + '.code-snippets'), 'utf8')) as Record<string, unknown>;
    assert.equal(Object.keys(en).length, Object.keys(translated).length, locale);
  }
});
