import { useState, useEffect, createContext, useContext } from "react";

/* ═══════════════════════════════════════════════════════════
   GLOBAL STYLES  (injected once)
═══════════════════════════════════════════════════════════ */
const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  /* Dark Red & Black Theme */
  --bg: #050505;
  --surface: #121212;
  --surface2: #1e1e1e;
  --border: #333333;
  --text: #e0e0e0;
  --muted: #a0a0a0;
  
  --accent: #c62828;      /* Dark Red */
  --accent-glow: rgba(198, 40, 40, 0.4);
  --accent2: #e53935;     /* Red */
  --accent3: #ef5350;     /* Light Red */
  
  --danger: #d32f2f;
  --glass: rgba(18, 18, 18, 0.85);
  --glass-border: rgba(255, 255, 255, 0.08);
  
  --page-gradient: radial-gradient(circle at 50% 0%, rgba(198, 40, 40, 0.1), transparent 60%);
  
  --font-display: 'DM Sans', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  
  --radius: 8px; /* Simpler radius */
  --shadow: 0 4px 20px -5px rgba(0,0,0,0.5);
  --transition: all 0.2s ease;
}

[data-theme="light"] {
  /* Optional: Keep light theme mostly white/grey with red accents, or just force dark for this request. 
     The user specifically asked for "dark background" so I will focus on the dark theme default.
     I'll keep a simple light theme equivalent just in case. */
  --bg: #ffffff;
  --surface: #f5f5f5;
  --surface2: #eeeeee;
  --border: #e0e0e0;
  --text: #121212;
  --muted: #666666;
  --accent: #b71c1c;
  --accent-glow: rgba(183, 28, 28, 0.15);
  --accent2: #d32f2f;
  --accent3: #f44336;
  --glass: rgba(255, 255, 255, 0.9);
  --page-gradient: none;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  min-height: 100vh;
  background-image: var(--page-gradient);
  background-attachment: fixed;
  transition: background 0.3s ease, color 0.3s ease;
}

/* scrollbar */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: var(--muted); }

/* ── Layout ── */
.page { min-height: 100vh; display: flex; flex-direction: column; animation: fadeIn 0.4s ease-out; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; width: 100%; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* ── Navbar ── */
.navbar {
  background: var(--glass);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--glass-border);
  padding: 16px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;
}
.navbar-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
.navbar-brand {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  cursor: pointer;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  gap: 12px;
}
.navbar-nav { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }

/* ── Buttons ── */
.btn {
  padding: 10px 24px;
  border-radius: 50px;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
}
.btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px -6px var(--accent-glow); }
.btn:active { transform: translateY(0); }

.btn-primary { background: linear-gradient(135deg, var(--accent), #f59e0b); color: white; }
.btn-secondary { background: var(--surface2); color: var(--text); border: 1px solid var(--border); }
.btn-secondary:hover { border-color: var(--accent2); color: var(--accent2); background: var(--surface); }
.btn-outline { background: transparent; border: 1px solid var(--border); color: var(--muted); }
.btn-outline:hover { border-color: var(--text); color: var(--text); }
.btn-danger { background: rgba(239, 68, 68, 0.1); color: var(--danger); border: 1px solid transparent; }
.btn-danger:hover { background: var(--danger); color: white; }
.btn-ghost { background: transparent; color: var(--muted); padding: 8px 16px; }
.btn-ghost:hover { color: var(--text); background: var(--surface2); }
.btn-icon { padding: 10px; border-radius: 50%; display: grid; place-items: center; width: 40px; height: 40px; }

/* ── Hero ── */
.hero { text-align: center; padding: 100px 20px 80px; position: relative; }
.hero::before {
  content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 600px; height: 600px; background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
  opacity: 0.15; z-index: -1; pointer-events: none;
}
.hero-tag {
  display: inline-block;
  background: rgba(232, 184, 109, 0.1);
  border: 1px solid var(--accent);
  color: var(--accent);
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 24px;
  backdrop-filter: blur(4px);
}
.hero h1 {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  line-height: 1.1;
  color: var(--text);
  margin-bottom: 24px;
  font-weight: 800;
}
.hero h1 span { 
  display: block;
  color: var(--accent);
}
.hero p { color: var(--muted); font-size: 1.1rem; max-width: 600px; margin: 0 auto 40px; line-height: 1.6; }

/* ── Cards ── */
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 32px;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}
.card:hover {
  border-color: var(--accent2);
  transform: translateY(-5px);
  box-shadow: var(--shadow);
}
.card-grid { display: grid; gap: 24px; }
.card-grid-2 { grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }
.card-grid-3 { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }
.card-grid-4 { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }

/* ── Auth Forms ── */
.auth-container {
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.auth-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 48px;
  width: 100%;
  max-width: 440px;
  box-shadow: var(--shadow);
  text-align: center;
}
.auth-title { font-family: var(--font-display); font-size: 2rem; color: var(--text); margin-bottom: 8px; }
.auth-sub { color: var(--muted); margin-bottom: 32px; font-size: 0.95rem; }

.form-group { margin-bottom: 20px; text-align: left; }
.form-label { display: block; font-size: 0.85rem; font-weight: 600; color: var(--text); margin-bottom: 8px; }
.form-input {
  width: 100%;
  padding: 12px 16px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text);
  font-size: 1rem;
  transition: var(--transition);
  outline: none;
}
.form-input:focus { border-color: var(--accent2); background: var(--bg); box-shadow: 0 0 0 4px rgba(91,141,238,0.1); }
.form-note { font-size: 0.85rem; color: var(--muted); margin-top: 24px; }
.form-note a { color: var(--accent2); text-decoration: none; font-weight: 600; cursor: pointer; }
.form-note a:hover { text-decoration: underline; }

