import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

// Utility function to darken a color
export const darkenColor = (color: string, amount: number) => {
  let usePound = false;
  if (color[0] === "#") {
    color = color.slice(1);
    usePound = true;
  }

  const num = parseInt(color, 16);
  let r = (num >> 16) - amount;
  let g = ((num >> 8) & 0x00ff) - amount;
  let b = (num & 0x0000ff) - amount;

  if (r < 0) r = 0;
  if (g < 0) g = 0;
  if (b < 0) b = 0;

  return (
    (usePound ? "#" : "") +
    ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")
  );
};

// utility to convert hex to hsl
export const hexToHSL = (hex: string) => {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, "");
  // Parse r, g, b values
  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;
  // Find greatest and smallest channel values
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;
  // If max and min are equal, it's a shade of gray
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        h = ((b - r) / d + 2) * 60;
        break;
      case b:
        h = ((r - g) / d + 4) * 60;
        break;
    }
  }
  // Return h, s, l as percentages
  h = Math.round(h);
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  return `hsl(${h}, ${s}%, ${l}%)`;
};

// Utility to increae the light in hsl of a color
export const increaseLightness = (color: string, amount: number) => {
  const hsl = color.match(/hsl\((\d+), (\d+)%, (\d+)%\)/);
  if (!hsl) return color;

  let [h, s] = hsl.slice(1, 3).map(Number);
  // Set lightness directly to amount, ensuring it's between 0-100
  const l = Math.max(0, Math.min(100, amount));

  return `hsl(${h}, ${s}%, ${l}%)`;
};

export const dateConverter = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const generateBgColor = (name: string) => {
  const colors = [
    "bg-red-100",
    "bg-orange-100",
    "bg-amber-100",
    "bg-yellow-100",
    "bg-lime-100",
    "bg-green-100",
    "bg-emerald-100",
    "bg-teal-100",
    "bg-cyan-100",
    "bg-sky-100",
    "bg-blue-100",
    "bg-indigo-100",
    "bg-violet-100",
    "bg-purple-100",
    "bg-fuchsia-100",
    "bg-pink-100",
    "bg-rose-100",
  ];

  // Create a hash from the name to pick a consistent color
  const hash = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return colors[hash % colors.length];
};
