import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

interface Props {
  value: number;
}

const AnimatedCounter: React.FC<Props> = ({ value }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const color = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.4,
          duration: 150,
          useNativeDriver: false,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 150,
          useNativeDriver: false,
        }),
      ]),
      Animated.timing(color, {
        toValue: value % 2,
        duration: 400,
        useNativeDriver: false,
      }),
    ]).start();
  }, [value]);

  const animatedColor = color.interpolate({
    inputRange: [0, 1],
    outputRange: ['#1abc9c', '#e67e22'],
  });

  return (
    <Animated.Text
      style={[
        styles.counter,
        {
          transform: [{ scale }],
          color: animatedColor,
        },
      ]}>
      {value}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  counter: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 25,
  },
});

export default AnimatedCounter;
