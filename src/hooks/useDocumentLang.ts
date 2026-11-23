import { useEffect } from 'react';

/**
 * Keeps <html lang> in step with the page's language toggle so screen readers use
 * the right voice and search engines see Hindi content as Hindi. Restores English
 * when the page unmounts.
 */
export function useDocumentLang(lang: 'en' | 'hi') {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = 'en';
    };
  }, [lang]);
}
