// =========================================================================
// ⚙️ APP SETTINGS (PREVIEW V4)
// =========================================================================
const STORE_CONFIG = {
    maxNewArrivals: 4,    
    maxTrending: 4,       
    maxBestDeals: 4,      
    maxBestSelling: 4,    
    minPrice: 0,
    maxPrice: 1000
};

// =========================================================================
// 🛒 PRODUCT DATA (With Gallery feature)
// =========================================================================
const products = [
    { 
        id: 1, name: "Karambit Doppler", price: 12, oldPrice: 15, 
        image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/631286982/playside.png", 
        gallery: ["https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/631286982/playside.png"],
        desc: "Premium replica desk toy. Deep sapphire phases.",
        dateAdded: "2026-03-01", clicks: 450, sales: 85
    },
    // Add other 9 products here as per your Master Code
    { 
        id: 3, name: "M9 Bayonet Crimson Web", price: 12, oldPrice: 15, 
        image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/632372451/playside.png", 
        gallery: ["https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/632372451/playside.png"],
        desc: "Premium replica desk toy. Factory new look with distinct webbing patterns.",
        dateAdded: "2026-03-03", clicks: 300, sales: 50
    }
];

// =========================================================================
// ⚠️ APPLICATION LOGIC
// =========================================================================

const app = {
    tg: null,
    supportUsername: "Chea_Vireak",
    searchQuery: "", 
    minPrice: 0, 
    maxPrice: 1000, 
    isPriceFilterActive: false,
    cart: [], 
    isPanelOpen: false, 
    isLeftPanelOpen: false, 
    isDarkMode: true, 
    currentCategory: 'home',
    pendingOrderProductId: null,

    // MAP & DELIVERY STATES
    selectedCompany: null,
    mapLat: null,
    mapLng: null,
    isLocationConfirmed: false,
    googleMap: null,
    mapMarker: null,

    init() {
        try { this.tg = window.Telegram?.WebApp; this.tg?.expand?.(); this.tg?.ready?.(); } catch(e) {}
        
        this.minPrice = Number(STORE_CONFIG.minPrice) || 0;
        this.maxPrice = Number(STORE_CONFIG.maxPrice) || 1000;
        try { this.isDarkMode = (localStorage.getItem('brickTheme') !== 'light'); } catch(e) { this.isDarkMode = true; }
        
        const minInput = document.getElementById('minPriceRange');
        const maxInput = document.getElementById('maxPriceRange');
        if(minInput && maxInput) {
            minInput.min = this.minPrice; minInput.max = this.maxPrice; minInput.value = this.minPrice;
            maxInput.min = this.minPrice; maxInput.max = this.maxPrice; maxInput.value = this.maxPrice;
        }

        this.applyTheme();
        this.updateSliderUI();
        this.renderCatalog(); 
    },

    haptic(style = 'light') { try { this.tg?.HapticFeedback?.impactOccurred?.(style); } catch (e) {} },

    // HIGHLIGHT TEXT IN SEARCH
    highlightText(text) {
        if (!this.searchQuery) return text;
        const regex = new RegExp(`(${this.searchQuery})`, 'gi');
        return text.replace(regex, '<span class="search-highlight">$1</span>');
    },

    // ADVANCED SEARCH AUTO-SUGGESTION
    handleSearch(event) {
        this.searchQuery = event.target.value.toLowerCase().trim();
        const suggestionsBox = document.getElementById('search-suggestions');

        if (this.searchQuery.length > 0) {
            const matches = products.filter(p => p.name.toLowerCase().includes(this.searchQuery)).slice(0, 5);
            if (matches.length > 0) {
                suggestionsBox.innerHTML = matches.map(p => `
                    <div onclick="app.selectSuggestion(${p.id})" class="p-3 hover:bg-premiumBlack cursor-pointer border-b border-premiumBorder last:border-0 flex items-center gap-3 transition-colors">
                        <img src="${p.image}" class="w-8 h-8 object-contain rounded bg-[#0a0a0a] p-1">
                        <span class="text-xs font-bold text-premiumWhite tracking-wide">${this.highlightText(p.name)}</span>
                    </div>
                `).join('');
                suggestionsBox.classList.remove('hidden');
                suggestionsBox.classList.add('flex');
            } else {
                suggestionsBox.classList.add('hidden');
            }
        } else {
            suggestionsBox.classList.add('hidden');
        }
        this.renderCatalog();
    },

    selectSuggestion(id) {
        this.haptic('light');
        document.getElementById('search-suggestions').classList.add('hidden');
        document.getElementById('searchInput').value = "";
        this.searchQuery = "";
        this.viewProduct(id); 
    },

    // UI RENDERERS (Truncated for brevity, perfectly identical to V3)
    renderCatalog() {
        const grid = document.getElementById('product-grid');
        if(!grid) return;
        
        const skeletonHTML = Array(4).fill(`<div class="bg-premiumCard border border-premiumBorder rounded-xl overflow-hidden shadow-sm p-3"><div class="w-full aspect-square skeleton rounded-lg mb-3"></div><div class="h-3 skeleton rounded w-3/4 mb-4"></div><div class="flex justify-between items-center"><div class="h-4 skeleton rounded w-1/3"></div><div class="h-6 w-6 skeleton rounded-full"></div></div></div>`).join('');
        grid.innerHTML = skeletonHTML;

        setTimeout(() => {
            let displayProducts = [...products].filter(p => {
                const matchesSearch = p.name.toLowerCase().includes(this.searchQuery);
                let matchesPrice = true;
                if (this.isPriceFilterActive) matchesPrice = (Number(p.price) >= this.minPrice) && (Number(p.price) <= this.maxPrice);
                return matchesSearch && matchesPrice;
            });

            if (displayProducts.length === 0) {
                grid.innerHTML = `<div class="col-span-2 flex flex-col items-center justify-center py-12 text-center"><span class="text-4xl mb-4 opacity-50 grayscale filter">🔍</span><p class="text-premiumGray text-sm mb-5 px-4">No items matched your search or price filter.</p><a href="#" onclick="app.resetFilters(); return false;" class="text-premiumWhite font-bold uppercase text-xs underline">Go back to homepage</a></div>`;
                return;
            }

            grid.innerHTML = displayProducts.map(p => `
                <div onclick="app.viewProduct(${p.id})" class="bg-premiumCard border border-premiumBorder rounded-xl overflow-hidden active:scale-95 transition-transform cursor-pointer flex flex-col shadow-sm hover:shadow-lg">
                    <div class="w-full aspect-square bg-[#0a0a0a] flex items-center justify-center relative p-2">
                        <img src="${p.image}" class="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
                    </div>
                    <div class="p-3 flex-1 flex flex-col justify-between border-t border-premiumBorder bg-premiumCard">
                        <div><h4 class="font-bold text-xs uppercase tracking-wider mb-1 text-premiumWhite">${this.highlightText(p.name)}</h4></div>
                        <div class="mt-3 flex justify-between items-center">
                            <span class="text-premiumWhite font-black text-sm">$${Number(p.price).toFixed(2)}</span>
                            <button onclick="app.animateAddToCart(${p.id}, event)" class="w-7 h-7 rounded-full border border-premiumBorder flex items-center justify-center text-premiumWhite bg-premiumBlack hover:bg-premiumWhite hover:text-premiumBlack transition-colors">
                                <svg class="w-3 h-3 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }, 500); 
    },

    // CONDITIONAL DELIVERY MODAL LOGIC
    openOrderSummary(productId = null) {
        this.haptic('medium');
        this.pendingOrderProductId = productId; 
        
        // Reset form
        this.selectedCompany = null;
        this.isLocationConfirmed = false;
        document.querySelectorAll('.company-box').forEach(b => b.classList.remove('selected'));
        document.getElementById('delivery-error')?.classList.add('hidden');
        document.getElementById('company-error')?.classList.add('hidden');
        document.getElementById('phone-error')?.classList.add('hidden');
        document.getElementById('map-error')?.classList.add('hidden');
        document.getElementById('modal-delivery').value = "";
        document.getElementById('conditional-fields')?.classList.add('hidden');
        document.getElementById('grab-fields')?.classList.add('hidden');
        
        const modal = document.getElementById('order-modal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        setTimeout(() => { modal.classList.remove('opacity-0'); modal.classList.add('opacity-100'); }, 10);
    },

    closeOrderSummary() {
        this.haptic('light');
        const modal = document.getElementById('order-modal');
        modal.classList.remove('opacity-100'); modal.classList.add('opacity-0');
        setTimeout(() => { modal.classList.remove('flex'); modal.classList.add('hidden'); }, 300);
    },

    handleDeliveryChange() {
        const delivery = document.getElementById('modal-delivery').value;
        const conditionalFields = document.getElementById('conditional-fields');
        const grabFields = document.getElementById('grab-fields');
        
        document.getElementById('delivery-error').classList.add('hidden');
        conditionalFields.classList.add('hidden');
        grabFields.classList.add('hidden');
        
        if (delivery.includes('Standard')) {
            conditionalFields.classList.remove('hidden');
        } else if (delivery.includes('Grab')) {
            grabFields.classList.remove('hidden');
        }
    },

    // DELIVERY COMPANY LOGIC
    selectCompany(companyName) {
        this.haptic('light');
        this.selectedCompany = companyName;
        document.getElementById('company-error').classList.add('hidden');
        
        // Update UI Highlights
        document.querySelectorAll('.company-box').forEach(box => {
            box.classList.remove('selected');
        });
        
        // Find matching box based on name to highlight
        if(companyName === 'VET') document.getElementById('company-vet').classList.add('selected');
        if(companyName === 'J&T') document.getElementById('company-jnt').classList.add('selected');
        if(companyName === 'Capitol') document.getElementById('company-capitol').classList.add('selected');
    },

    clearPhoneError() { document.getElementById('phone-error').classList.add('hidden'); },

    // GRAB EXPRESS MAP LOGIC
    getGrabLocation() {
        this.haptic('medium');
        const btn = document.getElementById('btn-get-location');
        btn.innerText = "📍 Locating...";
        
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            btn.innerText = "📍 Get Current Location";
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.mapLat = position.coords.latitude;
                this.mapLng = position.coords.longitude;
                btn.style.display = "none"; // Hide button once located
                
                this.initGoogleMap(this.mapLat, this.mapLng);
            },
            (error) => {
                console.error("Error getting location:", error);
                alert("Failed to get location. Please check your permissions.");
                btn.innerText = "📍 Try Again";
            }
        );
    },

    initGoogleMap(lat, lng) {
        const mapContainer = document.getElementById('map-container');
        const mapDiv = document.getElementById('google-map');
        const confirmBtn = document.getElementById('btn-confirm-location');
        
        mapContainer.classList.remove('hidden');
        
        // Safeguard if API key is missing
        if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
            mapDiv.innerHTML = "<span class='text-red-500'>Google Maps API Key Missing.<br>Location saved internally.</span>";
            this.mapLat = lat; this.mapLng = lng;
            confirmBtn.classList.remove('hidden');
            return;
        }

        // Initialize Map
        const centerPos = { lat: lat, lng: lng };
        this.googleMap = new google.maps.Map(mapDiv, {
            center: centerPos,
            zoom: 16,
            disableDefaultUI: true,
            zoomControl: true
        });

        // Add Draggable Marker
        this.mapMarker = new google.maps.Marker({
            position: centerPos,
            map: this.googleMap,
            draggable: true,
            title: "Drag to exact location"
        });

        // Listen to marker drag
        this.mapMarker.addListener('dragend', (event) => {
            this.mapLat = event.latLng.lat();
            this.mapLng = event.latLng.lng();
            this.isLocationConfirmed = false; // Reset confirmation if they move it
            confirmBtn.innerText = "Confirm Marker Location";
            confirmBtn.classList.replace('bg-green-500', 'bg-blue-600');
        });

        confirmBtn.classList.remove('hidden');
    },

    confirmGrabLocation() {
        this.haptic('medium');
        this.isLocationConfirmed = true;
        document.getElementById('map-error').classList.add('hidden');
        
        const confirmBtn = document.getElementById('btn-confirm-location');
        confirmBtn.innerText = "✅ Location Confirmed";
        confirmBtn.classList.replace('bg-blue-600', 'bg-green-500');
        
        const coordsDisplay = document.getElementById('map-coords');
        coordsDisplay.innerText = `${this.mapLat.toFixed(5)}, ${this.mapLng.toFixed(5)}`;
        coordsDisplay.classList.remove('hidden');
    },

    // FINAL SUBMISSION LOGIC
    submitFinalOrder() {
        this.haptic('medium');
        let isValid = true;
        const delivery = document.getElementById('modal-delivery').value;
        
        if (!delivery) { document.getElementById('delivery-error').classList.remove('hidden'); isValid = false; }

        const isStandard = delivery.includes('Standard');
        const isGrab = delivery.includes('Grab');
        
        const phone = document.getElementById('modal-phone').value.trim();
        const note = document.getElementById('modal-note').value.trim();
        
        // Standard Delivery Validation
        if (isStandard) {
            if (!this.selectedCompany) { document.getElementById('company-error').classList.remove('hidden'); isValid = false; }
            if (!phone) { document.getElementById('phone-error').classList.remove('hidden'); isValid = false; }
        }

        // Grab Express Validation
        if (isGrab) {
            if (!this.isLocationConfirmed || !this.mapLat || !this.mapLng) {
                document.getElementById('map-error').classList.remove('hidden');
                isValid = false;
            }
        }

        if (!isValid) return; // Stop processing if validation fails

        // Construct Data Payload
        const orderData = {
            delivery_method: delivery,
            note: note || 'None',
            cart_items: [],
            total_price: 0,
            customer_info: {}
        };

        // Determine Items
        if (this.pendingOrderProductId) {
            const p = products.find(i => i.id === this.pendingOrderProductId);
            orderData.cart_items.push({ name: p.name, price: p.price });
            orderData.total_price = p.price;
        } else {
            this.cart.forEach(p => {
                orderData.cart_items.push({ name: p.name, price: p.price });
                orderData.total_price += p.price;
            });
        }

        // Build Final Message for Telegram Text
        let message = `🛒 NEW ORDER REQUEST\nDelivery: ${delivery}\n`;
        
        if (isStandard) {
            const province = document.getElementById('modal-province').value;
            const address = document.getElementById('modal-address').value;
            
            orderData.customer_info = { company: this.selectedCompany, location: province, address: address, phone: phone };
            
            message += `Company: ${this.selectedCompany}\n`;
            message += `Location: ${province}\n`;
            message += `Address: ${address || 'N/A'}\n`;
            message += `Phone: ${phone}\n`;
        }
        
        if (isGrab) {
            const mapLink = `https://www.google.com/maps?q=${this.mapLat},${this.mapLng}`;
            orderData.customer_info = { lat: this.mapLat, lng: this.mapLng, mapLink: mapLink };
            message += `Map Link: ${mapLink}\n`;
        }

        message += `Note: ${note || 'None'}\n\n`;
        message += `Items:\n`;
        orderData.cart_items.forEach((item, idx) => { message += `${idx + 1}. ${item.name} - $${item.price.toFixed(2)}\n`; });
        message += `\nTotal Price: $${orderData.total_price.toFixed(2)}`;

        // Send Data Logic (Both WebApp.sendData and Fallback URL)
        try {
            if(this.tg && this.tg.sendData) {
                // Safely send JSON data payload back to Telegram Bot
                this.tg.sendData(JSON.stringify(orderData)); 
            } else if(this.tg && this.tg.openTelegramLink) {
                this.tg.openTelegramLink(`https://t.me/${this.supportUsername}?text=${encodeURIComponent(message)}`);
            } else {
                window.open(`https://t.me/${this.supportUsername}?text=${encodeURIComponent(message)}`, '_blank');
            }
        } catch(e) { 
            window.open(`https://t.me/${this.supportUsername}?text=${encodeURIComponent(message)}`, '_blank'); 
        }
        
        this.closeOrderSummary();
    },

    // Bridged utilities...
    updateSliderUI() { /* ... */ },
    applyTheme() { /* ... */ },
    toggleTheme() { /* ... */ },
    viewProduct(id) { /* HTML generation bridged */ },
    addToCart(id) { /* ... */ },
    navigate(id) { /* ... */ }
};

document.addEventListener('DOMContentLoaded', () => { app.init(); });
