import { ChevronLeft, Cloud, CloudOff } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { Text } from '../Text';
import { useAuthStore } from '@/providers/auth/authStore';
import { styles } from './TabsHeader.styles';
import type { TabsHeaderProps } from './TabsHeader.types';

export function TabsHeader({
  title,
  onBack,
  onSyncPress,
  showSync = true,
  backDisabled = false,
}: TabsHeaderProps) {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  let syncLabel = t('common.syncStatus.syncNow');
  let syncVariant: 'secondary' | 'muted' = 'secondary';

  if (!isAuthenticated) {
    syncLabel = t('common.syncStatus.loginToSync');
    syncVariant = 'muted';
  }

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t('common.back')}
        accessibilityState={{ disabled: backDisabled }}
        disabled={backDisabled}
        onPress={onBack}
        style={[styles.iconButton, backDisabled ? styles.iconButtonDisabled : null]}
      >
        <ChevronLeft
          size={20}
          color={theme.colors.icon.secondary}
          strokeWidth={2}
          absoluteStrokeWidth
        />
      </Pressable>
      <Text variant="h3" style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      {showSync ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={syncLabel}
          onPress={() => {
            if (onSyncPress) {
              onSyncPress();
            }
          }}
          style={styles.iconButton}
        >
          {isAuthenticated ? (
            <Cloud
              size={20}
              color={theme.colors.icon[syncVariant]}
              strokeWidth={2}
              absoluteStrokeWidth
            />
          ) : (
            <CloudOff
              size={20}
              color={theme.colors.icon[syncVariant]}
              strokeWidth={2}
              absoluteStrokeWidth
            />
          )}
        </Pressable>
      ) : (
        <View style={styles.iconButtonPlaceholder} />
      )}
    </View>
  );
}
