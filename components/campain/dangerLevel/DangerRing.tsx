import React, { useEffect } from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Text } from '@/components/ui/text';
import { valueToProgress } from '@/utils/dangerLevelGeometry';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface DangerRingProps {
  value: number;
  max: number;
  size: number;
  strokeWidth: number;
  color: string;
  trackColor: string;
  animate?: boolean;
  showLabel?: boolean;
}

export const DangerRing: React.FC<DangerRingProps> = ({
  value,
  max,
  size,
  strokeWidth,
  color,
  trackColor,
  animate = true,
  showLabel = true,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const progress = useSharedValue(valueToProgress(value, max));

  useEffect(() => {
    const target = valueToProgress(value, max);
    progress.value = animate
      ? withTiming(target, { duration: 200, easing: Easing.out(Easing.quad) })
      : target;
  }, [value, max, animate, progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value),
  }));

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          animatedProps={animatedProps}
          rotation={-90}
          origin={`${center}, ${center}`}
        />
      </Svg>
      {showLabel && (
        <View style={{ position: 'absolute', alignItems: 'center' }}>
          <Text
            className="text-foreground font-bold"
            style={{ fontSize: size * 0.24, lineHeight: size * 0.26 }}
          >
            {value}
          </Text>
          <Text className="text-muted-foreground text-[10px] uppercase tracking-wide">
            Danger
          </Text>
        </View>
      )}
    </View>
  );
};
