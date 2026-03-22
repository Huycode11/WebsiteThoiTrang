import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer id="tbay-footer" className="tbay-footer footer-01" style={{ background: '#fff', color: '#121212' }}>
            <div data-elementor-type="wp-post" data-elementor-id="5386" className="elementor elementor-5386">
                
                {/* Newsletter Section */}
                <section className="elementor-section elementor-top-section" style={{ padding: '80px 0 60px', textAlign: 'center' }}>
                    <div className="elementor-container">
                        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                            <h5 style={{ fontFamily: '"Whisper", cursive', fontSize: '32px', color: '#af7470', marginBottom: '10px' }}>Newsletter</h5>
                            <h2 style={{ fontSize: '36px', fontWeight: '400', marginBottom: '30px', color: '#121212' }}>Sign up and get up to 20% off your first purchase</h2>
                            <div style={{ display: 'flex', gap: '0', justifyContent: 'center' }}>
                                <input 
                                    type="email" 
                                    placeholder="Enter your email..." 
                                    style={{ 
                                        padding: '15px 20px', 
                                        width: '100%', 
                                        maxWidth: '400px', 
                                        border: '1px solid #eee', 
                                        outline: 'none',
                                        fontSize: '14px'
                                    }} 
                                />
                                <button style={{ 
                                    background: '#2f4799', 
                                    color: '#fff', 
                                    padding: '15px 40px', 
                                    border: 'none', 
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    fontSize: '14px'
                                }}>Subscribe</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Bar Section */}
                <section className="elementor-section" style={{ padding: '0 30px 60px' }}>
                    <div className="elementor-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                        {[
                            { icon: (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                            ), title: "Uniqueness", desc: "We create individual and unique solutions." },
                            { icon: (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                            ), title: "Delivery", desc: "We deliver goods around the world" },
                            { icon: (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            ), title: "Quality", desc: "We deliver fabrics from Turkey, India, Italy" },
                            { icon: (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                            ), title: "Showroom", desc: "You can see our \"here and now\" products" }
                        ].map((item, idx) => (
                            <div key={idx} style={{ background: '#f9f9f9', padding: '30px 20px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <div style={{ color: '#2f4799' }}>{item.icon}</div>
                                <div>
                                    <h4 style={{ margin: '0 0 5px 0', fontSize: '18px', fontWeight: '500' }}>{item.title}</h4>
                                    <p style={{ margin: 0, fontSize: '13px', color: '#666', lineHeight: '1.6' }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Main Footer Links Section */}
                <section className="elementor-section" style={{ padding: '60px 30px', borderTop: '1px solid #eee' }}>
                    <div className="elementor-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }}>
                        <div>
                            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '25px' }}>Information</h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <li><Link to="/privacy" style={{ textDecoration: 'none', color: '#646464', fontSize: '14px' }}>Privacy policy</Link></li>
                                <li><Link to="/refund" style={{ textDecoration: 'none', color: '#646464', fontSize: '14px' }}>Refund policy</Link></li>
                                <li><Link to="/shipping" style={{ textDecoration: 'none', color: '#646464', fontSize: '14px' }}>Shipping & Return</Link></li>
                                <li><Link to="/terms" style={{ textDecoration: 'none', color: '#646464', fontSize: '14px' }}>Term Of Use</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '25px' }}>Quick links</h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <li><Link to="/account" style={{ textDecoration: 'none', color: '#646464', fontSize: '14px' }}>My account</Link></li>
                                <li><Link to="/cart" style={{ textDecoration: 'none', color: '#646464', fontSize: '14px' }}>Cart</Link></li>
                                <li><Link to="/wishlist" style={{ textDecoration: 'none', color: '#646464', fontSize: '14px' }}>Wishlist</Link></li>
                                <li><Link to="/checkout" style={{ textDecoration: 'none', color: '#646464', fontSize: '14px' }}>Checkout</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '25px' }}>Contact us</h3>
                            <p style={{ color: '#646464', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                                Find a location nearest you. <span style={{ color: '#121212', textDecoration: 'underline', cursor: 'pointer', fontWeight: '500' }}>See Our Stores</span>
                            </p>
                            <p style={{ color: '#121212', fontWeight: '600', fontSize: '15px' }}>
                                +994 (0)767 767 767<br />
                                hello@domain.com
                            </p>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '25px' }}>Our Company</h3>
                            <p style={{ color: '#646464', fontSize: '14px', lineHeight: '1.6', marginBottom: '15px' }}>
                                <strong style={{ color: '#121212', fontWeight: '600' }}>Address:</strong> 102 Princes Street, Toronto, Venice, Ca 124
                            </p>
                            <p style={{ color: '#646464', fontSize: '14px', lineHeight: '1.6' }}>
                                <strong style={{ color: '#121212', fontWeight: '600' }}>Hours:</strong> 9.30am – 6.30pm Monday to Friday
                            </p>
                        </div>
                    </div>
                </section>

                {/* Copyright Section */}
                <section className="elementor-section" style={{ borderTop: '1px solid #eee', padding: '30px' }}>
                    <div className="elementor-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '14px', color: '#646464' }}>
                            Copyright 2024 © <Link style={{ color: '#2f4799', textDecoration: 'none', fontWeight: '500' }} to="/">Fana</Link> WordPress Theme. All rights reserved.
                        </div>
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                            <img src="/Fana – Fashion Shop WordPress Theme_files/payment.png" alt="Payment Methods" height="25" />
                        </div>
                    </div>
                </section>
            </div>

            {/* Back to top button */}
            <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    width: '40px',
                    height: '40px',
                    background: '#121212',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
            </button>
        </footer>
    );
};

export default Footer;

