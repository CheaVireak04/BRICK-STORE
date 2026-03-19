// =========================================================================
// ⚠️ MOCK-UP APP SETTINGS (DOES NOT REPLACE MASTER)
// =========================================================================
const STORE_CONFIG = {
    maxNewArrivals: 4,    
    maxTrending: 4,       
    maxBestDeals: 4,      
    maxBestSelling: 4,    
    minPriceLimit: 0,
    maxPriceLimit: 1000
};

// =========================================================================
// [MOCK-UP FEATURE]: Multi-Image 'gallery' array added
// =========================================================================
const products = [
    { 
        id: 1, name: "Karambit Doppler", price: 12, oldPrice: 15, 
        image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/631286982/playside.png", 
        gallery: [
            "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/631286982/playside.png",
            "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/609453843/playside.png" 
        ],
        desc: "Premium replica desk toy. Deep sapphire phases. [EXPERIMENTAL PREVIEW SHOWING MULTI-IMAGE CAROUSEL]",
        dateAdded: "2026-03-01", clicks: 450, sales: 85
    },
    { 
        id: 2, name: "Karambit Fade", price: 12, oldPrice: 15, 
        image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/609453843/playside.png", 
        gallery: ["https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/609453843/playside.png"],
        desc: "Premium replica desk toy. 100% fade pattern.",
        dateAdded: "2026-03-02", clicks: 600, sales: 120 
    },
    { 
        id: 3, name: "M9 Bayonet Crimson Web", price: 12, oldPrice: 15, 
        image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/632372451/playside.png", 
        gallery: ["https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/632372451/playside.png"],
        desc: "Premium replica desk toy. Factory new look with distinct webbing patterns.",
        dateAdded: "2026-03-03", clicks: 300, sales: 50
    },
    { 
        id: 4, name: "Butterfly Knife Marble Fade", price: 12, oldPrice: 18, 
        image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/632758204/playside.png", 
        gallery: ["https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/632758204/playside.png"],
        desc: "Premium replica desk toy. Smooth flipping action mechanism.",
        dateAdded: "2026-03-04", clicks: 800, sales: 200
    },
    { 
        id: 5, name: "Butterfly Knife Tiger Tooth", price: 12, oldPrice: 18, 
        image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/616083695/playside.png", 
        gallery: ["https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/616083695/playside.png"],
        desc: "Premium replica desk toy. Golden anodized finish with hand-machined tiger stripes.",
        dateAdded: "2026-03-05", clicks: 500, sales: 95
    },
    { 
        id: 6, name: "Talon Knife Slaughter", price: 12, oldPrice: 15, 
        image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/631798830/playside.png", 
        gallery: ["https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/631798830/playside.png"],
        desc: "Premium replica desk toy. Ivory-style handle with a beautiful crimson slaughter pattern blade.",
        dateAdded: "2026-03-06", clicks: 200, sales: 30
    },
    { 
        id: 7, name: "Huntsman Knife Doppler", price: 12, oldPrice: 15, 
        image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/602129942/playside.png", 
        gallery: ["https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/602129942/playside.png"],
        desc: "Premium replica desk toy. Aggressive serrated spine paired with a deep ruby doppler finish.",
        dateAdded: "2026-03-07", clicks: 350, sales: 60
    },
    { 
        id: 8, name: "Flip Knife Fade", price: 12, oldPrice: 15, 
        image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/625454898/playside.png", 
        gallery: ["https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/625454898/playside.png"],
        desc: "Premium replica desk toy. Sleek, foldable design featuring a full-blade chromatic fade.",
        dateAdded: "2026-03-08", clicks: 400, sales: 75
    },
    { 
        id: 9, name: "Shadow Daggers Marble Fade", price: 12, oldPrice: 15, 
        image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/632307382/playside.png", 
        gallery: ["https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/632307382/playside.png"],
        desc: "Premium replica desk toy. Dual-wield push daggers with matching marble fade patterns.",
        dateAdded: "2026-03-09", clicks: 150, sales: 20
    },
    { 
        id: 10, name: "Bowie Knife Tiger Tooth", price: 12, oldPrice: 15, 
        image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/632900583/playside.png", 
        gallery: ["https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/632900583/playside.png"],
        desc: "Premium replica desk toy. Massive display piece featuring a mirror-polished tiger tooth blade.",
        dateAdded: "2026-03-10", clicks: 250, sales: 40
    }
];

