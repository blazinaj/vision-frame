import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
  useWindowDimensions
} from 'react-native';
import { Info } from 'lucide-react-native';
import { allProducts, EyewearProduct } from '@/data/products';
import { colors, spacing, radius } from '@/constants/theme';
import ARTryOnView from '@/components/ARTryOnView';
import Button from '@/components/ui/Button';

export default function TryOnScreen() {
  const { width, height } = useWindowDimensions();
  const [selectedProduct, setSelectedProduct] = useState<EyewearProduct | undefined>(undefined);
  const [arViewVisible, setArViewVisible] = useState(false);
  
  const handleProductSelect = (product: EyewearProduct) => {
    setSelectedProduct(product);
  };
  
  const handleStartTryOn = () => {
    if (selectedProduct) {
      setArViewVisible(true);
    }
  };
  
  const handleCloseAR = () => {
    setArViewVisible(false);
  };
  
  const renderProductItem = ({ item }: { item: EyewearProduct }) => (
    <TouchableOpacity 
      style={[
        styles.productItem, 
        selectedProduct?.id === item.id && styles.selectedProduct
      ]}
      onPress={() => handleProductSelect(item)}
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: item.imageUrls[0] }} 
        style={styles.productImage}
        resizeMode="contain"
      />
      <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Virtual Try-On</Text>
      </View>
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.infoContainer}>
          <Info size={20} color={colors.primary} style={styles.infoIcon} />
          <Text style={styles.infoText}>
            Select a frame below and press 'Try On' to see how it looks on you.
          </Text>
        </View>
        
        <View style={[styles.previewContainer, { height: width * 0.66 }]}>
          {selectedProduct ? (
            <View style={styles.selectedPreview}>
              <Image 
                source={{ uri: selectedProduct.imageUrls[0] }} 
                style={styles.previewImage}
                resizeMode="contain"
              />
              <View style={styles.previewInfo}>
                <Text style={styles.previewName}>{selectedProduct.name}</Text>
                <Text style={styles.previewType}>{selectedProduct.type}</Text>
                <Text style={styles.previewPrice}>${selectedProduct.price.toFixed(2)}</Text>
                <Button 
                  title="Try On Now" 
                  onPress={handleStartTryOn}
                  fullWidth
                  style={styles.tryOnButton}
                />
              </View>
            </View>
          ) : (
            <View style={styles.emptyPreview}>
              <Text style={styles.emptyPreviewText}>
                Select a frame from the list below to try it on
              </Text>
            </View>
          )}
        </View>
        
        <Text style={styles.sectionTitle}>Available Frames</Text>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productList}
          decelerationRate="fast"
          snapToInterval={120 + spacing.md}
          snapToAlignment="start"
        >
          {allProducts.map((item) => renderProductItem({ item }))}
        </ScrollView>
      </ScrollView>
      
      {arViewVisible && (
        <ARTryOnView 
          visible={arViewVisible} 
          onClose={handleCloseAR}
          product={selectedProduct}
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
    paddingHorizontal: spacing.lg,
    paddingTop: Platform.OS === 'android' ? spacing.xl : spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    fontFamily: Platform.select({
      ios: 'Poppins-Bold',
      android: 'Poppins-Bold',
      web: 'Poppins-Bold',
    }),
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: spacing.xl,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.lg,
    padding: spacing.md,
    borderRadius: radius.md,
  },
  infoIcon: {
    marginRight: spacing.sm,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.text.secondary,
    fontFamily: Platform.select({
      ios: 'Poppins-Regular',
      android: 'Poppins-Regular',
      web: 'Poppins-Regular',
    }),
  },
  previewContainer: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      },
    }),
  },
  emptyPreview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  emptyPreviewText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    fontFamily: Platform.select({
      ios: 'Poppins-Regular',
      android: 'Poppins-Regular',
      web: 'Poppins-Regular',
    }),
  },
  selectedPreview: {
    flex: 1,
    flexDirection: 'row',
  },
  previewImage: {
    width: '60%',
    height: '100%',
    backgroundColor: '#F1F5F9',
  },
  previewInfo: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center',
  },
  previewName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
    fontFamily: Platform.select({
      ios: 'Poppins-SemiBold',
      android: 'Poppins-SemiBold',
      web: 'Poppins-SemiBold',
    }),
  },
  previewType: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
    textTransform: 'capitalize',
    fontFamily: Platform.select({
      ios: 'Poppins-Regular',
      android: 'Poppins-Regular',
      web: 'Poppins-Regular',
    }),
  },
  previewPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: spacing.md,
    fontFamily: Platform.select({
      ios: 'Poppins-Bold',
      android: 'Poppins-Bold',
      web: 'Poppins-Bold',
    }),
  },
  tryOnButton: {
    marginTop: spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    fontFamily: Platform.select({
      ios: 'Poppins-SemiBold',
      android: 'Poppins-SemiBold',
      web: 'Poppins-SemiBold',
    }),
  },
  productList: {
    paddingHorizontal: spacing.lg,
  },
  productItem: {
    width: 120,
    height: 150,
    marginRight: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    padding: spacing.sm,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'transparent',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        ':hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      },
    }),
  },
  selectedProduct: {
    borderColor: colors.primary,
  },
  productImage: {
    width: '100%',
    height: 100,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
    textAlign: 'center',
    fontFamily: Platform.select({
      ios: 'Poppins-Medium',
      android: 'Poppins-Medium',
      web: 'Poppins-Medium',
    }),
  },
});