import * as vscode from 'vscode';
import * as fs from 'node:fs';
import * as path from 'node:path';

import { resolveLocale, type SupportedLocale } from './localization';
export type SchemaName = 'settings' | 'services' | 'widgets' | 'bookmarks' | 'docker' | 'kubernetes' | 'proxmox';

const SCHEMAS: readonly SchemaName[] = ['settings', 'services', 'widgets', 'bookmarks', 'docker', 'kubernetes', 'proxmox'];
const FILE_PATTERN = /^(settings|services|widgets|bookmarks|docker|kubernetes|proxmox)\.ya?ml$/i;

interface SnippetDefinition {
  scope?: string;
  prefix: string | string[];
  description?: string;
  body: string | string[];
}
type SnippetCollection = Record<string, SnippetDefinition>;

interface YamlExtensionApi {
  registerContributor(schema: string, requestSchema: (resource: string) => string | undefined, requestSchemaContent: (uri: string) => string | undefined): void;
}

function schemaName(resource: string): SchemaName | undefined {
  const filename = path.posix.basename(vscode.Uri.parse(resource).path).toLowerCase();
  const match = FILE_PATTERN.exec(filename);
  return match?.[1] as SchemaName | undefined;
}

async function registerSchemas(context: vscode.ExtensionContext, locale: SupportedLocale): Promise<void> {
  const extension = vscode.extensions.getExtension<YamlExtensionApi>('redhat.vscode-yaml');
  if (!extension) {
    console.warn('GetHomepage: Red Hat YAML extension is unavailable');
    return;
  }

  const api = await extension.activate();
  if (!api || typeof api.registerContributor !== 'function') {
    console.warn('GetHomepage: YAML schema contributor API is unavailable');
    return;
  }

  const schemas = new Map<SchemaName, string>(SCHEMAS.map((name) => [name, fs.readFileSync(path.join(context.extensionPath, 'schemas', locale, name + '.schema.json'), 'utf8')]));
  const scheme = 'gethomepage-intellisense';
  api.registerContributor(
    scheme,
    (resource: string) => {
      const name = schemaName(resource);
      return name ? scheme + '://schema/' + name : undefined;
    },
    (uri: string) => {
      const parsed = vscode.Uri.parse(uri);
      return parsed.scheme === scheme ? schemas.get(parsed.path.slice(1) as SchemaName) : undefined;
    }
  );
}

function registerSnippets(context: vscode.ExtensionContext, locale: SupportedLocale): void {
  const file = path.join(context.extensionPath, 'snippets', locale + '.code-snippets');
  const snippets = JSON.parse(fs.readFileSync(file, 'utf8')) as SnippetCollection;

  const provider: vscode.CompletionItemProvider = {
    provideCompletionItems(document: vscode.TextDocument): vscode.CompletionItem[] {
      if (!FILE_PATTERN.test(path.basename(document.uri.fsPath))) return [];

      return Object.entries(snippets).flatMap(([name, snippet]) => {
        const prefixes = Array.isArray(snippet.prefix) ? snippet.prefix : [snippet.prefix];
        return prefixes.map((prefix) => {
          const item = new vscode.CompletionItem(prefix, vscode.CompletionItemKind.Snippet);
          item.detail = name;
          item.documentation = snippet.description;
          item.insertText = new vscode.SnippetString(Array.isArray(snippet.body) ? snippet.body.join('\n') : snippet.body);
          item.sortText = '0' + prefix;
          return item;
        });
      });
    }
  };

  context.subscriptions.push(vscode.languages.registerCompletionItemProvider([{ language: 'yaml-homepage' }, { language: 'yaml' }], provider));
}

export function activate(context: vscode.ExtensionContext): void {
  const locale = resolveLocale(vscode.env.language);
  registerSnippets(context, locale);
  void registerSchemas(context, locale).catch((error) => {
    console.error('GetHomepage: failed to register YAML schemas', error);
  });
}

export function deactivate(): void {}
