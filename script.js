// ==========================================
// 🛒 PRODUCT DATA (EDIT PRICES & IMAGES HERE)
// ==========================================
const products = [
    { 
        id: 1, 
        name: "Karambit Doppler", 
        price: 12.00, 
        oldPrice: 15.00, 
        image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/631286982/playside.png", 
        desc: "Premium replica desk toy. Deep sapphire phases with a flawless glossy finish. Includes display stand." 
    },
    { 
        id: 2, 
        name: "Karambit Fade", 
        price: 12.00, 
        oldPrice: 15.00, 
        image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/609453843/playside.png", 
        desc: "Premium replica desk toy. 100% fade pattern with seamless gradient transitions. Includes display stand." 
    },
    { 
        id: 3, 
        name: "M9 Bayonet Crimson Web", 
        price: 12.00, 
        oldPrice: 15.00, 
        image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/632372451/playside.png", 
        desc: "Premium replica desk toy. Factory new look with distinct webbing patterns. Heavy-duty metal construction." 
    },
    { 
        id: 4, 
        name: "Butterfly Knife Marble Fade", 
        price: 12.00, 
        oldPrice: 18.00, 
        image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/632758204/playside.png", 
        desc: "Premium replica desk toy. Smooth flipping action mechanism with stunning tricolor marble aesthetic." 
    },
    { 
        id: 5, 
        name: "Butterfly Knife Tiger Tooth", 
        price: 12, 
        oldPrice: 18, 
        image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/616083695/playside.png", 
        desc: "Premium replica desk toy. Golden anodized finish with hand-machined tiger stripes." 
    },
    { 
        id: 6, 
        name: "Talon Knife Slaughter", 
        price: 12.00, 
        oldPrice: 15.00, 
        image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/631798830/playside.png", 
        desc: "Premium replica desk toy. Ivory-style handle with a beautiful crimson slaughter pattern blade." 
    },
    { 
        id: 7, 
        name: "Huntsman Knife Doppler", 
        price: 12.00, 
        oldPrice: 15.00, 
        image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/602129942/playside.png", 
        desc: "Premium replica desk toy. Aggressive serrated spine paired with a deep ruby doppler finish." 
    },
    { 
        id: 8, 
        name: "Flip Knife Fade", 
        price: 12.00, 
        oldPrice: 15.00, 
        image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/625454898/playside.png", 
        desc: "Premium replica desk toy. Sleek, foldable design featuring a full-blade chromatic fade." 
    },
    { 
        id: 9, 
        name: "Shadow Daggers Marble Fade", 
        price: 12.00, 
        oldPrice: 15.00, 
        image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/632307382/playside.png", 
        desc: "Premium replica desk toy. Dual-wield push daggers with matching marble fade patterns." 
    },
    { 
        id: 10, 
        name: "Bowie Knife Tiger Tooth", 
        price: 12.00, 
        oldPrice: 15.00, 
        image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/632900583/playside.png", 
        desc: "Premium replica desk toy. Massive display piece featuring a mirror-polished tiger tooth blade." 
    }
];

