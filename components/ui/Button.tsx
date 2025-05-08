import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { Theme } from '@/constants/Theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  ...props
}: ButtonProps) {
  const buttonStyles: ViewStyle[] = [
    styles.button,
    styles[`button_${variant}`],
    styles[`button_${size}`],
    style as ViewStyle,
  ];

  const textStyles: TextStyle[] = [
    styles.text,
    styles[`text_${variant}`],
    styles[`text_${size}`],
    textStyle as TextStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      activeOpacity={0.8}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator
          color={variant === 'primary' || variant === 'secondary' ? 'white' : Theme.colors.primary}
          size="small"
        />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text style={textStyles}>{title}</Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.borderRadius.lg,
    gap: Theme.spacing.sm,
  },
  text: {
    fontFamily: 'Inter-SemiBold',
  },
  
  // Variants
  button_primary: {
    backgroundColor: Theme.colors.primary,
    borderWidth: 0,
  },
  button_secondary: {
    backgroundColor: Theme.colors.secondary,
    borderWidth: 0,
  },
  button_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Theme.colors.primary,
  },
  button_ghost: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  
  // Text variants
  text_primary: {
    color: 'white',
  },
  text_secondary: {
    color: 'white',
  },
  text_outline: {
    color: Theme.colors.primary,
  },
  text_ghost: {
    color: Theme.colors.primary,
  },
  
  // Sizes
  button_sm: {
    paddingVertical: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.md,
    minHeight: 36,
  },
  button_md: {
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    minHeight: 48,
  },
  button_lg: {
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
    minHeight: 56,
  },
  
  // Text sizes
  text_sm: {
    fontSize: 14,
  },
  text_md: {
    fontSize: 16,
  },
  text_lg: {
    fontSize: 18,
  },
});