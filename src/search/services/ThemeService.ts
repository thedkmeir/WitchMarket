import { Service } from "./Service";

type Theme = {
  name: string;
  colors: [string, string, string, string];
};

export class ThemeManager extends Service {
  private static instance: ThemeManager;
  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) ThemeManager.instance = new ThemeManager();
    return ThemeManager.instance;
  }

  private static Themes: Theme[] = [
    {
      name: "Normal",
      colors: ["#210f37", "#4f1c51", "#a55b4b", "#dca06d"],
    },
    {
      name: "Ice",
      colors: ["#FFFFFF", "#DFF8FF", "#A8E1FF", "#6CCEF2"],
    },
    {
      name: "Fire",
      colors: ["#5A0B0B", "#8F1D1D", "#C64515", "#E37E21"],
    },
    {
      name: "Earth",
      colors: ["#3E352B", "#6E6356", "#A68B6E", "#C2B299"],
    },
    {
      name: "Air",
      colors: ["#D4D4D4", "#A9C7DD", "#7D8C91", "#3E4A50"],
    },
    {
      name: "Forest",
      colors: ["#3E281C", "#3C5032", "#4C6E3E", "#2F5D3A"],
    },
  ];

  private static currentTheme: Theme = ThemeManager.Themes[0];

  constructor() {
    super();
    const savedTheme = localStorage.getItem("theme") || "Normal";
    ThemeManager.setTheme(savedTheme);
  }

  private static hexToRgb(hex: string) {
    let h = hex.replace(/^#/, "");
    if (h.length === 3)
      h = h
        .split("")
        .map((x) => x + x)
        .join("");
    const n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  private static rgbToHex([r, g, b]: number[]) {
    return (
      "#" +
      [r, g, b]
        .map((x) => Math.max(0, Math.min(255, x)).toString(16).padStart(2, "0"))
        .join("")
    );
  }

  private static scaleLightness(hex: string, percent: number) {
    const [r, g, b] = ThemeManager.hexToRgb(hex);
    const adj = (v: number) =>
      Math.max(
        0,
        Math.min(
          255,
          Math.round(v + (percent / 100) * (percent > 0 ? 255 - v : v))
        )
      );
    return ThemeManager.rgbToHex([adj(r), adj(g), adj(b)]);
  }

  private static setThemeColors(colors: [string, string, string, string]) {
    const root = document.documentElement;
    for (let i = 0; i < 4; i++) {
      const idx = i + 1;
      const base = colors[i];
      root.style.setProperty(
        `--color-${idx}-darker`,
        ThemeManager.scaleLightness(base, -40)
      );
      root.style.setProperty(
        `--color-${idx}-dark`,
        ThemeManager.scaleLightness(base, -20)
      );
      root.style.setProperty(`--color-${idx}`, base);
      root.style.setProperty(
        `--color-${idx}-bright`,
        ThemeManager.scaleLightness(base, 20)
      );
      root.style.setProperty(
        `--color-${idx}-brighter`,
        ThemeManager.scaleLightness(base, 40)
      );
    }
  }

  static setTheme(name: string) {
    const theme = this.Themes.find((t) => t.name === name);
    if (!theme) {
      console.warn(`Theme "${name}" not found, using default.`);
      ThemeManager.setTheme("Normal");
      return;
    }
    ThemeManager.currentTheme = theme;
    ThemeManager.setThemeColors(theme.colors);
    localStorage.setItem("theme", theme.name);
  }

  static setCostumeTheme(colors: [string, string, string, string]) {
    ThemeManager.setThemeColors(colors);
  }

  static getCurrentThemeName(): string {
    return ThemeManager.currentTheme.name;
  }

  static getAllThemes(): Theme[] {
    return [...ThemeManager.Themes];
  }

  static getAllThemeNames(): string[] {
    return ThemeManager.Themes.map((theme) => theme.name);
  }
}

export const themeManager = ThemeManager.getInstance();