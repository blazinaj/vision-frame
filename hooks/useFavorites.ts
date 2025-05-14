import { useState, useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_STORAGE_KEY = '@visionframe_favorites';

// In web, we'll use localStorage as a fallback
const storage = {
  getItem: async (key: string) => {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    }
    return AsyncStorage.getItem(key);
  },
  setItem: async (key: string, value: string) => {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
      return;
    }
    return AsyncStorage.setItem(key, value);
  }
};

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load favorites from storage on mount
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await storage.getItem(FAVORITES_STORAGE_KEY);
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
        Alert.alert(
          'Error',
          'Failed to load favorites. Please try again later.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []);

  // Toggle a product as favorite
  const toggleFavorite = async (productId: string) => {
    try {
      const newFavorites = favorites.includes(productId)
        ? favorites.filter(id => id !== productId)
        : [...favorites, productId];
      
      setFavorites(newFavorites);
      await storage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error updating favorites:', error);
      Alert.alert(
        'Error',
        'Failed to update favorites. Please try again.'
      );
    }
  };

  // Check if a product is in favorites
  const isFavorite = (productId: string) => {
    return favorites.includes(productId);
  };

  return {
    favorites,
    isLoading,
    toggleFavorite,
    isFavorite
  };
}