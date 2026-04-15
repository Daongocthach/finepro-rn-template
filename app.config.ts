import type { ExpoConfig } from '@expo/config-types';
import 'tsx/cjs';

const config: ExpoConfig = {
  name: 'React Native Template',
  slug: 'react-native-template',
  version: '1.0.0',
  orientation: 'portrait',
  scheme: 'react-native-template',
  userInterfaceStyle: 'automatic',
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.fineproautomation.fineprotools',
    icon: {
      light: './assets/ios-light.png',
    },
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
      CFBundleLocalizations: ['en', 'vi', 'zh-CN', 'zh-TW'],
      ITSAppUsesNonExemptEncryption: false,
    },
    buildNumber: '1',
  },
  android: {
    versionCode: 1,
    softwareKeyboardLayoutMode: 'resize',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: 'com.fineproautomation.fineprotools',
  },
  extra: {
    router: {},
    eas: {
      projectId: '',
    },
  },
  plugins: [
    [
      'expo-localization',
      {
        supportedLocales: {
          ios: ['en', 'vi', 'zh-CN', 'zh-TW'],
          android: ['en', 'vi', 'zh-CN', 'zh-TW'],
        },
      },
    ],
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#0F172A',
        dark: {
          image: './assets/splash-icon.png',
          backgroundColor: '#020617',
        },
      },
    ],
    [
      'expo-font',
      {
        fonts: [
          './assets/fonts/Inter-Regular.ttf',
          './assets/fonts/Inter-Medium.ttf',
          './assets/fonts/Inter-SemiBold.ttf',
          './assets/fonts/Inter-Bold.ttf',
        ],
      },
    ],
    'expo-image',
    ['./plugins/with-android-splits'],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: false,
  },
};

export default config;
