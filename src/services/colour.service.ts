type RGB = { r: number; g: number; b: number };

const getLuminance = ({ r, g, b }: RGB): number => {
  const values = [r, g, b].map((value) => {
    const ratio = value / 255;
    return ratio <= 0.03928
      ? ratio / 12.92
      : Math.pow((ratio + 0.055) / 1.055, 2.4);
  });
  return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
};

const getContrast = (foreground: RGB, background: RGB): number => {
  const foregroundLum = getLuminance(foreground);
  const backgroundLum = getLuminance(background);
  const brightest = Math.max(foregroundLum, backgroundLum);
  const darkest = Math.min(foregroundLum, backgroundLum);
  return (brightest + 0.05) / (darkest + 0.05);
};

const convertHexToRGB = (hex: string): RGB => {
  let formatted = hex.slice(1);
  if (formatted.length === 3) formatted += formatted;
  const r = parseInt(formatted.slice(0, 2), 16);
  const g = parseInt(formatted.slice(2, 4), 16);
  const b = parseInt(formatted.slice(4, 6), 16);
  return { r, g, b };
};

const invertRGB = ({ r: oldR, g: oldG, b: oldB }: RGB): RGB => {
  const [r, g, b] = [oldR, oldG, oldB].map((x) => 255 - x);
  return { r, g, b };
};

const rgbToString = ({ r, g, b }: RGB): string => {
  return `rgb(${r}, ${g}, ${b})`;
};

const equalizeRGB = ({ r }: RGB): RGB => {
  return { r, g: r, b: r };
}

export const determineForegroundColour = (
  foreground: string,
  background: string,
  threshold: number = 3.5
) => {
  const rgbForeground = convertHexToRGB(foreground);
  const rgbBackground = convertHexToRGB(background);

  const contrast = getContrast(rgbForeground, rgbBackground);

  return contrast <= threshold
    ? rgbToString(equalizeRGB(invertRGB(rgbForeground)))
    : rgbToString(rgbForeground);
};
