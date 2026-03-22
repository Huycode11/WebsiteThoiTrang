import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

const Header = () => {
    const { cartItems, cartCount, cartTotal, progressPercent, FREE_SHIPPING_THRESHOLD, removeFromCart, updateQuantity } = useContext(CartContext);
    const [isCartOpen, setIsCartOpen] = useState(false);
    return (
        <header id="tbay-header" className="tbay_header-template site-header header-on-slider">
            <div data-elementor-type="wp-post" data-elementor-id="5395" className="elementor elementor-5395">
                
                {/* Top Bar */}
                <section className="elementor-section elementor-top-section elementor-element elementor-section-content-middle elementor-section-full_width elementor-section-height-default" style={{ background: '#af7470', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="elementor-container elementor-column-gap-no" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 30px', color: '#fff', fontSize: '13px' }}>
                        <div className="elementor-column elementor-col-33">
                            <p style={{ margin: 0 }}>Need Help? +44 (0) 123 4567</p>
                        </div>
                        <div className="elementor-column elementor-col-33 text-center">
                            <p style={{ margin: 0, fontWeight: '500' }}>FREE SHIPPING ON ALL ORDERS OVER $100 – SHOP NOW</p>
                        </div>
                        <div className="elementor-column elementor-col-33" style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
                            <Link to="/store-locator" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                Store Locator
                            </Link>
                            <Link to="/order-tracking" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                Order Tracking
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="elementor-section elementor-top-section elementor-element elementor-element-6464897b elementor-section-content-middle elementor-section-stretched elementor-section-boxed elementor-section-height-default" data-id="6464897b" data-element_type="section" style={{ width: '100%', left: '0px', background: '#fff', borderBottom: '1px solid #eee' }}>
                    <div className="elementor-container elementor-column-gap-default" style={{ display: 'flex', alignItems: 'center', padding: '15px 60px', width: '100%', boxSizing: 'border-box' }}>
                        {/* Column 1: Navigation Menu (Left) */}
                        <div className="elementor-column" style={{ flex: '1 1 33.33%', width: '33.33%' }}>
                            <nav className="elementor-nav-menu--main elementor-nav-menu__container elementor-nav-menu--layout-horizontal">
                                <ul className="elementor-nav-menu flex-row" style={{ display: 'flex', listStyle: 'none', gap: '25px', margin: 0, padding: 0 }}>
                                    <li className="menu-item">
                                        <Link to="/" style={{ color: '#121212', textDecoration: 'none', fontWeight: '500', fontSize: '14px', whiteSpace: 'nowrap' }}>Home <span style={{ fontSize: '10px' }}>▼</span></Link>
                                    </li>
                                    <li className="menu-item">
                                        <Link to="/shop" style={{ color: '#121212', textDecoration: 'none', fontWeight: '500', fontSize: '14px', whiteSpace: 'nowrap' }}>Shop <span style={{ fontSize: '10px' }}>▼</span></Link>
                                    </li>
                                    <li className="menu-item">
                                        <Link to="/pages" style={{ color: '#121212', textDecoration: 'none', fontWeight: '500', fontSize: '14px', whiteSpace: 'nowrap' }}>Pages <span style={{ fontSize: '10px' }}>▼</span></Link>
                                    </li>
                                    <li className="menu-item">
                                        <Link to="/blogs" style={{ color: '#121212', textDecoration: 'none', fontWeight: '500', fontSize: '14px', whiteSpace: 'nowrap' }}>Blogs <span style={{ fontSize: '10px' }}>▼</span></Link>
                                    </li>
                                    <li className="menu-item">
                                        <Link to="/contact" style={{ color: '#121212', textDecoration: 'none', fontWeight: '500', fontSize: '14px', whiteSpace: 'nowrap' }}>Contact Us</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        {/* Column 2: Logo (Center) */}
                        <div className="elementor-column" style={{ flex: '1 1 33.33%', width: '33.33%', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                            <Link to="/" style={{ display: 'inline-block' }}>
                                <img width="140" src="/Fana – Fashion Shop WordPress Theme_files/logo.svg" alt="Fana Logo" style={{ display: 'block' }} />
                            </Link>
                        </div>

                        {/* Column 3: Action Icons (Right) */}
                        <div className="elementor-column" style={{ flex: '1 1 33.33%', width: '33.33%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '25px' }}>
                            {/* Search */}
                            <button type="button" style={{ background: 'none', border: 'none', color: '#121212', cursor: 'pointer', padding: 0 }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                            </button>
                            {/* Account */}
                            <Link to="/login" style={{ color: '#121212' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            </Link>
                            {/* History */}
                            <Link to="/history" style={{ color: '#121212' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/><path d="M3 11V3L11 3" stroke="currentColor" fill="none" strokeWidth="1.5"/></svg>
                            </Link>
                            {/* Wishlist */}
                            <Link to="/wishlist" style={{ color: '#121212' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                            </Link>
                            {/* Cart Dropdown wrapper */}
                            <div 
                                className="cart-wrapper" 
                                style={{ position: 'relative' }}
                                onMouseEnter={() => setIsCartOpen(true)}
                                onMouseLeave={() => setIsCartOpen(false)}
                            >
                                <Link to="/cart" style={{ color: '#121212', display: 'flex', alignItems: 'center', textDecoration: 'none', gap: '8px', padding: '10px 0' }}>
                                    <span style={{ position: 'relative' }}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                                        <span style={{ position: 'absolute', top: '-8px', right: '-12px', background: '#2f4799', color: '#fff', borderRadius: '40%', padding: '2px 6px', fontSize: '10px', fontWeight: 'bold' }}>{cartCount}</span>
                                    </span>
                                    <span style={{ fontSize: '14px', fontWeight: '500', marginLeft: '5px' }}>${cartTotal.toFixed(2)}</span>
                                </Link>

                                {/* Dropdown Menu */}
                                {isCartOpen && (
                                    <div style={{ position: 'absolute', top: '100%', right: '0', width: '320px', background: '#fff', boxShadow: '0 5px 20px rgba(0,0,0,0.1)', borderRadius: '5px', zIndex: 100, padding: '20px', cursor: 'default' }}>
                                        {cartItems.length === 0 ? (
                                            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#e0e0e0" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '15px' }}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                                                <div style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>Your cart is empty</div>
                                                <Link to="/shop" style={{ color: '#2f4799', fontWeight: 'bold', fontSize: '14px', textDecoration: 'none' }}>Continue Shopping &gt;</Link>
                                            </div>
                                        ) : (
                                            <div>
                                                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                                    {cartItems.map(item => (
                                                        <div key={item._id} style={{ display: 'flex', gap: '15px', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #eee' }}>
                                                            <div style={{ width: '70px', height: '90px', flexShrink: 0 }}>
                                                                <img src={item.images[0]} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                            </div>
                                                            <div style={{ flex: 1 }}>
                                                                <div style={{ fontSize: '13px', color: '#121212', marginBottom: '10px', lineHeight: '1.4' }}>{item.name}</div>
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #eee', borderRadius: '3px' }}>
                                                                        <button onClick={() => updateQuantity(item._id, item.quantity - 1)} style={{ background: 'none', border: 'none', padding: '2px 8px', cursor: 'pointer' }}>-</button>
                                                                        <span style={{ fontSize: '13px', padding: '0 8px' }}>{item.quantity}</span>
                                                                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)} style={{ background: 'none', border: 'none', padding: '2px 8px', cursor: 'pointer' }}>+</button>
                                                                    </div>
                                                                    <div style={{ color: '#2f4799', fontSize: '14px' }}>${item.price.toFixed(2)}</div>
                                                                    <button onClick={() => removeFromCart(item._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}>
                                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div style={{ marginTop: '15px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', color: '#121212', marginBottom: '15px' }}>
                                                        <span>Subtotal:</span>
                                                        <span style={{ color: '#2f4799', fontWeight: '500' }}>${cartTotal.toFixed(2)}</span>
                                                    </div>
                                                    
                                                    {/* Free Shipping Progress */}
                                                    <div style={{ marginBottom: '20px' }}>
                                                        <div style={{ height: '16px', background: '#eee', borderRadius: '8px', overflow: 'hidden', marginBottom: '10px', position: 'relative' }}>
                                                            <div style={{ 
                                                                height: '100%', 
                                                                background: '#F1735F', 
                                                                width: `${progressPercent}%`, 
                                                                transition: 'width 0.3s ease',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                color: '#fff',
                                                                fontSize: '10px',
                                                                fontWeight: 'bold'
                                                            }}>
                                                                {progressPercent > 5 ? `${Math.round(progressPercent)}%` : ''}
                                                            </div>
                                                        </div>
                                                        {progressPercent < 100 ? (
                                                            <div style={{ fontSize: '13px', color: '#666', textAlign: 'center' }}>
                                                                Spend <span style={{ color: '#2f4799' }}>${(FREE_SHIPPING_THRESHOLD - cartTotal).toFixed(2)}</span> more to reach FREE SHIPPING!
                                                            </div>
                                                        ) : (
                                                            <div style={{ fontSize: '13px', color: '#2ecc71', textAlign: 'center', fontWeight: 'bold' }}>
                                                                You've reached FREE SHIPPING!
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div style={{ display: 'flex', gap: '10px' }}>
                                                        <Link to="/cart" style={{ flex: 1, textAlign: 'center', background: '#121212', color: '#fff', padding: '12px 0', textDecoration: 'none', fontSize: '13px', fontWeight: '500' }}>VIEW CART</Link>
                                                        <Link to="/checkout" style={{ flex: 1, textAlign: 'center', background: '#2f4799', color: '#fff', padding: '12px 0', textDecoration: 'none', fontSize: '13px', fontWeight: '500' }}>CHECKOUT</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </section>


            </div>
        </header>
    );
};

export default Header;

