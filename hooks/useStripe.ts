import { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { Alert, Platform } from 'react-native';
import { products } from '@/stripe-config';
import { supabase } from '@/lib/supabase';
import Constants from 'expo-constants';

export function useStripe() {
  const router = useRouter();

  const createCheckoutSession = useCallback(async (productId: keyof typeof products) => {
    try {
      const product = products[productId];
      if (!product) {
        throw new Error('Invalid product');
      }

      // Get the base URL for the application
      const baseUrl = Platform.select({
        web: window.location.origin,
        default: Constants.expoConfig?.web?.url || 'http://localhost:8081'
      });

      const { data: { session_url }, error } = await supabase.functions.invoke('stripe-checkout', {
        body: {
          price_id: product.priceId,
          mode: product.mode,
          success_url: `${baseUrl}/checkout/success`,
          cancel_url: `${baseUrl}/checkout/cancel`,
        },
      });

      if (error) {
        throw error;
      }

      if (!session_url) {
        throw new Error('No checkout URL returned');
      }

      if (Platform.OS === 'web') {
        // Redirect to Stripe Checkout on web
        window.location.href = session_url;
      } else {
        // Handle native platforms (you might want to use WebBrowser or a custom solution)
        Alert.alert('Error', 'Stripe checkout is currently only supported on web');
      }
    } catch (error: any) {
      console.error('Error creating checkout session:', error);
      Alert.alert('Error', 'Failed to start checkout process. Please try again.');
    }
  }, []);

  return {
    createCheckoutSession,
  };
}