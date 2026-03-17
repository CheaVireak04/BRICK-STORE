// --- 1. PRODUCT DATA ---
const products = [
    { id: 1, name: "Karambit Doppler", price: 12, image: "https://placehold.co/600x600/111111/FFFFFF?text=KARAMBIT\nDOPPLER", desc: "Premium replica desk toy. Deep sapphire phases with a flawless glossy finish. Includes display stand." },
    { id: 2, name: "Karambit Fade", price: 12, image: "https://placehold.co/600x600/111111/FFFFFF?text=KARAMBIT\n+FADE", desc: "Premium replica desk toy. 100% fade pattern with seamless gradient transitions. Includes display stand." },
    { id: 3, name: "M9 Bayonet Crimson Web", price: 12, image: "https://placehold.co/600x600/111111/FFFFFF?text=M9+BAYONET\nCRIMSON", desc: "Premium replica desk toy. Factory new look with distinct webbing patterns. Heavy-duty metal construction." },
    { id: 4, name: "Butterfly Knife Marble Fade", price: 12, image: "https://placehold.co/600x600/111111/FFFFFF?text=BUTTERFLY\nMARBLE+FADE", desc: "Premium replica desk toy. Smooth flipping action mechanism with stunning tricolor marble aesthetic." },
    { id: 5, name: "Butterfly Knife Tiger Tooth", price: 12, image: "https://placehold.co/600x600/111111/FFFFFF?text=BUTTERFLY\nTIGER+TOOTH", desc: "Premium replica desk toy. Golden anodized finish with hand-machined tiger stripes." },
    { id: 6, name: "Talon Knife Slaughter", price: 12, image: "https://placehold.co/600x600/111111/FFFFFF?text=TALON\nSLAUGHTER", desc: "Premium replica desk toy. Ivory-style handle with a beautiful crimson slaughter pattern blade." },
    { id: 7, name: "Huntsman Knife Doppler", price: 12, image: "https://placehold.co/600x600/111111/FFFFFF?text=HUNTSMAN\nDOPPLER", desc: "Premium replica desk toy. Aggressive serrated spine paired with a deep ruby doppler finish." },
    { id: 8, name: "Flip Knife Fade", price: 12, image: "https://placehold.co/600x600/111111/FFFFFF?text=FLIP+KNIFE\nFADE", desc: "Premium replica desk toy. Sleek, foldable design featuring a full-blade chromatic fade." },
    { id: 9, name: "Shadow Daggers Marble Fade", price: 12, image: "https://placehold.co/600x600/111111/FFFFFF?text=SHADOW+DAGGERS\nMARBLE", desc: "Premium replica desk toy. Dual-wield push daggers with matching marble fade patterns." },
    { id: 10, name: "Bowie Knife Tiger Tooth", price: 12, image: "https://placehold.co/600x600/111111/FFFFFF?text=BOWIE+KNIFE\nTIGER", desc: "Premium replica desk toy. Massive display piece featuring a mirror-polished tiger tooth blade." }
];

