import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowDown,
  ArrowUp,
  Bell,
  CheckCheck,
  Grid2x2,
  MessageCircleMore,
  Palette,
  Sparkles,
  TrendingUp,
  Wallet,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { Avatar, Card, ListItem, ScreenContainer, SearchBar, Text } from '@/common/components';

function getGreetingKey(hour: number): 'greetingMorning' | 'greetingAfternoon' | 'greetingEvening' {
  if (hour < 12) return 'greetingMorning';
  if (hour < 18) return 'greetingAfternoon';
  return 'greetingEvening';
}

export default function HomeTab() {
  const { t } = useTranslation();
  const { theme } = useUnistyles();

  const greetingKey = getGreetingKey(new Date().getHours());
  const quickActions = [
    {
      key: 'send',
      label: t('home.quickActions.send'),
      icon: ArrowUp,
      toneStyle: styles.actionBubblePrimary,
    },
    {
      key: 'receive',
      label: t('home.quickActions.receive'),
      icon: ArrowDown,
      toneStyle: styles.actionBubbleAccent,
    },
    {
      key: 'pay',
      label: t('home.quickActions.pay'),
      icon: Wallet,
      toneStyle: styles.actionBubbleHighlight,
    },
    {
      key: 'more',
      label: t('home.quickActions.more'),
      icon: Grid2x2,
      toneStyle: styles.actionBubbleSoft,
    },
  ];

  const recentItems = [
    {
      key: 'item1',
      title: t('home.recentActivity.item1Title'),
      subtitle: t('home.recentActivity.item1Subtitle'),
      time: t('home.recentActivity.item1Time'),
      icon: Sparkles,
    },
    {
      key: 'item2',
      title: t('home.recentActivity.item2Title'),
      subtitle: t('home.recentActivity.item2Subtitle'),
      time: t('home.recentActivity.item2Time'),
      icon: CheckCheck,
    },
    {
      key: 'item3',
      title: t('home.recentActivity.item3Title'),
      subtitle: t('home.recentActivity.item3Subtitle'),
      time: t('home.recentActivity.item3Time'),
      icon: MessageCircleMore,
    },
    {
      key: 'item4',
      title: t('home.recentActivity.item4Title'),
      subtitle: t('home.recentActivity.item4Subtitle'),
      time: t('home.recentActivity.item4Time'),
      icon: Wallet,
    },
  ];

  return (
    <ScreenContainer scrollable padded edges={['top', 'bottom']} tabBarAware>
      <View style={styles.screen}>
        <View style={styles.headerRow}>
          <View style={styles.profileRow}>
            <Avatar initials="AJ" size="md" accessibilityLabel={t('settings.profile.name')} />
            <View style={styles.profileCopy}>
              <Text variant="caption" color="secondary">
                {t(`home.${greetingKey}`)}
              </Text>
              <Text variant="h3">{t('home.userName')}</Text>
            </View>
          </View>
          <Pressable accessibilityRole="button" style={styles.iconButton}>
            <Bell
              size={20}
              color={theme.colors.icon.secondary}
              strokeWidth={2}
              absoluteStrokeWidth
            />
          </Pressable>
        </View>

        <SearchBar
          value=""
          onChangeText={() => undefined}
          placeholder={t('home.searchPlaceholder')}
        />

        <View style={styles.quickActionRow}>
          {quickActions.map((action) => (
            <Pressable key={action.key} accessibilityRole="button" style={styles.actionItem}>
              <View style={[styles.actionBubble, action.toneStyle]}>
                <action.icon
                  size={18}
                  color={theme.colors.icon.inverse}
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              </View>
              <Text variant="caption" color="secondary" align="center">
                {action.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text variant="h2">{t('home.featured.title')}</Text>
          <Text variant="bodySmall" color="accent">
            {t('home.featured.seeAll')}
          </Text>
        </View>

        <View style={styles.featuredGrid}>
          <LinearGradient colors={theme.colors.gradient.secondary} style={styles.featuredCard}>
            <View style={styles.featuredIconShell}>
              <Palette
                size={18}
                color={theme.colors.icon.inverse}
                strokeWidth={2}
                absoluteStrokeWidth
              />
            </View>
            <View style={styles.featuredCopy}>
              <Text variant="h3" color="inverse">
                {t('home.featured.card1Title')}
              </Text>
              <Text variant="bodySmall" color="inverse">
                {t('home.featured.card1Subtitle')}
              </Text>
            </View>
          </LinearGradient>

          <LinearGradient colors={theme.colors.gradient.accent} style={styles.featuredCard}>
            <View style={styles.featuredIconShell}>
              <TrendingUp
                size={18}
                color={theme.colors.icon.inverse}
                strokeWidth={2}
                absoluteStrokeWidth
              />
            </View>
            <View style={styles.featuredCopy}>
              <Text variant="h3" color="inverse">
                {t('home.featured.card2Title')}
              </Text>
              <Text variant="bodySmall" color="inverse">
                {t('home.featured.card2Subtitle')}
              </Text>
            </View>
          </LinearGradient>
        </View>

        <Card variant="filled" style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text variant="caption" color="secondary">
                {t('home.stats.projects')}
              </Text>
              <Text variant="h2">12</Text>
              <Text variant="caption" color="accent">
                +3
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="caption" color="secondary">
                {t('home.stats.tasks')}
              </Text>
              <Text variant="h2">48</Text>
              <Text variant="caption" color="secondary">
                -5
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="caption" color="secondary">
                {t('home.stats.messages')}
              </Text>
              <Text variant="h2">7</Text>
              <Text variant="caption" color="accent">
                +2
              </Text>
            </View>
          </View>
        </Card>

        <View style={styles.sectionHeader}>
          <Text variant="h2">{t('home.recentActivity.title')}</Text>
          <Text variant="bodySmall" color="accent">
            {t('home.recentActivity.seeAll')}
          </Text>
        </View>

        <Card variant="elevated" style={styles.activityCard}>
          {recentItems.map((item, index) => (
            <ListItem
              key={item.key}
              title={item.title}
              subtitle={item.subtitle}
              divider={index < recentItems.length - 1}
              left={
                <View style={styles.activityIcon}>
                  <item.icon
                    size={18}
                    color={theme.colors.icon.primary}
                    strokeWidth={2}
                    absoluteStrokeWidth
                  />
                </View>
              }
              right={
                <Text variant="caption" color="secondary">
                  {item.time}
                </Text>
              }
            />
          ))}
        </Card>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: {
    gap: theme.metrics.spacingV.p20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.metrics.spacing.p12,
  },
  profileRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.metrics.spacing.p12,
  },
  profileCopy: {
    gap: theme.metrics.spacingV.p4,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.metrics.borderRadius.full,
    backgroundColor: theme.colors.background.surface,
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
  },
  quickActionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.metrics.spacing.p12,
  },
  actionItem: {
    flex: 1,
    alignItems: 'center',
    gap: theme.metrics.spacingV.p8,
  },
  actionBubble: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.metrics.borderRadius.full,
  },
  actionBubblePrimary: {
    backgroundColor: theme.colors.brand.primary,
  },
  actionBubbleAccent: {
    backgroundColor: theme.colors.brand.tertiary,
  },
  actionBubbleHighlight: {
    backgroundColor: theme.colors.gradient.highlight[0],
  },
  actionBubbleSoft: {
    backgroundColor: theme.colors.gradient.secondary[1],
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.metrics.spacing.p12,
  },
  featuredGrid: {
    flexDirection: 'row',
    gap: theme.metrics.spacing.p12,
  },
  featuredCard: {
    flex: 1,
    minHeight: 152,
    justifyContent: 'space-between',
    padding: theme.metrics.spacing.p16,
    borderRadius: theme.metrics.borderRadius.xl,
  },
  featuredIconShell: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.metrics.borderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  featuredCopy: {
    gap: theme.metrics.spacingV.p8,
  },
  statsCard: {
    borderRadius: theme.metrics.borderRadius.xl,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    gap: theme.metrics.spacing.p8,
  },
  statItem: {
    flex: 1,
    gap: theme.metrics.spacingV.p8,
    paddingVertical: theme.metrics.spacingV.p4,
  },
  activityCard: {
    paddingVertical: theme.metrics.spacingV.p4,
  },
  activityIcon: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.metrics.borderRadius.full,
    backgroundColor: theme.colors.background.section,
  },
}));
