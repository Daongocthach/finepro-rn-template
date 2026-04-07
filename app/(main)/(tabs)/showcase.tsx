import { Album, ChevronRight, Mail, PieChart, Sparkles, Wallet } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import {
  Accordion,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Chip,
  Divider,
  EmptyState,
  Input,
  ListItem,
  Loading,
  ProgressBar,
  RadioGroup,
  ScreenContainer,
  SearchBar,
  SegmentedControl,
  Select,
  Switch,
  Text,
  TextArea,
} from '@/common/components';

export default function ShowcaseTab() {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('groceries');
  const [segment, setSegment] = useState('week');
  const [checked, setChecked] = useState(true);
  const [radioValue, setRadioValue] = useState('smart');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [loadingButtons, setLoadingButtons] = useState(false);

  const selectOptions = [
    { label: t('showcase.options.groceries'), value: 'groceries' },
    { label: t('showcase.options.transport'), value: 'transport' },
    { label: t('showcase.options.utilities'), value: 'utilities' },
  ];

  const frequencyOptions = [
    { label: t('showcase.options.day'), value: 'day' },
    { label: t('showcase.options.week'), value: 'week' },
    { label: t('showcase.options.month'), value: 'month' },
  ];

  const budgetModeOptions = [
    { label: t('showcase.options.smartMode'), value: 'smart' },
    { label: t('showcase.options.manualMode'), value: 'manual' },
  ];

  const accordionItems = [
    {
      id: 'tokens',
      title: t('showcase.accordion.tokensTitle'),
      content: (
        <Text variant="bodySmall" color="secondary">
          {t('showcase.accordion.tokensBody')}
        </Text>
      ),
    },
    {
      id: 'forms',
      title: t('showcase.accordion.formsTitle'),
      content: (
        <Text variant="bodySmall" color="secondary">
          {t('showcase.accordion.formsBody')}
        </Text>
      ),
    },
  ];

  const handleSimulateLoading = () => {
    setLoadingButtons(true);
    setTimeout(() => setLoadingButtons(false), 1200);
  };

  return (
    <ScreenContainer scrollable padded edges={['top', 'bottom']} tabBarAware>
      <View style={styles.content}>
        <Card variant="elevated" style={styles.section}>
          <View style={styles.overviewHeader}>
            <View style={styles.profileRow}>
              <Badge count={3}>
                <Avatar initials="HT" size="lg" accessibilityLabel={t('showcase.avatarLabel')} />
              </Badge>
              <View style={styles.profileText}>
                <Text variant="h3">{t('showcase.profileTitle')}</Text>
                <Text variant="bodySmall" color="secondary">
                  {t('showcase.profileSubtitle')}
                </Text>
              </View>
            </View>
            <Chip
              label={t('showcase.statusReady')}
              variant="solid"
              selected
              icon={
                <Sparkles
                  size={16}
                  color={theme.colors.icon.inverse}
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              }
            />
          </View>
          <View style={styles.metricsRow}>
            <View style={styles.metricCard}>
              <Text variant="overline" color="secondary">
                {t('showcase.metrics.completion')}
              </Text>
              <Text variant="h3">{t('showcase.metrics.completionValue')}</Text>
              <ProgressBar value={78} />
            </View>
            <View style={styles.metricCard}>
              <Text variant="overline" color="secondary">
                {t('showcase.metrics.components')}
              </Text>
              <Text variant="h3">{t('showcase.metrics.componentsValue')}</Text>
              <Text variant="bodySmall" color="secondary">
                {t('showcase.metrics.componentsHint')}
              </Text>
            </View>
          </View>
        </Card>

        <Card variant="filled" style={styles.section}>
          <Text variant="h3">{t('showcase.sections.actions')}</Text>
          <View style={styles.buttonGrid}>
            <Button title={t('showcase.actions.primary')} onPress={handleSimulateLoading} />
            <Button
              title={t('showcase.actions.secondary')}
              variant="secondary"
              onPress={() => undefined}
            />
            <Button
              title={t('showcase.actions.outline')}
              variant="outline"
              onPress={() => undefined}
            />
            <Button title={t('showcase.actions.ghost')} variant="ghost" onPress={() => undefined} />
            <Button
              title={t('showcase.actions.loading')}
              loading={loadingButtons}
              onPress={handleSimulateLoading}
              fullWidth
            />
          </View>
        </Card>

        <Card variant="filled" style={styles.section}>
          <Text variant="h3">{t('showcase.sections.inputs')}</Text>
          <View style={styles.stackMd}>
            <SearchBar
              value={query}
              onChangeText={setQuery}
              placeholder={t('showcase.searchPlaceholder')}
            />
            <Input
              label={t('showcase.emailLabel')}
              value={email}
              onChangeText={setEmail}
              placeholder={t('showcase.emailPlaceholder')}
              helperText={t('showcase.emailHelper')}
              leftIcon={
                <Mail
                  size={18}
                  color={theme.colors.icon.muted}
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              }
            />
            <Select
              label={t('showcase.categoryLabel')}
              value={category}
              onChange={setCategory}
              options={selectOptions}
              placeholder={t('showcase.categoryPlaceholder')}
            />
            <TextArea
              label={t('showcase.notesLabel')}
              value={notes}
              onChangeText={setNotes}
              placeholder={t('showcase.notesPlaceholder')}
              showCount
              maxLength={140}
            />
          </View>
        </Card>

        <Card variant="filled" style={styles.section}>
          <Text variant="h3">{t('showcase.sections.selection')}</Text>
          <View style={styles.stackMd}>
            <SegmentedControl value={segment} onChange={setSegment} options={frequencyOptions} />
            <Checkbox
              checked={checked}
              onChange={setChecked}
              label={t('showcase.selection.checkbox')}
            />
            <RadioGroup value={radioValue} onChange={setRadioValue} options={budgetModeOptions} />
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              label={t('showcase.selection.notifications')}
            />
          </View>
        </Card>

        <Card variant="filled" style={styles.section}>
          <Text variant="h3">{t('showcase.sections.display')}</Text>
          <View style={styles.stackMd}>
            <ListItem
              title={t('showcase.list.primaryTitle')}
              subtitle={t('showcase.list.primarySubtitle')}
              left={
                <Wallet
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
              divider
            />
            <ListItem
              title={t('showcase.list.secondaryTitle')}
              subtitle={t('showcase.list.secondarySubtitle')}
              left={
                <PieChart
                  size={20}
                  color={theme.colors.icon.primary}
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              }
              right={<Badge count={8} colorScheme="info" />}
            />
            <Divider />
            <Accordion items={accordionItems} />
          </View>
        </Card>

        <Card variant="outlined" style={styles.section}>
          <Text variant="h3">{t('showcase.sections.feedback')}</Text>
          <View style={styles.feedbackGrid}>
            <View style={styles.feedbackItem}>
              <Loading message={t('showcase.loadingMessage')} />
            </View>
            <View style={styles.feedbackItem}>
              <EmptyState
                title={t('showcase.empty.title')}
                message={t('showcase.empty.message')}
                icon={
                  <Album
                    size={28}
                    color={theme.colors.icon.secondary}
                    strokeWidth={2}
                    absoluteStrokeWidth
                  />
                }
                actionLabel={t('showcase.empty.action')}
                onAction={() => undefined}
              />
            </View>
          </View>
        </Card>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create((theme) => ({
  content: {
    gap: theme.metrics.spacingV.p16,
  },
  section: {
    gap: theme.metrics.spacingV.p16,
  },
  overviewHeader: {
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
  profileText: {
    flex: 1,
    gap: theme.metrics.spacingV.p4,
  },
  metricsRow: {
    gap: theme.metrics.spacingV.p12,
  },
  metricCard: {
    gap: theme.metrics.spacingV.p8,
    padding: theme.metrics.spacing.p16,
    backgroundColor: theme.colors.background.elevated,
    borderRadius: theme.metrics.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.metrics.spacing.p12,
  },
  stackMd: {
    gap: theme.metrics.spacingV.p12,
  },
  feedbackGrid: {
    gap: theme.metrics.spacingV.p16,
  },
  feedbackItem: {
    padding: theme.metrics.spacing.p16,
    borderRadius: theme.metrics.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
    backgroundColor: theme.colors.background.surface,
  },
}));
