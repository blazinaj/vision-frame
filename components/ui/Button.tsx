import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  TouchableOpacityProps, 
  ActivityIndicator,
  View
} from 'react-native';
import { colors, radius, spacing } from '@/constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  title: string;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button = ({
  variant = 'primary',
  size = 'md',
  title,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  style,
  ...props
}: ButtonProps) => {
  // Define container styles based on variant
  const getContainerStyles = () => {
    const baseStyle = {
      ...styles.container,
      ...(fullWidth && styles.fullWidth)
    };
    
    switch (variant) {
      case 'primary':
        return [baseStyle, styles.primaryContainer];
      case 'secondary':
        return [baseStyle, styles.secondaryContainer];
      case 'outline':
        return [baseStyle, styles.outlineContainer];
      case 'text':
        return [baseStyle, styles.textContainer];
      default:
        return [baseStyle, styles.primaryContainer];
    }
  };

  // Define text styles based on variant
  const getTextStyles = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryText;
      case 'secondary':
        return styles.secondaryText;
      case 'outline':
        return styles.outlineText;
      case 'text':
        return styles.textText;
      default:
        return styles.primaryText;
    }
  };

  // Define size styles
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return styles.containerSm;
      case 'md':
        return styles.containerMd;
      case 'lg':
        return styles.containerLg;
      default:
        return styles.containerMd;
    }
  };

  // Get text size styles
  const getTextSizeStyles = () => {
    switch (size) {
      case 'sm':
        return styles.textSm;
      case 'md':
        return styles.textMd;
      case 'lg':
        return styles.textLg;
      default:
        return styles.textMd;
    }
  };

  return (
    <TouchableOpacity
      style={[getContainerStyles(), getSizeStyles(), style]}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' ? colors.text.inverted : colors.primary} 
        />
      ) : (
        <View style={styles.contentContainer}>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
          <Text style={[getTextStyles(), getTextSizeStyles()]}>{title}</Text>
          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: spacing.sm,
  },
  iconRight: {
    marginLeft: spacing.sm,
  },
  // Variant styles
  primaryContainer: {
    backgroundColor: colors.primary,
  },
  secondaryContainer: {
    backgroundColor: colors.secondary,
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  textContainer: {
    backgroundColor: 'transparent',
  },
  // Text styles
  primaryText: {
    color: colors.text.inverted,
    fontWeight: '600',
  },
  secondaryText: {
    color: colors.primary,
    fontWeight: '600',
  },
  outlineText: {
    color: colors.primary,
    fontWeight: '600',
  },
  textText: {
    color: colors.primary,
    fontWeight: '600',
  },
  // Size styles - container
  containerSm: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  containerMd: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  containerLg: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  // Size styles - text
  textSm: {
    fontSize: 14,
  },
  textMd: {
    fontSize: 16,
  },
  textLg: {
    fontSize: 18,
  },
});

export default Button;