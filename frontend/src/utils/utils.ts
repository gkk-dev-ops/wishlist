export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function isDarkThemePreferred(): boolean {
  const preferredColorScheme = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  return preferredColorScheme;
}