const app = {
    tg: null,
    supportUsername: "Chea_Vireak",
    searchQuery: "", minPrice: 0, maxPrice: 1000, isPriceFilterActive: false,
    cart: [], isPanelOpen: false, isLeftPanelOpen: false, isDarkMode: true, currentCategory: 'home',
    
    // Tracks the product ID if user buys straight from the product page
    pendingOrderProductId: null,

    init() {
        try { this.tg = window.Telegram?.WebApp; this.tg?.expand?.(); this.tg?.ready?.(); } catch(e) {}
        this.minPrice = Number(STORE_CONFIG.minPriceLimit) || 0;
        this.maxPrice = Number(STORE_CONFIG.maxPriceLimit) || 1000;
        
        try { this.isDarkMode = (localStorage.getItem('brickTheme') !== 'light'); } catch(e) { this.isDarkMode = true; }
        
        this.applyTheme();
        this.updateSliderUI();
        this.renderCatalog(); 
    },

    haptic(style = 'light') { try { this.tg?.HapticFeedback?.impactOccurred?.(style); } catch (e) {} },

    // [MOCK-UP FEATURE]: TEXT HIGHLIGHTING LOGIC
    highlightText(text) {
        if (!this.searchQuery) return text;
        const regex = new RegExp(`(${this.searchQuery})`, 'gi');
        return text.replace(regex, '<span class="search-highlight">$1</span>');
    },

    // [MOCK-UP FEATURE]: FLYING ICON ANIMATION
    animateAddToCart(productId, event) {
        event.stopPropagation(); // Stop clicking from opening product page
        this.haptic('medium');
        
        const product = products.find(p => p.id === productId);
        if (!product) return;

        // Create the flying image clone
        const flyingImg = document.createElement('img');
        flyingImg.src = product.image;
        flyingImg.className = 'flying-item';
        
        const startRect = event.target.getBoundingClientRect();
        const cartIcon = document.getElementById('nav-cart');
        const endRect = cartIcon.getBoundingClientRect();
        
        flyingImg.style.top = `${startRect.top}px`;
        flyingImg.style.left = `${startRect.left}px`;
        document.body.appendChild(flyingImg);
        
        // Start fly animation
        setTimeout(() => {
            flyingImg.style.top = `${endRect.top + 10}px`;
            flyingImg.style.left = `${endRect.left + 10}px`;
            flyingImg.style.transform = 'scale(0.2) rotate(360deg)';
            flyingImg.style.opacity = '0';
        }, 20);

        // Remove clone and update cart after animation finishes
        setTimeout(() => {
            flyingImg.remove();
            this.cart.push(product);
            this.updateCartBadge();
            
            // Pop animation on the cart icon
            cartIcon.style.transform = 'scale(1.2)';
            setTimeout(() => cartIcon.style.transform = 'scale(1)', 150);
        }, 700);
    },

    renderCatalog() {
        const grid = document.getElementById('product-grid');
        
        // [MOCK-UP FEATURE]: SKELETON LOADING
        const skeletonHTML = Array(4).fill(`
            <div class="bg-premiumCard border border-premiumBorder rounded-xl overflow-hidden shadow-sm p-3">
                <div class="w-full aspect-square skeleton rounded-lg mb-3"></div>
                <div class="h-3 skeleton rounded w-3/4 mb-4"></div>
                <div class="flex justify-between items-center"><div class="h-4 skeleton rounded w-1/3"></div><div class="h-6 w-6 skeleton rounded-full"></div></div>
            </div>
        `).join('');
        grid.innerHTML = skeletonHTML;

        // Simulate 500ms network delay for premium feel
        setTimeout(() => {
            let displayProducts = [...products];

            if (this.currentCategory === 'new') { displayProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)); displayProducts = displayProducts.slice(0, STORE_CONFIG.maxNewArrivals); } 
            else if (this.currentCategory === 'trending') { displayProducts.sort((a, b) => b.clicks - a.clicks); displayProducts = displayProducts.slice(0, STORE_CONFIG.maxTrending); }
            else if (this.currentCategory === 'deal') { displayProducts.sort((a, b) => Number(a.price) - Number(b.price)); displayProducts = displayProducts.slice(0, STORE_CONFIG.maxBestDeals); }
            else if (this.currentCategory === 'selling') { displayProducts.sort((a, b) => b.sales - a.sales); displayProducts = displayProducts.slice(0, STORE_CONFIG.maxBestSelling); }

            displayProducts = displayProducts.filter(product => {
                const matchesSearch = product.name.toLowerCase().includes(this.searchQuery);
                let matchesPrice = true;
                if (this.isPriceFilterActive) {
                    const itemPrice = Number(product.price);
                    matchesPrice = (itemPrice >= this.minPrice) && (itemPrice <= this.maxPrice);
                }
                return matchesSearch && matchesPrice;
            });

            if (displayProducts.length === 0) {
                grid.innerHTML = `
                    <div class="col-span-2 flex flex-col items-center justify-center py-12 text-center">
                        <span class="text-4xl mb-4 opacity-50 grayscale filter">🔍</span>
                        <p class="text-premiumGray text-sm mb-5 px-4 leading-relaxed">No items matched your search or price filter.</p>
                        <a href="#" onclick="app.resetFilters(); return false;" class="text-premiumWhite font-bold uppercase tracking-widest text-xs underline underline-offset-4 active:scale-95 transition-transform hover:text-gray-300">Go back to homepage</a>
                    </div>`;
                return;
            }

            grid.innerHTML = displayProducts.map(product => `
                <div onclick="app.viewProduct(${product.id})" class="bg-premiumCard border border-premiumBorder rounded-xl overflow-hidden active:scale-95 transition-transform cursor-pointer flex flex-col shadow-sm hover:shadow-lg">
                    <div class="w-full aspect-square bg-[#0a0a0a] flex items-center justify-center relative p-2">
                        <img src="${product.image}" class="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
                    </div>
                    <div class="p-3 flex-1 flex flex-col justify-between border-t border-premiumBorder bg-premiumCard">
                        <div><h4 class="font-bold text-xs uppercase tracking-wider mb-1 leading-tight text-premiumWhite">${this.highlightText(product.name)}</h4></div>
                        <div class="mt-3 flex justify-between items-center">
                            <div class="flex items-baseline gap-2">
                                <span class="text-premiumWhite font-black text-sm tracking-widest">$${Number(product.price).toFixed(2)}</span>
                            </div>
                            <button onclick="app.animateAddToCart(${product.id}, event)" class="w-7 h-7 rounded-full border border-premiumBorder flex items-center justify-center text-premiumWhite bg-premiumBlack hover:bg-premiumWhite hover:text-premiumBlack transition-colors">
                                <svg class="w-3 h-3 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }, 500); // 500ms delay ends here
    },

    viewProduct(id) {
        const product = products.find(p => p.id === id);
        if (!product) return;

        // [MOCK-UP FEATURE]: IMAGE CAROUSEL
        let galleryHTML = `<img src="${product.image}" class="w-full h-full object-contain p-4 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">`;
        if (product.gallery && product.gallery.length > 1) {
            galleryHTML = `<div class="flex overflow-x-auto snap-x snap-mandatory hide-scroll h-full w-full">` + 
                product.gallery.map(img => `<img src="${img}" class="w-full h-full object-contain p-4 snap-center shrink-0 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">`).join('') +
            `</div>`;
        }

        const content = document.getElementById('product-detail-content');
        content.innerHTML = `
            <div class="bg-premiumCard p-5 rounded-xl border border-premiumBorder mb-6 shadow-sm">
                <div class="relative w-full aspect-square bg-[#0a0a0a] rounded-xl overflow-hidden mb-6 flex items-center justify-center border border-premiumBorder shadow-inner relative">
                    ${galleryHTML}
                    ${product.gallery && product.gallery.length > 1 ? `<div class="absolute bottom-2 w-full text-center text-[8px] text-premiumGray font-bold uppercase tracking-widest animate-pulse">Swipe image →</div>` : ''}
                </div>
                <div class="text-center">
                    <h2 class="text-2xl font-black uppercase tracking-widest leading-tight mb-2 text-premiumWhite">${product.name}</h2>
                    <div class="flex justify-center items-baseline gap-3 mb-2">
                        <span class="text-2xl font-black text-premiumWhite tracking-widest block">$${Number(product.price).toFixed(2)}</span>
                        <span class="text-lg font-light text-premiumGray line-through decoration-red-500/70 block">$${Number(product.oldPrice).toFixed(2)}</span>
                    </div>
                </div>
            </div>
            <p class="text-sm text-premiumGray leading-relaxed mb-8 px-2 text-justify">${product.desc}</p>
            <div class="space-y-3">
                <button onclick="app.addToCart(${product.id})" class="w-full bg-premiumCard border border-premiumBorder text-premiumWhite font-bold uppercase tracking-widest text-xs py-4 rounded-xl flex justify-center items-center gap-2 active:scale-95 transition-transform shadow-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    Add to Cart
                </button>
                <button onclick="app.openOrderSummary(${product.id})" class="w-full bg-premiumWhite text-premiumBlack font-black uppercase tracking-widest text-xs py-4 rounded-xl flex justify-center items-center gap-2 active:scale-95 transition-transform shadow-sm">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.26-3.95 2.58-.29.19-.55.29-.78.28-.26-.01-.76-.15-1.13-.27-.45-.15-.81-.23-.79-.49.01-.13.2-.27.56-.41 2.21-.96 3.68-1.59 4.41-1.89 2.09-.87 2.53-1.02 2.82-1.02.06 0 .2 0 .28.06.07.05.1.12.11.19-.01.07-.01.12-.02.16z"/></svg>
                    Order via Summary Form
                </button>
            </div>
        `;
        this.navigate('product');
    },

    // [MOCK-UP FEATURE]: ORDER SUMMARY MODAL FUNCTIONS
    openOrderSummary(productId = null) {
        this.haptic('medium');
        this.pendingOrderProductId = productId; // If null, means it's a Cart checkout
        
        const modal = document.getElementById('order-modal');
        const content = document.getElementById('order-modal-content');
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.classList.add('opacity-100');
            content.classList.remove('scale-95');
            content.classList.add('scale-100');
        }, 10);
    },

    closeOrderSummary() {
        this.haptic('light');
        const modal = document.getElementById('order-modal');
        const content = document.getElementById('order-modal-content');
        
        modal.classList.remove('opacity-100');
        modal.classList.add('opacity-0');
        content.classList.remove('scale-100');
        content.classList.add('scale-95');
        
        setTimeout(() => {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
        }, 300);
    },

    confirmOrder() {
        this.haptic('medium');
        const delivery = document.getElementById('modal-delivery').value;
        const note = document.getElementById('modal-note').value;
        let message = `🛒 NEW ORDER REQUEST\nDelivery: ${delivery}\nNote: ${note || 'None'}\n\n`;
        
        if (this.pendingOrderProductId) {
            const p = products.find(i => i.id === this.pendingOrderProductId);
            message += `Item: ${p.name}\nPrice: $${Number(p.price).toFixed(2)}`;
        } else {
            let total = 0;
            this.cart.forEach((p, i) => {
                message += `${i + 1}. ${p.name} - $${Number(p.price).toFixed(2)}\n`;
                total += Number(p.price);
            });
            message += `\nTotal Price: $${total.toFixed(2)}`;
        }

        const url = `https://t.me/${this.supportUsername}?text=${encodeURIComponent(message)}`;
        try { if(this.tg?.openTelegramLink) { this.tg.openTelegramLink(url); } else { window.open(url, '_blank'); } } 
        catch(e) { window.open(url, '_blank'); }
        
        this.closeOrderSummary();
    },

    // --- STANDARD MASTER CODE FUNCTIONS ---
    togglePanel() { 
        this.haptic('light');
        if(this.isLeftPanelOpen) this.toggleLeftPanel(); 
        this.isPanelOpen = !this.isPanelOpen;
        const panel = document.getElementById('side-panel');
        const overlay = document.getElementById('panel-overlay');
        
        if (this.isPanelOpen) {
            panel.classList.remove('translate-x-full'); panel.classList.add('translate-x-0');
            overlay.classList.remove('hidden'); setTimeout(() => overlay.classList.add('opacity-100'), 10);
        } else {
            panel.classList.remove('translate-x-0'); panel.classList.add('translate-x-full');
            overlay.classList.remove('opacity-100'); setTimeout(() => overlay.classList.add('hidden'), 300);
        }
    },

    toggleLeftPanel() { 
        this.haptic('light');
        if(this.isPanelOpen) this.togglePanel(); 
        this.isLeftPanelOpen = !this.isLeftPanelOpen;
        const panel = document.getElementById('left-panel');
        const overlay = document.getElementById('left-panel-overlay');
        
        if (this.isLeftPanelOpen) {
            panel.classList.remove('-translate-x-full'); panel.classList.add('translate-x-0');
            overlay.classList.remove('hidden'); setTimeout(() => overlay.classList.add('opacity-100'), 10);
        } else {
            panel.classList.remove('translate-x-0'); panel.classList.add('-translate-x-full');
            overlay.classList.remove('opacity-100'); setTimeout(() => overlay.classList.add('hidden'), 300);
        }
    },

    navigate(viewId) {
        this.haptic('light');
        if(this.isPanelOpen) this.togglePanel();
        if(this.isLeftPanelOpen) this.toggleLeftPanel();
        
        document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
        setTimeout(() => { const target = document.getElementById(`view-${viewId}`); if(target) target.classList.add('active'); }, 50);

        if (viewId === 'home' || viewId === 'cart') {
            document.getElementById('nav-home').className = `flex flex-col items-center transition-colors ${viewId === 'home' ? 'text-premiumWhite' : 'text-premiumGray hover:text-premiumWhite'}`;
            document.getElementById('nav-cart').className = `flex flex-col items-center transition-colors relative ${viewId === 'cart' ? 'text-premiumWhite' : 'text-premiumGray hover:text-premiumWhite'}`;
            try { this.tg?.BackButton?.hide?.(); } catch(e){}
        } else { try { this.tg?.BackButton?.show?.(); } catch(e){} }

        if (viewId === 'cart') { this.renderCart(); }
        window.scrollTo(0, 0);
    },

    handlePriceFilter(type) {
        this.isPriceFilterActive = true;
        const minInput = document.getElementById('minPriceRange'); const maxInput = document.getElementById('maxPriceRange');
        let minVal = Number(minInput.value); let maxVal = Number(maxInput.value);
        const gap = 1; 
        if (type === 'min') {
            if (minVal > maxVal - gap) { minVal = maxVal - gap; minInput.value = minVal; }
            minInput.style.zIndex = "4"; maxInput.style.zIndex = "3";
        }
        if (type === 'max') {
            if (maxVal < minVal + gap) { maxVal = minVal + gap; maxInput.value = maxVal; }
            maxInput.style.zIndex = "4"; minInput.style.zIndex = "3";
        }
        this.minPrice = minVal; this.maxPrice = maxVal;
        this.updateSliderUI(); this.renderCatalog();
    },

    updateSliderUI() {
        const label = document.getElementById('priceValue');
        if(label) label.innerText = `$${this.minPrice.toFixed(2)} — $${this.maxPrice.toFixed(2)}`;
        const track = document.getElementById('slider-track');
        const rangeTotal = STORE_CONFIG.maxPriceLimit - STORE_CONFIG.minPriceLimit;
        if(track) {
            track.style.left = (((this.minPrice - STORE_CONFIG.minPriceLimit) / rangeTotal) * 100) + '%';
            track.style.right = (100 - (((this.maxPrice - STORE_CONFIG.minPriceLimit) / rangeTotal) * 100)) + '%';
        }
    },

    renderCart() {
        const content = document.getElementById('cart-content');
        if (this.cart.length === 0) {
            content.innerHTML = `
                <div class="text-center py-20">
                    <span class="text-6xl mb-6 block opacity-30 grayscale filter">🛒</span>
                    <h3 class="text-premiumWhite font-bold uppercase tracking-widest mb-2">Your cart is empty</h3>
                    <p class="text-xs text-premiumGray mb-8">Looks like you haven't added any knives yet.</p>
                    <button onclick="app.navigate('home'); app.setCategory('home');" class="bg-premiumWhite text-premiumBlack font-black uppercase tracking-widest py-3 px-8 rounded-xl active:scale-95 transition-transform shadow-sm">Go to Shopping</button>
                </div>`;
            return;
        }

        let total = 0;
        let cartItemsHTML = this.cart.map((item, index) => {
            total += Number(item.price);
            return `
                <div class="bg-premiumCard border border-premiumBorder p-3 rounded-xl flex items-center gap-4 mb-3 shadow-sm">
                    <div class="w-16 h-16 bg-[#0a0a0a] rounded-lg flex items-center justify-center p-2 border border-premiumBorder shadow-inner">
                        <img src="${item.image}" class="w-full h-full object-contain filter drop-shadow-[0_0_5px_rgba(255,255,255,0.1)]">
                    </div>
                    <div class="flex-1">
                        <h4 class="font-bold text-xs uppercase tracking-wider text-premiumWhite leading-tight">${item.name}</h4>
                        <span class="text-premiumGray text-sm font-light tracking-widest block mt-1">$${Number(item.price).toFixed(2)}</span>
                    </div>
                    <button onclick="app.removeFromCart(${index})" class="w-10 h-10 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center active:scale-90 transition-transform">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>`;
        }).join('');

        content.innerHTML = `
            <div>${cartItemsHTML}</div>
            <div class="mt-8 border-t border-premiumBorder pt-6">
                <div class="flex justify-between items-center mb-6">
                    <span class="text-premiumGray uppercase tracking-widest font-bold text-xs">Total Price</span>
                    <span class="text-2xl font-black text-premiumWhite tracking-widest">$${total.toFixed(2)}</span>
                </div>
                <button onclick="app.openOrderSummary()" class="w-full bg-premiumWhite text-premiumBlack font-black uppercase tracking-widest py-4 rounded-xl flex justify-center items-center gap-2 active:scale-95 transition-transform shadow-sm">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.26-3.95 2.58-.29.19-.55.29-.78.28-.26-.01-.76-.15-1.13-.27-.45-.15-.81-.23-.79-.49.01-.13.2-.27.56-.41 2.21-.96 3.68-1.59 4.41-1.89 2.09-.87 2.53-1.02 2.82-1.02.06 0 .2 0 .28.06.07.05.1.12.11.19-.01.07-.01.12-.02.16z"/></svg>
                    Order via Summary Form
                </button>
            </div>`;
    },

    addToCart(id) {
        this.haptic('medium');
        const product = products.find(p => p.id === id);
        if (product) { this.cart.push(product); this.updateCartBadge(); }
    },
    removeFromCart(index) { this.haptic('light'); this.cart.splice(index, 1); this.updateCartBadge(); this.renderCart(); },
    updateCartBadge() { const b = document.getElementById('cart-badge'); b.innerText = this.cart.length; b.classList.toggle('hidden', this.cart.length === 0); },
    setCategory(cat) { this.haptic('medium'); this.currentCategory = cat; this.searchQuery = ""; document.getElementById('searchInput').value = ""; if(this.isLeftPanelOpen) this.toggleLeftPanel(); this.navigate('home'); this.renderCatalog(); },
    resetFilters() { this.haptic('medium'); this.searchQuery = ""; const s = document.getElementById('searchInput'); if (s) s.value = ""; this.minPrice = Number(STORE_CONFIG.minPriceLimit); this.maxPrice = Number(STORE_CONFIG.maxPriceLimit); this.isPriceFilterActive = false; const mi = document.getElementById('minPriceRange'); const ma = document.getElementById('maxPriceRange'); if (mi) mi.value = this.minPrice; if (ma) ma.value = this.maxPrice; this.updateSliderUI(); this.setCategory('home'); },
    applyTheme() { const k = document.getElementById('theme-toggle-knob'); if (this.isDarkMode) { document.body.classList.add('dark'); if(k) { k.classList.add('translate-x-6'); k.classList.remove('translate-x-0'); } try { this.tg?.setHeaderColor?.('#000000'); this.tg?.setBackgroundColor?.('#000000'); } catch(e){} } else { document.body.classList.remove('dark'); if(k) { k.classList.remove('translate-x-6'); k.classList.add('translate-x-0'); } try { this.tg?.setHeaderColor?.('#f4f4f5'); this.tg?.setBackgroundColor?.('#f4f4f5'); } catch(e){} } },
    toggleTheme() { this.haptic('medium'); this.isDarkMode = !this.isDarkMode; try { localStorage.setItem('brickTheme', this.isDarkMode ? 'dark' : 'light'); } catch(e) {} this.applyTheme(); },
    shareApp() { this.haptic('medium'); const l = "https://t.me/BrickStoreApp_bot/Homepage"; const t = "Check out BRICK STORE for premium CS2 desk toys!"; try { if (this.tg?.openTelegramLink) this.tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(l)}&text=${encodeURIComponent(t)}`); else alert(`Share this link: ${l}`); } catch(e) { window.open(`https://t.me/share/url?url=${encodeURIComponent(l)}&text=${encodeURIComponent(t)}`, '_blank'); } }
};

document.addEventListener('DOMContentLoaded', () => { app.init(); });
