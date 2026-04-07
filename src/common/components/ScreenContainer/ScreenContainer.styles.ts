import { StyleSheet, type UnistylesVariants } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.app,
  },
  padded: {
    paddingHorizontal: {
      xs: theme.metrics.spacing.p12,
      sm: theme.metrics.spacing.p16,
      md: theme.metrics.spacing.p24,
      lg: theme.metrics.spacing.p32,
    },
  },
  edgeTop: {
    paddingTop: theme.metrics.spacingV.p8,
  },
  edgeBottom: {
    paddingBottom: rt.insets.bottom + theme.metrics.spacing.p4,
  },
  tabBarAwareExtra: {
    paddingBottom: theme.metrics.spacing.p12,
  },
}));

export type ScreenContainerStyleVariants = UnistylesVariants<typeof styles>;
