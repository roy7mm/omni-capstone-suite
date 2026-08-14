import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import CheckoutModal from './CheckoutModal';

export default function CartDrawer({ isOpen, onClose, cart, updateQuantity, removeFromCart, clearCart }) {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = subtotal * discount;
  const total = Math.max(0, subtotal - discountAmount);

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'CAPSTONE2026') {
      setDiscount(0.15); // 15% discount
    } else {
      alert('Invalid promo code. Try "CAPSTONE2026" for 15% discount.');
    }
  };

  return (
    <>
      <div className="modal-overlay animate-fade-in" onClick={onClose}>
        <div 
          className="modal-content" 
          style={{ 
            maxWidth: '460px', 
            marginRight: '0', 
            marginLeft: 'auto', 
            height: '100vh', 
            borderRadius: '0', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', fontSize: '1.15rem' }}>
                <ShoppingBag size={20} style={{ color: 'var(--accent-blue)' }} />
                <span>Your Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
              </div>
              <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                Your cart is currently empty.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '400px', overflowY: 'auto' }}>
                {cart.map((item) => (
                  <div key={item.id} style={{ display: 'flex', gap: '12px', background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                    <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '700', fontSize: '0.88rem' }}>{item.name}</div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)', fontWeight: '600', marginTop: '2px' }}>${item.price.toFixed(2)}</div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: '24px', height: '24px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '4px', cursor: 'pointer' }}>-</button>
                        <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: '24px', height: '24px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '4px', cursor: 'pointer' }}>+</button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: 'var(--status-critical)', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer & Checkout Trigger */}
          {cart.length > 0 && (
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', marginTop: '20px' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                <input 
                  type="text" 
                  className="input-control" 
                  placeholder="Promo code (Try CAPSTONE2026)" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  style={{ fontSize: '0.8rem' }}
                />
                <button className="btn btn-secondary" onClick={applyPromo} style={{ padding: '8px 12px', fontSize: '0.8rem' }}>Apply</button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#10b981', marginBottom: '4px' }}>
                  <span>Promo Discount (15%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '800', margin: '10px 0 16px' }}>
                <span>Total Amount</span>
                <span style={{ color: 'var(--accent-blue)' }}>${total.toFixed(2)}</span>
              </div>

              <button className="btn btn-primary" onClick={() => setShowCheckout(true)} style={{ width: '100%' }}>
                Proceed to Checkout <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {showCheckout && (
        <CheckoutModal 
          cart={cart}
          totalAmount={total}
          onClose={() => setShowCheckout(false)}
          onOrderPlaced={() => {
            clearCart();
            setShowCheckout(false);
            onClose();
          }}
        />
      )}
    </>
  );
}
