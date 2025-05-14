import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native';
import { useRouter } from 'expo-router';
import { Trash2, ShoppingBag, Plus, Minus } from 'lucide-react-native';
import { colors, spacing, radius, shadows } from '@/constants/theme';
import Button from '@/components/ui/Button';

// Mock cart items
const initialCartItems = [
  {
    id: 'feat-001',
    name: 'Horizon',
    type: 'sunglasses',
    price: 129.99,
    color: 'Black',
    quantity: 1,
    imageUrl: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'eg-001',
    name: 'Clarity Round',
    type: 'eyeglasses',
    price: 89.99,
    color: 'Tortoise',
    quantity: 1,
    imageUrl: 'https://images.pexels.com/photos/2148344/pexels-photo-2148344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export default function CartScreen() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState(initialCartItems);
  
  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };
  
  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const calculateShipping = () => {
    return cartItems.length > 0 ? 5.99 : 0;
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };
  
  const handleContinueShopping = () => {
    router.push('/browse');
  };
  
  const handleCheckout = () => {
    // In a real app, navigate to checkout
    alert('Proceeding to checkout...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <Text style={styles.headerCount}>
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
        </Text>
      </View>
      
      {cartItems.length > 0 ? (
        <>
          <ScrollView 
            style={styles.cartList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.cartListContent}
          >
            {cartItems.map(item => (
              <View key={item.id} style={styles.cartItem}>
                <Image 
                  source={{ uri: item.imageUrl }}
                  style={styles.itemImage}
                  resizeMode="cover"
                />
                <View style={styles.itemDetails}>
                  <View>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemType}>{item.type}</Text>
                    <Text style={styles.itemColor}>Color: {item.color}</Text>
                  </View>
                  
                  <View style={styles.itemBottom}>
                    <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                    
                    <View style={styles.quantityControls}>
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, -1)}
                      >
                        <Minus size={16} color={colors.text.secondary} />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, 1)}
                      >
                        <Plus size={16} color={colors.text.secondary} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removeItem(item.id)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Trash2 size={18} color={colors.error} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          
          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${calculateSubtotal().toFixed(2)}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>${calculateShipping().toFixed(2)}</Text>
            </View>
            
            <View style={[styles.summaryRow, styles.summaryTotal]}>
              <Text style={styles.summaryTotalLabel}>Total</Text>
              <Text style={styles.summaryTotalValue}>${calculateTotal().toFixed(2)}</Text>
            </View>
            
            <Button
              title="Proceed to Checkout"
              fullWidth
              onPress={handleCheckout}
              style={styles.checkoutButton}
            />
            
            <TouchableOpacity onPress={handleContinueShopping}>
              <Text style={styles.continueText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <ShoppingBag size={60} color={colors.text.muted} style={styles.emptyIcon} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyText}>
            Looks like you haven't added anything to your cart yet.
          </Text>
          <Button 
            title="Start Shopping" 
            onPress={handleContinueShopping}
            style={styles.shopButton}
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
  cartList: {
    flex: 1,
  },
  cartListContent: {
    padding: spacing.lg,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  itemImage: {
    width: 100,
    height: '100%',
  },
  itemDetails: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  itemType: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 2,
    textTransform: 'capitalize',
  },
  itemColor: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  itemBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: radius.sm,
  },
  quantityButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
    paddingHorizontal: spacing.xs,
  },
  removeButton: {
    padding: spacing.sm,
    alignSelf: 'flex-start',
  },
  summary: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    ...shadows.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  summaryValue: {
    fontSize: 16,
    color: colors.text.primary,
  },
  summaryTotal: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  summaryTotalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  summaryTotalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  checkoutButton: {
    marginBottom: spacing.md,
  },
  continueText: {
    fontSize: 16,
    color: colors.primary,
    textAlign: 'center',
    fontWeight: '500',
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
  shopButton: {
    width: '60%',
  },
});