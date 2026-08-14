import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, CreditCard, Truck, FileText, X } from 'lucide-react';
import { ShopAPI } from '../../services/api';

export default function CheckoutModal({ cart, totalAmount, onClose, onOrderPlaced }) {
  const [formData, setFormData] = useState({
    name: 'Alex Mercer',
    email: 'alex.mercer@devtech.io',
    address: '100 Security Boulevard, Suite 400',
    city: 'San Francisco',
    zip: '94105',
    paymentMethod: 'Credit Card (Encrypted FIPS-140)'
  });

  const [loading, setLoading] = useState(false);
  const [orderReceipt, setOrderReceipt] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await ShopAPI.placeOrder({
        items: cart,
        totalAmount,
        shippingAddress: formData
      });
      setOrderReceipt(res.order);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (orderReceipt) {
    return (
      <div className="modal-overlay animate-fade-in" onClick={onClose}>
        <div className="modal-content" style={{ textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <CheckCircle2 size={36} />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '6px' }}>
            Order Confirmed & Payment Processed!
          </h2>
          <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Order Receipt ID: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)', fontWeight: '700' }}>{orderReceipt.orderId}</span>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '16px', borderRadius: 'var(--radius-md)', textAlign: 'left', marginBottom: '20px', fontSize: '0.85rem' }}>
            <div><strong>Items Ordered:</strong> {orderReceipt.items?.length} products</div>
            <div style={{ marginTop: '6px' }}><strong>Total Charged:</strong> ${orderReceipt.totalAmount.toFixed(2)}</div>
            <div style={{ marginTop: '6px' }}><strong>Shipping To:</strong> {orderReceipt.shippingAddress.name}, {orderReceipt.shippingAddress.city}</div>
            <div style={{ marginTop: '6px', color: 'var(--accent-teal)' }}><strong>Est. Delivery:</strong> {orderReceipt.estimatedDelivery}</div>
          </div>

          <button className="btn btn-primary" onClick={onOrderPlaced} style={{ width: '100%' }}>
            Done & Return to Store
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={20} style={{ color: 'var(--accent-teal)' }} />
            Express Checkout
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" className="input-control" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address for Receipt</label>
            <input type="email" className="input-control" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          </div>

          <div className="form-group">
            <label className="form-label">Shipping Address</label>
            <input type="text" className="input-control" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} required />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">City</label>
              <input type="text" className="input-control" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} required />
            </div>

            <div className="form-group">
              <label className="form-label">ZIP / Postal Code</label>
              <input type="text" className="input-control" value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} required />
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: '700' }}>Order Total (Inc. Taxes)</span>
            <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--accent-blue)' }}>${totalAmount.toFixed(2)}</span>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Processing Order...' : 'Pay & Confirm Order'}
          </button>
        </form>
      </div>
    </div>
  );
}
