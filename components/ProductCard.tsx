import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Heart } from 'lucide-react-native';
import { EyewearProduct } from '@/data/products';
import { colors, radius, shadows, spacing } from '@/constants/theme';

interface ProductCardProps {
  product: EyewearProduct;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - spacing.lg * 3) / 2; // 2 cards per row with spacing

const ProductCard = ({ product, isFavorite = false, onToggleFavorite }: ProductCardProps) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/product/${product.id}`);
  };

  const handleFavoritePress = () => {
    if (onToggleFavorite) {
      onToggleFavorite(product.id);
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: product.imageUrls[0] }} 
          style={styles.image}
          resizeMode="cover"
        />
        {product.isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NEW</Text>
          </View>
        )}
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={handleFavoritePress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Heart 
            size={20} 
            color={isFavorite ? colors.accent : colors.text.muted} 
            fill={isFavorite ? colors.accent : 'none'} 
          />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.type}>{product.type}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        
        {product.rating && (
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>★ {product.rating.toFixed(1)}</Text>
            <Text style={styles.reviewCount}>({product.reviewCount})</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: cardWidth * 0.75,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: spacing.md,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  type: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
    textTransform: 'capitalize',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.secondary,
  },
  reviewCount: {
    fontSize: 14,
    color: colors.text.muted,
    marginLeft: spacing.xs,
  },
  newBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: radius.sm,
  },
  newBadgeText: {
    color: colors.text.inverted,
    fontSize: 10,
    fontWeight: '700',
  },
  favoriteButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: spacing.xs,
    borderRadius: radius.round,
    ...shadows.sm,
  }
});

export default ProductCard;