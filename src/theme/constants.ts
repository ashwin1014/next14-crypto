enum ColorScheme {
    DARK = 'dark',
    LIGHT = 'light',
  }

  const breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    superLarge: 2000,
    tvLike: 4000,
  } as const;

const DARK_COLORS = {
    error: 'rgb(217, 70, 74)',
    errorBadge: 'rgb(38, 12, 13)',
    success: 'rgb(0, 168, 118)',
    successBadge: 'rgb(0, 30, 21)',
    appBackground: 'rgb(17, 17, 20)',
    componentBackground: 'rgb(24, 25, 30)',
    infoBackground: 'rgb(34, 36, 44)',
    primary: 'rgb(253, 125, 2)',
    textPrimary: 'rgb(255, 255, 255)',
    textSecondary: 'rgb(173, 177, 183)',
};

const LIGHT_COLORS = {
    error: 'rgb(217, 70, 74)',
    errorBadge: 'rgb(251, 237, 237)',
    success: 'rgb(0, 168, 118)',
    successBadge: 'rgb(230, 246, 241)',
    appBackground: 'rgb(251, 252, 253)',
    componentBackground: 'rgb(243, 244, 246)',
    infoBackground: 'rgb(233, 236, 241)',
    primary: 'rgb(253, 125, 2)',
    textPrimary: 'rgb(18, 18, 20)',
    textSecondary: 'rgb(129, 133, 139)',
};

const GUTTERS = {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
} as const;


const darkTheme = {
  colors: DARK_COLORS,
  gutters: GUTTERS,
  breakpoints: breakpoints,
};

const lightTheme = {
  colors: LIGHT_COLORS,
  gutters: GUTTERS,
  breakpoints: breakpoints,
};

type Theme = typeof darkTheme | typeof lightTheme;

export { DARK_COLORS, LIGHT_COLORS, ColorScheme, breakpoints, GUTTERS, darkTheme, lightTheme };
export type { Theme };

