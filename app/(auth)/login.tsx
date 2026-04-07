import { Image } from 'expo-image';
import { Redirect } from 'expo-router';
import { Lock, User } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import GoogleLogo from '../../assets/google-logo.png';
import LoginBanner from '../../assets/login-banner.png';
import { Button, Input, ScreenContainer, Text } from '@/common/components';
import { login } from '@/features/auth/services/authService';
import { useAuthStore } from '@/providers/auth/authStore';

const INVALID_CREDENTIALS_KEY = 'auth.login.invalidCredentials' as const;

export default function LoginScreen() {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const hydrateAuth = useAuthStore((state) => state.hydrateAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('1234');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  if (!isLoading && isAuthenticated) {
    return <Redirect href="/(main)/(tabs)" />;
  }

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const result = await login({ username, password });
      hydrateAuth(result);
    } catch (submitError) {
      const message =
        submitError instanceof Error && submitError.message === INVALID_CREDENTIALS_KEY
          ? INVALID_CREDENTIALS_KEY
          : INVALID_CREDENTIALS_KEY;
      setError(t(message));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError(null);

    try {
      setError(t('auth.login.googleUnavailable'));
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <ScreenContainer scrollable padded={false} edges={['bottom']}>
      <View style={styles.screen}>
        <Image source={LoginBanner} style={styles.heroImage} contentFit="contain" />

        <View style={styles.formPanel}>
          <View style={styles.formHeader}>
            <Text variant="h2">{t('auth.login.submit')}</Text>
            <Text variant="bodySmall" color="secondary">
              {t('auth.login.subtitle')}
            </Text>
          </View>

          <View style={styles.formContent}>
            <Input
              label={t('auth.login.usernameLabel')}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="username"
              accessibilityLabel={t('auth.login.usernameLabel')}
              placeholder={t('auth.login.usernamePlaceholder')}
              leftIcon={
                <User
                  size={20}
                  color={theme.colors.icon.muted}
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              }
            />

            <Input
              label={t('auth.login.passwordLabel')}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
              accessibilityLabel={t('auth.login.passwordLabel')}
              placeholder={t('auth.login.passwordPlaceholder')}
              leftIcon={
                <Lock
                  size={20}
                  color={theme.colors.icon.muted}
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              }
            />

            {error ? (
              <View style={styles.errorBanner}>
                <Text variant="bodySmall" style={styles.errorText}>
                  {error}
                </Text>
              </View>
            ) : null}

            <Button
              title={t('auth.login.submit')}
              loading={submitting}
              disabled={submitting || googleLoading}
              onPress={() => {
                void handleSubmit();
              }}
              style={styles.submitButton}
            />

            <Button
              title={t('auth.login.signInWithGoogle')}
              variant="outline"
              loading={googleLoading}
              disabled={submitting || googleLoading}
              onPress={() => {
                void handleGoogleSignIn();
              }}
              style={styles.googleButton}
              leftIcon={
                <Image source={GoogleLogo} style={styles.googleLogo} contentFit="contain" />
              }
            />
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create((theme, runtime) => ({
  screen: {
    flex: 1,
    paddingHorizontal: theme.metrics.spacing.p20,
    paddingTop: runtime.insets.top + theme.metrics.spacingV.p20,
    paddingBottom: theme.metrics.spacingV.p32,
    gap: theme.metrics.spacingV.p20,
    backgroundColor: theme.colors.background.app,
  },
  heroImage: {
    width: '100%',
    height: 150,
  },
  formPanel: {
    gap: theme.metrics.spacingV.p16,
    paddingHorizontal: theme.metrics.spacing.p20,
    paddingVertical: theme.metrics.spacingV.p20,
    borderRadius: theme.metrics.borderRadius.xl,
    backgroundColor: theme.colors.background.surface,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
    shadowColor: theme.colors.shadow.color,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: theme.colors.shadow.elevationLarge,
  },
  formHeader: {
    gap: theme.metrics.spacingV.p8,
  },
  formContent: {
    gap: theme.metrics.spacingV.p12,
  },
  errorBanner: {
    paddingHorizontal: theme.metrics.spacing.p12,
    paddingVertical: theme.metrics.spacingV.p12,
    borderRadius: theme.metrics.borderRadius.lg,
    backgroundColor: theme.colors.state.errorBg,
    borderWidth: 1,
    borderColor: theme.colors.state.error,
  },
  errorText: {
    color: theme.colors.state.error,
  },
  submitButton: {
    marginTop: theme.metrics.spacingV.p4,
  },
  googleButton: {
    backgroundColor: theme.colors.background.surface,
    borderColor: theme.colors.border.default,
  },
  googleLogo: {
    width: theme.metrics.spacing.p20,
    height: theme.metrics.spacing.p20,
  },
}));
