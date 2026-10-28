import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as path from 'node:path';
import registry from '../src/locales.json';

const root = process.cwd();
const names = ['settings', 'services', 'widgets', 'bookmarks', 'docker', 'kubernetes', 'proxmox'];
const read = (file: string): unknown => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
type Json = Record<string, unknown>;
const record = (value: unknown): Json => {
  assert.ok(value !== null && typeof value === 'object' && !Array.isArray(value));
  return value as Json;
};

function visit(value: unknown, pathName: string, callback: (node: Json, location: string) => void): void {
  if (Array.isArray(value)) {
    value.forEach((item, index) => visit(item, `${pathName}[${index}]`, callback));
  } else if (value && typeof value === 'object') {
    const node = value as Json;
    callback(node, pathName);
    for (const [key, child] of Object.entries(node)) visit(child, `${pathName}.${key}`, callback);
  }
}

test('locale registry points to complete, parseable schema and snippet files', () => {
  assert.ok(registry.locales.includes(registry.default));
  assert.equal(new Set(registry.locales).size, registry.locales.length);
  for (const locale of registry.locales) {
    for (const name of names) {
      const schema = record(read(`schemas/${locale}/${name}.schema.json`));
      assert.ok(schema.$schema, `${locale}/${name}: missing JSON Schema declaration`);
    }
    record(read(`snippets/${locale}.code-snippets`));
  }
});

test('every schema property has localized hover text', () => {
  for (const locale of registry.locales) {
    for (const name of names) {
      visit(read(`schemas/${locale}/${name}.schema.json`), name, (node, location) => {
        if (!node.properties || (location !== 'settings' && location !== 'services.definitions.widget')) return;
        for (const [key, value] of Object.entries(record(node.properties))) {
          const prop = record(value);
          assert.ok(typeof prop.description === 'string' && prop.description.trim(), `${locale}: ${location}.properties.${key} missing description`);
        }
      });
    }
  }
});

test('localized snippets preserve keys, valid bodies, and completion prefixes', () => {
  const english = record(read('snippets/en.code-snippets'));
  for (const locale of registry.locales) {
    const snippets = record(read(`snippets/${locale}.code-snippets`));
    assert.equal(Object.keys(snippets).length, Object.keys(english).length, `${locale}: snippet count differs`);
    for (const [name, value] of Object.entries(snippets)) {
      const snippet = record(value);
      const prefixes = typeof snippet.prefix === 'string' ? [snippet.prefix] : snippet.prefix;
      assert.ok(Array.isArray(prefixes) && prefixes.length > 0 && prefixes.every((prefix) => typeof prefix === 'string' && prefix.trim()), `${locale}/${name}: invalid prefix`);
      const body = typeof snippet.body === 'string' ? [snippet.body] : snippet.body;
      assert.ok(Array.isArray(body) && body.length > 0 && body.every((line) => typeof line === 'string'), `${locale}/${name}: invalid body`);
      assert.ok(typeof snippet.description === 'string' && snippet.description.trim(), `${locale}/${name}: missing description`);
    }
  }
});

test('documented widget settings and types remain available in both locales', () => {
  for (const locale of registry.locales) {
    const services = record(read(`schemas/${locale}/services.schema.json`));
    const definitions = record(services.definitions);
    const widget = record(record(definitions.widget).properties);
    const types = record(widget.type).enum;
    assert.ok(Array.isArray(types) && types.includes('bookorbit') && types.includes('qui'));
    for (const key of ['volume', 'hideErrors', 'instance']) assert.ok(widget[key], `${locale}: missing widget.${key}`);
    const settings = record(record(read(`schemas/${locale}/settings.schema.json`)).properties);
    for (const key of ['cardStyle', 'blockStyle', 'font', 'iconStyle', 'hideVersion', 'disableUpdateCheck', 'hideErrors', 'logpath']) {
      assert.ok(settings[key], `${locale}: missing settings.${key}`);
    }
  }
});
