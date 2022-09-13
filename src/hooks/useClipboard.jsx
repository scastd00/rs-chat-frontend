import React from 'react';

/**
 * Hook that allows to copy text to clipboard.
 *
 * @returns {function(string): void} Returns a function that copies the
 * given string to the clipboard.
 */
export function useClipboard() {
  const [copyToClipboard] = React.useState(() => {
    if (navigator.clipboard) {
      return (str) => navigator.clipboard.writeText(str);
    }

    return (str) => {
      const el = document.createElement('textarea');
      el.value = str;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    };
  });

  return [copyToClipboard];
}