/* ── Utility ── */
.badge { padding: 4px 12px; border-radius: 50px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
.badge-accent { background: rgba(232, 184, 109, 0.15); color: var(--accent); }
.badge-blue { background: rgba(37, 99, 235, 0.1); color: var(--accent2); }
.badge-green { background: rgba(16, 185, 129, 0.1); color: var(--accent3); }
.badge-amber { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
.form-title { font-family: var(--font-display); font-size: 1.25rem; color: var(--text); margin-bottom: 24px; }

.stat-card {
  background: var(--surface); border: 1px solid var(--border); padding: 24px; border-radius: var(--radius);
  display: flex; align-items: center; gap: 20px;
}
.stat-icon {
  width: 56px; height: 56px; border-radius: 16px; display: grid; place-items: center; font-size: 1.5rem;
  background: var(--surface2); color: var(--text);
}

.table-wrap { overflow-x: auto; border: 1px solid var(--border); border-radius: var(--radius); }
table { width: 100%; border-collapse: collapse; text-align: left; }
th { padding: 16px; background: var(--surface2); color: var(--muted); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; }
td { padding: 16px; border-top: 1px solid var(--border); color: var(--text); }
tr:hover td { background: var(--surface2); }

.form-card {
  background: var(--surface); padding: 32px; border-radius: var(--radius);
  border: 1px solid var(--border); box-shadow: var(--shadow);
  position: relative; overflow: hidden;
}


/* ── Tabs ── */
.tabs { display: flex; gap: 12px; margin-bottom: 24px; overflow-x: auto; padding-bottom: 8px; scrollbar-width: none; }
.tabs::-webkit-scrollbar { display: none; }
.tab { white-space: nowrap; padding: 8px 16px; border-radius: 50px; background: var(--surface2); color: var(--muted); border: 1px solid transparent; cursor: pointer; transition: var(--transition); font-weight: 500; font-size: 0.9rem; }
.tab.active { background: var(--accent); color: white; border-color: var(--accent); }
.tab:hover:not(.active) { background: var(--surface); color: var(--text); border-color: var(--border); }

/* ── Responsive Layouts ── */
.cart-layout { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }
.guest-layout { display: grid; grid-template-columns: 1fr 300px; gap: 24px; }
.split-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.admin-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 32px; align-items: start; }
.membership-layout { display: grid; grid-template-columns: 350px 1fr; gap: 32px; align-items: start; }
.membership-layout.single { grid-template-columns: 1fr; }

/* ── Responsive ── */
@media (max-width: 900px) {
  .cart-layout, .guest-layout, .split-layout, .admin-layout, .membership-layout { grid-template-columns: 1fr !important; }
}

@media (max-width: 640px) {
  .hero h1 { font-size: 2.5rem; }
  .card-grid-2, .card-grid-3, .card-grid-4 { grid-template-columns: 1fr; }
  .navbar-inner { flex-direction: column; gap: 16px; }
  .navbar-nav { justify-content: center; width: 100%; gap: 12px; }
  .navbar-brand { font-size: 1.8rem; }
  .btn { padding: 8px 16px; font-size: 0.9rem; }
  .container { padding: 0 16px; }
  .auth-card, .form-card { padding: 24px; }
}
`;

/* ═══════════════════════════════════════════════════════════
   CONTEXT & STORE
═══════════════════════════════════════════════════════════ */
const AppCtx = createContext(null);

const INITIAL = {
  users: [{ id: 1, name: "Alice", email: "user@ems.com", password: "user123", role: "user" }],
  vendors: [
    { id: 1, name: "Golden Fork Catering", email: "vendor@ems.com", password: "vendor123",
      category: "Catering", contact: "+91 9876543210", desc: "Premium catering for all events",
      products: [
        { id: 1, name: "Veg Thali", price: 350, emoji: "🍱" },
        { id: 2, name: "BBQ Platter", price: 650, emoji: "🍖" },
        { id: 3, name: "Dessert Buffet", price: 450, emoji: "🍰" },
        { id: 4, name: "Welcome Drinks", price: 200, emoji: "🥤" },
      ]},
    { id: 2, name: "Bloom Florists", email: "bloom@ems.com", password: "bloom123",
      category: "Florist", contact: "+91 9988776655", desc: "Exquisite floral arrangements",
      products: [
        { id: 5, name: "Rose Centrepiece", price: 1200, emoji: "🌹" },
        { id: 6, name: "Stage Arch", price: 4500, emoji: "🌸" },
        { id: 7, name: "Table Bouquet", price: 800, emoji: "💐" },
        { id: 8, name: "Entry Garland", price: 2200, emoji: "🌺" },
      ]},
    { id: 3, name: "Glitter Decorations", email: "glitter@ems.com", password: "glitter123",
      category: "Decoration", contact: "+91 9123456789", desc: "Stunning event décor & themes",
      products: [
        { id: 9, name: "Balloon Wall", price: 3500, emoji: "🎈" },
        { id: 10, name: "LED Backdrop", price: 8000, emoji: "✨" },
        { id: 11, name: "Chair Covers", price: 60, emoji: "🪑" },
        { id: 12, name: "Themed Setup", price: 15000, emoji: "🎪" },
      ]},
    { id: 4, name: "Luminary Lighting", email: "lumi@ems.com", password: "lumi123",
      category: "Lighting", contact: "+91 9001122334", desc: "Professional lighting solutions",
      products: [
        { id: 13, name: "Fairy Lights", price: 1500, emoji: "💡" },
        { id: 14, name: "Laser Show", price: 12000, emoji: "🔦" },
        { id: 15, name: "Wash Lights", price: 5000, emoji: "🌟" },
        { id: 16, name: "Candle Setup", price: 2800, emoji: "🕯️" },
      ]},
  ],
  admins: [{ id: 1, email: "admin@ems.com", password: "admin123" }],
  cart: [],
  orders: [],
  memberships: [],
  requests: [],
  session: null,
  theme: localStorage.getItem("ems_theme") || "dark",
};

function useStore() {
  const [state, setState] = useState(INITIAL);
  const set = (fn) => setState(s => ({ ...s, ...fn(s) }));

  useEffect(() => {
    document.body.setAttribute("data-theme", state.theme);
    localStorage.setItem("ems_theme", state.theme);
  }, [state.theme]);

  return {
    state,
    toggleTheme() { set(s => ({ theme: s.theme === "dark" ? "light" : "dark" })); },
    login(role, email, password) {
      if (role === "admin") {
        const a = state.admins.find(a => a.email === email && a.password === password);
        if (a) { set(() => ({ session: { role: "admin", id: a.id, name: "Admin" } })); return true; }
      } else if (role === "vendor") {
        const v = state.vendors.find(v => v.email === email && v.password === password);
        if (v) { set(() => ({ session: { role: "vendor", id: v.id, name: v.name } })); return true; }
      } else {
        const u = state.users.find(u => u.email === email && u.password === password);
        if (u) { set(() => ({ session: { role: "user", id: u.id, name: u.name } })); return true; }
      }
      return false;
    },
    logout() { set(() => ({ session: null, cart: [] })); },
    signupUser(name, email, password) {
      const exists = state.users.find(u => u.email === email);
      if (exists) return false;
      const id = Date.now();
      set(s => ({ users: [...s.users, { id, name, email, password, role: "user" }] }));
      set(() => ({ session: { role: "user", id, name } }));
      return true;
    },
    signupVendor(name, email, password, category) {
      const exists = state.vendors.find(v => v.email === email);
      if (exists) return false;
      const id = Date.now();
      set(s => ({
        vendors: [...s.vendors, { id, name, email, password, category,
          contact: "", desc: `${category} services`, products: [] }]
      }));
      set(() => ({ session: { role: "vendor", id, name } }));
      return true;
    },
    addToCart(product, vendorId) {
      set(s => {
        const existing = s.cart.find(c => c.productId === product.id);
        if (existing) return { cart: s.cart.map(c => c.productId === product.id ? { ...c, qty: c.qty + 1 } : c) };
        return { cart: [...s.cart, { productId: product.id, vendorId, name: product.name,
          price: product.price, emoji: product.emoji, qty: 1 }] };
      });
    },
    removeFromCart(productId) { set(s => ({ cart: s.cart.filter(c => c.productId !== productId) })); },
    updateQty(productId, qty) {
      if (qty < 1) { set(s => ({ cart: s.cart.filter(c => c.productId !== productId) })); return; }
      set(s => ({ cart: s.cart.map(c => c.productId === productId ? { ...c, qty } : c) }));
    },
    clearCart() { set(() => ({ cart: [] })); },
    placeOrder(details) {
      const orderId = `ORD-${Date.now()}`;
      const total = state.cart.reduce((s, c) => s + c.price * c.qty, 0);
      const order = { id: orderId, ...details, items: state.cart, total, status: "Received",
        createdAt: new Date().toLocaleDateString() };
      set(s => ({ orders: [...s.orders, order], cart: [] }));
      return orderId;
    },
    updateOrderStatus(orderId, status) {
      set(s => ({ orders: s.orders.map(o => o.id === orderId ? { ...o, status } : o) }));
    },
    addProduct(vendorId, product) {
      set(s => ({
        vendors: s.vendors.map(v => v.id === vendorId
          ? { ...v, products: [...v.products, { ...product, id: Date.now() }] } : v)
      }));
    },
    deleteProduct(vendorId, productId) {
      set(s => ({
        vendors: s.vendors.map(v => v.id === vendorId
          ? { ...v, products: v.products.filter(p => p.id !== productId) } : v)
      }));
    },
    updateProduct(vendorId, product) {
      set(s => ({
        vendors: s.vendors.map(v => v.id === vendorId
          ? { ...v, products: v.products.map(p => p.id === product.id ? product : p) } : v)
      }));
    },
    addMembership(m) { set(s => ({ memberships: [...s.memberships, { ...m, id: Date.now() }] })); },
    addRequest(req) { set(s => ({ requests: [...s.requests, { ...req, id: Date.now() }] })); },
    deleteUser(id) { set(s => ({ users: s.users.filter(u => u.id !== id) })); },
    deleteVendor(id) { set(s => ({ vendors: s.vendors.filter(v => v.id !== id) })); },
    getVendor(id) { return state.vendors.find(v => v.id === id); },
    getSession() { return state.session; },
  };
}

/* ═══════════════════════════════════════════════════════════
   SMALL SHARED COMPONENTS
═══════════════════════════════════════════════════════════ */
function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t); }, []);
  return <div className="toast">✅ {msg}</div>;
}

function Logo({ size = "1.5em", style }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size, color: "var(--accent)", ...style }}>
      <path d="M19,4H17V3a1,1,0,0,0-2,0V4H9V3A1,1,0,0,0,7,3V4H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm1,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V10H20ZM20,8H4V7A1,1,0,0,1,5,6H19a1,1,0,0,1,1,1Z" opacity="0.8"/>
      <path d="M14.7,12.3a1,1,0,0,0-1.4,0l-2.3,2.3L9.7,13.3a1,1,0,0,0-1.4,1.4l2,2a1,1,0,0,0,1.4,0l3-3A1,1,0,0,0,14.7,12.3Z" />
    </svg>
  );
}

function Navbar({ page, setPage, store }) {
  const session = store.getSession();
  const cartCount = store.state.cart.reduce((s, c) => s + c.qty, 0);
  const themeIcon = store.state.theme === "dark" ? "☀️" : "🌙";

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <span className="navbar-brand" onClick={() => setPage(session ? (session.role === "admin" ? "adminDash" : session.role === "vendor" ? "vendorHome" : "userPortal") : "home")}>
          <Logo /> LuxeEvents
        </span>
        <div className="navbar-nav">
          <button className="btn btn-ghost" onClick={store.toggleTheme} title="Toggle Theme">{themeIcon}</button>
          
          {!session ? (
            <>
              <button className="btn btn-ghost" onClick={() => setPage("adminLogin")}>Admin</button>
              <button className="btn btn-ghost" onClick={() => setPage("vendorLogin")}>Vendor</button>
              <button className="btn btn-primary" onClick={() => setPage("userLogin")}>Sign In</button>
            </>
          ) : (
            <>
              {session.role === "user" && <>
                <button className="btn btn-ghost" onClick={() => setPage("vendorBrowse")}>Vendors</button>
                <button className="btn btn-ghost" onClick={() => setPage("cart")}>
                  Cart {cartCount > 0 && <span className="badge badge-accent" style={{ marginLeft: 6 }}>{cartCount}</span>}
                </button>
                <button className="btn btn-ghost" onClick={() => setPage("guestList")}>Guests</button>
                <button className="btn btn-ghost" onClick={() => setPage("orderStatus")}>Orders</button>
              </>}
              {session.role === "vendor" && <>
                <button className="btn btn-ghost" onClick={() => setPage("yourItems")}>My Items</button>
                <button className="btn btn-ghost" onClick={() => setPage("addItem")}>Add Item</button>
                <button className="btn btn-ghost" onClick={() => setPage("transactions")}>Transactions</button>
                <button className="btn btn-ghost" onClick={() => setPage("requestItem")}>Requests</button>
              </>}
              {session.role === "admin" && <>
                <button className="btn btn-ghost" onClick={() => setPage("maintainUser")}>Users</button>
                <button className="btn btn-ghost" onClick={() => setPage("maintainVendor")}>Vendors</button>
              </>}
              <button className="btn btn-danger" style={{ marginLeft: 8 }} onClick={() => { store.logout(); setPage("home"); }}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGES
═══════════════════════════════════════════════════════════ */

/* ── HOME ── */
function HomePage({ setPage }) {
  return (
    <div className="page">
      <div className="hero">
        <div className="hero-tag">Event Management System</div>
        <h1>Plan Unforgettable<br /><span>Moments</span></h1>
        <p>Connect with premium vendors, manage your guest list, and create unforgettable experiences.</p>
        <div className="hero-btns">
          <button className="btn btn-primary" onClick={() => setPage("userLogin")}>Get Started</button>
          <button className="btn btn-outline" style={{ background: "var(--surface)" }} onClick={() => setPage("userSignup")}>Create Account</button>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 60 }}>
        <div className="card-grid card-grid-3">
          {[
            { icon: "🎪", title: "4 Vendor Categories", desc: "Catering, Florist, Decoration & Lighting" },
            { icon: "🛒", title: "Easy Booking", desc: "Browse, add to cart, and checkout instantly" },
            { icon: "📦", title: "Live Order Tracking", desc: "Track every order from received to delivery" },
          ].map(c => (
            <div className="card" key={c.title}>
              <div style={{ fontSize: "2.2rem", marginBottom: 12 }}>{c.icon}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", marginBottom: 8, color: "var(--text)" }}>{c.title}</h3>
              <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── AUTH HELPER ── */
function AuthPage({ title, sub, children }) {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo" style={{ marginBottom: 20, fontSize: "1.5rem", fontWeight: 700, fontFamily: "var(--font-display)", display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <Logo size="1.8em" /> LuxeEvents
        </div>
        <div className="auth-title">{title}</div>
        <div className="auth-sub">{sub}</div>
        {children}
      </div>
    </div>
  );
}

/* ── ADMIN LOGIN ── */
function AdminLogin({ setPage, store, toast }) {
  const [f, setF] = useState({ email: "admin@ems.com", password: "admin123" });
  const [err, setErr] = useState("");
  const submit = () => {
    if (store.login("admin", f.email, f.password)) { toast("Welcome Admin!"); setPage("adminDash"); }
    else setErr("Invalid credentials");
  };
  return (
    <AuthPage title="Admin Login" sub="Access the maintenance dashboard">
      <div className="form-group"><label className="form-label">Email</label><input className="form-input" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} /></div>
      <div className="form-group"><label className="form-label">Password</label><input className="form-input" type="password" value={f.password} onChange={e => setF({ ...f, password: e.target.value })} /></div>
      {err && <div className="error-msg">{err}</div>}
      <div className="form-actions" style={{ flexDirection: "column", gap: 12 }}>
        <button className="btn btn-primary btn-full" onClick={submit}>Login</button>
        <button className="btn btn-ghost btn-full" onClick={() => setPage("home")}>Cancel</button>
      </div>
      <div className="form-note">
        Vendor? <a onClick={() => setPage("vendorLogin")}>Login here</a>
      </div>
    </AuthPage>
  );
}

/* ── VENDOR LOGIN ── */
function VendorLogin({ setPage, store, toast }) {
  const [f, setF] = useState({ email: "vendor@ems.com", password: "vendor123" });
  const [err, setErr] = useState("");
  const submit = () => {
    if (store.login("vendor", f.email, f.password)) { toast("Welcome back!"); setPage("vendorHome"); }
    else setErr("Invalid credentials");
  };
  return (
    <AuthPage title="Vendor Login" sub="Manage your products and orders">
      <div className="form-group"><label className="form-label">Email</label><input className="form-input" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} /></div>
      <div className="form-group"><label className="form-label">Password</label><input className="form-input" type="password" value={f.password} onChange={e => setF({ ...f, password: e.target.value })} /></div>
      {err && <div className="error-msg">{err}</div>}
      <div className="form-actions" style={{ flexDirection: "column", gap: 12 }}>
        <button className="btn btn-primary btn-full" style={{ background: "linear-gradient(135deg, var(--accent2), #3b82f6)" }} onClick={submit}>Login</button>
        <button className="btn btn-ghost btn-full" onClick={() => setPage("home")}>Cancel</button>
      </div>
      <div className="form-note">
        New vendor? <a onClick={() => setPage("vendorSignup")}>Sign up</a>
      </div>
    </AuthPage>
  );
}

/* ── VENDOR SIGNUP ── */
function VendorSignup({ setPage, store, toast }) {
  const [f, setF] = useState({ name: "", email: "", password: "", category: "Catering" });
  const [err, setErr] = useState("");
  const submit = () => {
    if (!f.name || !f.email || !f.password) { setErr("All fields are required"); return; }
    if (store.signupVendor(f.name, f.email, f.password, f.category)) {
      toast("Account created!"); setPage("vendorHome");
    } else setErr("Email already registered");
  };
  return (
    <AuthPage title="Vendor Sign Up" sub="Join LuxeEvents as a service provider">
      <div className="form-group"><label className="form-label">Business Name</label><input className="form-input" placeholder="Your business name" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} /></div>
      <div className="form-group"><label className="form-label">Email</label><input className="form-input" placeholder="business@email.com" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} /></div>
      <div className="form-group"><label className="form-label">Password</label><input className="form-input" type="password" placeholder="Create password" value={f.password} onChange={e => setF({ ...f, password: e.target.value })} /></div>
      <div className="form-group"><label className="form-label">Category</label>
        <select className="form-input" value={f.category} onChange={e => setF({ ...f, category: e.target.value })}>
          {["Catering", "Florist", "Decoration", "Lighting"].map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div className="form-actions" style={{ marginTop: 24 }}>
        <button className="btn btn-primary btn-full" style={{ background: "linear-gradient(135deg, var(--accent2), #3b82f6)" }} onClick={submit}>Sign Up</button>
      </div>
      <div className="form-note">
        Already registered? <a onClick={() => setPage("vendorLogin")}>Login</a>
      </div>
    </AuthPage>
  );
}

/* ── USER LOGIN ── */
function UserLogin({ setPage, store, toast }) {
  const [f, setF] = useState({ email: "user@ems.com", password: "user123" });
  const [err, setErr] = useState("");
  const submit = () => {
    if (store.login("user", f.email, f.password)) { toast("Welcome back!"); setPage("userPortal"); }
    else setErr("Invalid credentials");
  };
  return (
    <AuthPage title="Welcome Back" sub="Sign in to continue planning your event">
      <div className="form-group"><label className="form-label">Email</label><input className="form-input" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} /></div>
      <div className="form-group"><label className="form-label">Password</label><input className="form-input" type="password" value={f.password} onChange={e => setF({ ...f, password: e.target.value })} /></div>
      {err && <div className="error-msg">{err}</div>}
      <div className="form-actions" style={{ flexDirection: "column", gap: 12 }}>
        <button className="btn btn-primary btn-full" onClick={submit}>Sign In</button>
        <button className="btn btn-ghost btn-full" onClick={() => setPage("home")}>Cancel</button>
      </div>
      <div className="form-note">
        Don't have an account? <a onClick={() => setPage("userSignup")}>Sign up</a>
      </div>
    </AuthPage>
  );
}

/* ── USER SIGNUP ── */
function UserSignup({ setPage, store, toast }) {
  const [f, setF] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const submit = () => {
    if (!f.name || !f.email || !f.password) { setErr("All fields are required"); return; }
    if (store.signupUser(f.name, f.email, f.password)) {
      toast("Account created!"); setPage("userPortal");
    } else setErr("Email already registered");
  };
  return (
    <AuthPage title="Create Account" sub="Start planning your dream event today">
      <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" placeholder="Your name" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} /></div>
      <div className="form-group"><label className="form-label">Email</label><input className="form-input" placeholder="you@email.com" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} /></div>
      <div className="form-group"><label className="form-label">Password</label><input className="form-input" type="password" placeholder="Create password" value={f.password} onChange={e => setF({ ...f, password: e.target.value })} /></div>
      {err && <div className="error-msg">{err}</div>}
      <div className="form-actions" style={{ marginTop: 24 }}>
        <button className="btn btn-primary btn-full" onClick={submit}>Create Account</button>
      </div>
      <div className="form-note">
        Already have an account? <a onClick={() => setPage("userLogin")}>Sign in</a>
      </div>
    </AuthPage>
  );
}

/* ── USER PORTAL ── */
function UserPortal({ setPage, store }) {
  const session = store.getSession();
  const stats = [
    { icon: "🛒", label: "Cart Items", val: store.state.cart.length, color: "var(--accent)" },
    { icon: "📦", label: "Orders", val: store.state.orders.filter(o => o.userId === session?.id).length, color: "var(--accent2)" },
    { icon: "👥", label: "Vendors", val: store.state.vendors.length, color: "var(--accent3)" },
  ];
  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <div className="hero-tag" style={{ marginBottom: 10 }}>Welcome back</div>
          <h2>{session?.name}</h2>
          <p style={{ color: "var(--muted)" }}>What would you like to do today?</p>
        </div>
        <div className="card-grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", marginBottom: 32 }}>
          {stats.map(s => (
            <div className="stat-card" key={s.label}>
              <div className="stat-icon" style={{ color: s.color, background: `color-mix(in srgb, ${s.color} 10%, transparent)` }}>{s.icon}</div>
              <div className="stat-info"><h3>{s.val}</h3><p>{s.label}</p></div>
            </div>
          ))}
        </div>
        <div className="card-grid card-grid-2">
          {[
            { label: "Browse Vendors", icon: "🏪", desc: "Discover catering, florists, décor & lighting", page: "vendorBrowse", cta: "Explore" },
            { label: "My Cart", icon: "🛒", desc: `${store.state.cart.reduce((s,c)=>s+c.qty,0)} items ready to checkout`, page: "cart", cta: "View Cart" },
            { label: "Guest List", icon: "👥", desc: "Manage your event guest list", page: "guestList", cta: "Manage" },
            { label: "Order Status", icon: "📦", desc: "Track your active orders", page: "orderStatus", cta: "Track" },
          ].map(c => (
            <div className="card" key={c.label} style={{ cursor: "pointer" }} onClick={() => setPage(c.page)}>
              <div style={{ fontSize: "2rem", marginBottom: 12 }}>{c.icon}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", marginBottom: 6 }}>{c.label}</h3>
              <p style={{ color: "var(--muted)", fontSize: ".88rem", marginBottom: 16 }}>{c.desc}</p>
              <button className="btn btn-outline btn-sm">{c.cta} →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── VENDOR BROWSE ── */
function VendorBrowse({ setPage, store, setSelectedVendor }) {
  const [tab, setTab] = useState("All");
  const cats = ["All", "Catering", "Florist", "Decoration", "Lighting"];
  const vendors = store.state.vendors.filter(v => tab === "All" || v.category === tab);
  const emojis = { Catering: "🍽️", Florist: "🌸", Decoration: "🎪", Lighting: "💡" };
  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h2>Our Vendors</h2>
          <p style={{ color: "var(--muted)" }}>Choose from our curated service providers</p>
        </div>
        <div className="tabs">
          {cats.map(c => <button key={c} className={`tab ${tab === c ? "active" : ""}`} onClick={() => setTab(c)}>{c}</button>)}
        </div>
        <div className="card-grid card-grid-2">
          {vendors.map(v => (
            <div className="vendor-card" key={v.id} onClick={() => { setSelectedVendor(v.id); setPage("products"); }}>
              <div className="vendor-card-img">{emojis[v.category] || "🏪"}</div>
              <div className="vendor-card-body">
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <h3>{v.name}</h3>
                  <span className="badge badge-blue" style={{ fontSize: ".7rem" }}>{v.category}</span>
                </div>
                <p>{v.desc}</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn btn-secondary btn-sm">Shop Items</button>
                  <span style={{ color: "var(--muted)", fontSize: ".8rem", alignSelf: "center" }}>📞 {v.contact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── PRODUCTS ── */
function Products({ setPage, store, selectedVendor, toast }) {
  const vendor = store.getVendor(selectedVendor);
  if (!vendor) return null;
  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <div className="breadcrumb">
            <span onClick={() => setPage("vendorBrowse")}>Vendors</span>
            <span className="sep">›</span>
            <span>{vendor.name}</span>
          </div>
          <h2>{vendor.name}</h2>
          <p style={{ color: "var(--muted)" }}>{vendor.desc} · {vendor.contact}</p>
        </div>
        {vendor.products.length === 0
          ? <div className="empty-state"><div className="icon">📦</div><p>No products yet</p></div>
          : <div className="card-grid card-grid-4">
              {vendor.products.map(p => (
                <div className="product-card" key={p.id}>
                  <div className="product-card-img">{p.emoji || "📦"}</div>
                  <div className="product-card-body">
                    <h3>{p.name}</h3>
                    <div className="product-card-price">₹{p.price.toLocaleString()}</div>
                    <button className="btn btn-primary btn-sm btn-full" onClick={() => {
                      store.addToCart(p, vendor.id);
                      toast(`${p.name} added to cart!`);
                    }}>Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
        }
        <div style={{ marginTop: 24 }}>
          <button className="btn btn-outline" onClick={() => setPage("vendorBrowse")}>← Back to Vendors</button>
          {store.state.cart.length > 0 &&
            <button className="btn btn-primary" style={{ marginLeft: 12 }} onClick={() => setPage("cart")}>View Cart ({store.state.cart.reduce((s,c)=>s+c.qty,0)})</button>}
        </div>
      </div>
    </div>
  );
}

/* ── CART ── */
function Cart({ setPage, store, toast }) {
  const { cart } = store.state;
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  if (cart.length === 0) return (
    <div className="page"><div className="container">
      <div className="page-header"><h2>Your Cart</h2></div>
      <div className="empty-state"><div className="icon">🛒</div><p>Your cart is empty</p>
        <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => setPage("vendorBrowse")}>Browse Vendors</button>
      </div>
    </div></div>
  );
  return (
    <div className="page"><div className="container">
      <div className="page-header"><h2>Your Cart</h2><p style={{ color: "var(--muted)" }}>{cart.length} item(s)</p></div>
      <div className="cart-layout">
        <div>
          {cart.map(item => (
            <div className="cart-item" key={item.productId}>
              <div className="cart-item-img">{item.emoji}</div>
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p>₹{item.price.toLocaleString()} each</p>
              </div>
              <div className="qty-control">
                <button className="qty-btn" onClick={() => store.updateQty(item.productId, item.qty - 1)}>−</button>
                <span style={{ minWidth: 24, textAlign: "center" }}>{item.qty}</span>
                <button className="qty-btn" onClick={() => store.updateQty(item.productId, item.qty + 1)}>+</button>
              </div>
              <span style={{ minWidth: 80, textAlign: "right", fontFamily: "var(--font-display)", color: "var(--accent)" }}>
                ₹{(item.price * item.qty).toLocaleString()}
              </span>
              <button className="btn btn-danger btn-sm" onClick={() => store.removeFromCart(item.productId)}>✕</button>
            </div>
          ))}
          <button className="btn btn-danger btn-sm" style={{ marginTop: 16 }} onClick={() => { store.clearCart(); toast("Cart cleared"); }}>Delete All</button>
        </div>
        <div>
          <div className="cart-total-box">
            <div className="section-label">Order Summary</div>
            {cart.map(c => (
              <div key={c.productId} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: ".88rem" }}>
                <span style={{ color: "var(--muted)" }}>{c.name} ×{c.qty}</span>
                <span>₹{(c.price * c.qty).toLocaleString()}</span>
              </div>
            ))}
            <div className="divider" />
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>
              <span>Grand Total</span>
              <span style={{ color: "var(--accent)" }}>₹{total.toLocaleString()}</span>
            </div>
            <button className="btn btn-primary btn-full" style={{ marginTop: 20 }} onClick={() => setPage("checkout")}>
              Proceed to Checkout →
            </button>
          </div>
        </div>
      </div>
    </div></div>
  );
}

/* ── CHECKOUT ── */
function Checkout({ setPage, store, toast, setLastOrder }) {
  const [step, setStep] = useState(1);
  const [f, setF] = useState({ name: "", email: "", number: "", address: "", city: "", state: "", pinCode: "", paymentMethod: "Cash" });
  const [err, setErr] = useState("");
  const session = store.getSession();
  const total = store.state.cart.reduce((s, c) => s + c.price * c.qty, 0);

  const validate = () => {
    if (!f.name || !f.email || !f.number || !f.address || !f.city || !f.state || !f.pinCode)
      return "Please fill all fields";
    if (!/^\d{6}$/.test(f.pinCode)) return "Pin code must be 6 digits";
    if (!/^\d{10}$/.test(f.number)) return "Phone must be 10 digits";
    return "";
  };

  const placeOrder = () => {
    const e = validate(); if (e) { setErr(e); return; }
    const id = store.placeOrder({ ...f, userId: session?.id, total });
    setLastOrder(id);
    toast("Order placed successfully!");
    setPage("success");
  };

  const steps = ["Details", "Review", "Confirm"];
  return (
    <div className="page"><div className="container">
      <div className="page-header"><h2>Checkout</h2></div>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div className="step-indicator">
          {steps.map((s, i) => (
            <div key={s} className={`step ${step > i + 1 ? "done" : step === i + 1 ? "active" : ""}`}>
              <div className="step-dot">{step > i + 1 ? "✓" : i + 1}</div>
              <div className="step-label">{s}</div>
            </div>
          ))}
        </div>

        {step === 1 && <div className="form-card wide">
          <div className="form-row">
            <div className="field"><label>Full Name</label><input value={f.name} onChange={e => setF({ ...f, name: e.target.value })} placeholder="Your name" /></div>
            <div className="field"><label>Phone</label><input value={f.number} onChange={e => setF({ ...f, number: e.target.value })} placeholder="10-digit number" /></div>
          </div>
          <div className="field"><label>Email</label><input value={f.email} onChange={e => setF({ ...f, email: e.target.value })} placeholder="email@example.com" /></div>
          <div className="field"><label>Address</label><input value={f.address} onChange={e => setF({ ...f, address: e.target.value })} placeholder="Street address" /></div>
          <div className="form-row">
            <div className="field"><label>City</label><input value={f.city} onChange={e => setF({ ...f, city: e.target.value })} placeholder="City" /></div>
            <div className="field"><label>State</label><input value={f.state} onChange={e => setF({ ...f, state: e.target.value })} placeholder="State" /></div>
          </div>
          <div className="form-row">
            <div className="field"><label>Pin Code</label><input value={f.pinCode} onChange={e => setF({ ...f, pinCode: e.target.value })} placeholder="6-digit pin" /></div>
            <div className="field"><label>Payment Method</label>
              <select value={f.paymentMethod} onChange={e => setF({ ...f, paymentMethod: e.target.value })}>
                <option>Cash</option><option>UPI</option>
              </select>
            </div>
          </div>
          {err && <div className="error-msg">{err}</div>}
          <div className="form-actions">
            <button className="btn btn-outline" onClick={() => setPage("cart")}>← Cart</button>
            <button className="btn btn-primary" onClick={() => { const e = validate(); if (e) setErr(e); else { setErr(""); setStep(2); } }}>Review →</button>
          </div>
        </div>}

        {step === 2 && <div className="form-card wide">
          <div className="section-label">Order Items</div>
          {store.state.cart.map(c => (
            <div key={c.productId} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: ".9rem" }}>
              <span>{c.emoji} {c.name} ×{c.qty}</span>
              <span style={{ color: "var(--accent)" }}>₹{(c.price * c.qty).toLocaleString()}</span>
            </div>
          ))}
          <div className="divider" />
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-display)", fontSize: "1.15rem", marginBottom: 20 }}>
            <span>Total</span><span style={{ color: "var(--accent)" }}>₹{total.toLocaleString()}</span>
          </div>
          <div className="section-label">Delivery To</div>
          <p style={{ fontSize: ".88rem", color: "var(--muted)", lineHeight: 1.8 }}>
            {f.name} · {f.number}<br />{f.address}, {f.city}, {f.state} - {f.pinCode}<br />Payment: {f.paymentMethod}
          </p>
          <div className="form-actions" style={{ marginTop: 24 }}>
            <button className="btn btn-outline" onClick={() => setStep(1)}>← Edit</button>
            <button className="btn btn-primary" onClick={() => setStep(3)}>Confirm →</button>
          </div>
        </div>}

        {step === 3 && <div className="form-card" style={{ textAlign: "center" }}>
          <div className="section-label" style={{ marginBottom: 16 }}>Ready to place your order?</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--accent)", marginBottom: 8 }}>
            ₹{total.toLocaleString()}
          </div>
          <p style={{ color: "var(--muted)", fontSize: ".88rem", marginBottom: 24 }}>via {f.paymentMethod}</p>
          <div className="form-actions" style={{ justifyContent: "center" }}>
            <button className="btn btn-outline" onClick={() => setStep(2)}>← Back</button>
            <button className="btn btn-primary" onClick={placeOrder}>Order Now ✓</button>
          </div>
        </div>}
      </div>
    </div></div>
  );
}

/* ── SUCCESS ── */
function SuccessPage({ setPage, store, lastOrder }) {
  const order = store.state.orders.find(o => o.id === lastOrder);
  if (!order) return null;
  return (
    <div className="page"><div className="container">
      <div style={{ maxWidth: 520, margin: "60px auto", textAlign: "center" }}>
        <div className="success-ring">✅</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", marginBottom: 8 }}>Thank You!</h2>
        <p style={{ color: "var(--muted)", marginBottom: 28 }}>Your order has been placed successfully</p>
        <div className="form-card wide" style={{ textAlign: "left" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", marginBottom: 16, color: "var(--accent)" }}>
            {order.id}
          </div>
          <div className="section-label">Total Amount</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--accent)", marginBottom: 16 }}>
            ₹{order.total.toLocaleString()}
          </div>
          {[["Name", order.name], ["Email", order.email], ["Phone", order.number],
            ["Address", `${order.address}, ${order.city}, ${order.state} - ${order.pinCode}`],
            ["Payment", order.paymentMethod], ["Status", order.status]
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: ".88rem" }}>
              <span style={{ color: "var(--muted)" }}>{k}</span><span>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24 }}>
          <button className="btn btn-outline" onClick={() => setPage("orderStatus")}>Track Order</button>
          <button className="btn btn-primary" onClick={() => setPage("vendorBrowse")}>Continue Shopping</button>
        </div>
      </div>
    </div></div>
  );
}

/* ── ORDER STATUS (User) ── */
function OrderStatus({ store }) {
  const session = store.getSession();
  const orders = store.state.orders.filter(o => o.userId === session?.id);
  const statusColor = { "Received": "badge-accent", "Ready for Shipping": "badge-blue", "Out For Delivery": "badge-green" };
  return (
    <div className="page"><div className="container">
      <div className="page-header"><h2>My Orders</h2><p style={{ color: "var(--muted)" }}>Track your bookings</p></div>
      {orders.length === 0
        ? <div className="empty-state"><div className="icon">📦</div><p>No orders yet</p></div>
        : <div className="table-wrap">
            <table>
              <thead><tr>{["Order ID", "Date", "Items", "Total", "Payment", "Status"].map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}>
                    <td style={{ fontFamily: "var(--font-display)", color: "var(--accent)", fontSize: ".85rem" }}>{o.id}</td>
                    <td>{o.createdAt}</td>
                    <td>{o.items.map(i => `${i.emoji} ${i.name}`).join(", ").substring(0, 40)}…</td>
                    <td>₹{o.total.toLocaleString()}</td>
                    <td>{o.paymentMethod}</td>
                    <td><span className={`badge ${statusColor[o.status] || "badge-accent"}`}>{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      }
    </div></div>
  );
}

/* ── GUEST LIST ── */
function GuestList({ toast }) {
  const [guests, setGuests] = useState([
    { id: 1, name: "Rahul Sharma", email: "rahul@mail.com", rsvp: "Confirmed", table: "T1" },
    { id: 2, name: "Priya Nair", email: "priya@mail.com", rsvp: "Pending", table: "T2" },
  ]);
  const [f, setF] = useState({ name: "", email: "", rsvp: "Pending", table: "" });
  const add = () => {
    if (!f.name || !f.email) return;
    setGuests([...guests, { ...f, id: Date.now() }]);
    setF({ name: "", email: "", rsvp: "Pending", table: "" });
    toast("Guest added!");
  };
  return (
    <div className="page"><div className="container">
      <div className="page-header"><h2>Guest List</h2><p style={{ color: "var(--muted)" }}>Manage your event attendees</p></div>
      <div className="guest-layout">
        <div className="table-wrap">
          <table>
            <thead><tr>{["Name", "Email", "RSVP", "Table", ""].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {guests.map(g => (
                <tr key={g.id}>
                  <td style={{ fontWeight: 600 }}>{g.name}</td>
                  <td style={{ color: "var(--muted)" }}>{g.email}</td>
                  <td><span className={`badge ${g.rsvp === "Confirmed" ? "badge-accent" : "badge-blue"}`}>{g.rsvp}</span></td>
                  <td>{g.table}</td>
                  <td><button className="btn btn-danger btn-sm" onClick={() => setGuests(guests.filter(x => x.id !== g.id))}>✕</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="form-card" style={{ height: "fit-content" }}>
          <div className="form-title" style={{ fontSize: "1.2rem", marginBottom: 16 }}>Add Guest</div>
          <div className="field"><label>Name</label><input value={f.name} onChange={e => setF({ ...f, name: e.target.value })} placeholder="Guest name" /></div>
          <div className="field"><label>Email</label><input value={f.email} onChange={e => setF({ ...f, email: e.target.value })} placeholder="guest@email.com" /></div>
          <div className="field"><label>Table</label><input value={f.table} onChange={e => setF({ ...f, table: e.target.value })} placeholder="Table number" /></div>
          <div className="field"><label>RSVP</label>
            <select value={f.rsvp} onChange={e => setF({ ...f, rsvp: e.target.value })}>
              <option>Pending</option><option>Confirmed</option><option>Declined</option>
            </select>
          </div>
          <button className="btn btn-primary btn-full" onClick={add}>Add Guest</button>
        </div>
      </div>
    </div></div>
  );
}

/* ── VENDOR HOME ── */
function VendorHome({ setPage, store }) {
  const session = store.getSession();
  const vendor = store.getVendor(session?.id);
  const orders = store.state.orders.filter(o => o.items?.some(i => {
    const v = store.getVendor(session?.id);
    return v?.products.some(p => p.id === i.productId);
  }));
  return (
    <div className="page"><div className="container">
      <div className="page-header">
        <div className="hero-tag">Vendor Dashboard</div>
        <h2>Welcome, {vendor?.name}</h2>
        <p style={{ color: "var(--muted)" }}>{vendor?.category} · {vendor?.contact}</p>
      </div>
      <div className="card-grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", marginBottom: 32 }}>
        {[
          { icon: "📦", label: "Products", val: vendor?.products.length || 0, color: "var(--accent)" },
          { icon: "🛒", label: "Total Orders", val: store.state.orders.length, color: "var(--accent2)" },
          { icon: "📬", label: "Requests", val: store.state.requests.length, color: "var(--accent3)" },
        ].map(s => (
          <div className="stat-card" key={s.label}>
            <div className="stat-icon" style={{ color: s.color, background: `color-mix(in srgb, ${s.color} 10%, transparent)` }}>{s.icon}</div>
            <div className="stat-info"><h3>{s.val}</h3><p>{s.label}</p></div>
          </div>
        ))}
      </div>
      <div className="card-grid card-grid-2">
        {[
          { label: "My Products", icon: "🏷️", desc: "View and manage your listed products", page: "yourItems" },
          { label: "Add New Item", icon: "➕", desc: "List a new product or service", page: "addItem" },
          { label: "Transactions", icon: "💳", desc: "View all incoming orders", page: "transactions" },
          { label: "Request Items", icon: "📬", desc: "View user item requests", page: "requestItem" },
        ].map(c => (
          <div className="card" key={c.label} style={{ cursor: "pointer" }} onClick={() => setPage(c.page)}>
            <div style={{ fontSize: "2rem", marginBottom: 12 }}>{c.icon}</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", marginBottom: 6 }}>{c.label}</h3>
            <p style={{ color: "var(--muted)", fontSize: ".88rem" }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </div></div>
  );
}

/* ── YOUR ITEMS ── */
function YourItems({ setPage, store, toast }) {
  const session = store.getSession();
  const vendor = store.getVendor(session?.id);
  const [edit, setEdit] = useState(null);
  if (!vendor) return null;
  return (
    <div className="page"><div className="container">
      <div className="page-header">
        <h2>My Products</h2>
        <button className="btn btn-primary btn-sm" style={{ float: "right", marginTop: -4 }} onClick={() => setPage("addItem")}>+ Add New</button>
      </div>
      {vendor.products.length === 0
        ? <div className="empty-state"><div className="icon">📦</div><p>No products yet</p></div>
        : <div className="table-wrap">
            <table>
              <thead><tr>{["", "Product", "Price", "Actions"].map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {vendor.products.map(p => (
                  <tr key={p.id}>
                    <td style={{ fontSize: "1.5rem" }}>{p.emoji || "📦"}</td>
                    <td style={{ fontWeight: 600 }}>{p.name}</td>
                    <td style={{ fontFamily: "var(--font-display)", color: "var(--accent)" }}>₹{p.price.toLocaleString()}</td>
                    <td>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button className="btn btn-outline btn-sm" onClick={() => setEdit(p)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => { store.deleteProduct(vendor.id, p.id); toast("Product deleted"); }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      }
      {edit && (
        <div className="modal-overlay" onClick={() => setEdit(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Edit Product</h2>
            <div className="field"><label>Name</label><input value={edit.name} onChange={e => setEdit({ ...edit, name: e.target.value })} /></div>
            <div className="field"><label>Price (₹)</label><input type="number" value={edit.price} onChange={e => setEdit({ ...edit, price: +e.target.value })} /></div>
            <div className="field"><label>Emoji</label><input value={edit.emoji} onChange={e => setEdit({ ...edit, emoji: e.target.value })} /></div>
            <div className="form-actions">
              <button className="btn btn-outline" onClick={() => setEdit(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => { store.updateProduct(vendor.id, edit); setEdit(null); toast("Updated!"); }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div></div>
  );
}

/* ── ADD ITEM ── */
function AddItem({ setPage, store, toast }) {
  const session = store.getSession();
  const [f, setF] = useState({ name: "", price: "", emoji: "📦" });
  const [err, setErr] = useState("");
  const emojis = ["📦", "🍱", "🌸", "🎈", "💡", "🍖", "💐", "✨", "🔦", "🍰", "🌺", "🎪"];
  const submit = () => {
    if (!f.name || !f.price) { setErr("All fields required"); return; }
    store.addProduct(session.id, { name: f.name, price: +f.price, emoji: f.emoji });
    toast(`${f.name} added!`);
    setPage("yourItems");
  };
  return (
    <div className="page"><div className="container">
      <div className="page-header"><h2>Add New Product</h2></div>
      <div className="form-card wide">
        <div className="field"><label>Product Name</label><input value={f.name} onChange={e => setF({ ...f, name: e.target.value })} placeholder="e.g. Wedding Cake" /></div>
        <div className="field"><label>Price (₹)</label><input type="number" value={f.price} onChange={e => setF({ ...f, price: e.target.value })} placeholder="Enter price" /></div>
        <div className="field"><label>Choose Emoji Icon</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
            {emojis.map(em => (
              <button key={em} onClick={() => setF({ ...f, emoji: em })}
                style={{ fontSize: "1.6rem", background: f.emoji === em ? "var(--accent-glow)" : "var(--surface2)",
                  border: f.emoji === em ? "2px solid var(--accent)" : "2px solid var(--border)",
                  borderRadius: 10, padding: "8px 12px", cursor: "pointer" }}>{em}</button>
            ))}
          </div>
        </div>
        {err && <div className="error-msg">{err}</div>}
        <div className="form-actions">
          <button className="btn btn-outline" onClick={() => setPage("yourItems")}>Cancel</button>
          <button className="btn btn-primary" onClick={submit}>Add Product</button>
        </div>
      </div>
    </div></div>
  );
}

/* ── TRANSACTIONS (Vendor) ── */
function Transactions({ store }) {
  const session = store.getSession();
  const vendor = store.getVendor(session?.id);
  const productIds = vendor?.products.map(p => p.id) || [];
  const orders = store.state.orders.filter(o => o.items?.some(i => productIds.includes(i.productId)));
  const statusColor = { "Received": "badge-accent", "Ready for Shipping": "badge-blue", "Out For Delivery": "badge-green" };
  return (
    <div className="page"><div className="container">
      <div className="page-header"><h2>Transactions</h2><p style={{ color: "var(--muted)" }}>All orders containing your products</p></div>
      {orders.length === 0
        ? <div className="empty-state"><div className="icon">💳</div><p>No transactions yet</p></div>
        : <div className="table-wrap">
            <table>
              <thead><tr>{["Order ID", "Customer", "Items", "Total", "Date", "Status"].map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}>
                    <td style={{ fontFamily: "var(--font-display)", color: "var(--accent)", fontSize: ".85rem" }}>{o.id}</td>
                    <td>{o.name}</td>
                    <td>{o.items.filter(i => productIds.includes(i.productId)).map(i => `${i.emoji} ${i.name}`).join(", ")}</td>
                    <td>₹{o.total.toLocaleString()}</td>
                    <td>{o.createdAt}</td>
                    <td><span className={`badge ${statusColor[o.status] || "badge-accent"}`}>{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      }
    </div></div>
  );
}

/* ── PRODUCT STATUS (Vendor manages orders) ── */
function ProductStatus({ store, toast }) {
  const orders = store.state.orders;
  const statuses = ["Received", "Ready for Shipping", "Out For Delivery"];
  return (
    <div className="page"><div className="container">
      <div className="page-header"><h2>Product Status</h2><p style={{ color: "var(--muted)" }}>Update order delivery status</p></div>
      {orders.length === 0
        ? <div className="empty-state"><div className="icon">📋</div><p>No orders to manage</p></div>
        : <div className="table-wrap">
            <table>
              <thead><tr>{["Order ID", "Customer", "Email", "Address", "Status", "Update", ""].map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}>
                    <td style={{ fontFamily: "var(--font-display)", color: "var(--accent)", fontSize: ".82rem" }}>{o.id}</td>
                    <td style={{ fontWeight: 600 }}>{o.name}</td>
                    <td style={{ color: "var(--muted)", fontSize: ".85rem" }}>{o.email}</td>
                    <td style={{ color: "var(--muted)", fontSize: ".85rem" }}>{o.city}</td>
                    <td><span className={`badge ${o.status === "Received" ? "badge-accent" : o.status === "Ready for Shipping" ? "badge-blue" : "badge-green"}`}>{o.status}</span></td>
                    <td>
                      <select value={o.status} onChange={e => { store.updateOrderStatus(o.id, e.target.value); toast("Status updated!"); }}
                        style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text)", padding: "6px 10px", borderRadius: 8, fontSize: ".82rem", fontFamily: "var(--font-body)" }}>
                        {statuses.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                    <td><button className="btn btn-danger btn-sm" onClick={() => toast("Order removed (demo)")}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      }
    </div></div>
  );
}

/* ── REQUEST ITEM ── */
function RequestItem({ store, toast }) {
  const [f, setF] = useState({ item: "", desc: "" });
  const session = store.getSession();
  const myRequests = store.state.requests.filter(r => r.userId === session?.id);
  return (
    <div className="page"><div className="container">
      <div className="page-header"><h2>Request an Item</h2><p style={{ color: "var(--muted)" }}>Can't find what you need? Request it!</p></div>
      <div className="split-layout">
        <div className="form-card" style={{ height: "fit-content" }}>
          <div className="form-title" style={{ fontSize: "1.2rem", marginBottom: 16 }}>New Request</div>
          <div className="field"><label>Item Name</label><input value={f.item} onChange={e => setF({ ...f, item: e.target.value })} placeholder="What do you need?" /></div>
          <div className="field"><label>Description</label><input value={f.desc} onChange={e => setF({ ...f, desc: e.target.value })} placeholder="Any details..." /></div>
          <button className="btn btn-primary btn-full" onClick={() => {
            if (!f.item) return;
            store.addRequest({ ...f, userId: session?.id, date: new Date().toLocaleDateString() });
            toast("Request submitted!"); setF({ item: "", desc: "" });
          }}>Submit Request</button>
        </div>
        <div>
          <div className="section-label">My Requests</div>
          {myRequests.length === 0
            ? <div className="empty-state" style={{ padding: "30px 0" }}><p>No requests yet</p></div>
            : myRequests.map(r => (
                <div className="card" key={r.id} style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 600 }}>{r.item}</div>
                  <div style={{ color: "var(--muted)", fontSize: ".83rem", marginTop: 4 }}>{r.desc}</div>
                  <div style={{ color: "var(--muted)", fontSize: ".78rem", marginTop: 8 }}>{r.date}</div>
                </div>
              ))
          }
        </div>
      </div>
    </div></div>
  );
}

/* ── ADMIN DASHBOARD ── */
function AdminDash({ setPage }) {
  return (
    <div className="page"><div className="container">
      <div className="page-header">
        <div className="hero-tag">Administrator</div>
        <h2>Welcome, Admin</h2>
        <p style={{ color: "var(--muted)" }}>Manage the LuxeEvents platform</p>
      </div>
      <div className="card-grid card-grid-2">
        {[
          { label: "Maintain Users", icon: "👤", desc: "Add, update, or remove user accounts", page: "maintainUser" },
          { label: "Maintain Vendors", icon: "🏪", desc: "Manage vendor accounts and memberships", page: "maintainVendor" },
          { label: "Memberships", icon: "🎫", desc: "Add or update vendor membership plans", page: "membership" },
          { label: "All Orders", icon: "📦", desc: "View all orders across the platform", page: "allOrders" },
        ].map(c => (
          <div className="card" key={c.label} style={{ cursor: "pointer" }} onClick={() => setPage(c.page)}>
            <div style={{ fontSize: "2rem", marginBottom: 12 }}>{c.icon}</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", marginBottom: 6 }}>{c.label}</h3>
            <p style={{ color: "var(--muted)", fontSize: ".88rem" }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </div></div>
  );
}

/* ── MAINTAIN USERS ── */
function MaintainUser({ store, toast }) {
  const [f, setF] = useState({ name: "", email: "", password: "" });
  return (
    <div className="page"><div className="container">
      <div className="page-header"><h2>User Management</h2></div>
      <div className="admin-layout">
        <div className="table-wrap">
          <table>
            <thead><tr>{["Name", "Email", "Role", ""].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {store.state.users.map(u => (
                <tr key={u.id}>
                  <td style={{ fontWeight: 600 }}>{u.name}</td>
                  <td style={{ color: "var(--muted)" }}>{u.email}</td>
                  <td><span className="badge badge-accent">{u.role}</span></td>
                  <td><button className="btn btn-danger btn-sm" onClick={() => { store.deleteUser(u.id); toast("User removed"); }}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="form-card">
          <div className="form-title" style={{ fontSize: "1.2rem", marginBottom: 20 }}>Add New User</div>
          <div className="field"><label>Name</label><input value={f.name} onChange={e => setF({ ...f, name: e.target.value })} placeholder="Full Name" /></div>
          <div className="field"><label>Email</label><input value={f.email} onChange={e => setF({ ...f, email: e.target.value })} placeholder="Email Address" /></div>
          <div className="field"><label>Password</label><input type="password" value={f.password} onChange={e => setF({ ...f, password: e.target.value })} placeholder="Strong Password" /></div>
          <button className="btn btn-primary btn-full" onClick={() => {
            if (!f.name || !f.email) return;
            store.signupUser(f.name, f.email, f.password || "pass123");
            toast("User added!"); setF({ name: "", email: "", password: "" });
          }}>Create Account</button>
        </div>
      </div>
    </div></div>
  );
}

/* ── MAINTAIN VENDORS ── */
function MaintainVendor({ store, toast }) {
  return (
    <div className="page"><div className="container">
      <div className="page-header"><h2>Vendor Management</h2></div>
      <div className="table-wrap">
        <table>
          <thead><tr>{["Business", "Email", "Category", "Products", ""].map(h => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>
            {store.state.vendors.map(v => (
              <tr key={v.id}>
                <td style={{ fontWeight: 600 }}>{v.name}</td>
                <td style={{ color: "var(--muted)" }}>{v.email}</td>
                <td><span className="badge badge-accent">{v.category}</span></td>
                <td>{v.products.length}</td>
                <td><button className="btn btn-danger btn-sm" onClick={() => { store.deleteVendor(v.id); toast("Vendor removed"); }}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div></div>
  );
}

/* ── MEMBERSHIP ── */
function Membership({ store, toast }) {
  const [mode, setMode] = useState("add");
  const [f, setF] = useState({ vendorId: "", plan: "6 months", price: "5000" });
  const [upd, setUpd] = useState({ membershipNo: "", plan: "" });
  return (
    <div className="page"><div className="container">
      <div className="page-header"><h2>Membership Management</h2></div>
      <div className="tabs">
        <button className={`tab ${mode === "add" ? "active" : ""}`} onClick={() => setMode("add")}>Add Membership</button>
        <button className={`tab ${mode === "update" ? "active" : ""}`} onClick={() => setMode("update")}>Update Membership</button>
      </div>
      {mode === "add" && (
        <div className={`membership-layout ${store.state.memberships.length > 0 ? "" : "single"}`}>
          <div className="form-card">
            <div className="field"><label>Select Vendor</label>
              <select value={f.vendorId} onChange={e => setF({ ...f, vendorId: e.target.value })}>
                <option value="">-- Choose vendor --</option>
                {store.state.vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
              </select>
            </div>
            <div className="field"><label>Plan Duration</label>
              <select value={f.plan} onChange={e => setF({ ...f, plan: e.target.value })}>
                <option>6 months</option><option>1 year</option><option>2 years</option>
              </select>
            </div>
            <div className="field"><label>Price (₹)</label><input type="number" value={f.price} onChange={e => setF({ ...f, price: e.target.value })} /></div>
            <button className="btn btn-primary btn-full" onClick={() => {
              if (!f.vendorId) return;
              store.addMembership({ ...f, id: Date.now(), no: `MEM-${Date.now()}` });
              toast("Membership added!");
            }}>Add Membership</button>
          </div>

          {store.state.memberships.length > 0 && (
            <div>
              <div className="section-label" style={{ marginBottom: 16 }}>Active Memberships</div>
              {store.state.memberships.map(m => (
                <div key={m.id} className="card" style={{ marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px" }}>
                  <span style={{ fontFamily: "var(--font-display)", color: "var(--accent)", fontSize: "1rem" }}>{m.no}</span>
                  <span style={{ fontWeight: 500 }}>{store.getVendor(+m.vendorId)?.name}</span>
                  <span className="badge badge-green">{m.plan}</span>
                  <span style={{ fontFamily: "var(--font-display)" }}>₹{m.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {mode === "update" && (
        <div className="form-card">
          <div className="field"><label>Membership Number</label>
            <select value={upd.membershipNo} onChange={e => {
              const m = store.state.memberships.find(x => x.no === e.target.value);
              setUpd({ membershipNo: e.target.value, plan: m?.plan || "" });
            }}>
              <option value="">-- Select membership --</option>
              {store.state.memberships.map(m => <option key={m.id} value={m.no}>{m.no}</option>)}
            </select>
          </div>
          <div className="field"><label>New Plan</label>
            <select value={upd.plan} onChange={e => setUpd({ ...upd, plan: e.target.value })}>
              <option>6 months</option><option>1 year</option><option>2 years</option>
            </select>
          </div>
          <button className="btn btn-secondary" onClick={() => toast("Membership updated!")}>Update</button>
        </div>
      )}
    </div></div>
  );
}

/* ── ALL ORDERS (Admin) ── */
function AllOrders({ store }) {
  const orders = store.state.orders;
  return (
    <div className="page"><div className="container">
      <div className="page-header"><h2>All Orders</h2><p style={{ color: "var(--muted)" }}>{orders.length} total orders</p></div>
      {orders.length === 0
        ? <div className="empty-state"><div className="icon">📦</div><p>No orders yet</p></div>
        : <div className="table-wrap">
            <table>
              <thead><tr>{["Order ID", "Customer", "Email", "Items", "Total", "Payment", "Status"].map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}>
                    <td style={{ fontFamily: "var(--font-display)", color: "var(--accent)", fontSize: ".82rem" }}>{o.id}</td>
                    <td style={{ fontWeight: 600 }}>{o.name}</td>
                    <td style={{ color: "var(--muted)", fontSize: ".85rem" }}>{o.email}</td>
                    <td>{o.items.length} items</td>
                    <td>₹{o.total.toLocaleString()}</td>
                    <td>{o.paymentMethod}</td>
                    <td><span className={`badge ${o.status === "Received" ? "badge-accent" : o.status === "Ready for Shipping" ? "badge-blue" : "badge-green"}`}>{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      }
    </div></div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROUTER / APP ROOT
═══════════════════════════════════════════════════════════ */
export default function App() {
  const store = useStore();
  const [page, setPage] = useState("home");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);
  const [toastMsg, setToastMsg] = useState("");

  const toast = (msg) => setToastMsg(msg);
  const session = store.getSession();

  // Route guard: redirect to login if not authenticated
  const guard = (component, role) => {
    if (!session || (role && session.role !== role)) {
      setPage(role === "admin" ? "adminLogin" : role === "vendor" ? "vendorLogin" : "userLogin");
      return null;
    }
    return component;
  };

  const renderPage = () => {
    switch (page) {
      case "home":         return <HomePage setPage={setPage} />;
      case "adminLogin":   return <AdminLogin setPage={setPage} store={store} toast={toast} />;
      case "vendorLogin":  return <VendorLogin setPage={setPage} store={store} toast={toast} />;
      case "vendorSignup": return <VendorSignup setPage={setPage} store={store} toast={toast} />;
      case "userLogin":    return <UserLogin setPage={setPage} store={store} toast={toast} />;
      case "userSignup":   return <UserSignup setPage={setPage} store={store} toast={toast} />;

      // User pages
      case "userPortal":   return guard(<UserPortal setPage={setPage} store={store} />, "user");
      case "vendorBrowse": return guard(<VendorBrowse setPage={setPage} store={store} setSelectedVendor={setSelectedVendor} />, "user");
      case "products":     return guard(<Products setPage={setPage} store={store} selectedVendor={selectedVendor} toast={toast} />, "user");
      case "cart":         return guard(<Cart setPage={setPage} store={store} toast={toast} />, "user");
      case "checkout":     return guard(<Checkout setPage={setPage} store={store} toast={toast} setLastOrder={setLastOrder} />, "user");
      case "success":      return guard(<SuccessPage setPage={setPage} store={store} lastOrder={lastOrder} />, "user");
      case "orderStatus":  return guard(<OrderStatus store={store} />, "user");
      case "guestList":    return guard(<GuestList toast={toast} />, "user");
      case "requestItem":  return session?.role === "user"
        ? <RequestItem store={store} toast={toast} />
        : guard(<RequestItem store={store} toast={toast} />, "vendor");

      // Vendor pages
      case "vendorHome":   return guard(<VendorHome setPage={setPage} store={store} />, "vendor");
      case "yourItems":    return guard(<YourItems setPage={setPage} store={store} toast={toast} />, "vendor");
      case "addItem":      return guard(<AddItem setPage={setPage} store={store} toast={toast} />, "vendor");
      case "transactions": return guard(<Transactions store={store} />, "vendor");
      case "productStatus":return guard(<ProductStatus store={store} toast={toast} />, "vendor");

      // Admin pages
      case "adminDash":    return guard(<AdminDash setPage={setPage} />, "admin");
      case "maintainUser": return guard(<MaintainUser store={store} toast={toast} />, "admin");
      case "maintainVendor":return guard(<MaintainVendor store={store} toast={toast} />, "admin");
      case "membership":   return guard(<Membership store={store} toast={toast} />, "admin");
      case "allOrders":    return guard(<AllOrders store={store} />, "admin");

      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <>
      <style>{STYLE}</style>
      <Navbar page={page} setPage={setPage} store={store} />
      {renderPage()}
      {toastMsg && <Toast msg={toastMsg} onDone={() => setToastMsg("")} />}
    </>
  );
}
