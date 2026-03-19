// EXPERIMENTAL MOCK-UP VERSION (final_preview_v1)
// ⚠️ THIS DOES NOT REPLACE YOUR MASTER DEFAULT CODE. IT IS A SEPARATE PREVIEW.

const STORE_CONFIG = {
    maxNewArrivals: 4, maxTrending: 4, maxBestDeals: 4, maxBestSelling: 4,
    minPriceRange: 0, maxPriceRange: 1000
};

// [MOCK-UP FEATURE]: Multi-Image 'gallery' array added to items
const products = [
    { 
        id: 1, name: "Karambit Doppler", price: 12, oldPrice: 15, 
        image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/631286982/playside.png", 
        gallery: [
            "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/631286982/playside.png",
            "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/609453843/playside.png" // Placeholder 2nd image
        ],
        desc: "Premium replica desk toy. Deep sapphire phases. [Mock-Up preview showing image carousel].",
        dateAdded: "2026-03-01", clicks: 450, sales: 85
    },
    // ... (Add your other 9 products here normally for the test)
    { 
        id: 2, name: "Karambit Fade", price: 12, oldPrice: 15, 
        image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/609453843/playside.png", 
        gallery: ["https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/609453843/playside.png"],
        desc: "Premium replica desk toy. 100% fade pattern.",
        dateAdded: "2026-03-02", clicks: 600, sales: 120 
    }
];

