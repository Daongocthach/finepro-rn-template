import { Check, Trash2, X } from 'lucide-react-native';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import type { StyleProp, TextStyle } from 'react-native';
import { Pressable, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { Button } from '@/common/components/Button';
import { Text } from '@/common/components/Text';
import {
  appAlert,
  registerAppAlertHandler,
  type AppAlertButton,
  type AppAlertPayload,
} from './appAlert';

interface AppAlertProviderProps {
  children: ReactNode;
}

function getButtonVariant(button: AppAlertButton) {
  if (button.style === 'cancel') {
    return 'outline' as const;
  }

  if (button.style === 'destructive') {
    return 'secondary' as const;
  }

  return 'primary' as const;
}

function getButtonIcon(
  button: AppAlertButton,
  colors: {
    icon: { primary: string; onBrand: string };
    state: { error: string };
  }
) {
  if (button.style === 'cancel') {
    return <X size={16} color={colors.icon.primary} strokeWidth={2} absoluteStrokeWidth />;
  }

  if (button.style === 'destructive') {
    return <Trash2 size={16} color={colors.state.error} strokeWidth={2} absoluteStrokeWidth />;
  }

  return <Check size={16} color={colors.icon.onBrand} strokeWidth={2} absoluteStrokeWidth />;
}

function getButtonLabelStyle(button: AppAlertButton): StyleProp<TextStyle> | undefined {
  if (button.style === 'destructive') {
    return styles.destructiveLabel;
  }

  return undefined;
}

export function AppAlertProvider({ children }: AppAlertProviderProps) {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const [currentAlert, setCurrentAlert] = useState<AppAlertPayload | null>(null);

  useEffect(() => registerAppAlertHandler(setCurrentAlert), []);

  const dismiss = () => setCurrentAlert(null);

  const actions = useMemo(() => {
    const fallbackButtons: AppAlertButton[] = [{ text: String(t('common.ok' as never)) }];
    const nextButtons: AppAlertButton[] = currentAlert?.buttons?.length
      ? currentAlert.buttons
      : fallbackButtons;

    return nextButtons.map((button) => ({
      text: button.text,
      variant: getButtonVariant(button),
      leftIcon: getButtonIcon(button, theme.colors),
      labelStyle: getButtonLabelStyle(button),
      onPress: () => {
        dismiss();
        button.onPress?.();
      },
    }));
  }, [currentAlert?.buttons, t, theme.colors]);

  const dismissOnBackdropPress = currentAlert?.options?.dismissOnBackdropPress ?? true;

  return (
    <View style={styles.container}>
      {children}

      {currentAlert ? (
        <Pressable
          style={styles.backdrop}
          onPress={dismissOnBackdropPress ? dismiss : undefined}
          accessibilityRole="alert"
        >
          <Pressable style={styles.card} onPress={() => {}}>
            <Text variant="h2" style={styles.title}>
              {currentAlert.title}
            </Text>

            {currentAlert.message ? (
              <Text variant="bodySmall" style={styles.message}>
                {currentAlert.message}
              </Text>
            ) : null}

            <View style={styles.actions}>
              {actions.map((action) => (
                <Button
                  key={action.text}
                  title={action.text}
                  variant={action.variant}
                  size="sm"
                  leftIcon={action.leftIcon}
                  labelStyle={action.labelStyle}
                  onPress={action.onPress}
                />
              ))}
            </View>
          </Pressable>
        </Pressable>
      ) : null}
    </View>
  );
}

export function useAppAlert() {
  return appAlert;
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    backgroundColor: theme.colors.overlay.modal,
    padding: theme.metrics.spacing.p16,
  },
  card: {
    width: '85%',
    maxWidth: 420,
    backgroundColor: theme.colors.background.modal,
    borderRadius: theme.metrics.borderRadius.xl,
    padding: theme.metrics.spacing.p24,
    gap: theme.metrics.spacingV.p12,
  },
  title: {
    color: theme.colors.text.primary,
    textAlign: 'center' as const,
  },
  message: {
    color: theme.colors.text.tertiary,
    textAlign: 'center' as const,
  },
  destructiveLabel: {
    color: theme.colors.state.error,
  },
  actions: {
    flexDirection: 'row' as const,
    justifyContent: 'flex-end' as const,
    flexWrap: 'wrap' as const,
    gap: theme.metrics.spacing.p8,
    marginTop: theme.metrics.spacingV.p8,
  },
}));
