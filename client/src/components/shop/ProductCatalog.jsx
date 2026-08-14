import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Star, Tag, Check, Filter } from 'lucide-react';
import { ShopAPI } from '../../services/api';

export default function ProductCatalog({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [addedIds, setAddedIds] = useState([]);

  useEffect(() => {
    loadProducts();
  }, [categoryFilter, search]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await ShopAPI.getProducts({ category: categoryFilter, search });
      setProducts(res.products || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedIds(prev => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds(prev => prev.filter(id => id !== product.id));
    }, 1500);
  };

  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <div className="card-title">
          <Tag size={22} style={{ color: 'var(--accent-teal)' }} />
          <span>Security Hardware, AI Tools & Developer Gear Catalog</span>
        </div>
        <span className="badge badge-low">Smart Catalog Ready</span>
      </div>

      {/* Search & Category Filter Bar */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="input-control" 
            style={{ paddingLeft: '40px' }}
            placeholder="Search by keyword, tag (e.g. YubiKey, Course, SSD)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select 
          className="select-control"
          style={{ width: '220px' }}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Hardware Security">Hardware Security</option>
          <option value="Books & Guides">Books & Field Guides</option>
          <option value="Courses & Certifications">Courses & Certifications</option>
          <option value="Developer Gear">Developer Gear</option>
        </select>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading AI Tech Product Catalog...</div>
      ) : products.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No products matched your search.</div>
      ) : (
        <div className="grid-3">
          {products.map((product) => {
            const isJustAdded = addedIds.includes(product.id);
            return (
              <div 
                key={product.id} 
                className="card" 
                style={{ 
                  padding: '16px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  background: 'var(--bg-surface)'
                }}
              >
                <div>
                  {/* Product Image & Badge */}
                  <div style={{ position: 'relative', height: '180px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '14px' }}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <span className="badge badge-info" style={{ position: 'absolute', top: '10px', left: '10px', backdropFilter: 'blur(8px)' }}>
                      {product.badge}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>
                    {product.category}
                  </div>

                  <h3 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '6px', lineHeight: 1.3 }}>
                    {product.name}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#fde047', marginBottom: '10px' }}>
                    <Star size={14} fill="#fde047" /> {product.rating} <span style={{ color: 'var(--text-muted)' }}>({product.reviewsCount} reviews)</span>
                  </div>

                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '14px', minHeight: '50px' }}>
                    {product.description}
                  </p>

                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {product.tags?.map((t, idx) => (
                      <span key={idx} style={{ background: 'var(--bg-surface-elevated)', fontSize: '0.72rem', padding: '2px 6px', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)' }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
                  <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                    ${product.price.toFixed(2)}
                  </div>

                  <button 
                    className={`btn ${isJustAdded ? 'btn-secondary' : 'btn-primary'}`}
                    onClick={() => handleAddToCart(product)}
                    style={{ padding: '8px 14px', fontSize: '0.82rem' }}
                  >
                    {isJustAdded ? (
                      <>
                        <Check size={14} style={{ color: '#10b981' }} /> Added
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={14} /> Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
