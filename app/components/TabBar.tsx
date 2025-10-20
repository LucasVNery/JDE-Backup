import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const [animations] = React.useState(
    state.routes.map(() => new Animated.Value(1))
  );

  const animatePress = (index: number) => {
    Animated.sequence([
      Animated.timing(animations[index], {
        toValue: 0.7,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animations[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.navigationContainer}>
      <View style={styles.navigation}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title || route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            animatePress(index);

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              style={[styles.navItem, isFocused && styles.activeNavItem]}
              onPress={onPress}
              activeOpacity={0.7}
            >
              <Animated.View
                style={[
                  styles.square,
                  isFocused ? styles.squareActive : styles.squareInactive,
                  {
                    transform: [{ scale: animations[index] }],
                  },
                ]}
              />
              <Text 
                style={[styles.navLabel, isFocused && styles.activeNavLabel]}
                numberOfLines={1}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 12,
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
  navigation: {
    backgroundColor: 'rgba(17, 24, 39, 0.9)',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(107, 114, 128, 0.2)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 16,
    marginHorizontal: 4,
    minHeight: 60,
  },
  activeNavItem: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.4)',
  },
  square: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginBottom: 4,
  },
  squareActive: {
    backgroundColor: '#3b82f6',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  squareInactive: {
    backgroundColor: '#9ca3af',
    opacity: 0.6,
  },
  navLabel: {
    color: '#9ca3af',
    fontSize: 11,
    fontFamily: 'System',
    fontWeight: '500',
    textAlign: 'center',
    flexShrink: 1,
  },
  activeNavLabel: {
    color: '#3b82f6',
    fontWeight: '600',
  },
});

export default TabBar;