// --- 2. APP LOGIC & ROUTING ---
const app = {
    tg: window.Telegram.WebApp,
    supportUsername: "Brick Store", // <-- CHANGE THIS TO YOUR TELEGRAM USERNAME

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
        
        // 1. Hide all views EXCEPT the target view
        document.querySelectorAll('.view-section').forEach(el => {
            if (el.id !== `view-${viewId}`) {
                el.classList.remove('active');
                el.classList.add('hidden');
            }
        });

        // 2. Show the target view
        const target = document.getElementById(`view-${viewId}`);
        target.classList.remove('hidden');
        
        // 3. Trigger reflow to restart CSS animation smoothly
        void target.offsetWidth; 
        target.classList.add('active');

        // 4. Update Bottom Nav Styling
        if (viewId === 'home' || viewId === 'guide') {
            document.getElementById('nav-home').className = `flex flex-col items-center transition-colors ${viewId === 'home' ? 'text-premiumWhite' : 'text-premiumGray hover:text-premiumWhite'}`;
            document.getElementById('nav-guide').className = `flex flex-col items-center transition-colors ${viewId === 'guide' ? 'text-premiumWhite' : 'text-premiumGray hover:text-premiumWhite'}`;
            this.tg.BackButton.hide();
        } else {
            this.tg.BackButton.show();
        }
        
        window.scrollTo(0, 0);
    },

        // Show target view
        const target = document.getElementById(`view-${viewId}`);
        target.classList.remove('hidden');
        // Trigger reflow to restart CSS animation
        void target.offsetWidth; 
        target.classList.add('active');

        // Update Bottom Nav Styling
        if (viewId === 'home' || viewId === 'guide') {
            document.getElementById('nav-home').className = `flex flex-col items-center transition-colors ${viewId === 'home' ? 'text-premiumWhite' : 'text-premiumGray hover:text-premiumWhite'}`;
            document.getElementById('nav-guide').className = `flex flex-col items-center transition-colors ${viewId === 'guide' ? 'text-premiumWhite' : 'text-premiumGray hover:text-premiumWhite'}`;
            this.tg.BackButton.hide();
        } else {
            this.tg.BackButton.show();
        }
        
        window.scrollTo(0, 0);
    },

    openTelegramSupport() {
        this.haptic('medium');
        this.tg.openTelegramLink(`https://t.me/${this.supportUsername}`);
    },

    setupBackButton() {
        this.tg.BackButton.onClick(() => {
            this.navigate('home');
        });
    },

    // --- 3. RENDERING ---
    renderCatalog() {
        const grid = document.getElementById('product-grid');
        grid.innerHTML = products.map(product => `
            <div onclick="app.viewProduct(${product.id})" class="bg-premiumCard border border-premiumBorder rounded-xl overflow-hidden active:scale-95 transition-transform cursor-pointer flex flex-col">
                <div class="w-full aspect-square bg-[#0a0a0a] p-3 flex items-center justify-center relative">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-contain">
                </div>
                <div class="p-3 flex-1 flex flex-col justify-between">
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
            <div class="relative w-full aspect-video bg-premiumCard rounded-xl overflow-hidden mb-6 border border-premiumBorder flex items-center justify-center group cursor-pointer" onclick="app.haptic('medium'); alert('Video showcase would play here.');">
                <img src="${product.image}" alt="Video Thumbnail" class="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm">
                <div class="absolute inset-0 video-overlay"></div>
                <div class="w-14 h-14 bg-premiumWhite/10 backdrop-blur-md rounded-full flex items-center justify-center border border-premiumWhite/20 z-10 group-active:scale-90 transition-transform">
                    <svg class="w-6 h-6 text-premiumWhite ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <span class="absolute bottom-3 left-4 text-[10px] font-bold uppercase tracking-widest text-premiumWhite z-10 flex items-center gap-2">
                    <span class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> Product Showcase
                </span>
            </div>

            <div class="mb-8">
                <h2 class="text-3xl font-black uppercase tracking-widest leading-tight mb-2">${product.name}</h2>
                <span class="text-2xl font-light text-premiumWhite tracking-widest border-b border-premiumBorder pb-4 block mb-4">$${product.price}</span>
                <p class="text-sm text-premiumGray leading-relaxed">${product.desc}</p>
            </div>

            <div class="bg-premiumCard border border-premiumBorder p-4 rounded-xl mb-6">
                <h4 class="text-xs font-bold uppercase tracking-widest text-premiumWhite mb-2 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Order Instruction
                </h4>
                <p class="text-xs text-premiumGray">Take a screenshot of this page and send it to our Telegram support to place your order. No automated checkout.</p>
            </div>

            <div class="space-y-3">
                <button onclick="app.haptic('light'); alert('Screenshot saved! Now open chat to send it.');" class="w-full bg-premiumCard border border-premiumBorder text-premiumWhite font-bold uppercase tracking-widest text-xs py-4 rounded-xl flex justify-center items-center gap-2 active:scale-95 transition-transform">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    Screenshot Product
                </button>
                <button onclick="app.openTelegramSupport()" class="w-full bg-premiumWhite text-premiumBlack font-black uppercase tracking-widest py-4 rounded-xl flex justify-center items-center gap-2 active:scale-95 transition-transform">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.26-3.95 2.58-.29.19-.55.29-.78.28-.26-.01-.76-.15-1.13-.27-.45-.15-.81-.23-.79-.49.01-.13.2-.27.56-.41 2.21-.96 3.68-1.59 4.41-1.89 2.09-.87 2.53-1.02 2.82-1.02.06 0 .2 0 .28.06.07.05.1.12.11.19-.01.07-.01.12-.02.16z"/></svg>
                    Order via Telegram
                </button>
            </div>
        `;
        
        this.navigate('product');
    }
};

// Initialize app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
