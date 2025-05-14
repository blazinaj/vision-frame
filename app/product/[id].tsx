import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Star, Heart, ShoppingBag, Camera, Cuboid as Cube } from 'lucide-react-native';
import { getProductById } from '@/data/products';
import { colors, spacing, radius } from '@/constants/theme';
import Button from '@/components/ui/Button';
import ARTryOnView from '@/components/ARTryOnView';
import ProductViewer3D from '@/components/ProductViewer3D';
import { useFavorites } from '@/hooks/useFavorites';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const product = getProductById(id);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [arViewVisible, setArViewVisible] = useState(false);
  const [show3DView, setShow3DView] = useState(false);
  
  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Product not found</Text>
          <Button 
            title="Go Back" 
            onPress={() => router.back()}
            style={styles.backButton}
          />
        </View>
      </SafeAreaView>
    );
  }
  
  const handleAddToCart = () => {
    // In a real app, this would add the product to a cart
    alert(`${product.name} added to cart!`);
  };
  
  const handleStartTryOn = () => {
    setArViewVisible(true);
  };
  
  const handleCloseAR = () => {
    setArViewVisible(false);
  };
  
  const handleToggleFavorite = () => {
    toggleFavorite(product.id);
  };

  const toggle3DView = () => {
    setShow3DView(!show3DView);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <ChevronLeft size={24} color={colors.text.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.backButton, styles.viewerToggle]}
          onPress={toggle3DView}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Cube size={24} color={colors.text.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        {show3DView ? (
          <View style={styles.viewer3DContainer}>
            <ProductViewer3D modelUrl={product.arModelUrl} />
          </View>
        ) : (
          <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <Image 
              source={{ uri: product.imageUrls[0] }} 
              style={styles.productImage}
              resizeMode="cover"
            />
            
            <View style={styles.contentContainer}>
              <View style={styles.titleContainer}>
                <View>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productBrand}>{product.brand}</Text>
                  <Text style={styles.productType}>{product.type}</Text>
                </View>
                <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
              </View>
              
              {product.rating && (
                <View style={styles.ratingContainer}>
                  <Star size={16} color={colors.warning} fill={colors.warning} />
                  <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
                  <Text style={styles.reviewCount}>({product.reviewCount} reviews)</Text>
                </View>
              )}
              
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{product.description}</Text>
              
              <Text style={styles.sectionTitle}>Features</Text>
              <View style={styles.featuresContainer}>
                {product.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <View style={styles.featureBullet} />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              
              <Text style={styles.sectionTitle}>Frame Details</Text>
              <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Shape</Text>
                  <Text style={styles.detailValue}>{product.frameShape}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Material</Text>
                  <Text style={styles.detailValue}>{product.frameMaterial}</Text>
                </View>
              </View>
              
              <Text style={styles.sectionTitle}>Color</Text>
              <View style={styles.colorOptions}>
                {product.colors.map(color => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorOption,
                      selectedColor === color && styles.selectedColorOption
                    ]}
                    onPress={() => setSelectedColor(color)}
                  >
                    <Text style={styles.colorText}>{color}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        )}
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={handleToggleFavorite}
        >
          <Heart 
            size={24} 
            color={isFavorite(product.id) ? colors.accent : colors.text.secondary} 
            fill={isFavorite(product.id) ? colors.accent : 'none'} 
          />
        </TouchableOpacity>
        
        <View style={styles.mainButtons}>
          <Button
            title="Try On"
            variant="outline"
            onPress={handleStartTryOn}
            style={styles.tryOnButton}
            leftIcon={Platform.OS !== 'web' ? <Camera size={20} color={colors.primary} /> : undefined}
          />
          
          <Button
            title="Add to Cart"
            onPress={handleAddToCart}
            style={styles.addToCartButton}
            leftIcon={<ShoppingBag size={20} color={colors.text.inverted} />}
          />
        </View>
      </View>
      
      {arViewVisible && (
        <ARTryOnView
          visible={arViewVisible}
          onClose={handleCloseAR}
          product={product}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 44 : spacing.lg,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  viewerToggle: {
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  viewer3DContainer: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 100 : 80,
    marginBottom: 80,
  },
  scrollContent: {
    flex: 1,
  },
  productImage: {
    width: width,
    height: width,
  },
  contentContainer: {
    flex: 1,
    padding: spacing.lg,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
  },
  productBrand: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  productType: {
    fontSize: 16,
    color: colors.text.secondary,
    textTransform: 'capitalize',
    marginTop: 2,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },
  reviewCount: {
    fontSize: 14,
    color: colors.text.muted,
    marginLeft: spacing.xs,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },
  featuresContainer: {
    marginBottom: spacing.lg,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  featureBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: spacing.sm,
  },
  featureText: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  detailItem: {
    marginRight: spacing.xl,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.text.muted,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: '500',
  },
  colorOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.xl,
  },
  colorOption: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  selectedColorOption: {
    borderColor: colors.primary,
    backgroundColor: colors.secondary,
  },
  colorText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  favoriteButton: {
    width: 50,
    height: 50,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  mainButtons: {
    flex: 1,
    flexDirection: 'row',
  },
  tryOnButton: {
    flex: 1,
    marginRight: spacing.sm,
  },
  addToCartButton: {
    flex: 1,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  notFoundText: {
    fontSize: 18,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },
});