const QT_PRODUCTS = [
  {
    id: 1,
    name: "Custom Chocolate Bars",
    category: "Personalised Gifts",
    description: "Personalised chocolate bars for any occasion — matric farewell, Eid, birthdays and more. Your message, your design.",
    price: 35,
    badge: "Best Seller",
    badgeStyle: "gold",
    imageSrc: "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=600",
    count: 1,
    customisable: true,
  },
  {
    id: 2,
    name: "Islamic Compact Mirror",
    category: "Islamic Gifts",
    description: "Beautiful compact mirrors engraved with Islamic duas and Arabic calligraphy. Perfect Islamic gift for her.",
    price: 120,
    badge: "Popular",
    badgeStyle: "pink",
    imageSrc: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=600",
    count: 1,
    customisable: true,
  },
  {
    id: 3,
    name: "Personalised Jewellery Case",
    category: "Personalised Gifts",
    description: "Elegant personalised jewellery travel case with your name in gold. Available in multiple colours.",
    price: 250,
    badge: "New",
    badgeStyle: "new",
    imageSrc: "https://images.pexels.com/photos/1449667/pexels-photo-1449667.jpeg?auto=compress&cs=tinysrgb&w=600",
    count: 1,
    customisable: true,
  },
  {
    id: 4,
    name: "Custom Round Stickers",
    category: "Stickers & Labels",
    description: "Premium quality custom round stickers for events, parties, gifting and business branding. Minimum order 20 units.",
    price: 80,
    badge: null,
    badgeStyle: null,
    imageSrc: "https://images.pexels.com/photos/1570779/pexels-photo-1570779.jpeg?auto=compress&cs=tinysrgb&w=600",
    count: 1,
    customisable: true,
  },
  {
    id: 5,
    name: "Eid Gift Set",
    category: "Eid & Ramadan",
    description: "Curated Eid gifting sets with Islamic themed items. Various options available — you can mix and match.",
    price: 350,
    badge: "Seasonal",
    badgeStyle: "gold",
    imageSrc: "https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=600",
    count: 1,
    customisable: true,
  },
  {
    id: 6,
    name: "Teacher Appreciation Gift",
    category: "Occasion Gifts",
    description: "Show your teacher how much they matter with a curated, personalised gift set designed to celebrate educators.",
    price: 200,
    badge: null,
    badgeStyle: null,
    imageSrc: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600",
    count: 1,
    customisable: true,
  },
  {
    id: 7,
    name: "Party Favour Bags",
    category: "Stickers & Labels",
    description: "Custom designed party favour bags for kids' birthdays, baby showers and gender reveals. Fully personalised.",
    price: 45,
    badge: null,
    badgeStyle: null,
    imageSrc: "https://images.pexels.com/photos/1666070/pexels-photo-1666070.jpeg?auto=compress&cs=tinysrgb&w=600",
    count: 1,
    customisable: true,
  },
  {
    id: 8,
    name: "Quran Reading Dua Cards",
    category: "Islamic Gifts",
    description: "Beautifully printed dua cards with Arabic text and translations, ideal for Islamic events, Khatams and funerals.",
    price: 60,
    badge: "New",
    badgeStyle: "new",
    imageSrc: "https://images.pexels.com/photos/1537268/pexels-photo-1537268.jpeg?auto=compress&cs=tinysrgb&w=600",
    count: 1,
    customisable: true,
  },
];

let cart = JSON.parse(localStorage.getItem('qt_cart')) || [];

function saveCart() {
  localStorage.setItem('qt_cart', JSON.stringify(cart));
}

function addToCart(id) {
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.count++;
  } else {
    const product = QT_PRODUCTS.find(p => p.id === id);
    if (product) cart.push({ ...product, count: 1 });
  }
  saveCart();
  renderCart();
  showToast('Item added to cart');
  openCart();
}

function changeQty(id, delta) {
  cart = cart.map(item => {
    if (item.id !== id) return item;
    const count = item.count + delta;
    return count < 1 ? null : { ...item, count };
  }).filter(Boolean);
  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

function getCartTotals() {
  return cart.reduce(
    (acc, item) => ({
      items: acc.items + item.count,
      price: acc.price + item.price * item.count,
    }),
    { items: 0, price: 0 }
  );
}

function renderCart() {
  const countEl = document.querySelector('.cart-count');
  const itemsEl = document.getElementById('cartItems');
  const subtotalEl = document.getElementById('cartSubtotal');
  const totalEl = document.getElementById('cartTotal');

  const { items, price } = getCartTotals();

  if (countEl) countEl.textContent = items;

  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🛒</div>
        <p>Your cart is empty</p>
      </div>`;
    if (subtotalEl) subtotalEl.textContent = 'R0';
    if (totalEl) totalEl.textContent = 'R0';
    return;
  }

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">
        <img src="${item.imageSrc}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">R${item.price} each</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-display">${item.count}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>
    </div>
  `).join('');

  if (subtotalEl) subtotalEl.textContent = `R${price}`;
  if (totalEl) totalEl.textContent = `R${price}`;
}

function openCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  if (sidebar) sidebar.classList.add('open');
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

let toastTimer;
function showToast(msg) {
  let toast = document.getElementById('qt-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'qt-toast';
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">✓</span><span class="toast-msg"></span>`;
    document.body.appendChild(toast);
  }
  toast.querySelector('.toast-msg').textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

function renderProducts(containerId, limit) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const products = limit ? QT_PRODUCTS.slice(0, limit) : QT_PRODUCTS;

  container.innerHTML = products.map(p => `
    <div class="product-card">
      <div class="product-img">
        ${p.badge ? `<span class="product-badge ${p.badgeStyle || ''}">${p.badge}</span>` : ''}
        <img src="${p.imageSrc}" alt="${p.name}" loading="lazy">
        <button class="product-quick-add" onclick="addToCart(${p.id})">+ ADD TO CART</button>
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.description}</p>
        <div class="product-footer">
          <div class="product-price">R${p.price} <span>/ item</span></div>
          <button class="add-to-cart-btn" onclick="addToCart(${p.id})" title="Add to cart">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Expose functions used in inline onclick handlers to global scope
window.addToCart = addToCart;
window.changeQty = changeQty;
window.removeFromCart = removeFromCart;

document.addEventListener('DOMContentLoaded', () => {
  renderCart();

  const cartBtn = document.getElementById('cartToggle');
  if (cartBtn) cartBtn.addEventListener('click', openCart);

  const closeBtn = document.getElementById('cartCloseBtn');
  if (closeBtn) closeBtn.addEventListener('click', closeCart);

  const overlay = document.getElementById('cartOverlay');
  if (overlay) overlay.addEventListener('click', closeCart);

  const clearBtn = document.getElementById('clearCartBtn');
  if (clearBtn) clearBtn.addEventListener('click', clearCart);

  renderProducts('featuredProducts', 4);
  renderProducts('allProducts');
});
