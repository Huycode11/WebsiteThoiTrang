import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = () => {
    const { cartItems, cartTotal, progressPercent, FREE_SHIPPING_THRESHOLD, updateQuantity, removeFromCart } = useContext(CartContext);

    return (
        <div className="cart-page" style={{ background: '#fff', paddingBottom: '80px', fontFamily: '"Jost", sans-serif' }}>
            
            {/* Hero Banner Section */}
            <div style={{ background: '#fcfaf7', width: '100%', height: '240px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
                {/* Abstract Background Shapes */}
                <div style={{ position: 'absolute', top: 0, right: '0', height: '100%', width: '100%', background: 'url(/Fana%20%E2%80%93%20Fashion%20Shop%20WordPress%20Theme_files/banner-06.jpg) center center / cover no-repeat', opacity: 1 }} />
                
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 30px', position: 'relative', zIndex: 2 }}>
                    <h1 style={{ fontSize: '42px', fontFamily: '"Playfair Display", serif', fontWeight: '400', color: '#121212', marginBottom: '10px' }}>Shopping cart</h1>
                    <div style={{ fontSize: '12px', color: '#121212', fontWeight: '500' }}>
                        <span style={{ color: '#666' }}>Home</span> &gt; <span style={{ fontWeight: 'bold' }}>Page</span>
                    </div>
                </div>
            </div>

            <div className="container" style={{ maxWidth: '1200px', margin: '60px auto 0', padding: '0 30px' }}>
                {cartItems.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '100px 0' }}>
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#e0e0e0" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '15px' }}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>Your cart is currently empty.</p>
                        <Link to="/shop" style={{ background: '#2f4799', color: '#fff', padding: '12px 30px', textDecoration: 'none', fontWeight: 'bold', fontSize: '12px', letterSpacing: '1px' }}>CONTINUE SHOPPING</Link>
                    </div>
                ) : (
                    <div>
                        {/* Cart Table */}
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #ddd', textAlign: 'left', fontSize: '12px', color: '#666', fontWeight: '400' }}>
                                    <th style={{ padding: '0 0 15px 0', width: '45%', fontWeight: 'normal' }}>Product</th>
                                    <th style={{ padding: '0 0 15px 0', width: '20%', fontWeight: 'normal', textAlign: 'center' }}>Price</th>
                                    <th style={{ padding: '0 0 15px 0', width: '20%', fontWeight: 'normal', textAlign: 'center' }}>Qty</th>
                                    <th style={{ padding: '0 0 15px 0', width: '15%', fontWeight: 'normal', textAlign: 'center' }}>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map(item => (
                                    <tr key={item._id} style={{ borderBottom: '1px solid #ddd' }}>
                                        <td style={{ padding: '30px 0', display: 'flex', gap: '20px', alignItems: 'center' }}>
                                            <img src={item.images[0]} alt={item.name} style={{ width: '80px', height: '100px', objectFit: 'cover', background: '#f5f5f5' }} />
                                            <div style={{ fontSize: '13px', color: '#121212', fontWeight: '500' }}>{item.name}</div>
                                        </td>
                                        <td style={{ padding: '30px 0', textAlign: 'center', fontSize: '13px', color: '#2f4799' }}>
                                            ${item.price.toFixed(2)}
                                        </td>
                                        <td style={{ padding: '30px 0', textAlign: 'center' }}>
                                            <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '3px' }}>
                                                <button onClick={() => updateQuantity(item._id, item.quantity - 1)} style={{ background: '#fcfaf7', border: 'none', padding: '10px 15px', cursor: 'pointer', color: '#666' }}>-</button>
                                                <span style={{ fontSize: '13px', width: '30px', textAlign: 'center', color: '#121212' }}>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item._id, item.quantity + 1)} style={{ background: '#fcfaf7', border: 'none', padding: '10px 15px', cursor: 'pointer', color: '#666' }}>+</button>
                                            </div>
                                        </td>
                                        <td style={{ padding: '30px 0', textAlign: 'center', position: 'relative' }}>
                                            <span style={{ fontSize: '13px', color: '#2f4799' }}>${(item.price * item.quantity).toFixed(2)}</span>
                                            <button onClick={() => removeFromCart(item._id)} style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#121212', cursor: 'pointer' }}>
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                            <Link to="/shop" style={{ display: 'inline-block', background: '#3b5998', color: '#fff', fontSize: '11px', fontWeight: '600', padding: '12px 30px', textDecoration: 'none', letterSpacing: '1px' }}>
                                CONTINUE SHOPPING
                            </Link>
                            <button style={{ background: '#b0b0b0', color: '#fff', border: 'none', fontSize: '11px', fontWeight: '600', padding: '12px 30px', cursor: 'pointer', letterSpacing: '1px' }}>
                                UPDATE CART
                            </button>
                        </div>

                        {/* Full Width Progress Bar */}
                        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
                            <div style={{ height: '14px', background: '#e0e0e0', borderRadius: '7px', overflow: 'hidden', marginBottom: '15px', width: '100%', position: 'relative' }}>
                                <div style={{ 
                                    height: '100%', 
                                    background: '#e74c3c', 
                                    width: `${progressPercent}%`, 
                                    transition: 'width 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    fontSize: '9px',
                                    fontWeight: 'bold',
                                    letterSpacing: '1px'
                                }}>
                                    {progressPercent > 3 ? `${Math.round(progressPercent)}%` : ''}
                                </div>
                            </div>
                            {progressPercent < 100 ? (
                                <>
                                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                                        Spend <span style={{ color: '#121212', fontWeight: '500' }}>${(FREE_SHIPPING_THRESHOLD - cartTotal).toFixed(2)}</span> more to reach FREE SHIPPING!
                                    </div>
                                    <div style={{ fontSize: '11px', color: '#666' }}>
                                        to add more products to your cart and receive free shipping for order <span style={{ color: '#121212', fontWeight: '500' }}>${FREE_SHIPPING_THRESHOLD.toFixed(2)}</span>.
                                    </div>
                                </>
                            ) : (
                                <div style={{ fontSize: '13px', color: '#2ecc71', fontWeight: 'bold' }}>
                                    You've reached FREE SHIPPING!
                                </div>
                            )}
                        </div>

                        {/* Bottom Section: Coupon & Cart Totals */}
                        <div style={{ display: 'flex', gap: '60px' }}>
                            
                            {/* Coupon Column */}
                            <div style={{ flex: '1' }}>
                                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#121212', marginBottom: '20px' }}>Coupon</h3>
                                <div style={{ display: 'flex' }}>
                                    <input type="text" placeholder="Enter coupon code here..." style={{ flex: '1', padding: '12px 15px', border: 'none', background: '#f5f5f5', fontSize: '12px', outline: 'none' }} />
                                    <button style={{ background: '#3b5998', color: '#fff', border: 'none', padding: '0 25px', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', cursor: 'pointer' }}>
                                        APPLY COUPON
                                    </button>
                                </div>
                            </div>

                            {/* Cart Totals Column */}
                            <div style={{ flex: '1' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#121212', margin: 0 }}>Cart Totals</h3>
                                    <button style={{ background: '#3b5998', color: '#fff', border: 'none', padding: '12px 30px', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', cursor: 'pointer' }}>
                                        PROCEED TO CHECKOUT
                                    </button>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderBottom: '1px solid #eee', fontSize: '13px' }}>
                                    <span style={{ color: '#666' }}>Subtotal</span>
                                    <span style={{ color: '#2f4799', fontWeight: '500' }}>${cartTotal.toFixed(2)}</span>
                                </div>

                                <div style={{ padding: '20px 0', borderBottom: '1px solid #eee', fontSize: '12px', display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#666' }}>Shipping</span>
                                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
                                            <span style={{ color: '#121212' }}>Flat rate: <span style={{ color: '#666' }}>$20.00</span></span>
                                            <input type="radio" name="shipping" defaultChecked style={{ cursor: 'pointer' }} />
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
                                            <span style={{ color: '#121212' }}>Local pickup: <span style={{ color: '#666' }}>$20.00</span></span>
                                            <input type="radio" name="shipping" style={{ cursor: 'pointer' }} />
                                        </div>
                                        <div style={{ color: '#666', marginTop: '5px' }}>Shipping to <strong>CA.</strong></div>
                                        <div style={{ color: '#3b5998', cursor: 'pointer' }}>Change address</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', fontSize: '14px' }}>
                                    <span style={{ color: '#121212', fontWeight: '500' }}>Total</span>
                                    <span style={{ color: '#2f4799', fontWeight: '600' }}>${(cartTotal + 20).toFixed(2)}</span>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
