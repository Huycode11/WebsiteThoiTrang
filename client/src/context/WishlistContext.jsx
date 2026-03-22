import React, { createContext, useState, useEffect } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const wishlistId = 'demo-user-wishlist';

    // 1. Initial Load from MongoDB
    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/wishlist/${wishlistId}`);
                const data = await res.json();
                if (data.success && data.wishlist.items) {
                    setWishlistItems(data.wishlist.items);
                }
            } catch (error) {
                console.error('Failed to fetch wishlist from MongoDB', error);
                const saved = localStorage.getItem('wishlist');
                if (saved) setWishlistItems(JSON.parse(saved));
            } finally {
                setIsLoaded(true);
            }
        };
        
        fetchWishlist();
    }, []);

    // 2. Sync changes back to MongoDB and LocalStorage
    useEffect(() => {
        if (!isLoaded) return;

        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));

        const syncToMongo = async () => {
            try {
                const itemIds = wishlistItems.map(item => item._id);

                await fetch(`http://localhost:5000/api/wishlist/${wishlistId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ items: itemIds })
                });
            } catch (error) {
                console.error('Failed to sync wishlist to MongoDB', error);
            }
        };

        const debounceTimer = setTimeout(syncToMongo, 500);
        return () => clearTimeout(debounceTimer);
    }, [wishlistItems, isLoaded]);

    const addToWishlist = (product) => {
        setWishlistItems(prev => {
            if (prev.find(item => String(item._id) === String(product._id))) return prev;
            return [...prev, product];
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlistItems(prev => prev.filter(item => String(item._id) !== String(productId)));
    };

    const toggleWishlist = (product) => {
        const productId = String(product._id);
        const exists = wishlistItems.some(item => String(item._id) === productId);
        if (exists) {
            removeFromWishlist(productId);
            return 'removed';
        } else {
            addToWishlist(product);
            return 'added';
        }
    };

    const isInWishlist = (productId) => {
        return wishlistItems.some(item => String(item._id) === String(productId));
    };

    const wishlistCount = wishlistItems.length;

    return (
        <WishlistContext.Provider value={{
            wishlistItems,
            addToWishlist,
            removeFromWishlist,
            toggleWishlist,
            isInWishlist,
            wishlistCount
        }}>
            {children}
        </WishlistContext.Provider>
    );
};
