/* Helpers for converting string[] ↔ TipTap-compatible HTML bullet lists */

export function arrayToHtml(items: string[]): string {
  if (items.length === 0) return '<ul><li><p></p></li></ul>';
  return '<ul>' + items.map(i => `<li><p>${i}</p></li>`).join('') + '</ul>';
}

export function htmlToArray(html: string): string[] {
  if (typeof window === 'undefined') return [];
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const items = Array.from(doc.querySelectorAll('li'));
  return items
    .map(li => li.textContent?.trim() ?? '')
    .filter(Boolean);
}
