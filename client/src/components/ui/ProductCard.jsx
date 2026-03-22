import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';

const ProductCard = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { addToCart } = useContext(CartContext);
    const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

    const handleAddToCart = (e) => {
        e.preventDefault(); 
        addToCart(product, 1);
        // Optional: Can remove alert for smoother UX, rely on Cart Context visually updating
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        const status = toggleWishlist(product);
        if (status === 'added') {
            alert(`"${product.name}" added to wishlist!`);
        } else {
            alert(`"${product.name}" removed from wishlist!`);
        }
    };

    return (
        <Link to={`/product/${product.sku || product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div 
                className="product-card" 
                style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', marginBottom: '15px', background: '#f5f5f5' }}>
                    {/* Badges */}
                    <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', flexDirection: 'column', gap: '5px', zIndex: 1 }}>
                        {product.originalPrice && product.originalPrice > product.price && (
                            <span style={{ background: '#a44444', color: '#fff', fontSize: '11px', padding: '3px 8px', fontWeight: '500' }}>
                                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                            </span>
                        )}
                        <span style={{ background: '#e25c3d', color: '#fff', fontSize: '11px', padding: '3px 8px', fontWeight: '500' }}>Featured</span>
                    </div>
                    
                    {/* Default Image */}
                    <img 
                        src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/300x400?text=No+Image'} 
                        alt={product.name} 
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover', 
                            position: 'absolute', 
                            top: 0, 
                            left: 0, 
                            opacity: (isHovered && product.images && product.images.length > 1) ? 0 : 1, 
                            transform: isHovered && (!product.images || product.images.length <= 1) ? 'scale(1.05)' : 'scale(1)',
                            transition: 'all 0.5s ease',
                            transformOrigin: 'center center'
                        }} 
                    />
                    
                    {/* Hover Alternate Image */}
                    {product.images && product.images.length > 1 && (
                        <img 
                            src={product.images[1]} 
                            alt={`${product.name} alternate view`} 
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'cover', 
                                position: 'absolute', 
                                top: 0, 
                                left: 0, 
                                opacity: isHovered ? 1 : 0, 
                                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                                transition: 'all 0.5s ease',
                                transformOrigin: 'center center'
                            }} 
                        />
                    )}

                    {/* Overlay Buttons Container */}
                    <div style={{ 
                        position: 'absolute', 
                        bottom: isHovered ? '20px' : '-50px', 
                        left: '50%', 
                        transform: 'translateX(-50%)', 
                        width: '85%', 
                        opacity: isHovered ? 1 : 0, 
                        transition: 'all 0.3s ease',
                        zIndex: 2 
                    }}>
                        <button 
                            onClick={handleAddToCart}
                            className="btn-premium"
                            style={{ 
                                width: '100%', 
                                padding: '12px 0', 
                                fontSize: '12px', 
                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                            }}
                        >
                            ADD TO CART
                        </button>
                    </div>

                    {/* Right side floating icons */}
                    <div style={{
                        position: 'absolute',
                        top: '15px',
                        right: isHovered ? '15px' : '-40px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        opacity: isHovered ? 1 : 0,
                        transition: 'all 0.3s ease',
                        zIndex: 2
                    }}>
                        {/* Search Icon */}
                        <button onClick={(e) => { e.preventDefault(); }} style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
                        </button>
                        
                        {/* Wishlist Heart Icon */}
                        <button 
                            onClick={handleWishlist} 
                            className={`btn-wishlist ${isInWishlist(product._id) ? 'active' : ''}`}
                        >
                            <svg 
                                width="18" 
                                height="18" 
                                fill={isInWishlist(product._id) ? "#fff" : "none"} 
                                stroke={isInWishlist(product._id) ? "#fff" : "currentColor"} 
                                strokeWidth="1.5" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                        </button>

                        {/* Compare/Sync Icon */}
                        <button onClick={(e) => { e.preventDefault(); }} style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>
                        </button>
                    </div>
                </div>
                
                <div style={{ textAlign: 'left' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: '400', color: '#121212', marginBottom: '8px', lineHeight: '1.4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {product.name}
                    </h3>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                        {product.originalPrice && (
                            <span style={{ fontSize: '12px', color: '#999', textDecoration: 'line-through' }}>${product.originalPrice.toFixed(2)}</span>
                        )}
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#2f4799' }}>${product.price.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <div style={{ color: '#f39c12', fontSize: '12px', letterSpacing: '1px' }}>★★★★★</div>
                        <span style={{ fontSize: '11px', color: '#666' }}>{product.reviewsCount || Math.floor(Math.random() * 5) + 1}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
