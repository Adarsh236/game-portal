export function getCssVariable(variable: string, fallback: string): string {
  if (typeof window !== 'undefined') {
    const value = getComputedStyle(document.documentElement).getPropertyValue(
      variable,
    );
    return value.trim() || fallback;
  }
  return fallback;
}
