/* eslint-disable */

/**
 * @typedef {Object} ThemeSettings
 * @prop {Object} night - The color settings for the night theme.
 * @prop {string} night.--color-dark - The dark color for the night theme.
 * @prop {string} night.--color-light - The light color for the night theme.
 * @prop {Object} day - The color settings for the day theme.
 * @prop {string} day.--color-dark - The dark color for the day theme.
 * @prop {string} day.--color-light - The light color for the day theme.
 */

/**
 * @type {ThemeSettings}
 */
export const themeSettings = {
  night: {
    "--color-dark": "255, 255, 255",
    "--color-light": "10, 10, 20",
  },
  day: {
    "--color-dark": "10, 10, 20",
    "--color-light": "255, 255, 255",
  },
};

/**
 * Sets the theme by applying the color settings for the given theme.
 * @param {string} theme - The name of the theme to apply.
 */
export const setTheme = (theme) => {
  const colors = themeSettings[theme];
  for (let color in colors) {
    document.documentElement.style.setProperty(color, colors[color]);
  }
};
