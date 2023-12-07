const shadowProperties = (offsetX, offsetY, opacity, radius, elevation) => ({
  shadowColor: '#000',
  shadowOffset: {
    width: offsetX,
    height: offsetY,
  },
  shadowOpacity: opacity,
  shadowRadius: radius,
  elevation,
});

const theme = {
  colors: {
    white: '#FFFFFF',
    background: '#F2F2F2',
    black: '#000000',
    primary: {
      orange50: '#fff2f1',
      orange100: '#ffe3e0',
      orange200: '#ffcbc6',
      orange300: '#ffa69e',
      orange400: '#ff7366',
      orange500: '#fd5748',
      orange600: '#eb2917',
      orange700: '#c61e0f',
      orange800: '#a31d11',
      orange900: '#871e15',
      orange950: '#4a0b05',
    },
    secondary: {
      blue10: 'rgba(227, 242, 253, 0.5)',
      blue50: 'rgba(227, 242, 253, 1)',
      blue100: 'rgba(213, 237, 255, 1)',
      blue200: 'rgba(179, 220, 255, 1)',
      blue300: 'rgba(134, 195, 255, 1)',
      blue400: 'rgba(87, 153, 255, 1)',
      blue500: 'rgba(48, 114, 255, 1)',
      blue600: 'rgba(13, 67, 255, 1)',
      blue700: 'rgba(10, 62, 254, 1)',
      blue800: 'rgba(7, 52, 204, 1)',
      blue900: 'rgba(16, 51, 159, 1)',
      blue950: 'rgba(10, 29, 92, 1)',
    },
    grey: {
      grey50: '#f5f5f5',
      grey100: '#e5e5e5',
      grey200: '#cccccc',
      grey300: '#b3b3b3',
      grey400: '#999999',
      grey500: '#808080',
      grey600: '#666666',
      grey700: '#4d4d4d',
      grey800: '#333333',
      grey900: '#1a1a1a',
    },
    danger: {
      red: '#FF0000',
    },
  },
  fonts: {
    main: 'System',
  },
  fontWeight: {
    normal: '300',
    lightBold: '400',
    semiBold: '500',
    bold: '700',
    black: '900',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    h3: 24,
    h2: 30,
    h1: 36,
  },
  shadows: {
    light: {
      ...shadowProperties(0, 0.01, 0.1, 1, 3),
    },
    soft: {
      ...shadowProperties(0, 1, 0.15, 2, 3),
    },
    medium: {
      ...shadowProperties(0, 1, 0.25, 2.84, 5),
    },
    strong: {
      ...shadowProperties(0, 3, 0.25, 4, 5),
    },

    iosLight: {
      ...shadowProperties(0, 1, 0.1, 1, 2),
    },
    iosSoft: {
      ...shadowProperties(0, 1, 0.15, 2, 2),
    },
    iosMedium: {
      ...shadowProperties(0, 1, 0.25, 2.84, 3),
    },
    iosStrong: {
      ...shadowProperties(0, 3, 0.25, 4, 3),
    },
  },
};

export default theme;
