export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));

  return match && match[2] ? match[2] : null;
}

export function setCookie(data: string) {
  document.cookie = `${data}; Path=/; Secure; SameSite=Strict`;
}

export function clearCookie() {
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
}

export function getCssVariable(variable: string, fallback: string): string {
  if (typeof window !== "undefined") {
    const value = getComputedStyle(document.documentElement).getPropertyValue(
      variable
    );
    return value.trim() || fallback;
  }
  return fallback;
}
