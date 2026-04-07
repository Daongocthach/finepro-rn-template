import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { TabBar } from '@/common/components/TabBar';

function getIOSMajorVersion() {
  if (Platform.OS !== 'ios') {
    return 0;
  }

  const rawVersion = Platform.Version;

  if (typeof rawVersion === 'number') {
    return rawVersion;
  }

  const major = Number.parseInt(rawVersion.split('.')[0] ?? '0', 10);
  return Number.isNaN(major) ? 0 : major;
}

export default function TabLayout() {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const shouldUseNativeTabs = Platform.OS === 'ios' && getIOSMajorVersion() >= 26;

  if (shouldUseNativeTabs) {
    return (
      <NativeTabs
        key={theme.colors.mode}
        tintColor={theme.colors.brand.primary}
        iconColor={{
          default: theme.colors.icon.muted,
          selected: theme.colors.brand.primary,
        }}
        labelStyle={{
          default: {
            color: theme.colors.text.secondary,
          },
          selected: {
            color: theme.colors.brand.primary,
          },
        }}
        backgroundColor={theme.colors.background.surface}
        blurEffect={theme.colors.mode === 'dark' ? 'systemMaterialDark' : 'systemMaterialLight'}
        shadowColor={theme.colors.border.subtle}
        rippleColor={theme.colors.overlay.pressed}
        disableTransparentOnScrollEdge
      >
        <NativeTabs.Trigger name="index">
          <NativeTabs.Trigger.Icon
            src={
              <NativeTabs.Trigger.VectorIcon family={MaterialCommunityIcons} name="home-outline" />
            }
          />
          <NativeTabs.Trigger.Label>{t('tabs.home')}</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="settings">
          <NativeTabs.Trigger.Icon
            src={
              <NativeTabs.Trigger.VectorIcon family={MaterialCommunityIcons} name="cog-outline" />
            }
          />
          <NativeTabs.Trigger.Label>{t('tabs.settings')}</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="showcase">
          <NativeTabs.Trigger.Icon
            src={
              <NativeTabs.Trigger.VectorIcon
                family={MaterialCommunityIcons}
                name="view-grid-outline"
              />
            }
          />
          <NativeTabs.Trigger.Label>{t('tabs.showcase')}</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  return (
    <Tabs
      key={theme.colors.mode}
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.home'),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('tabs.settings'),
        }}
      />
      <Tabs.Screen
        name="showcase"
        options={{
          title: t('tabs.showcase'),
        }}
      />
    </Tabs>
  );
}
