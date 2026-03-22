import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    const banners = [
        {
            subtitle: "Spring day",
            title: "New limited edition collection is here",
            description: "Women's beachwear for every woman. Get dressed in summer, light up your sun!",
            img1: "/Fana – Fashion Shop WordPress Theme_files/img-slider1-01.jpg",
            img2: "/Fana – Fashion Shop WordPress Theme_files/img-slider1-02.png",
            badge: "/Fana – Fashion Shop WordPress Theme_files/layout-slider1-01.png",
            bg: "#fcfaf7"
        },
        {
            subtitle: "Our starting lineup",
            title: "Extra 15% off the up to 70% off sale!",
            description: "Lightweight, and made with the perfect fit. Shop our latest arrivals today and save big.",
            img1: "/Fana – Fashion Shop WordPress Theme_files/img-slider3-01.png",
            img2: null,
            badge: "/Fana – Fashion Shop WordPress Theme_files/layout-slider1-01.png",
            bg: "#f5f0ed"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev === banners.length - 1 ? 0 : prev + 1));
        }, 8000);
        return () => clearInterval(timer);
    }, [banners.length]);

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
            <section className="hero-slider" style={{ 
                background: banners[currentSlide].bg, 
                minHeight: '650px', 
                position: 'relative', 
                overflow: 'hidden',
                transition: 'background 0.8s ease'
            }}>
                {/* Background Decor */}
                <div style={{ position: 'absolute', top: '20px', left: '-50px', opacity: '0.1' }}>
                    <svg width="300" height="300" viewBox="0 0 512 512"><path fill="currentColor" d="M432 23.32a31.94 31.94 0 0 0-36.56-5.75c-59.54 30.65-115.68 85.16-160.83 149C189.47 230.34 148.67 313.25 120 400.91V288c0-17.67-14.33-32-32-32s-32 14.33-32 32v192c0 17.67 14.33 32 32 32h192c17.67 0 32-14.33 32-32s-14.33-32-32-32h-84.34a819.5 819.5 0 0 1 200.56-224.22c60.31-50.62 121.78-87.16 168.16-105.74a32.003 32.003 0 0 0 4.16-56.72z"/></svg>
                </div>
                <div style={{ position: 'absolute', bottom: '100px', left: '10%', opacity: '0.05' }}>
                    <svg width="400" height="400" viewBox="0 0 200 200"><circle cx="100" cy="100" r="80" fill="currentColor"/></svg>
                </div>

                {/* Rotating LOOK NOW Badge */}
                <div style={{ position: 'absolute', top: '80px', right: '60px', width: '120px', height: '120px', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg className="rotating-badge" width="120" height="120" viewBox="0 0 120 120">
                        <defs>
                            <path id="circlePath" d="M 60, 60 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" />
                        </defs>
                        <text style={{ fontSize: '10px', fill: '#121212', letterSpacing: '2.5px', fontWeight: '500', textTransform: 'uppercase' }}>
                            <textPath xlinkHref="#circlePath">Look Now • Look Now • Look Now •</textPath>
                        </text>
                    </svg>
                    <div style={{ position: 'absolute', color: '#af7470', fontSize: '24px' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="7" x2="17" y2="17"></line><polyline points="17 7 17 17 7 17"></polyline></svg>
                    </div>
                </div>

                {banners.map((banner, index) => (
                    <div 
                        key={index}
                        style={{ 
                            position: 'absolute', 
                            top: 0, 
                            left: 0, 
                            width: '100%', 
                            height: '100%', 
                            display: 'flex', 
                            alignItems: 'center',
                            opacity: currentSlide === index ? 1 : 0,
                            visibility: currentSlide === index ? 'visible' : 'hidden',
                            transform: `translateX(${(index - currentSlide) * 50}px)`,
                            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                            padding: '100px 0'
                        }}
                    >
                        {/* Slide Content */}
                        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 30px', position: 'relative', zIndex: 1 }}>
                            <div className="hero-content" style={{ maxWidth: '500px', transition: 'all 0.6s ease', opacity: currentSlide === index ? 1 : 0, transform: currentSlide === index ? 'translateY(0)' : 'translateY(30px)' }}>
                                <h5 style={{ fontFamily: '"Whisper", cursive', fontSize: '28px', color: '#af7470', marginBottom: '15px' }}>{banner.subtitle}</h5>
                                <h1 style={{ fontSize: '72px', fontWeight: '400', lineHeight: '1.0', marginBottom: '25px', color: '#121212', fontFamily: 'serif' }}>{banner.title}</h1>
                                <p style={{ fontSize: '15px', color: '#666', marginBottom: '40px', lineHeight: '1.6', maxWidth: '380px' }}>{banner.description}</p>
                                <a href="/shop" className="btn-premium">VIEW COLLECTION</a>
                                
                                {/* Pagination Dots */}
                                <div style={{ display: 'flex', gap: '15px', marginTop: '60px', alignItems: 'center' }}>
                                    {banners.map((_, i) => (
                                        <div 
                                            key={i}
                                            onClick={() => setCurrentSlide(i)}
                                            style={{ 
                                                width: '24px',
                                                height: '24px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <span style={{ 
                                                width: currentSlide === i ? '10px' : '6px', 
                                                height: currentSlide === i ? '10px' : '6px', 
                                                borderRadius: '50%', 
                                                background: currentSlide === i ? 'transparent' : '#ddd', 
                                                border: currentSlide === i ? '1px solid #121212' : 'none',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'all 0.3s ease',
                                                position: 'relative'
                                            }}>
                                                {currentSlide === i && (
                                                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#121212' }}></span>
                                                )}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="hero-images" style={{ width: '600px', height: '500px', position: 'relative', transition: 'all 0.8s ease', opacity: currentSlide === index ? 1 : 0, transform: currentSlide === index ? 'scale(1)' : 'scale(0.9)' }}>
                                {/* Static Badge in top right */}
                                <div style={{ position: 'absolute', top: '0', right: '0', width: '100px', height: '100px', zIndex: 3 }}>
                                    <img src={banner.badge} alt="Badge" style={{ width: '100%', opacity: '0.2' }} />
                                </div>

                                {/* Image 1 (Larger, back) */}
                                <div className="hero-img-1" style={{ 
                                    position: 'absolute', 
                                    top: banner.img2 ? '20px' : '0', 
                                    left: banner.img2 ? '0' : '50px', 
                                    width: banner.img2 ? '450px' : '550px', 
                                    zIndex: 1, 
                                    transition: 'all 1s ease 0.2s', 
                                    transform: currentSlide === index ? 'translateX(0)' : 'translateX(50px)' 
                                }}>
                                    <img src={banner.img1} alt="Hero 1" style={{ width: '100%', height: 'auto', boxShadow: banner.img2 ? '0 20px 40px rgba(0,0,0,0.1)' : 'none' }} />
                                </div>
                                
                                {/* Image 2 (Smaller, front) */}
                                {banner.img2 && (
                                    <div className="hero-img-2" style={{ position: 'absolute', bottom: '-80px', right: '0', width: '280px', zIndex: 2, transition: 'all 1s ease 0.4s', transform: currentSlide === index ? 'translateY(0)' : 'translateY(50px)' }}>
                                        <img src={banner.img2} alt="Hero 2" style={{ width: '100%', height: 'auto', zIndex: 2 }} />
                                    </div>
                                )}

                                {/* Rotate Vertical Text */}
                                <div style={{ position: 'absolute', top: '40%', right: '-30px', transform: 'rotate(90deg)', fontSize: '11px', letterSpacing: '3px', color: '#121212', fontWeight: '500' }}>LOOK NOW</div>
                            </div>
                        </div>
                    </div>
                ))}
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

            {/* Shop by Categories Section */}
            <section className="shop-by-categories" style={{ padding: '100px 0', background: '#fff', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
                    <div style={{ marginBottom: '60px' }}>
                        <h5 style={{ fontFamily: '"Whisper", cursive', fontSize: '28px', color: '#af7470', marginBottom: '10px' }}>Our Fashion</h5>
                        <h2 style={{ fontSize: '42px', fontFamily: '"Playfair Display", serif', fontWeight: '400', color: '#121212ff', marginBottom: '20px' }}>Shop by Categories</h2>
                        <p style={{ fontSize: '14px', color: '#666', maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' }}>Helping people manage anxiety, pain, and sleeplessness.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px' }}>
                        {[
                            { name: 'Shirt', img: '/Fana – Fashion Shop WordPress Theme_files/cat-01.jpg', count: 10 },
                            { name: 'Pants', img: '/Fana – Fashion Shop WordPress Theme_files/cat-02.jpg', count: 9 },
                            { name: 'Dresses', img: '/Fana – Fashion Shop WordPress Theme_files/cat-03.jpg', count: 11 },
                            { name: 'Shoes', img: '/Fana – Fashion Shop WordPress Theme_files/cat-04.jpg', count: 7 }
                        ].map((cat, idx) => (
                            <Link 
                                key={idx} 
                                to={`/shop?category=${cat.name}`} 
                                style={{ textDecoration: 'none', position: 'relative', overflow: 'hidden' }}
                                className="category-card"
                            >
                                <div style={{ overflow: 'hidden', marginBottom: '20px' }}>
                                    <img 
                                        src={cat.img} 
                                        alt={cat.name} 
                                        style={{ width: '100%', height: 'auto', transition: 'transform 0.8s ease' }} 
                                        className="cat-img"
                                    />
                                </div>
                                <div style={{ 
                                    background: '#fff', 
                                    padding: '15px 30px', 
                                    position: 'absolute', 
                                    bottom: '40px', 
                                    left: '50%', 
                                    transform: 'translateX(-50%)', 
                                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
                                    minWidth: '200px',
                                    transition: 'all 0.3s ease'
                                }} className="cat-label">
                                    <h4 style={{ margin: 0, fontSize: '18px', fontWeight: '400', color: '#121212', fontFamily: '"Playfair Display", serif' }}>
                                        {cat.name} <sup style={{ fontSize: '11px', color: '#999' }}>{cat.count}</sup>
                                    </h4>
                                </div>
                            </Link>
                        ))}
                    </div>
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
