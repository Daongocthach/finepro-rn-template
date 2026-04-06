import { LinearGradient } from 'expo-linear-gradient';
import {
  ChartColumn,
  Circle,
  House,
  Library,
  Plus,
  User,
  type LucideIcon,
} from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUnistyles } from 'react-native-unistyles';
import { vs } from '@/theme/metrics';
import { styles } from './TabBar.styles';
import type { TabBarProps } from './TabBar.types';

const TAB_ICONS: Record<string, { active: LucideIcon; inactive: LucideIcon }> = {
  index: { active: House, inactive: House },
  stats: { active: ChartColumn, inactive: ChartColumn },
  add: { active: Plus, inactive: Plus },
  favorites: { active: Library, inactive: Library },
  profile: { active: User, inactive: User },
};

export function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const { theme } = useUnistyles();

  return (
    <View style={[styles.container, { marginBottom: insets.bottom + vs(12) }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const icons = TAB_ICONS[route.name] ?? { active: Circle, inactive: Circle };
        const TabIcon = isFocused ? icons.active : icons.inactive;
        const isAddTab = route.name === 'add';
        let iconColor = theme.colors.icon.primary;

        if (isAddTab) {
          iconColor = theme.colors.icon.inverse;
        } else if (isFocused) {
          iconColor = theme.colors.icon.primary;
        }

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            accessibilityRole="tab"
            accessibilityState={{ selected: isFocused }}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            style={[styles.tab, isAddTab ? styles.addTab : styles.standardTab]}
          >
            {isAddTab ? (
              <View style={styles.addBubble}>
                <LinearGradient
                  colors={theme.colors.gradient.accent}
                  style={styles.addBubbleGradient}
                >
                  <TabIcon
                    size={24}
                    color={iconColor}
                    accessibilityRole="image"
                    accessibilityLabel={options.title}
                    strokeWidth={2}
                    absoluteStrokeWidth
                  />
                </LinearGradient>
              </View>
            ) : (
              <View
                style={[
                  styles.tabBubble,
                  isFocused ? styles.tabBubbleActive : styles.tabBubbleInactive,
                ]}
              >
                <TabIcon
                  size={18}
                  color={iconColor}
                  accessibilityRole="image"
                  accessibilityLabel={options.title}
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
