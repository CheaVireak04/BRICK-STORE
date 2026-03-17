// ==========================================
// HOW TO ADD YOUR OWN IMAGES:
// See the text that says "image: https://..." ?
// Just delete the link inside the quotation marks
// and paste your own image link! Example:
// image: "https://my-website.com/my-knife.jpg"
// ==========================================

const products = [
    { id: 1, name: "Karambit Doppler", price: 12, image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/631286982/playside.png", desc: "Premium replica desk toy. Deep sapphire phases with a flawless glossy finish. Includes display stand." },
    { id: 2, name: "Karambit Fade", price: 12, image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/609453843/playside.png", desc: "Premium replica desk toy. 100% fade pattern with seamless gradient transitions. Includes display stand." },
    { id: 3, name: "M9 Bayonet Crimson Web", price: 12, image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/632372451/playside.png", desc: "Premium replica desk toy. Factory new look with distinct webbing patterns. Heavy-duty metal construction." },
    { id: 4, name: "Butterfly Knife Marble Fade", price: 12, image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/632758204/playside.png", desc: "Premium replica desk toy. Smooth flipping action mechanism with stunning tricolor marble aesthetic." },
    { id: 5, name: "Butterfly Knife Tiger Tooth", price: 12, image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/616083695/playside.png", desc: "Premium replica desk toy. Golden anodized finish with hand-machined tiger stripes." },
    { id: 6, name: "Talon Knife Slaughter", price: 12, image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/631798830/playside.png", desc: "Premium replica desk toy. Ivory-style handle with a beautiful crimson slaughter pattern blade." },
    { id: 7, name: "Huntsman Knife Doppler", price: 12, image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/602129942/playside.png", desc: "Premium replica desk toy. Aggressive serrated spine paired with a deep ruby doppler finish." },
    { id: 8, name: "Flip Knife Fade", price: 12, image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/625454898/playside.png", desc: "Premium replica desk toy. Sleek, foldable design featuring a full-blade chromatic fade." },
    { id: 9, name: "Shadow Daggers Marble Fade", price: 12, image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/632307382/playside.png", desc: "Premium replica desk toy. Dual-wield push daggers with matching marble fade patterns." },
    { id: 10, name: "Bowie Knife Tiger Tooth", price: 12, image: "https://cdn.skinport.com/cdn-cgi/image/width=512,height=384,fit=pad,format=avif,quality=85,background=transparent/images/screenshots/632900583/playside.png", desc: "Premium replica desk toy. Massive display piece featuring a mirror-polished tiger tooth blade." }
];

// --- APP LOGIC & ROUTING ---
const app = {
    tg: window.Telegram.WebApp,
    supportUsername: "Chea_Vireak", // Updated to your exact username
    
    // Search & Filter State
    searchQuery: "",
    maxPrice: 1000,

    init() {
        this.tg.expand();
        this.tg.ready();
        this.tg.setHeaderColor('#000000');
        this.tg.setBackgroundColor('#000000');
        
        this.renderCatalog();
        this.setupBackButton();
    },

    haptic(style = 'light') {
        if (this.tg.HapticFeedback) {
            this.tg.HapticFeedback.impactOccurred(style);
        }
    },

    navigate(viewId) {
        this.haptic('light');
        
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

        if (viewId === 'home' || viewId === 'guide') {
            document.getElementById('nav-home').className = `flex flex-col items-center transition-colors ${viewId === 'home' ? 'text-premiumWhite' : 'text-premiumGray hover:text-premiumWhite'}`;
            document.getElementById('nav-guide').className = `flex flex-col items-center transition-colors ${viewId === 'guide' ? 'text-premiumWhite' : 'text-premiumGray hover:text-premiumWhite'}`;
            this.tg.BackButton.hide();
        } else {
            this.tg.BackButton.show();
        }
        
        window.scrollTo(0, 0);
    },

    // AUTOMATED MESSAGE GENERATOR
    openTelegramSupport(productId = null) {
        this.haptic('medium');
        
        let url = `https://t.me/${this.supportUsername}`;
        
        // If the user clicks from a specific product page, build the custom message
        if (productId) {
            const product = products.find(p => p.id === productId);
            if (product) {
                const message = `Hello, I would like to order this product:\nProduct Name: ${product.name}\nPrice: $${product.price}\n${product.image}`;
                // encodeURIComponent turns spaces and symbols into a web-safe link
                url = `https://t.me/${this.supportUsername}?text=${encodeURIComponent(message)}`;
            }
        }
        
        this.tg.openTelegramLink(url);
    },

    takeScreenshot() {
        this.haptic('medium');
        this.tg.showAlert(
            "📸 HOW TO ORDER:\n\n1. Use your phone's physical buttons to take a screenshot of this screen right now.\n\n2. Tap 'Order via Telegram' below.\n\n3. Send us the photo in the chat!"
        );
    },

    setupBackButton() {
        this.tg.BackButton.onClick(() => {
            this.navigate('home');
        });
    },

    handleSearch(event) {
        this.searchQuery = event.target.value.toLowerCase();
        this.renderCatalog();
    },

    handlePriceFilter(event) {
        this.maxPrice = parseInt(event.target.value);
        document.getElementById('priceValue').innerText = '$' + this.maxPrice;
        this.renderCatalog();
    },

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
            <div onclick="app.viewProduct(${product.id})" class="bg-premiumCard border border-premiumBorder rounded-xl overflow-hidden active:scale-95 transition-transform cursor-pointer flex flex-col">
                <div class="w-full aspect-square bg-[#0a0a0a] flex items-center justify-center relative p-2">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-contain">
                </div>
                <div class="p-3 flex-1 flex flex-col justify-between border-t border-premiumBorder">
                    <div>
                        <h4 class="font-bold text-xs uppercase tracking-wider mb-1 leading-tight text-premiumWhite">${product.name}</h4>
                    </div>
                    <div class="mt-3 flex justify-between items-center">
                        <span class="text-premiumWhite font-light text-sm tracking-widest">$${product.price}</span>
                        <div class="w-6 h-6 rounded-full border border-premiumBorder flex items-center justify-center text-premiumWhite">
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
            <div id="screenshot-target" class="bg-premiumCard p-5 rounded-xl border border-premiumBorder mb-6">
                <div class="relative w-full aspect-square bg-[#0a0a0a] rounded-xl overflow-hidden mb-6 flex items-center justify-center">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-contain p-4">
                </div>
                <div class="text-center">
                    <h2 class="text-2xl font-black uppercase tracking-widest leading-tight mb-2 text-premiumWhite">${product.name}</h2>
                    <span class="text-xl font-light text-premiumGray tracking-widest block">$${product.price}</span>
                </div>
            </div>

            <p class="text-sm text-premiumGray leading-relaxed mb-8 px-2">${product.desc}</p>

            <div class="bg-premiumCard border border-premiumBorder p-4 rounded-xl mb-6">
                <h4 class="text-xs font-bold uppercase tracking-widest text-premiumWhite mb-2 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Order Instruction
                </h4>
                <p class="text-xs text-premiumGray">Click Screenshot below to save the product image, then open chat to send it to us.</p>
            </div>

            <div class="space-y-3">
                <button onclick="app.takeScreenshot()" class="w-full bg-premiumCard border border-premiumBorder text-premiumWhite font-bold uppercase tracking-widest text-xs py-4 rounded-xl flex justify-center items-center gap-2 active:scale-95 transition-transform">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    Screenshot Product
                </button>
                <button onclick="app.openTelegramSupport(${product.id})" class="w-full bg-premiumWhite text-premiumBlack font-black uppercase tracking-widest py-4 rounded-xl flex justify-center items-center gap-2 active:scale-95 transition-transform">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.26-3.95 2.58-.29.19-.55.29-.78.28-.26-.01-.76-.15-1.13-.27-.45-.15-.81-.23-.79-.49.01-.13.2-.27.56-.41 2.21-.96 3.68-1.59 4.41-1.89 2.09-.87 2.53-1.02 2.82-1.02.06 0 .2 0 .28.06.07.05.1.12.11.19-.01.07-.01.12-.02.16z"/></svg>
                    Order via Telegram
                </button>
            </div>
        `;
        
        this.navigate('product');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