const app = {
    tg: null,
    supportUsername: "Chea_Vireak",
    searchQuery: "", minPrice: 0, maxPrice: 1000, isPriceFilterActive: false,
    cart: [], isPanelOpen: false, isLeftPanelOpen: false, isDarkMode: true, currentCategory: 'home',
    
    // Track modal orders
    pendingOrderProductId: null,

    init() {
        try { this.tg = window.Telegram?.WebApp; this.tg?.expand?.(); this.tg?.ready?.(); } catch(e) {}
        this.minPrice = Number(STORE_CONFIG.minPriceRange) || 0;
        this.maxPrice = Number(STORE_CONFIG.maxPriceRange) || 1000;
        
        try { this.isDarkMode = (localStorage.getItem('brickTheme') !== 'light'); } catch(e) { this.isDarkMode = true; }
        
        this.applyTheme();
        this.updateSliderUI();
        this.renderCatalog(); // Uses skeleton loading now
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
        event.stopPropagation(); // Prevents opening the product page
        this.haptic('medium');
        
        const product = products.find(p => p.id === productId);
        if (!product) return;

        // Create flying clone
        const flyingImg = document.createElement('img');
        flyingImg.src = product.image;
        flyingImg.className = 'flying-item';
        
        // Get start and end coordinates
        const startRect = event.target.getBoundingClientRect();
        const cartIcon = document.getElementById('nav-cart');
        const endRect = cartIcon.getBoundingClientRect();
        
        flyingImg.style.top = `${startRect.top}px`;
        flyingImg.style.left = `${startRect.left}px`;
        document.body.appendChild(flyingImg);
        
        // Trigger Animation
        setTimeout(() => {
            flyingImg.style.top = `${endRect.top + 10}px`;
            flyingImg.style.left = `${endRect.left + 10}px`;
            flyingImg.style.transform = 'scale(0.2) rotate(360deg)';
            flyingImg.style.opacity = '0';
        }, 20);

        // Remove and add to cart after animation
        setTimeout(() => {
            flyingImg.remove();
            this.cart.push(product);
            this.updateCartBadge();
            
            // Pop the cart icon slightly
            cartIcon.style.transform = 'scale(1.2)';
            setTimeout(() => cartIcon.style.transform = 'scale(1)', 150);
        }, 700);
    },

    renderCatalog() {
        const grid = document.getElementById('product-grid');
        
        // [MOCK-UP FEATURE]: SKELETON LOADING
        // Render skeletons first to simulate data fetching
        const skeletonHTML = Array(4).fill(`
            <div class="bg-premiumCard border border-premiumBorder rounded-xl overflow-hidden shadow-sm p-3">
                <div class="w-full aspect-square skeleton rounded-lg mb-3"></div>
                <div class="h-3 skeleton rounded w-3/4 mb-4"></div>
                <div class="flex justify-between items-center"><div class="h-4 skeleton rounded w-1/3"></div><div class="h-6 w-6 skeleton rounded-full"></div></div>
            </div>
        `).join('');
        grid.innerHTML = skeletonHTML;

        // Process data (simulating a 500ms delay for premium feel)
        setTimeout(() => {
            let displayProducts = [...products];
            // ... (Your standard category sorting logic from master goes here) ...

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
                grid.innerHTML = `<div class="col-span-2 text-center py-10 text-premiumGray">No items matched your search.</div>`;
                return;
            }

            grid.innerHTML = displayProducts.map(product => `
                <div onclick="app.viewProduct(${product.id})" class="bg-premiumCard border border-premiumBorder rounded-xl overflow-hidden active:scale-95 transition-transform cursor-pointer flex flex-col shadow-sm hover:shadow-lg">
                    <div class="w-full aspect-square bg-[#0a0a0a] flex items-center justify-center relative p-2">
                        <img src="${product.image}" class="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
                    </div>
                    <div class="p-3 flex-1 flex flex-col justify-between border-t border-premiumBorder bg-premiumCard">
                        <div>
                            <h4 class="font-bold text-xs uppercase tracking-wider mb-1 leading-tight text-premiumWhite">${this.highlightText(product.name)}</h4>
                        </div>
                        <div class="mt-3 flex justify-between items-center">
                            <div class="flex items-baseline gap-2">
                                <span class="text-premiumWhite font-black text-sm tracking-widest">$${Number(product.price).toFixed(2)}</span>
                            </div>
                            <button onclick="app.animateAddToCart(${product.id}, event)" class="w-6 h-6 rounded-full border border-premiumBorder flex items-center justify-center text-premiumWhite bg-premiumBlack hover:bg-premiumWhite hover:text-premiumBlack transition-colors">
                                <svg class="w-3 h-3 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }, 500); // 500ms Skeleton Delay
    },

    viewProduct(id) {
        const product = products.find(p => p.id === id);
        if (!product) return;

        // [MOCK-UP FEATURE]: IMAGE CAROUSEL
        let galleryHTML = `<img src="${product.image}" class="w-full h-full object-contain p-4">`;
        if (product.gallery && product.gallery.length > 1) {
            galleryHTML = `<div class="flex overflow-x-auto snap-x snap-mandatory hide-scroll h-full w-full">` + 
                product.gallery.map(img => `<img src="${img}" class="w-full h-full object-contain p-4 snap-center shrink-0">`).join('') +
            `</div>`;
        }

        const content = document.getElementById('product-detail-content');
        content.innerHTML = `
            <div class="bg-premiumCard p-5 rounded-xl border border-premiumBorder mb-6 shadow-sm">
                <div class="relative w-full aspect-square bg-[#0a0a0a] rounded-xl overflow-hidden mb-6 flex items-center justify-center border border-premiumBorder shadow-inner">
                    ${galleryHTML}
                    ${product.gallery && product.gallery.length > 1 ? `<div class="absolute bottom-2 text-[8px] text-premiumGray font-bold uppercase tracking-widest">Swipe for more →</div>` : ''}
                </div>
                <div class="text-center">
                    <h2 class="text-2xl font-black uppercase tracking-widest mb-2 text-premiumWhite">${product.name}</h2>
                    <div class="flex justify-center items-baseline gap-3 mb-2">
                        <span class="text-2xl font-black text-premiumWhite tracking-widest">$${Number(product.price).toFixed(2)}</span>
                    </div>
                </div>
            </div>
            <p class="text-sm text-premiumGray leading-relaxed mb-8 px-2 text-justify">${product.desc}</p>
            <div class="space-y-3">
                <button onclick="app.openOrderSummary(${product.id})" class="w-full bg-premiumWhite text-premiumBlack font-black uppercase tracking-widest text-xs py-4 rounded-xl flex justify-center items-center shadow-sm active:scale-95 transition-transform">
                    Checkout Item
                </button>
            </div>
        `;
        this.navigate('product');
    },

    // [MOCK-UP FEATURE]: ORDER SUMMARY MODAL FUNCTIONS
    openOrderSummary(productId = null) {
        this.haptic('medium');
        this.pendingOrderProductId = productId;
        
        const modal = document.getElementById('order-modal');
        const content = document.getElementById('order-modal-content');
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        // Simple fade-in animation
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
        let message = `🛒 ORDER SUMMARY\nDelivery: ${delivery}\nNote: ${note || 'None'}\n\n`;
        
        if (this.pendingOrderProductId) {
            const p = products.find(i => i.id === this.pendingOrderProductId);
            message += `Item: ${p.name}\nPrice: $${Number(p.price).toFixed(2)}`;
        } else {
            let total = 0;
            this.cart.forEach((p, i) => {
                message += `${i + 1}. ${p.name} - $${Number(p.price).toFixed(2)}\n`;
                total += Number(p.price);
            });
            message += `\nTotal: $${total.toFixed(2)}`;
        }

        const url = `https://t.me/${this.supportUsername}?text=${encodeURIComponent(message)}`;
        try {
            if(this.tg?.openTelegramLink) this.tg.openTelegramLink(url);
            else window.open(url, '_blank');
        } catch(e) { window.open(url, '_blank'); }
        
        this.closeOrderSummary();
    },

    // Bridge core functions from master (abbreviated for the preview logic)
    navigate(viewId) { /* Master Navigation Logic */ document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active')); setTimeout(() => document.getElementById(`view-${viewId}`).classList.add('active'), 50); if(viewId==='cart') this.renderCart(); window.scrollTo(0,0); },
    updateCartBadge() { const b = document.getElementById('cart-badge'); b.innerText = this.cart.length; b.classList.toggle('hidden', this.cart.length===0); },
    handleSearch(e) { this.searchQuery = e.target.value.toLowerCase(); this.renderCatalog(); },
    handlePriceFilter(type) { /* Master Dual Slider Logic */ this.isPriceFilterActive = true; /* ... logic bridged from master ... */ },
    applyTheme() { /* Master Theme Logic */ },
    checkout() { this.openOrderSummary(); } // Rerouted from direct telegram link to modal
};

document.addEventListener('DOMContentLoaded', () => { app.init(); });
