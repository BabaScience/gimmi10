import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Theme } from '@/constants/Theme';

interface PushupCounterProps {
  count: number;
  maxCount?: number;
  showAnimation?: boolean;
}

export function PushupCounter({ 
  count,
  maxCount,
  showAnimation = true
}: PushupCounterProps) {
  const [prevCount, setPrevCount] = useState(count);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  
  // Play haptic feedback when count increases
  useEffect(() => {
    if (count > prevCount && Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    if (count !== prevCount && showAnimation) {
      // Pulse animation
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
      
      // Count change indicator animation
      opacityAnim.setValue(1);
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
    
    setPrevCount(count);
  }, [count, prevCount, scaleAnim, opacityAnim, showAnimation]);
  
  const progress = maxCount ? (count / maxCount) * 100 : 0;
  const progressText = maxCount ? `${count}/${maxCount}` : `${count}`;
  
  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.counterContainer,
          { transform: [{ scale: scaleAnim }] }
        ]}
      >
        <Text style={styles.count}>{count}</Text>
        {maxCount && (
          <Text style={styles.maxCount}>/{maxCount}</Text>
        )}
      </Animated.View>
      
      {maxCount && (
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{progressText}</Text>
        </View>
      )}
      
      <Animated.View 
        style={[
          styles.indicator,
          { opacity: opacityAnim }
        ]}
      >
        <Text style={styles.indicatorText}>+1</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  count: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 72,
    color: Theme.colors.primary,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  maxCount: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 24,
    color: Theme.colors.textSecondary,
    marginBottom: 12,
  },
  progressContainer: {
    width: '100%',
    marginTop: Theme.spacing.sm,
  },
  progressTrack: {
    height: 8,
    backgroundColor: Theme.colors.border,
    borderRadius: Theme.borderRadius.full,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius.full,
  },
  progressText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Theme.colors.textSecondary,
    marginTop: Theme.spacing.xs,
    textAlign: 'center',
  },
  indicator: {
    position: 'absolute',
    top: -30,
    right: -20,
    backgroundColor: Theme.colors.secondary,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,
  },
  indicatorText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: 'white',
  },
});