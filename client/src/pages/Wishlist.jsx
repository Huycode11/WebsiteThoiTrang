import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext';
import ProductCard from '../components/ui/ProductCard';

const Wishlist = () => {
    const { wishlistItems } = useContext(WishlistContext);

    return (
        <div className="wishlist-page" style={{ background: '#fff', paddingBottom: '80px', fontFamily: '"Jost", sans-serif' }}>
            
            {/* Hero Banner Section */}
            <div style={{ background: '#fcfaf7', width: '100%', height: '240px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
                <div style={{ position: 'absolute', top: 0, right: '0', height: '100%', width: '100%', background: 'url(/Fana%20%E2%80%93%20Fashion%20Shop%20WordPress%20Theme_files/banner-06.jpg) center center / cover no-repeat', opacity: 1 }} />
                
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 30px', position: 'relative', zIndex: 2 }}>
                    <h1 style={{ fontSize: '42px', fontFamily: '"Playfair Display", serif', fontWeight: '400', color: '#121212', marginBottom: '10px' }}>Wishlist</h1>
                    <div style={{ fontSize: '12px', color: '#121212', fontWeight: '500' }}>
                        <span style={{ color: '#666' }}>Home</span> &gt; <span style={{ fontWeight: 'bold' }}>Wishlist</span>
                    </div>
                </div>
            </div>

            <div className="container" style={{ maxWidth: '1200px', margin: '60px auto 0', padding: '0 30px' }}>
                {wishlistItems.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '100px 0' }}>
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#e0e0e0" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '15px' }}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                        <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>Your wishlist is currently empty.</p>
                        <Link to="/shop" className="btn-premium">CONTINUE SHOPPING</Link>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
                        {wishlistItems.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
