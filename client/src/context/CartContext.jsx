import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const cartId = 'demo-user-cart'; // Hardcoded for this demo, could be a dynamic userId or session token

    // 1. Initial Load from MongoDB
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/cart/${cartId}`);
                const data = await res.json();
                if (data.success && data.cart.items) {
                    // Map the populated DB schema back to our local state structure
                    const loadedItems = data.cart.items.map(cartItem => {
                        // Protect against deleted products that might return null
                        if (!cartItem.product) return null;
                        return {
                            ...cartItem.product,
                            quantity: cartItem.quantity
                        };
                    }).filter(Boolean);
                    
                    setCartItems(loadedItems);
                }
            } catch (error) {
                console.error('Failed to fetch cart from MongoDB, falling back to LocalStorage', error);
                const saved = localStorage.getItem('cart');
                if (saved) setCartItems(JSON.parse(saved));
            } finally {
                setIsLoaded(true);
            }
        };
        
        fetchCart();
    }, []);

    // 2. Sync changes back to MongoDB and LocalStorage
    useEffect(() => {
        if (!isLoaded) return; // Prevent overwriting DB on initial mount before fetch completes

        // Local backup
        localStorage.setItem('cart', JSON.stringify(cartItems));

        // DB Sync
        const syncToMongo = async () => {
            try {
                const dbItemsFormat = cartItems.map(item => ({
                    product: item._id,
                    quantity: item.quantity
                }));

                await fetch(`http://localhost:5000/api/cart/${cartId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ items: dbItemsFormat })
                });
            } catch (error) {
                console.error('Failed to sync to MongoDB', error);
            }
        };

        const debounceTimer = setTimeout(syncToMongo, 500); // 500ms debounce
        return () => clearTimeout(debounceTimer);
    }, [cartItems, isLoaded]);

    // Add item to cart
    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item._id === product._id);
            if (existingItem) {
                return prevItems.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity }];
        });
    };

    // Remove item from cart
    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
    };

    // Update item quantity
    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return;
        setCartItems(prevItems =>
            prevItems.map(item =>
                item._id === productId ? { ...item, quantity } : item
            )
        );
    };

    // Clear cart
    const clearCart = () => {
        setCartItems([]);
    };

    // Calculated derived state
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const FREE_SHIPPING_THRESHOLD = 2000;
    const progressPercent = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartCount,
            cartTotal,
            progressPercent,
            FREE_SHIPPING_THRESHOLD
        }}>
            {children}
        </CartContext.Provider>
    );
};
