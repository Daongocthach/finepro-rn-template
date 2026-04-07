import {
  Bell,
  ChevronRight,
  CircleUser,
  Info,
  LifeBuoy,
  LogOut,
  MessageCircleMore,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Trash2,
  Wallet,
} from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import {
  Avatar,
  Button,
  Card,
  Chip,
  ListItem,
  ScreenContainer,
  Switch,
  Text,
} from '@/common/components';
import { useAuthStore } from '@/providers/auth/authStore';
import { getCurrentMode, toggleDarkMode } from '@/theme/themeManager';

export default function SettingsTab() {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const [isDarkMode, setIsDarkMode] = useState(getCurrentMode() === 'dark');
  const clearSession = useAuthStore((state) => state.clearSession);

  const handleDarkModeChange = (value: boolean) => {
    setIsDarkMode(value);
    toggleDarkMode(value);
  };

  return (
    <ScreenContainer scrollable padded edges={['top', 'bottom']} tabBarAware>
      <View style={styles.screen}>
        <Card variant="elevated" style={styles.profileCard}>
          <View style={styles.profileRow}>
            <Avatar initials="AJ" size="xl" accessibilityLabel={t('settings.profile.name')} />
            <View style={styles.profileInfo}>
              <Text variant="h2">{t('settings.profile.name')}</Text>
              <Text variant="bodySmall" color="secondary">
                {t('settings.profile.email')}
              </Text>
              <Chip
                label={isDarkMode ? t('settings.darkMode') : t('settings.appearance')}
                variant="outline"
                icon={
                  <Sparkles
                    size={16}
                    color={theme.colors.icon.accent}
                    strokeWidth={2}
                    absoluteStrokeWidth
                  />
                }
              />
            </View>
          </View>
          <Button
            title={t('settings.profile.editProfile')}
            variant="secondary"
            onPress={() => undefined}
          />
        </Card>

        <View style={styles.sectionBlock}>
          <Text variant="overline" color="secondary">
            {t('settings.sections.account')}
          </Text>
          <Card variant="filled" style={styles.sectionCard}>
            <ListItem
              title={t('settings.account.profile')}
              subtitle={t('settings.account.profileSubtitle')}
              divider
              left={
                <CircleUser
                  size={22}
                  color={theme.colors.icon.primary}
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              }
              right={
                <ChevronRight
                  size={18}
                  color={theme.colors.icon.muted}
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              }
            />
            <ListItem
              title={t('settings.account.security')}
              subtitle={t('settings.account.securitySubtitle')}
              divider
              left={
                <ShieldCheck
                  size={22}
                  color={theme.colors.icon.accent}
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              }
              right={
                <ChevronRight
                  size={18}
                  color={theme.colors.icon.muted}
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              }
            />
            <ListItem
              title={t('settings.account.billing')}
              subtitle={t('settings.account.billingSubtitle')}
              divider
              left={
                <Wallet
                  size={22}
                  color={theme.colors.icon.secondary}
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              }
              right={
                <ChevronRight
                  size={18}
                  color={theme.colors.icon.muted}
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              }
            />
            <ListItem
              title={t('settings.account.notifications')}
              subtitle={t('settings.account.notificationsSubtitle')}
              left={
                <Bell
                  size={22}
                  color={theme.colors.state.error}
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              }
              right={
                <ChevronRight
                  size={18}
                  color={theme.colors.icon.muted}
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              }
            />
          </Card>
        </View>

        <View style={styles.sectionBlock}>
          <Text variant="overline" color="secondary">
            {t('settings.sections.preferences')}
          </Text>
          <Card variant="filled" style={styles.sectionCard}>
            <View style={styles.preferenceRow}>
              <View style={styles.preferenceCopy}>
                <Text variant="body" weight="medium">
                  {t('settings.darkMode')}
                </Text>
                <Text variant="caption" color="secondary">
                  {t('settings.appearance')}
                </Text>
              </View>
              <Switch value={isDarkMode} onValueChange={handleDarkModeChange} />
            </View>
            <View style={styles.preferenceDivider} />
            <ListItem
              title={t('settings.preferences.pushNotifications')}
              subtitle={t('settings.account.notificationsSubtitle')}
              divider
              left={
                <Send
                  size={20}
                  color={theme.colors.icon.primary}
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              }
              right={
                <ChevronRight
                  size={18}
                  color={theme.colors.icon.muted}
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              }
            />
            <ListItem
              title={t('settings.preferences.appIcon')}
              subtitle={t('settings.preferences.appIconSubtitle')}
              left={
                <Smartphone
                  size={20}
                  color={theme.colors.icon.accent}
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              }
              right={
                <ChevronRight
                  size={18}
                  color={theme.colors.icon.muted}
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              }
            />
          </Card>
        </View>

        <View style={styles.sectionBlock}>
          <Text variant="overline" color="secondary">
            {t('settings.sections.support')}
          </Text>
          <Card variant="filled" style={styles.sectionCard}>
            <ListItem
              title={t('settings.support.helpCenter')}
              subtitle={t('settings.support.helpCenterSubtitle')}
              divider
              left={
                <LifeBuoy
                  size={20}
                  color={theme.colors.icon.primary}
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              }
              right={
                <ChevronRight
                  size={18}
                  color={theme.colors.icon.muted}
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              }
            />
            <ListItem
              title={t('settings.support.feedback')}
              subtitle={t('settings.support.feedbackSubtitle')}
              divider
              left={
                <MessageCircleMore
                  size={20}
                  color={theme.colors.icon.accent}
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              }
              right={
                <ChevronRight
                  size={18}
                  color={theme.colors.icon.muted}
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              }
            />
            <ListItem
              title={t('settings.about')}
              subtitle={t('settings.support.aboutSubtitle')}
              left={
                <Info
                  size={20}
                  color={theme.colors.icon.secondary}
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              }
              right={
                <Text variant="caption" color="secondary">
                  {t('settings.version')} 1.0.0
                </Text>
              }
            />
          </Card>
        </View>

        <View style={styles.sectionBlock}>
          <Text variant="overline" color="secondary">
            {t('settings.sections.danger')}
          </Text>
          <Card variant="outlined" style={styles.sectionCard}>
            <Pressable style={styles.dangerRow} onPress={clearSession}>
              <View style={styles.dangerCopy}>
                <Text variant="body" weight="medium">
                  {t('settings.danger.logout')}
                </Text>
                <Text variant="caption" color="secondary">
                  {t('settings.danger.logoutSubtitle')}
                </Text>
              </View>
              <LogOut
                size={20}
                color={theme.colors.state.error}
                strokeWidth={2}
                absoluteStrokeWidth
              />
            </Pressable>
            <View style={styles.preferenceDivider} />
            <Pressable style={styles.dangerRow}>
              <View style={styles.dangerCopy}>
                <Text variant="body" weight="medium">
                  {t('settings.danger.deleteAccount')}
                </Text>
                <Text variant="caption" color="secondary">
                  {t('settings.danger.deleteAccountSubtitle')}
                </Text>
              </View>
              <Trash2
                size={20}
                color={theme.colors.state.error}
                strokeWidth={2}
                absoluteStrokeWidth
              />
            </Pressable>
          </Card>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: {
    gap: theme.metrics.spacingV.p20,
  },
  profileCard: {
    gap: theme.metrics.spacingV.p16,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.metrics.spacing.p16,
  },
  profileInfo: {
    flex: 1,
    gap: theme.metrics.spacingV.p8,
  },
  sectionBlock: {
    gap: theme.metrics.spacingV.p12,
  },
  sectionCard: {
    overflow: 'hidden',
  },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.metrics.spacing.p12,
    padding: theme.metrics.spacing.p16,
  },
  preferenceCopy: {
    flex: 1,
    gap: theme.metrics.spacingV.p4,
  },
  preferenceDivider: {
    height: 1,
    backgroundColor: theme.colors.border.subtle,
    marginHorizontal: theme.metrics.spacing.p16,
  },
  dangerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.metrics.spacing.p12,
    padding: theme.metrics.spacing.p16,
  },
  dangerCopy: {
    flex: 1,
    gap: theme.metrics.spacingV.p4,
  },
}));
