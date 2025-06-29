export function setThemeColors(colors: [string, string, string, string]) {
  // Helper for color math:
  function hexToRgb(hex: string) {
    let h = hex.replace(/^#/, "");
    if (h.length === 3) h = h.split("").map(x => x + x).join("");
    const n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function rgbToHex([r, g, b]: number[]) {
    return (
      "#" +
      [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("")
    );
  }
  function scaleLightness(hex: string, percent: number) {
    const [r, g, b] = hexToRgb(hex);
    const adj = (v: number) =>
      Math.max(0, Math.min(255, Math.round(v + (percent / 100) * (percent > 0 ? 255 - v : v))));
    return rgbToHex([adj(r), adj(g), adj(b)]);
  }

  // Update CSS vars on :root
  const root = document.documentElement;
  for (let i = 0; i < 4; i++) {
    const idx = i + 1;
    const base = colors[i];
    root.style.setProperty(`--color-${idx}-darker`, scaleLightness(base, -40));
    root.style.setProperty(`--color-${idx}-dark`, scaleLightness(base, -20));
    root.style.setProperty(`--color-${idx}`, base);
    root.style.setProperty(`--color-${idx}-bright`, scaleLightness(base, 20));
    root.style.setProperty(`--color-${idx}-brighter`, scaleLightness(base, 40));
  }
}