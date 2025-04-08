/**
 * Retrieves the value of a cookie by name.
 * If a brand is provided, the function searches for a cookie prefixed by that brand.
 * @param name The base name of the cookie.
 * @param brand Optional brand identifier to prefix the cookie name.
 * @returns The decoded cookie value or null if not found.
 */
export function getCookie(name: string, brand?: string): string | null {
  if (typeof document === 'undefined') return null;
  //TODO: Use with brand ID
  //   const cookieName = brand ? `${brand}_${name}` : name;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match && match[2] ? decodeURIComponent(match[2]) : null;
}

/**
 * Sets a cookie with the specified name and value.
 * If a brand is provided, it prefixes the cookie name with the brand.
 * @param name The base name of the cookie.
 * @param value The value to store.
 * @param brand Optional brand identifier to prefix the cookie name.
 * @param options Optional cookie options (expires, domain, etc.).
 */
export function setCookie(
  value: string,
  brand?: string,
  options: { expires?: Date; domain?: string } = {},
): void {
  //TODO: Use with brand ID
  //   const cookieName = brand ? `${brand}_${value}` : value;
  let cookieString = `${value}; Path=/; SameSite=Strict`;

  if (options.expires) {
    cookieString += `; Expires=${options.expires.toUTCString()}`;
  }

  if (options.domain) {
    cookieString += `; Domain=${options.domain}`;
  }

  if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
    cookieString += '; Secure';
  }

  document.cookie = cookieString;
}

/**
 * Clears a cookie by setting its expiration date to a past date.
 * If a brand is provided, it clears a cookie with the brand-prefixed name.
 * @param name The base name of the cookie.
 * @param brand Optional brand identifier to prefix the cookie name.
 */
export function clearCookie(name?: string, brand?: string): void {
  //TODO: Use with brand ID
  //   const cookieName = brand ? `${brand}_${name}` : name;
  //   document.cookie = `${name}=; Path=/; Expires=${new Date(0).toUTCString()}; SameSite=Strict`;

  document.cookie.split(';').forEach((c) => {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
  });
}
