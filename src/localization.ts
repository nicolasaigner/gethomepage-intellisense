import registry from './locales.json';

export type SupportedLocale = string;

export function resolveLocale(language: string | undefined): SupportedLocale {
  const normalized = (language ?? '').toLowerCase().replaceAll('_', '-');
  const exact = registry.locales.find((locale) => locale.toLowerCase() === normalized);
  if (exact) return exact;

  const primary = normalized.split('-')[0];
  return registry.locales.find((locale) => locale.toLowerCase().split('-')[0] === primary) ?? registry.default;
}
