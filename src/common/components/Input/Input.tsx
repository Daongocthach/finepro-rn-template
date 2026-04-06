import { Eye, EyeOff } from 'lucide-react-native';
import { useState } from 'react';
import { View, Pressable } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { Text } from '@/common/components/Text';
import { UniTextInput } from '@/common/components/uni';
import { styles } from './Input.styles';
import type { InputProps } from './Input.types';

/**
 * A themed text input with optional label, icons, error/helper text, and password visibility toggle.
 *
 * @example
 * ```tsx
 * <Input label="Email" placeholder="you@example.com" error={errors.email} />
 * ```
 */
export function Input({
  label,
  error,
  helperText,
  disabled = false,
  size = 'md',
  leftIcon,
  rightIcon,
  secureTextEntry,
  style,
  ...rest
}: InputProps) {
  const { theme } = useUnistyles();
  const [focused, setFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const isPassword = secureTextEntry !== undefined;
  const shouldObscure = isPassword && !passwordVisible;

  styles.useVariants({
    size,
    focused,
    error: !!error,
    disabled,
  });

  const passwordToggle = isPassword ? (
    <Pressable
      onPress={() => setPasswordVisible((prev) => !prev)}
      accessibilityRole="button"
      accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
      hitSlop={8}
    >
      {passwordVisible ? (
        <EyeOff size={20} color={theme.colors.icon.muted} strokeWidth={2} absoluteStrokeWidth />
      ) : (
        <Eye size={20} color={theme.colors.icon.muted} strokeWidth={2} absoluteStrokeWidth />
      )}
    </Pressable>
  ) : null;

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text variant="label" style={styles.label}>
          {label}
        </Text>
      )}
      <View style={styles.inputContainer}>
        {leftIcon}
        <UniTextInput
          style={[styles.input, style]}
          editable={!disabled}
          secureTextEntry={shouldObscure}
          accessibilityLabel={label}
          accessibilityState={{ disabled }}
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          uniProps={(unistylesTheme) => ({
            placeholderTextColor: unistylesTheme.colors.text.muted,
          })}
          {...rest}
        />
        {passwordToggle ?? rightIcon}
      </View>
      {error && (
        <Text variant="caption" style={styles.errorText}>
          {error}
        </Text>
      )}
      {!error && helperText && (
        <Text variant="caption" style={styles.helperText}>
          {helperText}
        </Text>
      )}
    </View>
  );
}
