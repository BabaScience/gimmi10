import React, { type ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { Theme } from '@/constants/Theme';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  footer?: ReactNode;
}

export function Card({
  children,
  title,
  subtitle,
  style,
  contentStyle,
  headerStyle,
  titleStyle,
  subtitleStyle,
  footer,
}: CardProps) {
  const hasHeader = Boolean(title) || Boolean(subtitle);
  
  return (
    <View style={[styles.card, style]}>
      {hasHeader && (
        <View style={[styles.header, headerStyle]}>
          {Boolean(title) && <Text style={[styles.title, titleStyle]}>{title}</Text>}
          {Boolean(subtitle) && <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>}
        </View>
      )}
      
      <View style={[styles.content, contentStyle]}>{children}</View>
      
      {footer && <View style={styles.footer}>{footer}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.lg,
    overflow: 'hidden',
  },
  header: {
    padding: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  title: {
    ...Theme.typography.h4,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    ...Theme.typography.body2,
    color: Theme.colors.textSecondary,
  },
  content: {
    padding: Theme.spacing.md,
  },
  footer: {
    padding: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
  },
});