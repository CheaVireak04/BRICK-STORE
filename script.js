// =========================================================================
// ⚙️ APP SETTINGS (PREVIEW V5)
// =========================================================================
const STORE_CONFIG = {
    maxNewArrivals: 4,    
    maxTrending: 4,       
    maxBestDeals: 4,      
    maxBestSelling: 4,    
    minPrice: 0,
    maxPrice: 1000
};

const products = [
    { id: 1, name: "Karambit Doppler", price: 12, oldPrice: 15, image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/631286982/playside.png", gallery: ["https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/631286982/playside.png"], desc: "Premium replica desk toy. Deep sapphire phases.", dateAdded: "2026-03-01", clicks: 450, sales: 85 },
    { id: 2, name: "Karambit Fade", price: 12, oldPrice: 15, image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/609453843/playside.png", gallery: ["https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/609453843/playside.png"], desc: "Premium replica desk toy. 100% fade pattern.", dateAdded: "2026-03-02", clicks: 600, sales: 120 },
    { id: 3, name: "M9 Bayonet Crimson Web", price: 12, oldPrice: 15, image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/632372451/playside.png", gallery: ["https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/632372451/playside.png"], desc: "Premium replica desk toy. Factory new look with webbing patterns.", dateAdded: "2026-03-03", clicks: 300, sales: 50 },
    { id: 4, name: "Butterfly Knife Marble Fade", price: 12, oldPrice: 18, image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/632758204/playside.png", gallery: ["https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/632758204/playside.png"], desc: "Premium replica desk toy. Smooth flipping action mechanism.", dateAdded: "2026-03-04", clicks: 800, sales: 200 },
    { id: 5, name: "Butterfly Knife Tiger Tooth", price: 12, oldPrice: 18, image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/616083695/playside.png", gallery: ["https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/616083695/playside.png"], desc: "Premium replica desk toy. Golden anodized finish.", dateAdded: "2026-03-05", clicks: 500, sales: 95 },
    { id: 6, name: "Talon Knife Slaughter", price: 12, oldPrice: 15, image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/631798830/playside.png", gallery: ["https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/631798830/playside.png"], desc: "Premium replica desk toy. Ivory-style handle.", dateAdded: "2026-03-06", clicks: 200, sales: 30 },
    { id: 7, name: "Huntsman Knife Doppler", price: 12, oldPrice: 15, image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/602129942/playside.png", gallery: ["https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/602129942/playside.png"], desc: "Premium replica desk toy. Aggressive serrated spine.", dateAdded: "2026-03-07", clicks: 350, sales: 60 },
    { id: 8, name: "Flip Knife Fade", price: 12, oldPrice: 15, image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/625454898/playside.png", gallery: ["https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/625454898/playside.png"], desc: "Premium replica desk toy. Sleek, foldable design.", dateAdded: "2026-03-08", clicks: 400, sales: 75 },
    { id: 9, name: "Shadow Daggers Marble Fade", price: 12, oldPrice: 15, image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/632307382/playside.png", gallery: ["https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/632307382/playside.png"], desc: "Premium replica desk toy. Dual-push daggers.", dateAdded: "2026-03-09", clicks: 150, sales: 20 },
    { id: 10, name: "Bowie Knife Tiger Tooth", price: 12, oldPrice: 15, image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/632900583/playside.png", gallery: ["https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/632900583/playside.png"], desc: "Premium replica desk toy. Massive display piece.", dateAdded: "2026-03-10", clicks: 250, sales: 40 }
];

const app = {
    tg: null, supportUsername: "@Chea_Vireak",
    searchQuery: "", minPrice: 0, maxPrice: 1000, isPriceFilterActive: false,
    cart: [], isPanelOpen: false, isLeftPanelOpen: false, isDarkMode: true, currentCategory: 'home',
    pendingOrderProductId: null,

    // MAP STATE
    mapLat: null, mapLng: null, isLocationConfirmed: false, googleMap: null, mapMarker: null,

    init() {
        try { this.tg = window.Telegram?.WebApp; this.tg?.expand?.(); this.tg?.ready?.(); } catch(e) {}
        this.minPrice = Number(STORE_CONFIG.minPrice);
        this.maxPrice = Number(STORE_CONFIG.maxPrice);
        try { this.isDarkMode = (localStorage.getItem('brickTheme') !== 'light'); } catch(e) { this.isDarkMode = true; }
        const mi = document.getElementById('minPriceRange'); const ma = document.getElementById('maxPriceRange');
        if(mi && ma) { mi.min = this.minPrice; mi.max = this.maxPrice; mi.value = this.minPrice; ma.min = this.minPrice; ma.max = this.maxPrice; ma.value = this.maxPrice; }
        this.applyTheme(); this.updateSliderUI(); this.renderCatalog(); 
    },

    haptic(style = 'light') { try { this.tg?.HapticFeedback?.impactOccurred?.(style); } catch (e) {} },
    highlightText(text) { if (!this.searchQuery) return text; const regex = new RegExp(`(${this.searchQuery})`, 'gi'); return text.replace(regex, '<span class="search-highlight">$1</span>'); },

    handleSearch(event) {
        this.searchQuery = event.target.value.toLowerCase().trim();
        const suggestionsBox = document.getElementById('search-suggestions');
        if (this.searchQuery.length > 0) {
            const matches = products.filter(p => p.name.toLowerCase().includes(this.searchQuery)).slice(0, 5);
            if (matches.length > 0) {
                suggestionsBox.innerHTML = matches.map(p => `<div onclick="app.selectSuggestion(${p.id})" class="p-3 hover:bg-premiumBlack cursor-pointer border-b border-premiumBorder last:border-0 flex items-center gap-3 transition-colors"><img src="${p.image}" class="w-8 h-8 object-contain rounded bg-[#0a0a0a] p-1"><span class="text-xs font-bold text-premiumWhite tracking-wide">${this.highlightText(p.name)}</span></div>`).join('');
                suggestionsBox.classList.remove('hidden'); suggestionsBox.classList.add('flex');
            } else { suggestionsBox.classList.add('hidden'); }
        } else { suggestionsBox.classList.add('hidden'); }
        this.renderCatalog(); 
    },

    selectSuggestion(id) { this.haptic('light'); document.getElementById('search-suggestions').classList.add('hidden'); document.getElementById('searchInput').value = ""; this.searchQuery = ""; this.viewProduct(id); },

    animateAddToCart(productId, event) {
        event.stopPropagation(); this.haptic('medium'); const p = products.find(i => i.id === productId); if (!p) return;
        const fly = document.createElement('img'); fly.src = p.image; fly.className = 'flying-item';
        const start = event.target.getBoundingClientRect(); const end = document.getElementById('nav-cart').getBoundingClientRect();
        fly.style.top = `${start.top}px`; fly.style.left = `${start.left}px`; document.body.appendChild(fly);
        setTimeout(() => { fly.style.top = `${end.top + 10}px`; fly.style.left = `${end.left + 10}px`; fly.style.transform = 'scale(0.2) rotate(360deg)'; fly.style.opacity = '0'; }, 20);
        setTimeout(() => { fly.remove(); this.cart.push(p); this.updateCartBadge(); const c = document.getElementById('nav-cart'); c.style.transform = 'scale(1.2)'; setTimeout(() => c.style.transform = 'scale(1)', 150); }, 700);
    },

    renderCatalog() {
        const grid = document.getElementById('product-grid'); if(!grid) return;
        grid.innerHTML = Array(4).fill(`<div class="bg-premiumCard border border-premiumBorder rounded-xl overflow-hidden shadow-sm p-3"><div class="w-full aspect-square skeleton rounded-lg mb-3"></div><div class="h-3 skeleton rounded w-3/4 mb-4"></div><div class="flex justify-between items-center"><div class="h-4 skeleton rounded w-1/3"></div><div class="h-6 w-6 skeleton rounded-full"></div></div></div>`).join('');
        setTimeout(() => {
            let list = [...products].filter(p => {
                const s = p.name.toLowerCase().includes(this.searchQuery);
                let pr = true; if (this.isPriceFilterActive) pr = (Number(p.price) >= this.minPrice) && (Number(p.price) <= this.maxPrice);
                return s && pr;
            });
            if (list.length === 0) { grid.innerHTML = `<div class="col-span-2 text-center py-12 px-4"><span class="text-4xl mb-4 grayscale filter">🔍</span><p class="text-premiumGray text-sm mb-5">No items matched your search.</p><a href="#" onclick="app.resetFilters(); return false;" class="text-premiumWhite font-bold uppercase text-xs underline">Go back home</a></div>`; return; }
            grid.innerHTML = list.map(p => `<div onclick="app.viewProduct(${p.id})" class="bg-premiumCard border border-premiumBorder rounded-xl overflow-hidden active:scale-95 transition-transform cursor-pointer shadow-sm hover:shadow-lg"><div class="w-full aspect-square bg-[#0a0a0a] flex items-center justify-center p-2"><img src="${p.image}" class="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]"></div><div class="p-3 flex-1 border-t border-premiumBorder bg-premiumCard"><div><h4 class="font-bold text-xs uppercase tracking-wider mb-1 leading-tight text-premiumWhite">${this.highlightText(p.name)}</h4></div><div class="mt-3 flex justify-between items-center"><span class="text-premiumWhite font-black text-sm">$${Number(p.price).toFixed(2)}</span><button onclick="app.animateAddToCart(${p.id}, event)" class="w-7 h-7 rounded-full border border-premiumBorder flex items-center justify-center text-premiumWhite bg-premiumBlack hover:bg-premiumWhite hover:text-premiumBlack transition-colors shadow-md"><svg class="w-3 h-3 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg></button></div></div></div>`).join('');
        }, 500); 
    },

    viewProduct(id) {
        const p = products.find(i => i.id === id); if (!p) return;
        let gHTML = `<img src="${p.image}" class="w-full h-full object-contain p-4 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">`;
        if (p.gallery && p.gallery.length > 1) gHTML = `<div class="flex overflow-x-auto snap-x snap-mandatory hide-scroll h-full w-full">` + p.gallery.map(img => `<img src="${img}" class="w-full h-full object-contain p-4 snap-center shrink-0 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">`).join('') + `</div>`;
        const c = document.getElementById('product-detail-content');
        if(c) c.innerHTML = `<div class="bg-premiumCard p-5 rounded-xl border border-premiumBorder mb-6 shadow-sm"><div class="relative w-full aspect-square bg-[#0a0a0a] rounded-xl overflow-hidden mb-6 flex items-center justify-center border border-premiumBorder relative">${gHTML}${p.gallery.length > 1 ? `<div class="absolute bottom-2 w-full text-center text-[8px] text-premiumGray font-bold uppercase tracking-widest">Swipe image →</div>` : ''}</div><div class="text-center"><h2 class="text-2xl font-black uppercase tracking-widest mb-2 text-premiumWhite">${p.name}</h2><div class="flex justify-center items-baseline gap-3 mb-2"><span class="text-2xl font-black text-premiumWhite tracking-widest">$${Number(p.price).toFixed(2)}</span><span class="text-lg font-light text-premiumGray line-through decoration-red-500/70 block">$${Number(p.oldPrice).toFixed(2)}</span></div></div></div><p class="text-sm text-premiumGray leading-relaxed mb-8 px-2 text-justify">${p.desc}</p><div class="space-y-3"><button onclick="app.addToCart(${p.id})" class="w-full bg-premiumCard border border-premiumBorder text-premiumWhite font-bold uppercase tracking-widest text-xs py-4 rounded-xl flex justify-center items-center gap-2 active:scale-95 transition-transform shadow-sm"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Add to Cart</button><button onclick="app.openOrderSummary(${p.id})" class="w-full bg-premiumWhite text-premiumBlack font-black uppercase tracking-widest text-xs py-4 rounded-xl flex justify-center items-center gap-2 active:scale-95 transition-transform shadow-sm"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.26-3.95 2.58-.29.19-.55.29-.78.28-.26-.01-.76-.15-1.13-.27-.45-.15-.81-.23-.79-.49.01-.13.2-.27.56-.41 2.21-.96 3.68-1.59 4.41-1.89 2.09-.87 2.53-1.02 2.82-1.02.06 0 .2 0 .28.06.07.05.1.12.11.19-.01.07-.01.12-.02.16z"/></svg>BUY NOW</button></div>`;
        this.navigate('product');
    },

    openOrderSummary(productId = null) {
        this.haptic('medium'); this.pendingOrderProductId = productId; this.isLocationConfirmed = false;
        document.getElementById('delivery-error')?.classList.add('hidden'); document.getElementById('phone-error')?.classList.add('hidden'); document.getElementById('map-error')?.classList.add('hidden'); document.getElementById('grab-phone-error')?.classList.add('hidden');
        document.getElementById('modal-delivery').value = ""; document.getElementById('conditional-fields')?.classList.add('hidden'); document.getElementById('grab-fields')?.classList.add('hidden'); document.getElementById('map-container')?.classList.add('hidden'); document.getElementById('btn-get-location')?.style.setProperty('display', 'flex');
        const modal = document.getElementById('order-modal'); modal.classList.remove('hidden'); modal.classList.add('flex');
        setTimeout(() => { modal.classList.remove('opacity-0'); modal.classList.add('opacity-100'); document.getElementById('order-modal-content').classList.replace('scale-95', 'scale-100'); }, 10);
    },

    closeOrderSummary() { this.haptic('light'); const modal = document.getElementById('order-modal'); modal.classList.remove('opacity-100'); modal.classList.add('opacity-0'); document.getElementById('order-modal-content').classList.replace('scale-100', 'scale-95'); setTimeout(() => { modal.classList.remove('flex'); modal.classList.add('hidden'); }, 300); },

    handleDeliveryChange() {
        const d = document.getElementById('modal-delivery').value; document.getElementById('delivery-error').classList.add('hidden');
        document.getElementById('conditional-fields').classList.toggle('hidden', !d.includes('Standard'));
        document.getElementById('grab-fields').classList.toggle('hidden', !d.includes('Grab'));
    },

    getGrabLocation() {
        this.haptic('medium'); const b = document.getElementById('btn-get-location'); b.innerText = "📍 Locating...";
        if (!navigator.geolocation) { alert("Geolocation not supported."); b.innerText = "📍 Get Current Location"; return; }
        navigator.geolocation.getCurrentPosition((pos) => { this.mapLat = pos.coords.latitude; this.mapLng = pos.coords.longitude; b.style.display = "none"; this.initGoogleMap(this.mapLat, this.mapLng); }, () => { alert("Failed to get location."); b.innerText = "📍 Try Again"; });
    },

    initGoogleMap(lat, lng) {
        const container = document.getElementById('map-container'); const div = document.getElementById('google-map'); const confirm = document.getElementById('btn-confirm-location');
        container.classList.remove('hidden');
        if (typeof google === 'undefined' || typeof google.maps === 'undefined') { div.innerHTML = `<span class='text-red-500 font-bold'>Maps API Key Missing.</span><br>Saved: ${lat.toFixed(4)}, ${lng.toFixed(4)}`; this.mapLat = lat; this.mapLng = lng; confirm.classList.remove('hidden'); return; }
        const center = { lat, lng }; this.googleMap = new google.maps.Map(div, { center, zoom: 16, disableDefaultUI: true, zoomControl: true });
        this.mapMarker = new google.maps.Marker({ position: center, map: this.googleMap, draggable: true });
        this.mapMarker.addListener('dragend', (e) => { this.mapLat = e.latLng.lat(); this.mapLng = e.latLng.lng(); this.isLocationConfirmed = false; confirm.innerText = "Confirm Marker Location"; confirm.classList.replace('bg-green-500', 'bg-blue-600'); });
        confirm.classList.remove('hidden');
    },

    confirmGrabLocation() { this.haptic('medium'); this.isLocationConfirmed = true; document.getElementById('map-error').classList.add('hidden'); const c = document.getElementById('btn-confirm-location'); c.innerText = "✅ Location Confirmed"; c.classList.replace('bg-blue-600', 'bg-green-500'); document.getElementById('map-coords').innerText = `${this.mapLat.toFixed(5)}, ${this.mapLng.toFixed(5)}`; document.getElementById('map-coords').classList.remove('hidden'); },
    clearPhoneError() { document.getElementById('phone-error').classList.add('hidden'); },
    clearGrabPhoneError() { document.getElementById('grab-phone-error').classList.add('hidden'); },

    confirmOrder() {
        this.haptic('medium'); let valid = true; const d = document.getElementById('modal-delivery').value;
        if (!d) { document.getElementById('delivery-error').classList.remove('hidden'); valid = false; }
        if (d.includes('Standard')) { if (!document.getElementById('modal-phone').value.trim()) { document.getElementById('phone-error').classList.remove('hidden'); valid = false; } }
        if (d.includes('Grab')) { if (!this.isLocationConfirmed) { document.getElementById('map-error').classList.remove('hidden'); valid = false; } if (!document.getElementById('grab-phone').value.trim()) { document.getElementById('grab-phone-error').classList.remove('hidden'); valid = false; } }
        if (!valid) return;
        let items = []; let total = 0; if (this.pendingOrderProductId) { const p = products.find(i => i.id === this.pendingOrderProductId); items.push(p); total = p.price; } else { items = [...this.cart]; items.forEach(i => total += i.price); }
        let msg = `🛒 NEW ORDER\nMethod: ${d}\n`;
        if (d.includes('Standard')) msg += `Province: ${document.getElementById('modal-province').value}\nAddress: ${document.getElementById('modal-address').value || 'N/A'}\nPhone: ${document.getElementById('modal-phone').value}\n`;
        if (d.includes('Grab')) msg += `Phone: ${document.getElementById('grab-phone').value}\nMap: http://google.com/maps?q=${this.mapLat},${this.mapLng}\n`;
        msg += `Note: ${document.getElementById('modal-note').value || 'None'}\n\nItems:\n` + items.map((i, idx) => `${idx+1}. ${i.name} ($${i.price})`).join('\n') + `\nTotal: $${total.toFixed(2)}`;
        const url = `https://t.me/${this.supportUsername}?text=${encodeURIComponent(msg)}`;
        try { if(this.tg && this.tg.openTelegramLink) { this.tg.openTelegramLink(url); } else { window.open(url, '_blank'); } } catch(e) { window.open(url, '_blank'); }
        this.closeOrderSummary();
    },

    togglePanel() { this.haptic('light'); if(this.isLeftPanelOpen) this.toggleLeftPanel(); this.isPanelOpen = !this.isPanelOpen; const p = document.getElementById('side-panel'); const o = document.getElementById('panel-overlay'); if (this.isPanelOpen) { p.classList.replace('translate-x-full', 'translate-x-0'); o.classList.remove('hidden'); setTimeout(() => o.classList.add('opacity-100'), 10); } else { p.classList.replace('translate-x-0', 'translate-x-full'); o.classList.replace('opacity-100', 'opacity-0'); setTimeout(() => o.classList.add('hidden'), 300); } },
    toggleLeftPanel() { this.haptic('light'); if(this.isPanelOpen) this.togglePanel(); this.isLeftPanelOpen = !this.isLeftPanelOpen; const p = document.getElementById('left-panel'); const o = document.getElementById('left-panel-overlay'); if (this.isLeftPanelOpen) { p.classList.replace('-translate-x-full', 'translate-x-0'); o.classList.remove('hidden'); setTimeout(() => o.classList.add('opacity-100'), 10); } else { p.classList.replace('translate-x-0', '-translate-x-full'); o.classList.replace('opacity-100', 'opacity-0'); setTimeout(() => o.classList.add('hidden'), 300); } },
    navigate(viewId) { this.haptic('light'); if(this.isPanelOpen) this.togglePanel(); if(this.isLeftPanelOpen) this.toggleLeftPanel(); document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active')); setTimeout(() => { document.getElementById(`view-${viewId}`).classList.add('active'); }, 50); const h = document.getElementById('nav-home'); const c = document.getElementById('nav-cart'); if (viewId === 'home' || viewId === 'cart') { h.className = `flex flex-col items-center transition-colors ${viewId==='home'?'text-premiumWhite':'text-premiumGray hover:text-premiumWhite'}`; c.className = `flex flex-col items-center transition-colors relative ${viewId==='cart'?'text-premiumWhite':'text-premiumGray hover:text-premiumWhite'}`; } if (viewId === 'cart') this.renderCart(); window.scrollTo(0, 0); },
    handlePriceFilter(type) { this.isPriceFilterActive = true; const mi = document.getElementById('minPriceRange'); const ma = document.getElementById('maxPriceRange'); let min = Number(mi.value); let max = Number(ma.value); if (type === 'min' && min > max - 1) { min = max - 1; mi.value = min; } if (type === 'max' && max < min + 1) { max = min + 1; ma.value = max; } this.minPrice = min; this.maxPrice = max; this.updateSliderUI(); this.renderCatalog(); },
    updateSliderUI() { const l = document.getElementById('priceValue'); if(l) l.innerText = `$${this.minPrice.toFixed(2)} — $${this.maxPrice.toFixed(2)}`; const t = document.getElementById('slider-track'); if(t) { t.style.left = ((this.minPrice / 1000) * 100) + '%'; t.style.right = (100 - ((this.maxPrice / 1000) * 100)) + '%'; } },
    updateCartBadge() { const b = document.getElementById('cart-badge'); b.innerText = this.cart.length; b.classList.toggle('hidden', this.cart.length === 0); },
    setCategory(cat) { this.haptic('medium'); this.currentCategory = cat; this.searchQuery = ""; document.getElementById('searchInput').value = ""; if(this.isLeftPanelOpen) this.toggleLeftPanel(); this.navigate('home'); this.renderCatalog(); },
    resetFilters() { this.haptic('medium'); this.searchQuery = ""; document.getElementById('searchInput').value = ""; this.minPrice = 0; this.maxPrice = 1000; this.isPriceFilterActive = false; document.getElementById('minPriceRange').value = 0; document.getElementById('maxPriceRange').value = 1000; this.updateSliderUI(); this.setCategory('home'); },
    applyTheme() { const k = document.getElementById('theme-toggle-knob'); document.body.classList.toggle('dark', this.isDarkMode); if(k) k.classList.toggle('translate-x-6', this.isDarkMode); try { this.tg?.setHeaderColor?.(this.isDarkMode?'#000000':'#f4f4f5'); this.tg?.setBackgroundColor?.(this.isDarkMode?'#000000':'#f4f4f5'); } catch(e){} },
    toggleTheme() { this.haptic('medium'); this.isDarkMode = !this.isDarkMode; localStorage.setItem('brickTheme', this.isDarkMode?'dark':'light'); this.applyTheme(); },
    shareApp() { const l = "https://t.me/BrickStoreApp_bot/Homepage"; const t = "Check out BRICK STORE!"; try { if (this.tg?.openTelegramLink) this.tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(l)}&text=${encodeURIComponent(t)}`); else window.open(`https://t.me/share/url?url=${encodeURIComponent(l)}&text=${encodeURIComponent(t)}`, '_blank'); } catch(e){} }
};

document.addEventListener('DOMContentLoaded', () => { app.init(); });
