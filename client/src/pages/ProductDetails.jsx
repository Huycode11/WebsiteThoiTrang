import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/products/${id}`);
                const data = await res.json();
                
                if (data.success && data.product) {
                    // Ensure arrays exist for rendering
                    const p = data.product;
                    p.features = p.features || [];
                    p.categories = p.categories || ['Uncategorized'];
                    p.tags = p.tags || [];
                    p.images = p.images && p.images.length > 0 ? p.images : ['https://via.placeholder.com/600x800?text=No+Image'];
                    
                    setProduct(p);
                    setMainImage(p.images[0]);
                } else {
                    setProduct(null);
                }
            } catch (error) {
                console.error("Failed to fetch product:", error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>;
    if (!product) return <div style={{ padding: '100px', textAlign: 'center' }}>Product not found</div>;

    const progressWidth = (product.sold / (product.sold + product.availability)) * 100;

    return (
        <div className="product-details-page" style={{ padding: '40px 0', background: '#fff' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
                {/* Breadcrumbs */}
                <div className="breadcrumbs" style={{ fontSize: '13px', color: '#666', marginBottom: '30px', display: 'flex', gap: '10px' }}>
                    <a href="/" style={{ color: '#666', textDecoration: 'none' }}>Home</a>
                    <span>›</span>
                    <a href="/shop" style={{ color: '#666', textDecoration: 'none' }}>{product.categories[0]}</a>
                </div>

                <div className="product-main-content" style={{ display: 'flex', gap: '50px' }}>
                    {/* Left Column: Image Gallery */}
                    <div className="product-gallery" style={{ flex: '1' }}>
                        <div className="main-image" style={{ position: 'relative', overflow: 'hidden', marginBottom: '15px' }}>
                            <img src={mainImage} alt={product.name} style={{ width: '100%', display: 'block' }} />
                            <span style={{ position: 'absolute', top: '15px', left: '15px', background: '#e74c3c', color: '#fff', fontSize: '10px', padding: '3px 8px', borderRadius: '2px', fontWeight: 'bold' }}>Featured</span>
                        </div>
                        <div className="thumbnails" style={{ display: 'flex', gap: '10px' }}>
                            {product.images.map((img, idx) => (
                                <div key={idx} 
                                     onClick={() => setMainImage(img)}
                                     style={{ width: '80px', height: '100px', cursor: 'pointer', border: mainImage === img ? '1px solid #121212' : '1px solid #eee' }}>
                                    <img src={img} alt={`thumb-${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Product Info */}
                    <div className="product-info" style={{ flex: '1' }}>
                        <h1 style={{ fontSize: '32px', fontWeight: '400', marginBottom: '15px', fontFamily: 'serif', color: '#121212' }}>{product.name}</h1>
                        
                        {/* Rating */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                            <div style={{ color: '#f1c40f', fontSize: '14px' }}>★★★★★</div>
                            <span style={{ fontSize: '12px', color: '#666' }}>(1 customer review)</span>
                        </div>

                        {/* Price */}
                        <div style={{ fontSize: '24px', fontWeight: '600', color: '#2f4799', marginBottom: '25px' }}>
                            ${product.price.toFixed(2)}
                        </div>

                        {/* Description */}
                        <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6', marginBottom: '25px' }}>{product.description}</p>

                        {/* Features */}
                        <ul style={{ paddingLeft: '20px', marginBottom: '30px' }}>
                            {product.features.map((f, i) => (
                                <li key={i} style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>{f}</li>
                            ))}
                        </ul>

                        {/* Availability Progress */}
                        <div className="stock-progress" style={{ marginBottom: '30px' }}>
                            <div style={{ height: '3px', background: '#eee', borderRadius: '2px', marginBottom: '10px', position: 'relative' }}>
                                <div style={{ height: '100%', background: '#ff4d4d', width: `${progressWidth}%`, borderRadius: '2px' }}></div>
                            </div>
                            <div style={{ fontSize: '13px', color: '#666', display: 'flex', gap: '20px' }}>
                                <span>Available: <strong style={{ color: '#121212' }}>{product.availability}</strong></span>
                                <span>Sold: <strong style={{ color: '#121212' }}>{product.sold}</strong></span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #eee' }}>
                                <button onClick={() => setQuantity(q => Math.max(1, q-1))} style={{ width: '40px', height: '45px', border: 'none', background: 'none' }}>-</button>
                                <input type="text" value={quantity} readOnly style={{ width: '40px', textAlign: 'center', border: 'none' }} />
                                <button onClick={() => setQuantity(q => q+1)} style={{ width: '40px', height: '45px', border: 'none', background: 'none' }}>+</button>
                            </div>
                            <button onClick={() => { addToCart(product, quantity); alert('Added to cart!'); }} style={{ background: '#121212', color: '#fff', border: 'none', padding: '0 40px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', flex: '1' }}>ADD TO CART</button>
                            <button style={{ background: '#2f4799', color: '#fff', border: 'none', padding: '0 40px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', flex: '1' }}>BUY NOW</button>
                        </div>

                        {/* Wishlist/Compare */}
                        <div style={{ display: 'flex', gap: '30px', marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                            <button style={{ background: 'none', border: 'none', fontSize: '13px', color: '#121212', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <span>♡</span> Add to wishlist
                            </button>
                            <button style={{ background: 'none', border: 'none', fontSize: '13px', color: '#121212', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <span>⇄</span> Add to compare
                            </button>
                        </div>

                        {/* Meta Info */}
                        <div style={{ display: 'flex', gap: '30px', marginBottom: '30px', fontSize: '14px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>🚚 Delivery Return</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>📏 Size Guide</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>❓ Ask a Question</div>
                        </div>

                        {/* Product Meta */}
                        <div style={{ fontSize: '13px', color: '#666', lineHeight: '2' }}>
                            <div>SKU: <span style={{ color: '#121212' }}>{product.sku}</span></div>
                            <div>Categories: <span style={{ color: '#121212' }}>{product.categories.join(', ')}</span></div>
                            <div>Tags: <span style={{ color: '#121212' }}>{product.tags.join(', ')}</span></div>
                            <div>Brand: <span style={{ color: '#121212' }}>{product.brand}</span></div>
                        </div>

                        {/* Checkout Guard */}
                        <div style={{ marginTop: '40px', border: '1px solid #2f4799', borderRadius: '5px', padding: '20px', position: 'relative', textAlign: 'center' }}>
                            <span style={{ position: 'absolute', top: '-11px', left: '50%', transform: 'translateX(-50%)', background: '#2f4799', color: '#fff', fontSize: '12px', padding: '2px 15px', borderRadius: '5px' }}>Guaranteed Safe Checkout</span>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginTop: '10px' }}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" style={{ height: '15px' }} />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" style={{ height: '15px' }} />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" style={{ height: '15px' }} />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="ApplePay" style={{ height: '15px' }} />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="GPay" style={{ height: '15px' }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Free</div>
                                    <div style={{ fontSize: '10px', color: '#666' }}>Worldwide Shipping</div>
                                </div>
                                <div style={{ borderLeft: '1px solid #eee', height: '30px' }}></div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>100%</div>
                                    <div style={{ fontSize: '10px', color: '#666' }}>Guaranteed Satisfaction</div>
                                </div>
                                <div style={{ borderLeft: '1px solid #eee', height: '30px' }}></div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>30 Days</div>
                                    <div style={{ fontSize: '10px', color: '#666' }}>Money Back Guarantee</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
