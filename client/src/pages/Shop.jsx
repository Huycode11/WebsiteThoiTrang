import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Products
                const prodRes = await fetch('http://localhost:5000/api/products');
                const prodData = await prodRes.json();
                if (prodData.success && prodData.products) {
                    setProducts(prodData.products);
                }

                const brandRes = await fetch('http://localhost:5000/api/brands');
                const brandData = await brandRes.json();
                if (brandData.success && brandData.brands) {
                    setBrands(brandData.brands);
                }

                const catRes = await fetch('http://localhost:5000/api/categories');
                const catData = await catRes.json();
                if (catData.success && catData.categories) {
                    setCategories(catData.categories);
                }
            } catch (error) {
                console.error("Failed to fetch shop data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Pagination logic
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 300, behavior: 'smooth' }); // Scroll back to top of grid
    };

    return (
        <div className="shop-page" style={{ background: '#fff', paddingBottom: '80px', fontFamily: '"Jost", sans-serif' }}>
            {/* Hero Banner Section */}
            <div style={{ background: '#fcfaf7', width: '100%', height: '240px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
                {/* Abstract Background Shapes baked into image */}
                <div style={{ position: 'absolute', top: 0, right: '0', height: '100%', width: '100%', background: 'url(/Fana%20%E2%80%93%20Fashion%20Shop%20WordPress%20Theme_files/banner-06.jpg) center center / cover no-repeat', opacity: 1 }} />
                
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 30px', position: 'relative', zIndex: 2 }}>
                    <h1 style={{ fontSize: '42px', fontFamily: '"Playfair Display", serif', fontWeight: '400', color: '#121212', marginBottom: '10px' }}>Shop</h1>
                    <div style={{ fontSize: '12px', color: '#121212', fontWeight: '500' }}>
                        <Link to="/" style={{ color: '#666', textDecoration: 'none' }}>Home</Link> &gt; <span style={{ fontWeight: 'bold' }}>Shop</span>
                    </div>
                </div>
            </div>

            {/* Promo Banner under Hero */}
            <div className="container" style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 30px' }}>
                <div style={{ background: '#f5f7fa', borderRadius: '5px', padding: '30px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #eee' }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{ background: '#c6e866', color: '#121212', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                <span style={{ fontSize: '11px' }}>UP TO</span>
                                <span style={{ fontSize: '18px' }}>-50%</span>
                            </div>
                            <div>
                                <h2 style={{ fontSize: '24px', fontWeight: '400', marginBottom: '5px', color: '#121212' }}>The New Branded Wear Incoming</h2>
                                <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>Free Shipping On Orders $50+ <a href="#" style={{ color: '#2f4799', borderBottom: '1px solid #2f4799', textDecoration: 'none' }}>details</a></p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img src="/Fana – Fashion Shop WordPress Theme_files/gallery-01.jpg" alt="Promo Bag" style={{ height: '100px', objectFit: 'contain' }} />
                    </div>
                </div>
            </div>

            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 30px', display: 'flex', gap: '40px' }}>
                {/* Left Sidebar */}
                <div style={{ width: '250px', flexShrink: 0 }}>
                    <button style={{ width: '100%', background: '#3b5998', color: '#fff', border: 'none', padding: '12px 0', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '40px', cursor: 'pointer' }}>
                        FILTER
                    </button>

                    <div style={{ marginBottom: '40px' }}>
                        <h3 style={{ fontSize: '16px', fontFamily: '"Playfair Display", serif', fontWeight: '400', marginBottom: '20px', color: '#121212' }}>Product color</h3>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <div style={{ width: '20px', height: '20px', background: '#000', cursor: 'pointer' }}></div>
                            <div style={{ width: '20px', height: '20px', background: '#d35400', cursor: 'pointer' }}></div>
                            <div style={{ width: '20px', height: '20px', background: '#e74c3c', cursor: 'pointer' }}></div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '40px' }}>
                        <h3 style={{ fontSize: '16px', fontFamily: '"Playfair Display", serif', fontWeight: '400', marginBottom: '20px', color: '#121212' }}>Brands</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {brands.length === 0 ? (
                                <div style={{ fontSize: '13px', color: '#999' }}>No brands found</div>
                            ) : (
                                brands.map(brand => (
                                    <div key={brand._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: '#121212' }}>
                                        <span>{brand.name}</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ color: '#999', fontSize: '12px' }}>[{Math.floor(Math.random() * 10) + 1}]</span>
                                            <input type="checkbox" style={{ cursor: 'pointer' }} />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div style={{ marginBottom: '40px' }}>
                        <h3 style={{ fontSize: '16px', fontFamily: '"Playfair Display", serif', fontWeight: '400', marginBottom: '20px', color: '#121212' }}>Categories</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {categories.length === 0 ? (
                                <div style={{ fontSize: '13px', color: '#999' }}>No categories found</div>
                            ) : (
                                categories.map(cat => (
                                    <div key={cat._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: '#121212' }}>
                                        <span>{cat.name}</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ color: '#999', fontSize: '12px' }}>[{products.filter(p => p.categories && p.categories.includes(cat.name)).length}]</span>
                                            <input type="checkbox" style={{ cursor: 'pointer' }} />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '16px', fontFamily: '"Playfair Display", serif', fontWeight: '400', marginBottom: '20px', color: '#121212' }}>Product Tags</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {['Accessories', 'Anklets', 'Bracelets', 'Earrings', 'Jewelry', 'Men', 'Necklaces', 'Pendants', 'Rings'].map((tag, idx) => (
                                <div key={idx} style={{ 
                                    padding: '5px 15px', 
                                    borderRadius: '15px', 
                                    border: '1px solid #eee', 
                                    fontSize: '11px', 
                                    color: idx === 0 ? '#fff' : '#666',
                                    background: idx === 0 ? '#3b5998' : '#fff',
                                    cursor: 'pointer'
                                }}>
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Grid Content */}
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', fontSize: '13px', color: '#666' }}>
                        <div>Showing {Math.min(startIndex + 1, products.length)}–{Math.min(startIndex + itemsPerPage, products.length)} of {products.length} results</div>
                        <div>
                            Sort by: <select style={{ border: 'none', background: 'transparent', outline: 'none', fontWeight: '500', cursor: 'pointer' }}>
                                <option>Default sorting</option>
                                <option>Sort by price</option>
                                <option>Sort by rating</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div style={{ padding: '50px 0', textAlign: 'center' }}>Loading products...</div>
                    ) : products.length === 0 ? (
                        <div style={{ padding: '50px 0', textAlign: 'center', color: '#666' }}>No products available. Add some first!</div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
                            {currentProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}

                    {/* Pagination Controls */}
                    {!loading && totalPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px', gap: '10px' }}>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    style={{
                                        width: '35px',
                                        height: '35px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '1px solid',
                                        borderColor: currentPage === page ? '#3b5998' : '#eee',
                                        background: currentPage === page ? '#3b5998' : '#fff',
                                        color: currentPage === page ? '#fff' : '#666',
                                        fontSize: '13px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    {page}
                                </button>
                            ))}
                            {currentPage < totalPages && (
                                <button 
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', display: 'flex', alignItems: 'center', marginLeft: '10px' }}
                                >
                                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;