// --- APP LOGIC & ROUTING ---
const app = {
    tg: window.Telegram.WebApp,
    supportUsername: "Chea_Vireak",
    
    // State Data
    searchQuery: "",
    maxPrice: 1000,
    cart: [], 
    isPanelOpen: false,
    isDarkMode: true,

    init() {
        this.tg.expand();
        this.tg.ready();
        
        // Load Saved Theme
        const savedTheme = localStorage.getItem('brickTheme');
        if (savedTheme === 'light') {
            this.isDarkMode = false;
        } else {
            this.isDarkMode = true; 
        }
        this.applyTheme();
        
        this.renderCatalog();
        this.setupBackButton();
    },

    haptic(style = 'light') {
        if (this.tg.HapticFeedback) {
            this.tg.HapticFeedback.impactOccurred(style);
        }
    },

    // --- SIDE PANEL & THEME ---
    togglePanel() {
        this.haptic('light');
        this.isPanelOpen = !this.isPanelOpen;
        const panel = document.getElementById('side-panel');
        const overlay = document.getElementById('panel-overlay');
        
        if (this.isPanelOpen) {
            panel.classList.remove('translate-x-full');
            panel.classList.add('translate-x-0');
            overlay.classList.remove('hidden');
            setTimeout(() => overlay.classList.add('opacity-100'), 10);
        } else {
            panel.classList.remove('translate-x-0');
            panel.classList.add('translate-x-full');
            overlay.classList.remove('opacity-100');
            setTimeout(() => overlay.classList.add('hidden'), 300);
        }
    },

    toggleTheme() {
        this.haptic('medium');
        this.isDarkMode = !this.isDarkMode;
        localStorage.setItem('brickTheme', this.isDarkMode ? 'dark' : 'light');
        this.applyTheme();
    },

    applyTheme() {
        const knob = document.getElementById('theme-toggle-knob');
        
        if (this.isDarkMode) {
            document.body.classList.add('dark');
            if(knob) {
                knob.classList.add('translate-x-6');
                knob.classList.remove('translate-x-0');
            }
            this.tg.setHeaderColor('#000000');
            this.tg.setBackgroundColor('#000000');
        } else {
            document.body.classList.remove('dark');
            if(knob) {
                knob.classList.remove('translate-x-6');
                knob.classList.add('translate-x-0');
            }
            this.tg.setHeaderColor('#f4f4f5');
            this.tg.setBackgroundColor('#f4f4f5');
        }
    },

    // --- NAVIGATION ---
    navigate(viewId) {
        this.haptic('light');
        
        if(this.isPanelOpen) this.togglePanel();
        
        document.querySelectorAll('.view-section').forEach(el => {
            if (el.id !== `view-${viewId}`) {
                el.classList.remove('active');
                el.classList.add('hidden');
            }
        });

        const target = document.getElementById(`view-${viewId}`);
        target.classList.remove('hidden');
        void target.offsetWidth; 
        target.classList.add('active');

        if (viewId === 'home' || viewId === 'cart') {
            document.getElementById('nav-home').className = `flex flex-col items-center transition-colors ${viewId === 'home' ? 'text-premiumWhite' : 'text-premiumGray hover:text-premiumWhite'}`;
            document.getElementById('nav-cart').className = `flex flex-col items-center transition-colors relative ${viewId === 'cart' ? 'text-premiumWhite' : 'text-premiumGray hover:text-premiumWhite'}`;
            this.tg.BackButton.hide();
        } else {
            this.tg.BackButton.show();
        }

        if (viewId === 'cart') {
            this.renderCart();
        }
        
        window.scrollTo(0, 0);
    },

    setupBackButton() {
        this.tg.BackButton.onClick(() => {
            this.navigate('home');
        });
    },

    // --- SEARCH & FILTER ---
    handleSearch(event) {
        this.searchQuery = event.target.value.toLowerCase();
        this.renderCatalog();
    },

    handlePriceFilter(event) {
        this.maxPrice = parseInt(event.target.value);
        document.getElementById('priceValue').innerText = '$' + this.maxPrice;
        this.renderCatalog();
    },

    // --- CART LOGIC ---
    addToCart(id) {
        this.haptic('medium');
        const product = products.find(p => p.id === id);
        if (product) {
            this.cart.push(product);
            
            if (this.tg.showPopup) {
                this.tg.showPopup({ title: "Added to Cart", message: `${product.name} is now in your cart.`, buttons: [{type: "ok"}] });
            } else {
                alert(`Added ${product.name} to your cart!`);
            }
            
            this.updateCartBadge();
        }
    },

    removeFromCart(index) {
        this.haptic('light');
        this.cart.splice(index, 1);
        this.updateCartBadge();
        this.renderCart();
    },

    updateCartBadge() {
        const badge = document.getElementById('cart-badge');
        if (this.cart.length > 0) {
            badge.innerText = this.cart.length;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    },

    // --- TELEGRAM CHECKOUT ---
    openTelegramSupport(productId = null) {
        this.haptic('medium');
        let message = "";
        
        if (productId) {
            const product = products.find(p => p.id === productId);
            if (product) {
                message = `Hello, I would like to order this product:\nProduct Name: ${product.name}\nPrice: $${product.price}\n[image]`;
            }
        } 
        else if (this.cart.length > 0) {
            message = "Hello, I would like to order these products:\n\n";
            let total = 0;
            this.cart.forEach((product, index) => {
                message += `Item ${index + 1}:\nProduct Name: ${product.name}\nPrice: $${product.price}\n[image]\n\n`;
                total += product.price;
            });
            message += `Total Price: $${total}`;
        }
        
        if (message !== "") {
            const url = `https://t.me/${this.supportUsername}?text=${encodeURIComponent(message)}`;
            this.tg.openTelegramLink(url);
        }
    },

    // --- RENDERING VIEWS ---
    renderCatalog() {
        const grid = document.getElementById('product-grid');
        
        const filteredProducts = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(this.searchQuery);
            const matchesPrice = product.price <= this.maxPrice;
            return matchesSearch && matchesPrice;
        });

        if (filteredProducts.length === 0) {
            grid.innerHTML = `<div class="col-span-2 text-center py-10 text-premiumGray text-sm">No items found matching your search.</div>`;
            return;
        }

        grid.innerHTML = filteredProducts.map(product => `
            <div onclick="app.viewProduct(${product.id})" class="bg-premiumCard border border-premiumBorder rounded-xl overflow-hidden active:scale-95 transition-transform cursor-pointer flex flex-col shadow-sm hover:shadow-lg">
                <div class="w-full aspect-square bg-[#0a0a0a] flex items-center justify-center relative p-2">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
                </div>
                <div class="p-3 flex-1 flex flex-col justify-between border-t border-premiumBorder bg-premiumCard">
                    <div>
                        <h4 class="font-bold text-xs uppercase tracking-wider mb-1 leading-tight text-premiumWhite">${product.name}</h4>
                    </div>
                    
                    <div class="mt-3 flex justify-between items-center">
                        <div class="flex items-baseline gap-2">
                            <span class="text-premiumWhite font-black text-sm tracking-widest">$${product.price}</span>
                            <span class="text-premiumGray font-light text-[10px] line-through decoration-red-500/70">$${product.oldPrice}</span>
                        </div>
                        <div class="w-6 h-6 rounded-full border border-premiumBorder flex items-center justify-center text-premiumWhite bg-premiumBlack">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    },

    viewProduct(id) {
        const product = products.find(p => p.id === id);
        if (!product) return;

        const content = document.getElementById('product-detail-content');
        content.innerHTML = `
            <div class="bg-premiumCard p-5 rounded-xl border border-premiumBorder mb-6 shadow-sm">
                <div class="relative w-full aspect-square bg-[#0a0a0a] rounded-xl overflow-hidden mb-6 flex items-center justify-center border border-premiumBorder shadow-inner">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-contain p-4 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                </div>
                <div class="text-center">
                    <h2 class="text-2xl font-black uppercase tracking-widest leading-tight mb-2 text-premiumWhite">${product.name}</h2>
                    
                    <div class="flex justify-center items-baseline gap-3 mb-2">
                        <span class="text-2xl font-black text-premiumWhite tracking-widest block">$${product.price}</span>
                        <span class="text-lg font-light text-premiumGray line-through decoration-red-500/70 block">$${product.oldPrice}</span>
                    </div>
                </div>
            </div>

            <p class="text-sm text-premiumGray leading-relaxed mb-8 px-2 text-justify">${product.desc}</p>

            <div class="space-y-3">
                <button onclick="app.addToCart(${product.id})" class="w-full bg-premiumCard border border-premiumBorder text-premiumWhite font-bold uppercase tracking-widest text-xs py-4 rounded-xl flex justify-center items-center gap-2 active:scale-95 transition-transform shadow-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    Add to Cart
                </button>
                
                <button onclick="app.openTelegramSupport(${product.id})" class="w-full bg-premiumWhite text-premiumBlack font-black uppercase tracking-widest text-xs py-4 rounded-xl flex justify-center items-center gap-2 active:scale-95 transition-transform shadow-sm">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.26-3.95 2.58-.29.19-.55.29-.78.28-.26-.01-.76-.15-1.13-.27-.45-.15-.81-.23-.79-.49.01-.13.2-.27.56-.41 2.21-.96 3.68-1.59 4.41-1.89 2.09-.87 2.53-1.02 2.82-1.02.06 0 .2 0 .28.06.07.05.1.12.11.19-.01.07-.01.12-.02.16z"/></svg>
                    Buy now via telegram
                </button>
            </div>
        `;
        
        this.navigate('product');
    },

    renderCart() {
        const content = document.getElementById('cart-content');
        
        if (this.cart.length === 0) {
            content.innerHTML = `
                <div class="text-center py-20">
                    <span class="text-6xl mb-6 block opacity-30 grayscale filter">🛒</span>
                    <h3 class="text-premiumWhite font-bold uppercase tracking-widest mb-2">Your cart is empty</h3>
                    <p class="text-xs text-premiumGray mb-8">Looks like you haven't added any knives yet.</p>
                    <button onclick="app.navigate('home')" class="bg-premiumWhite text-premiumBlack font-black uppercase tracking-widest py-3 px-8 rounded-xl active:scale-95 transition-transform shadow-sm">
                        Go to Shopping
                    </button>
                </div>
            `;
            return;
        }

        let total = 0;
        let cartItemsHTML = this.cart.map((item, index) => {
            total += item.price;
            return `
                <div class="bg-premiumCard border border-premiumBorder p-3 rounded-xl flex items-center gap-4 mb-3 shadow-sm">
                    <div class="w-16 h-16 bg-[#0a0a0a] rounded-lg flex items-center justify-center p-2 border border-premiumBorder shadow-inner">
                        <img src="${item.image}" class="w-full h-full object-contain filter drop-shadow-[0_0_5px_rgba(255,255,255,0.1)]">
                    </div>
                    <div class="flex-1">
                        <h4 class="font-bold text-xs uppercase tracking-wider text-premiumWhite leading-tight">${item.name}</h4>
                        <span class="text-premiumGray text-sm font-light tracking-widest block mt-1">$${item.price}</span>
                    </div>
                    <button onclick="app.removeFromCart(${index})" class="w-10 h-10 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center active:scale-90 transition-transform">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            `;
        }).join('');

        content.innerHTML = `
            <div>
                ${cartItemsHTML}
            </div>
            
            <div class="mt-8 border-t border-premiumBorder pt-6">
                <div class="flex justify-between items-center mb-6">
                    <span class="text-premiumGray uppercase tracking-widest font-bold text-xs">Total Price</span>
                    <span class="text-2xl font-black text-premiumWhite tracking-widest">$${total}</span>
                </div>
                
                <button onclick="app.checkout()" class="w-full bg-premiumWhite text-premiumBlack font-black uppercase tracking-widest py-4 rounded-xl flex justify-center items-center gap-2 active:scale-95 transition-transform shadow-sm">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.26-3.95 2.58-.29.19-.55.29-.78.28-.26-.01-.76-.15-1.13-.27-.45-.15-.81-.23-.79-.49.01-.13.2-.27.56-.41 2.21-.96 3.68-1.59 4.41-1.89 2.09-.87 2.53-1.02 2.82-1.02.06 0 .2 0 .28.06.07.05.1.12.11.19-.01.07-.01.12-.02.16z"/></svg>
                    Order via Telegram
                </button>
            </div>
        `;
    },
    
    checkout() {
        this.openTelegramSupport();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
