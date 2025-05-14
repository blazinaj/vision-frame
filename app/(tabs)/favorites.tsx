import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { Heart } from 'lucide-react-native';
import { colors, spacing, radius } from '@/constants/theme';
import { allProducts, EyewearProduct } from '@/data/products';
import { useFavorites } from '@/hooks/useFavorites';
import Button from '@/components/ui/Button';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, isLoading, toggleFavorite } = useFavorites();
  
  // Filter products to only show favorites
  const favoriteProducts = allProducts.filter(product => 
    favorites.includes(product.id)
  );
  
  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };
  
  const handleRemove = (productId: string) => {
    toggleFavorite(productId);
  };
  
  const handleTryOn = (productId: string) => {
    router.push(`/try-on?productId=${productId}`);
  };
  
  const handleBrowse = () => {
    router.push('/browse');
  };
  
  const renderItem = ({ item }: { item: EyewearProduct }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => handleProductPress(item.id)}
      activeOpacity={0.9}
    >
      <Image 
        source={{ uri: item.imageUrls[0] }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <View>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productType}>{item.type}</Text>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleTryOn(item.id)}
          >
            <Text style={styles.actionButtonText}>Try On</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.removeButton]}
            onPress={() => handleRemove(item.id)}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorites</Text>
        <Text style={styles.headerCount}>
          {favoriteProducts.length} {favoriteProducts.length === 1 ? 'item' : 'items'}
        </Text>
      </View>
      
      {favoriteProducts.length > 0 ? (
        <FlatList
          data={favoriteProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Heart size={60} color={colors.text.muted} style={styles.emptyIcon} />
          <Text style={styles.emptyTitle}>No Favorites Yet</Text>
          <Text style={styles.emptyText}>
            Items you favorite will appear here for easy access.
          </Text>
          <Button 
            title="Browse Frames" 
            onPress={handleBrowse}
            style={styles.browseButton}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
  },
  headerCount: {
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  productList: {
    padding: spacing.lg,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    height: 150,
  },
  productImage: {
    width: 120,
    height: '100%',
  },
  productInfo: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  productType: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 2,
    textTransform: 'capitalize',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginTop: spacing.xs,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
    flex: 1,
    marginHorizontal: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: colors.text.inverted,
    fontWeight: '500',
    fontSize: 14,
  },
  removeButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.error,
  },
  removeButtonText: {
    color: colors.error,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyIcon: {
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  browseButton: {
    width: '60%',
  },
});