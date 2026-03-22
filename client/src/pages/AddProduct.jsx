import React, { useState } from 'react';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        brand: 'Fana',
        category: 'Clothing',
        price: '',
        originalPrice: '',
        description: '',
        sku: '',
        availability: '',
        images: [] 
    });

    const [status, setStatus] = useState({ type: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    const fetchBrands = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/brands');
            const data = await res.json();
            if (data.success) {
                setBrands(data.brands);
                if (data.brands.length > 0 && !formData.brand) {
                    setFormData(prev => ({ ...prev, brand: data.brands[0].name }));
                }
            }
        } catch (error) {
            console.error('Failed to fetch brands', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/categories');
            const data = await res.json();
            if (data.success) {
                setCategories(data.categories);
                if (data.categories.length > 0 && !formData.category) {
                    setFormData(prev => ({ ...prev, category: data.categories[0].name }));
                }
            }
        } catch (error) {
            console.error('Failed to fetch categories', error);
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        fetchBrands();
        fetchCategories();
    }, []);

    const handleAddBrand = async () => {
        const brandName = window.prompt("Enter new brand name:");
        if (!brandName || !brandName.trim()) return;
        try {
            const res = await fetch('http://localhost:5000/api/brands', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: brandName.trim() })
            });
            const data = await res.json();
            if (data.success) {
                fetchBrands();
                setFormData(prev => ({ ...prev, brand: data.brand.name }));
            } else {
                alert(data.message || 'Failed to add brand');
            }
        } catch (error) {
            alert('Error adding brand');
        }
    };

    const handleAddCategory = async () => {
        const categoryName = window.prompt("Enter new category name (e.g. Dresses, Shirt, Set):");
        if (!categoryName || !categoryName.trim()) return;
        try {
            const res = await fetch('http://localhost:5000/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: categoryName.trim() })
            });
            const data = await res.json();
            if (data.success) {
                fetchCategories();
                setFormData(prev => ({ ...prev, category: data.category.name }));
            } else {
                alert(data.message || 'Failed to add category');
            }
        } catch (error) {
            alert('Error adding category');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imagePromises = files.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        });

        Promise.all(imagePromises)
            .then((base64Images) => {
                setFormData({ ...formData, images: [...formData.images, ...base64Images] });
            })
            .catch((error) => console.error("Error reading images:", error));
    };

    const removeImage = (indexToRemove) => {
        setFormData({
            ...formData,
            images: formData.images.filter((_, index) => index !== indexToRemove)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.images.length === 0) {
            setStatus({ type: 'error', message: 'Please select at least one image.' });
            return;
        }

        setIsLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const productData = {
                ...formData,
                price: Number(formData.price),
                originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
                availability: Number(formData.availability),
                categories: [formData.category] // Convert the single string to array as needed by backend
            };

            const response = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setStatus({ type: 'success', message: 'Product added successfully!' });
                setFormData({
                    name: '', brand: 'Fana', category: 'Clothing', price: '', originalPrice: '', description: '', sku: '', availability: '', images: []
                });
            } else {
                setStatus({ type: 'error', message: data.message || 'Failed to add product.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Network error. Ensure your backend and MongoDB are running.' });
        } finally {
            setIsLoading(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '12px 15px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '14px',
        marginBottom: '20px',
        outline: 'none',
        boxSizing: 'border-box'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        fontWeight: '500',
        fontSize: '14px',
        color: '#121212'
    };

    return (
        <div style={{ background: '#fcfaf7', minHeight: '80vh', padding: '60px 0' }}>
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px', background: '#fff', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                <h1 style={{ textAlign: 'center', fontFamily: 'serif', fontSize: '32px', marginBottom: '10px', color: '#121212' }}>Add New Product</h1>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>Fill in the details to list a new item in your store.</p>
                
                {status.message && (
                    <div style={{ padding: '15px', marginBottom: '30px', borderRadius: '4px', background: status.type === 'error' ? '#ffeeee' : '#eeffee', color: status.type === 'error' ? '#e74c3c' : '#2ecc71', border: `1px solid ${status.type === 'error' ? '#ffcccc' : '#ccffcc'}` }}>
                        {status.message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                        <div>
                            <label style={labelStyle}>Product Name *</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required style={inputStyle} placeholder="E.g. Vintage Denim Jacket" />
                        </div>
                        <div>
                            <label style={labelStyle}>
                                Brand 
                                <span onClick={handleAddBrand} style={{ color: '#2f4799', marginLeft: '10px', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}>
                                    + Add New Brand
                                </span>
                            </label>
                            <select name="brand" value={formData.brand} onChange={handleChange} style={inputStyle}>
                                {brands.length === 0 && <option value="Fana">Fana</option>}
                                {brands.map(b => (
                                    <option key={b._id} value={b.name}>{b.name}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label style={labelStyle}>
                                Category 
                                <span onClick={handleAddCategory} style={{ color: '#2f4799', marginLeft: '10px', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}>
                                    + Add New Category
                                </span>
                            </label>
                            <select name="category" value={formData.category} onChange={handleChange} style={inputStyle}>
                                {categories.length === 0 && <option value="Clothing">Clothing</option>}
                                {categories.map(c => (
                                    <option key={c._id} value={c.name}>{c.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label style={labelStyle}>Price ($) *</label>
                            <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required style={inputStyle} placeholder="0.00" />
                        </div>
                        <div>
                            <label style={labelStyle}>Original Price ($) (Optional)</label>
                            <input type="number" step="0.01" name="originalPrice" value={formData.originalPrice} onChange={handleChange} style={inputStyle} placeholder="0.00" />
                        </div>

                        <div>
                            <label style={labelStyle}>SKU Code *</label>
                            <input type="text" name="sku" value={formData.sku} onChange={handleChange} required style={inputStyle} placeholder="E.g. FANA-JKT-01" />
                        </div>
                        <div>
                            <label style={labelStyle}>Stock Availability *</label>
                            <input type="number" name="availability" value={formData.availability} onChange={handleChange} required style={inputStyle} placeholder="E.g. 50" />
                        </div>
                    </div>

                    <div style={{ padding: '20px', border: '2px dashed #ddd', borderRadius: '4px', textAlign: 'center', marginBottom: '20px', position: 'relative' }}>
                        <input 
                            type="file" 
                            accept="image/*" 
                            multiple 
                            onChange={handleImageChange} 
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} 
                        />
                        <div style={{ color: '#2f4799', fontSize: '15px', fontWeight: '500' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', margin: '0 auto 10px' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                            Click here to select images from your computer
                        </div>
                        <p style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>Supports JPG, PNG (You can select multiple files)</p>
                    </div>

                    {formData.images.length > 0 && (
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
                            {formData.images.map((imgSrc, index) => (
                                <div key={index} style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #eee' }}>
                                    <img src={imgSrc} alt={`preview ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <button 
                                        type="button" 
                                        onClick={() => removeImage(index)}
                                        style={{ position: 'absolute', top: '2px', right: '2px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '50%', width: '20px', height: '20px', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    >✕</button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div>
                        <label style={labelStyle}>Product Description *</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }} placeholder="Describe the product material, fit, and care instructions..."></textarea>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <button type="submit" disabled={isLoading} className="btn-premium" style={{ opacity: isLoading ? 0.7 : 1, padding: '15px 50px' }}>
                            {isLoading ? 'Creating...' : 'ADD PRODUCT'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;

