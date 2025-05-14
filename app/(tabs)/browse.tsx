import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  FlatList, 
  SafeAreaView,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Search } from 'lucide-react-native';
import ProductCard from '@/components/ProductCard';
import FilterBar, { Filters } from '@/components/FilterBar';
import { colors, spacing } from '@/constants/theme';
import { 
  allProducts, 
  getProductsByType,
  EyewearProduct
} from '@/data/products';
import { useFavorites } from '@/hooks/useFavorites';

const filterOptions = [
  { id: 'all', label: 'All' },
  { id: 'eyeglasses', label: 'Eyeglasses' },
  { id: 'sunglasses', label: 'Sunglasses' },
  { id: 'new', label: 'New Arrivals' },
  { id: 'featured', label: 'Featured' }
];

export default function BrowseScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ type?: string, filter?: string }>();
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [products, setProducts] = useState<EyewearProduct[]>(allProducts);
  const [filters, setFilters] = useState<Filters>({});

  useEffect(() => {
    // Initialize filters based on URL params
    if (params.type) {
      setSelectedFilter(params.type);
    } else if (params.filter) {
      setSelectedFilter(params.filter);
    }
  }, [params]);

  useEffect(() => {
    // Apply filters
    let filteredProducts = [...allProducts];
    
    // Apply main category filter
    switch (selectedFilter) {
      case 'eyeglasses':
        filteredProducts = getProductsByType('eyeglasses');
        break;
      case 'sunglasses':
        filteredProducts = getProductsByType('sunglasses');
        break;
      case 'new':
        filteredProducts = allProducts.filter(p => p.isNew);
        break;
      case 'featured':
        filteredProducts = allProducts.filter(p => p.isFeatured);
        break;
    }
    
    // Apply additional filters
    if (filters.brand && filters.brand !== 'All Brands') {
      filteredProducts = filteredProducts.filter(p => p.brand === filters.brand);
    }
    
    if (filters.shape && filters.shape !== 'All Shapes') {
      filteredProducts = filteredProducts.filter(p => p.frameShape === filters.shape);
    }
    
    if (filters.material && filters.material !== 'All Materials') {
      filteredProducts = filteredProducts.filter(p => p.frameMaterial === filters.material);
    }
    
    if (filters.priceRange && filters.priceRange !== 'All Prices') {
      filteredProducts = filteredProducts.filter(p => {
        switch (filters.priceRange) {
          case 'Under $100':
            return p.price < 100;
          case '$100 - $200':
            return p.price >= 100 && p.price < 200;
          case '$200 - $300':
            return p.price >= 200 && p.price < 300;
          case '$300+':
            return p.price >= 300;
          default:
            return true;
        }
      });
    }
    
    setProducts(filteredProducts);
  }, [selectedFilter, filters]);

  const handleFilterSelect = (filterId: string) => {
    setSelectedFilter(filterId);
  };

  const handleSearch = () => {
    router.push('/search');
  };

  const renderItem = ({ item }: { item: EyewearProduct }) => (
    <ProductCard 
      product={item} 
      isFavorite={isFavorite(item.id)}
      onToggleFavorite={toggleFavorite}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Browse Frames</Text>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Search size={24} color={colors.text.primary} />
        </TouchableOpacity>
      </View>
      
      <FilterBar 
        options={filterOptions}
        selectedOption={selectedFilter}
        onSelectOption={handleFilterSelect}
        filters={filters}
        onFiltersChange={setFilters}
      />
      
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
  },
  searchButton: {
    padding: spacing.sm,
  },
  productList: {
    padding: spacing.lg,
  },
  row: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
  }
});