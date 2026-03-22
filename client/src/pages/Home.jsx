import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/products');
                const data = await res.json();
                if (data.success && data.products) {
                    setProducts(data.products);
                }

                // Fetch real dynamic categories
                const catRes = await fetch('http://localhost:5000/api/categories');
                const catData = await catRes.json();
                if (catData.success && catData.categories) {
                    setCategories(catData.categories);
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const displayedProducts = activeCategory === 'All' 
        ? products.slice(0, 8) 
        : products.filter(p => p.categories && p.categories.includes(activeCategory)).slice(0, 8);

    return (
        <main className="site-main">
            {/* Hero Slider Section */}
            <section className="hero-slider" style={{ background: '#fcfaf7', padding: '100px 0', minHeight: '650px', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
... (keep existing hero section code) ...
                {/* Background Decor */}
                <div style={{ position: 'absolute', top: '20px', left: '-50px', opacity: '0.1' }}>
                    <svg width="300" height="300" viewBox="0 0 512 512"><path fill="currentColor" d="M432 23.32a31.94 31.94 0 0 0-36.56-5.75c-59.54 30.65-115.68 85.16-160.83 149C189.47 230.34 148.67 313.25 120 400.91V288c0-17.67-14.33-32-32-32s-32 14.33-32 32v192c0 17.67 14.33 32 32 32h192c17.67 0 32-14.33 32-32s-14.33-32-32-32h-84.34a819.5 819.5 0 0 1 200.56-224.22c60.31-50.62 121.78-87.16 168.16-105.74a32.003 32.003 0 0 0 4.16-56.72z"/></svg>
                </div>
                <div style={{ position: 'absolute', bottom: '100px', left: '10%', opacity: '0.05' }}>
                    <svg width="400" height="400" viewBox="0 0 200 200"><circle cx="100" cy="100" r="80" fill="currentColor"/></svg>
                </div>

                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 30px', position: 'relative', zIndex: 1 }}>
                    <div className="hero-content" style={{ maxWidth: '500px' }}>
                        <h5 style={{ fontFamily: '"Whisper", cursive', fontSize: '28px', color: '#af7470', marginBottom: '15px' }}>Spring day</h5>
                        <h1 style={{ fontSize: '72px', fontWeight: '400', lineHeight: '1.0', marginBottom: '25px', color: '#121212', fontFamily: 'serif' }}>New limited edition collection is here</h1>
                        <p style={{ fontSize: '15px', color: '#666', marginBottom: '40px', lineHeight: '1.6', maxWidth: '380px' }}>Women's beachwear for every woman. Get dressed in summer, light up your sun!</p>
                        <a href="/shop" style={{ background: '#2f4799', color: '#fff', padding: '15px 40px', textDecoration: 'none', fontWeight: '500', display: 'inline-block', fontSize: '13px', letterSpacing: '1px' }}>VIEW COLLECTION</a>
                        
                        {/* Pagination Dots */}
                        <div style={{ display: 'flex', gap: '15px', marginTop: '60px', alignItems: 'center' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#121212', border: '1px solid #121212' }}></span>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ddd' }}></span>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ddd' }}></span>
                        </div>
                    </div>

                    <div className="hero-images" style={{ width: '600px', height: '500px', position: 'relative' }}>
                        {/* Static Badge in top right */}
                        <div style={{ position: 'absolute', top: '0', right: '0', width: '100px', height: '100px', zIndex: 3 }}>
                            <img src="/Fana – Fashion Shop WordPress Theme_files/layout-slider1-01.png" alt="Badge" style={{ width: '100%', opacity: '0.2' }} />
                        </div>

                        {/* Image 1 (Larger, back) */}
                        <div className="hero-img-1" style={{ position: 'absolute', top: '20px', left: '0', width: '450px', zIndex: 1 }}>
                            <img src="/Fana – Fashion Shop WordPress Theme_files/img-slider1-01.jpg" alt="Hero 1" style={{ width: '100%', height: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                        </div>
                        
                        {/* Image 2 (Smaller, front) */}
                        <div className="hero-img-2" style={{ position: 'absolute', bottom: '-80px', right: '0', width: '280px', zIndex: 2 }}>
                            <img src="/Fana – Fashion Shop WordPress Theme_files/img-slider1-02.png" alt="Hero 2" style={{ width: '100%', height: 'auto', zIndex: 2 }} />
                        </div>

                        {/* Rotate Vertical Text */}
                        <div style={{ position: 'absolute', top: '40%', right: '-30px', transform: 'rotate(90deg)', fontSize: '11px', letterSpacing: '3px', color: '#121212', fontWeight: '500' }}>LOOK NOW</div>
                    </div>
                </div>
            </section>

            {/* Best Sellers Section */}
            <section className="best-sellers" style={{ padding: '80px 0', background: '#fff' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '32px', fontFamily: 'serif', color: '#121212', marginBottom: '20px' }}>You are in Best Sellers</h2>
                        <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'center', gap: '30px', fontSize: '18px', color: '#666', fontFamily: 'serif' }}>
                            <span 
                                onClick={() => setActiveCategory('All')} 
                                style={{ color: activeCategory === 'All' ? '#2f4799' : '#666', borderBottom: activeCategory === 'All' ? '2px solid #2f4799' : 'none', paddingBottom: '5px', cursor: 'pointer' }}
                            >
                                All
                            </span>
                            {categories.map(cat => (
                                <span 
                                    key={cat._id}
                                    onClick={() => setActiveCategory(cat.name)} 
                                    style={{ color: activeCategory === cat.name ? '#2f4799' : '#666', borderBottom: activeCategory === cat.name ? '2px solid #2f4799' : 'none', paddingBottom: '5px', cursor: 'pointer' }}
                                >
                                    {cat.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <p style={{ textAlign: 'center', padding: '40px 0' }}>Loading products...</p>
                    ) : displayedProducts.length === 0 ? (
                        <p style={{ textAlign: 'center', padding: '40px 0', color: '#666' }}>No products found in this category.</p>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px' }}>
                            {displayedProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Style Gallery Section */}
            <section className="style-gallery" style={{ padding: '80px 0', textAlign: 'center', background: '#fff' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
                    <div className="gallery-header" style={{ marginBottom: '50px' }}>
                        <h5 style={{ fontFamily: '"Whisper", cursive', fontSize: '28px', color: '#af7470', marginBottom: '10px' }}>Style Gallery</h5>
                        <h2 style={{ fontSize: '36px', fontWeight: '400', marginBottom: '15px', color: '#121212' }}>Say hello subscribe to update</h2>
                        <p style={{ fontSize: '14px', color: '#666', maxWidth: '400px', margin: '0 auto', lineHeight: '1.6' }}>
                            Helping people manage anxiety, pain, and sleeplessness.
                        </p>
                    </div>

                    <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0' }}>
                        {[
                            { img: "/Fana – Fashion Shop WordPress Theme_files/gallery-01.jpg", letter: "F" },
                            { img: "/Fana – Fashion Shop WordPress Theme_files/gallery-02.jpg", letter: "A" },
                            { img: "/Fana – Fashion Shop WordPress Theme_files/gallery-03.jpg", letter: "N" },
                            { img: "/Fana – Fashion Shop WordPress Theme_files/gallery-04.jpg", letter: "A" }
                        ].map((item, idx) => (
                            <Link to="/product/MEGA-JEWE-03" key={idx} style={{ display: 'block', textDecoration: 'none' }}>
                                <div className="gallery-item" style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4' }}>
                                    <img src={item.img} alt={`Gallery ${item.letter}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                    <div className="overlay" style={{ 
                                        position: 'absolute', 
                                        top: '0', 
                                        left: '0', 
                                        width: '100%', 
                                        height: '100%', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        background: 'rgba(0,0,0,0.05)'
                                    }}>
                                        <span style={{ 
                                            color: '#fff', 
                                            fontSize: '180px', 
                                            fontWeight: '300', 
                                            fontFamily: 'serif',
                                            opacity: '0.8',
                                            userSelect: 'none'
                                        }}>{item.letter}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}

                    </div>
                </div>
            </section>
        </main>
    );
};
export default Home;
