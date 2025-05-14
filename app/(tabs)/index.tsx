import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  StatusBar, 
  SafeAreaView,
  TouchableOpacity,
  Image,
  Animated,
  Platform,
  useWindowDimensions,
  ImageBackground
} from 'react-native';
import { useRouter } from 'expo-router';
import { Search, ShoppingBag, Bell, ArrowRight } from 'lucide-react-native';
import FeaturedSlider from '@/components/FeaturedSlider';
import ProductCard from '@/components/ProductCard';
import { colors, spacing, radius } from '@/constants/theme';
import { 
  featuredProducts, 
  getNewProducts, 
  getProductsByType,
  EyewearProduct 
} from '@/data/products';
import { useFavorites } from '@/hooks/useFavorites';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { toggleFavorite, isFavorite } = useFavorites();
  const newProducts = getNewProducts();
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const handleViewAllEyeglasses = () => {
    router.push('/browse?type=eyeglasses');
  };
  
  const handleViewAllSunglasses = () => {
    router.push('/browse?type=sunglasses');
  };
  
  const handleSearch = () => {
    router.push('/search');
  };

  const handleNotifications = () => {
    alert('Notifications coming soon!');
  };

  const renderHeader = () => {
    if (Platform.OS === 'web') {
      return (
        <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
          <View>
            <Text style={styles.headerTitle}>VisionFrame</Text>
            <Text style={styles.headerSubtitle}>Find your perfect style</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton} onPress={handleSearch}>
              <Search size={24} color={colors.text.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handleNotifications}>
              <Bell size={24} color={colors.text.primary} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => router.push('/cart')}
            >
              <ShoppingBag size={24} color={colors.text.primary} />
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>2</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      );
    }

    return Platform.OS === 'ios' ? (
      <BlurView intensity={100} tint="light" style={[styles.header, { opacity: headerOpacity }]}>
        <View>
          <Text style={styles.headerTitle}>VisionFrame</Text>
          <Text style={styles.headerSubtitle}>Find your perfect style</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} onPress={handleSearch}>
            <Search size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleNotifications}>
            <Bell size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push('/cart')}
          >
            <ShoppingBag size={24} color={colors.text.primary} />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>
      </BlurView>
    ) : (
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <View>
          <Text style={styles.headerTitle}>VisionFrame</Text>
          <Text style={styles.headerSubtitle}>Find your perfect style</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} onPress={handleSearch}>
            <Search size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleNotifications}>
            <Bell size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push('/cart')}
          >
            <ShoppingBag size={24} color={colors.text.primary} />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {renderHeader()}
      
      <Animated.ScrollView 
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.content}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>Welcome to VisionFrame</Text>
            <Text style={styles.welcomeSubtitle}>
              Discover your perfect pair from our curated collection
            </Text>
            
            <TouchableOpacity 
              style={styles.searchButton}
              onPress={handleSearch}
            >
              <Search size={20} color={colors.text.secondary} />
              <Text style={styles.searchButtonText}>Search frames...</Text>
            </TouchableOpacity>
          </View>

          {/* Hero Banner */}
          <TouchableOpacity 
            style={styles.heroBanner}
            onPress={() => router.push('/try-on')}
            activeOpacity={0.95}
          >
            <Image
              source={{ uri: 'https://images.pexels.com/photos/6280514/pexels-photo-6280514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
              style={styles.heroBannerImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
              style={styles.heroBannerOverlay}
            >
              <Text style={styles.heroBannerTitle}>Virtual Try-On</Text>
              <Text style={styles.heroBannerSubtitle}>
                Experience frames in AR before you buy
              </Text>
              <View style={styles.heroBannerButton}>
                <Text style={styles.heroBannerButtonText}>Try Now</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => router.push('/browse?filter=new')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#E0F2F1' }]}>
                <Text style={styles.quickActionEmoji}>✨</Text>
              </View>
              <Text style={styles.quickActionText}>New Arrivals</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => router.push('/browse?filter=featured')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#FFF3E0' }]}>
                <Text style={styles.quickActionEmoji}>🌟</Text>
              </View>
              <Text style={styles.quickActionText}>Featured</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => router.push('/try-on')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#F3E5F5' }]}>
                <Text style={styles.quickActionEmoji}>🎭</Text>
              </View>
              <Text style={styles.quickActionText}>Try On</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => router.push('/browse')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#E8EAF6' }]}>
                <Text style={styles.quickActionEmoji}>🔍</Text>
              </View>
              <Text style={styles.quickActionText}>Browse All</Text>
            </TouchableOpacity>
          </View>
          
          {/* Featured Products Slider */}
          <FeaturedSlider
            title="Featured Frames"
            subtitle="Our most popular styles"
            products={featuredProducts}
            onViewAll={() => router.push('/browse')}
          />
          
          {/* Trending Brands */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Trending Brands</Text>
              <TouchableOpacity 
                style={styles.viewAllButton}
                onPress={() => router.push('/browse')}
              >
                <Text style={styles.viewAllText}>View All</Text>
                <ArrowRight size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.brandsScroll}
            >
              {['Ray-Ban', 'Oakley', 'Tom Ford', 'Oliver Peoples'].map((brand) => (
                <TouchableOpacity
                  key={brand}
                  style={styles.brandCard}
                  onPress={() => router.push(`/browse?brand=${brand}`)}
                >
                  <LinearGradient
                    colors={['#f6f6f6', '#ffffff']}
                    style={styles.brandCardGradient}
                  >
                    <Text style={styles.brandName}>{brand}</Text>
                    <Text style={styles.brandSubtext}>View Collection</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          
          {/* Categories Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Shop By Category</Text>
            
            <View style={styles.categories}>
              <TouchableOpacity 
                style={styles.categoryCard}
                onPress={handleViewAllEyeglasses}
              >
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/5752404/pexels-photo-5752404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
                  style={styles.categoryImage}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.7)']}
                  style={styles.categoryOverlay}
                >
                  <Text style={styles.categoryTitle}>Eyeglasses</Text>
                  <Text style={styles.categorySubtitle}>Prescription & Blue Light</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.categoryCard}
                onPress={handleViewAllSunglasses}
              >
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/1321943/pexels-photo-1321943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
                  style={styles.categoryImage}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.7)']}
                  style={styles.categoryOverlay}
                >
                  <Text style={styles.categoryTitle}>Sunglasses</Text>
                  <Text style={styles.categorySubtitle}>UV Protection & Style</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* New Arrivals Section */}
          {newProducts.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>New Arrivals</Text>
                <TouchableOpacity 
                  style={styles.viewAllButton}
                  onPress={() => router.push('/browse?filter=new')}
                >
                  <Text style={styles.viewAllText}>View All</Text>
                  <ArrowRight size={16} color={colors.primary} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.productsGrid}>
                {newProducts.slice(0, 2).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={isFavorite(product.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </View>
            </View>
          )}

          {/* Promotion Banner */}
          <TouchableOpacity 
            style={styles.promotionBanner}
            onPress={() => router.push('/browse?filter=featured')}
          >
            <ImageBackground
              source={{ uri: 'https://images.pexels.com/photos/1808329/pexels-photo-1808329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
              style={styles.promotionImage}
              resizeMode="cover"
            >
              <LinearGradient
                colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
                style={styles.promotionOverlay}
              >
                <View style={styles.promotionContent}>
                  <Text style={styles.promotionTitle}>Summer Collection</Text>
                  <Text style={styles.promotionSubtitle}>Up to 30% off on selected frames</Text>
                  <View style={styles.promotionButton}>
                    <Text style={styles.promotionButtonText}>Shop Now</Text>
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
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
    paddingVertical: spacing.md,
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : colors.background,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    ...Platform.select({
      ios: {
        paddingTop: spacing.lg,
      },
      android: {
        paddingTop: spacing.xl,
        elevation: 3,
      },
      web: {
        paddingTop: spacing.lg,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      },
    }),
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text.primary,
    fontFamily: Platform.select({
      ios: 'Poppins-Bold',
      android: 'Poppins-Bold',
      web: 'Poppins-Bold',
    }),
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 2,
    fontFamily: Platform.select({
      ios: 'Poppins-Regular',
      android: 'Poppins-Regular',
      web: 'Poppins-Regular',
    }),
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
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
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
        ':hover': {
          transform: 'scale(1.05)',
        },
      },
    }),
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.accent,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  cartBadgeText: {
    color: colors.text.inverted,
    fontSize: 10,
    fontWeight: '700',
  },
  content: {
    paddingTop: Platform.OS === 'ios' ? 100 : 80,
  },
  welcomeSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: spacing.xs,
    fontFamily: Platform.select({
      ios: 'Poppins-Bold',
      android: 'Poppins-Bold',
      web: 'Poppins-Bold',
    }),
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: spacing.md,
    fontFamily: Platform.select({
      ios: 'Poppins-Regular',
      android: 'Poppins-Regular',
      web: 'Poppins-Regular',
    }),
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: radius.lg,
    marginTop: spacing.sm,
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
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        ':hover': {
          backgroundColor: colors.secondary,
        },
      },
    }),
  },
  searchButtonText: {
    marginLeft: spacing.sm,
    fontSize: 16,
    color: colors.text.secondary,
    fontFamily: Platform.select({
      ios: 'Poppins-Regular',
      android: 'Poppins-Regular',
      web: 'Poppins-Regular',
    }),
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  quickActionButton: {
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  quickActionEmoji: {
    fontSize: 24,
  },
  quickActionText: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  heroBanner: {
    marginHorizontal: spacing.lg,
    height: 200,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.xl,
  },
  heroBannerImage: {
    width: '100%',
    height: '100%',
  },
  heroBannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  heroBannerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.inverted,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  heroBannerSubtitle: {
    fontSize: 16,
    color: colors.text.inverted,
    textAlign: 'center',
    marginBottom: spacing.md,
    opacity: 0.9,
  },
  heroBannerButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
  },
  heroBannerButtonText: {
    color: colors.text.inverted,
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    marginRight: spacing.xs,
  },
  brandsScroll: {
    paddingVertical: spacing.sm,
  },
  brandCard: {
    width: 150,
    height: 100,
    marginRight: spacing.md,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.card,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      },
    }),
  },
  brandCardGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  brandName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  brandSubtext: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  productsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  categoryCard: {
    width: '48%',
    height: 180,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: spacing.md,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.inverted,
    marginBottom: spacing.xs,
  },
  categorySubtitle: {
    fontSize: 14,
    color: colors.text.inverted,
    opacity: 0.9,
  },
  promotionBanner: {
    marginHorizontal: spacing.lg,
    height: 200,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.xl,
  },
  promotionImage: {
    width: '100%',
    height: '100%',
  },
  promotionOverlay: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  promotionContent: {
    maxWidth: 300,
  },
  promotionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.inverted,
    marginBottom: spacing.xs,
  },
  promotionSubtitle: {
    fontSize: 16,
    color: colors.text.inverted,
    marginBottom: spacing.lg,
    opacity: 0.9,
  },
  promotionButton: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    alignSelf: 'flex-start',
  },
  promotionButtonText: {
    color: colors.text.inverted,
    fontSize: 16,
    fontWeight: '600',
  },
});