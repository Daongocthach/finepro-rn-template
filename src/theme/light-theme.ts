import type { ThemeColors } from './types';

export const lightColors: ThemeColors = {
  mode: 'light',

  brand: {
    primary: '#1447E6',
    secondary: '#163587',
    tertiary: '#FF9E3D',
    primaryVariant: '#0F3BC2',
    secondaryVariant: '#1E40AF',
    onBrand: '#FFFFFF',
  },

  background: {
    app: '#F4F7FF',
    surface: '#FFFFFF',
    surfaceAlt: '#EDF3FF',
    section: '#E3ECFF',
    elevated: '#F8FAFF',
    input: '#F6F9FF',
    disabled: '#D6E0F5',
    modal: '#FFFFFF',
  },

  text: {
    primary: '#102A5C',
    secondary: '#415A8B',
    tertiary: '#6478A3',
    muted: '#8A9ABB',
    inverse: '#FFFFFF',
    accent: '#FF9E3D',
    link: '#1447E6',
    linkHover: '#0F3BC2',
    onBrand: '#FFFFFF',
  },

  border: {
    default: '#CBD8F0',
    subtle: '#E6EEFB',
    strong: '#9DB2DE',
    focus: '#1447E6',
    disabled: '#D6E0F5',
  },

  icon: {
    primary: '#102A5C',
    secondary: '#415A8B',
    tertiary: '#6F84AF',
    muted: '#9AAACC',
    inverse: '#FFFFFF',
    accent: '#FF9E3D',
    onBrand: '#FFFFFF',
  },

  state: {
    success: '#16A34A',
    successBg: 'rgba(22, 163, 74, 0.12)',
    warning: '#FFB21D',
    warningBg: 'rgba(255, 178, 29, 0.18)',
    error: '#EF4444',
    errorBg: 'rgba(239, 68, 68, 0.12)',
    info: '#3A86FF',
    infoBg: 'rgba(58, 134, 255, 0.14)',
    disabled: '#B0B99C',
  },

  overlay: {
    modal: 'rgba(0, 0, 0, 0.5)',
    pressed: 'rgba(20, 71, 230, 0.18)',
    hover: 'rgba(20, 71, 230, 0.1)',
    focus: 'rgba(20, 71, 230, 0.2)',
    ripple: 'rgba(255, 255, 255, 0.25)',
    shadow: 'rgba(16, 42, 92, 0.14)',
  },

  gradient: {
    primary: ['#8DB3FF', '#1447E6'],
    secondary: ['#DCE8FF', '#7EA5FF'],
    accent: ['#FFD37A', '#FF9E3D'],
    success: ['#86EFAC', '#16A34A'],
    error: ['#B91C1C', '#F87171'],
    warning: ['#FFE66C', '#FFB21D'],
    highlight: ['#E0ECFF', '#B7CCFF'],
  },

  shadow: {
    color: 'rgba(16, 42, 92, 0.14)',
    elevation: 4,
    elevationSmall: 2,
    elevationMedium: 4,
    elevationLarge: 8,
  },
};

export default lightColors;
