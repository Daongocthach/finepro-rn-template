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
    bundleIdentifier: 'com.gempixel.reactnativetemplate',
    infoPlist: {
      CFBundleDisplayName: 'React Native Template',
      CFBundleAllowMixedLocalizations: true,
      CFBundleLocalizations: ['en', 'vi'],
      ITSAppUsesNonExemptEncryption: false,
    },
    buildNumber: '1',
  },
  android: {
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: './assets/android-icon-foreground.png',
      backgroundImage: './assets/android-icon-background.png',
      monochromeImage: './assets/android-icon-monochrome.png',
      backgroundColor: '#0F172A',
    },
    package: 'com.gempixel.reactnativetemplate',
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
          ios: ['en', 'vi'],
          android: ['en', 'vi'],
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
