'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getCart, updateCart as updateCartFirestore, clearCart as clearCartFirestore } from '../lib/firestore';

const CartContext = createContext({});

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  // Load cart from Firestore when user logs in
  useEffect(() => {
    async function loadCart() {
      if (currentUser) {
        try {
          const cartData = await getCart(currentUser.uid);
          setCartItems(cartData.items || []);
          calculateTotals(cartData.items || []);
        } catch (error) {
          console.error('[loadCart]', error);
        }
      } else {
        setCartItems([]);
        setCartCount(0);
        setSubtotal(0);
      }
    }

    loadCart();
  }, [currentUser]);

  function calculateTotals(items) {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setCartCount(count);
    setSubtotal(total);
  }

  async function syncWithFirestore(items) {
    if (currentUser) {
      try {
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        await updateCartFirestore(currentUser.uid, items, total);
      } catch (error) {
        console.error('[syncWithFirestore]', error);
      }
    }
  }

  async function addToCart(menuItem, size, quantity = 1) {
    if (!currentUser) {
      return { success: false, error: 'Please login to add items to cart' };
    }

    try {
      setLoading(true);
      const price = menuItem.prices[size];
      const cartItem = {
        menuItemId: menuItem.id,
        name: menuItem.name,
        category: menuItem.category,
        size,
        price,
        quantity,
        imageUrl: menuItem.imageUrl,
      };

      // Check if item with same menuItemId and size already exists
      const existingIndex = cartItems.findIndex(
        item => item.menuItemId === menuItem.id && item.size === size
      );

      let updatedItems;
      if (existingIndex >= 0) {
        // Update quantity
        updatedItems = [...cartItems];
        updatedItems[existingIndex].quantity += quantity;
      } else {
        // Add new item
        updatedItems = [...cartItems, cartItem];
      }

      setCartItems(updatedItems);
      calculateTotals(updatedItems);
      await syncWithFirestore(updatedItems);

      return { success: true };
    } catch (error) {
      console.error('[addToCart]', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }

  async function updateQuantity(menuItemId, size, newQuantity) {
    if (newQuantity <= 0) {
      return await removeFromCart(menuItemId, size);
    }

    try {
      setLoading(true);
      const updatedItems = cartItems.map(item =>
        item.menuItemId === menuItemId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      );

      setCartItems(updatedItems);
      calculateTotals(updatedItems);
      await syncWithFirestore(updatedItems);

      return { success: true };
    } catch (error) {
      console.error('[updateQuantity]', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }

  async function removeFromCart(menuItemId, size) {
    try {
      setLoading(true);
      const updatedItems = cartItems.filter(
        item => !(item.menuItemId === menuItemId && item.size === size)
      );

      setCartItems(updatedItems);
      calculateTotals(updatedItems);
      await syncWithFirestore(updatedItems);

      return { success: true };
    } catch (error) {
      console.error('[removeFromCart]', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }

  async function clearCart() {
    try {
      setLoading(true);
      setCartItems([]);
      setCartCount(0);
      setSubtotal(0);

      if (currentUser) {
        await clearCartFirestore(currentUser.uid);
      }

      return { success: true };
    } catch (error) {
      console.error('[clearCart]', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }

  const value = {
    cartItems,
    cartCount,
    subtotal,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
