import React, { useRef, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Dimensions, 
  NativeSyntheticEvent,
  NativeScrollEvent 
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { EyewearProduct } from '@/data/products';
import { colors, radius, shadows, spacing } from '@/constants/theme';

interface FeaturedSliderProps {
  title: string;
  subtitle?: string;
  products: EyewearProduct[];
  onViewAll?: () => void;
}

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8;
const ITEM_SPACING = spacing.md;

const FeaturedSlider = ({ title, subtitle, products, onViewAll }: FeaturedSliderProps) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / (ITEM_WIDTH + ITEM_SPACING));
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const handleProductPress = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {onViewAll && (
          <TouchableOpacity 
            style={styles.viewAllButton} 
            onPress={onViewAll}
          >
            <Text style={styles.viewAllText}>View All</Text>
            <ChevronRight size={16} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + ITEM_SPACING}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollViewContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {products.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.productCard}
            onPress={() => handleProductPress(product.id)}
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
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productType}>{product.type}</Text>
              <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Pagination indicators */}
      <View style={styles.paginationContainer}>
        {products.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: spacing.xs / 2,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    marginRight: spacing.xs / 2,
  },
  scrollViewContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  productCard: {
    width: ITEM_WIDTH,
    marginRight: ITEM_SPACING,
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    overflow: 'hidden',
    ...shadows.md,
  },
  imageContainer: {
    height: ITEM_WIDTH * 0.66,
    width: ITEM_WIDTH,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    padding: spacing.md,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  productType: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: spacing.xs / 2,
    textTransform: 'capitalize',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginTop: spacing.sm,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    width: 16,
    backgroundColor: colors.primary,
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
});

export default FeaturedSlider;