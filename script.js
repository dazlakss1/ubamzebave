/* ============================================================
   [DÜKKAN ADI] — Medikal Tanıtım Sitesi
   Etkileşim katmanı: ürün kataloğu, filtre, mobil menü, animasyon
   ============================================================ */

(function () {
    'use strict';

    /* ============================================================
       1. ÜRÜN KATALOĞU (veri odaklı)
       Fiyatlar bilgilendirme amaçlıdır. Mağazada farklı model/marka var.
       ============================================================ */
    const PRODUCTS = [
        // --- MEDİKAL CİHAZLAR ---
        { id: 1, name: 'Dijital Tansiyon Aleti', cat: 'cihaz', catLabel: 'Cihaz', icon: 'fa-heart-pulse', desc: 'Üst kol, otomatik ölçüm, aritmi uyarısı.', price: '1.450 ₺', oldPrice: '1.690 ₺', tag: 'featured', tagText: 'Öne Çıkan' },
        { id: 2, name: 'Şeker Ölçüm Cihazı', cat: 'cihaz', catLabel: 'Cihaz', icon: 'fa-droplet', desc: 'Hızlı sonuç, geniş ekran, hafıza özelliği.', price: '680 ₺' },
        { id: 3, name: 'Parmak Ucu Oksimetre', cat: 'cihaz', catLabel: 'Cihaz', icon: 'fa-lungs', desc: 'SpO₂ ve nabız ölçümü, OLED ekran.', price: '320 ₺' },
        { id: 4, name: 'Kompresörlü Nebulizör', cat: 'cihaz', catLabel: 'Cihaz', icon: 'fa-wind', desc: 'Hızlı ilaçlama, sessiz motor, çocuk seti.', price: '1.180 ₺', tag: 'new', tagText: 'Yeni' },
        { id: 5, name: 'Dijital Termometre', cat: 'cihaz', catLabel: 'Cihaz', icon: 'fa-temperature-half', desc: 'Esnek uç, 10 saniyede ölçüm, su geçirmez.', price: '145 ₺' },
        { id: 6, name: 'Profesyonel Stetoskop', cat: 'cihaz', catLabel: 'Cihaz', icon: 'fa-stethoscope', desc: 'Çift yüz, anodize membran, düzenek çifti.', price: '890 ₺' },

        // --- ORTOPEDİ & PROTEZ ---
        { id: 7, name: 'Bel Korsesi (Lumbar)', cat: 'ortopedi', catLabel: 'Ortopedi', icon: 'fa-bone', desc: 'Sert plastik çıtalar, fermuarlı, ayarlı.', price: '740 ₺' },
        { id: 8, name: 'Diz Koruyucu Atel', cat: 'ortopedi', catLabel: 'Ortopedi', icon: 'fa-person-walking', desc: 'Hafızalı köpük, nefes alabilen kumaş.', price: '520 ₺', tag: 'new', tagText: 'Yeni' },
        { id: 9, name: 'Bilek Ateli', cat: 'ortopedi', catLabel: 'Ortopedi', icon: 'fa-hand', desc: 'Ayarlı velcro, spor ve gündelik kullanım.', price: '210 ₺' },
        { id: 10, name: 'Boyun Fitası (Servikal)', cat: 'ortopedi', catLabel: 'Ortopedi', icon: 'fa-user', desc: 'Yoğun sünger, çene desteği, nefesli kılıf.', price: '380 ₺' },
        { id: 11, name: 'Tabanlık (Ortopedik)', cat: 'ortopedi', catLabel: 'Ortopedi', icon: 'fa-shoe-prints', desc: 'Deri yüzey, ark desteği, terletmez.', price: '290 ₺' },

        // --- EVDE BAKIM ---
        { id: 12, name: 'Manuel Tekerlekli Sandalye', cat: 'evde-bakim', catLabel: 'Evde Bakım', icon: 'fa-wheelchair', desc: 'Katlanır çelik gövde, fren sistemi dahil.', price: '4.250 ₺', oldPrice: '4.800 ₺', tag: 'featured', tagText: 'Öne Çıkan' },
        { id: 13, name: 'Havalı Anti-Decubitus Yatak', cat: 'evde-bakim', catLabel: 'Evde Bakım', icon: 'fa-bed-pulse', desc: 'Yatak yarası önleyici, kompresörlü sistem.', price: '6.900 ₺' },
        { id: 14, name: 'Hastane Tipi Elektrikli Yatak', cat: 'evde-bakim', catLabel: 'Evde Bakım', icon: 'fa-bed', desc: '4 motorlu, kumandalı, mahfili dahil.', price: '18.500 ₺' },
        { id: 15, name: 'Koltuk Değneği (Çift)', cat: 'evde-bakim', catLabel: 'Evde Bakım', icon: 'fa-person-cane', desc: 'Alüminyum gövde, ayarlı boy, emici kauçuk.', price: '480 ₺' },
        { id: 16, name: 'Yürüteç (Walker)', cat: 'evde-bakim', catLabel: 'Evde Bakım', icon: 'fa-person-walking-with-cane', desc: 'Katlanır, tekerlekli, frenli ön sistem.', price: '1.150 ₺' },
        { id: 17, name: 'Tuvalet Çerçevesi', cat: 'evde-bakim', catLabel: 'Evde Bakım', icon: 'fa-toilet', desc: 'Yükseltilebilir, kol destekli, kaymaz taban.', price: '980 ₺' },

        // --- SARF MALZEMELERİ ---
        { id: 18, name: 'Steril Gaz Sargı Bezi (10lu)', cat: 'sarf', catLabel: 'Sarf', icon: 'fa-bandage', desc: '70x70mm, tek kullanımlık, steril paket.', price: '85 ₺' },
        { id: 19, name: 'Cerrahi Maske (50li Kutu)', cat: 'sarf', catLabel: 'Sarf', icon: 'fa-mask-face', desc: '3 katlı, meltblown filtre, kulak lastikli.', price: '120 ₺' },
        { id: 20, name: 'Nitril Eldiven (100lü)', cat: 'sarf', catLabel: 'Sarf', icon: 'fa-mitten', desc: 'Toz alerjisiz, medium, mavi renk.', price: '180 ₺' },
        { id: 21, name: 'Alkol Bazlı Antiseptik (1L)', cat: 'sarf', catLabel: 'Sarf', icon: 'fa-pump-medical', desc: '%70 etanol, pompalı, hızlı kuruma.', price: '165 ₺' },
        { id: 22, name: 'Yara Bandı Çeşitleri', cat: 'sarf', catLabel: 'Sarf', icon: 'fa-bandage', desc: 'Su geçirmez, esnek, çeşitli boyutlar.', price: '65 ₺' },

        // --- ANNE & BEBEK ---
        { id: 23, name: 'Çift Taraflı Göğüs Pompası', cat: 'anne-bebek', catLabel: 'Anne & Bebek', icon: 'fa-baby', desc: 'Elektrikli, sessiz, 9 emiş modu.', price: '2.480 ₺', oldPrice: '2.750 ₺', tag: 'featured', tagText: 'Öne Çıkan' },
        { id: 24, name: 'Bebek Buhar Makinesi', cat: 'anne-bebek', catLabel: 'Anne & Bebek', icon: 'fa-cloud', desc: 'Soğuk buhar, sessiz, gece lambalı.', price: '890 ₺' },
        { id: 25, name: 'Bebek Tırnak Bakım Seti', cat: 'anne-bebek', catLabel: 'Anne & Bebek', icon: 'fa-scissors', desc: 'Elektrikli, hafızalı, 6 uç.', price: '320 ₺', tag: 'new', tagText: 'Yeni' },
        { id: 26, name: 'Bebek Terazi (Dijital)', cat: 'anne-bebek', catLabel: 'Anne & Bebek', icon: 'fa-weight-scale', desc: 'Hassas ölçüm, katlanır tabla.', price: '760 ₺' },

        // --- SAĞLIK & YAŞAM ---
        { id: 27, name: 'Akıllı Vücut Analiz Tartısı', cat: 'saglik', catLabel: 'Sağlık & Yaşam', icon: 'fa-weight-scale', desc: 'Yağ, kas, kemik oranı, Bluetooth.', price: '540 ₺' },
        { id: 28, name: 'İnfrared Kulak Termometresi', cat: 'saglik', catLabel: 'Sağlık & Yaşam', icon: 'fa-temperature-three-quarters', desc: '1 sn ölçüm, ateş alarmı, hafıza.', price: '420 ₺' },
        { id: 29, name: 'Kişisel Hava Temizleyici', cat: 'saglik', catLabel: 'Sağlık & Yaşam', icon: 'fa-fan', desc: 'HEPA filtre, sessiz, USB şarjlı.', price: '980 ₺' },
        { id: 30, name: 'Masaj Aleti (Boyun)', cat: 'saglik', catLabel: 'Sağlık & Yaşam', icon: 'fa-spa', desc: 'Isıtmalı, şarjlı, 6 mod.', price: '1.290 ₺', oldPrice: '1.490 ₺' },
        { id: 31, name: 'Nemlendirici Oksijen Makinesi', cat: 'saglik', catLabel: 'Sağlık & Yaşam', icon: 'fa-droplet', desc: 'Oda kokusu uyumlu, sessiz motor.', price: '1.560 ₺' },
        { id: 32, name: 'Sırt Düzeltici Korse', cat: 'saglik', catLabel: 'Sağlık & Yaşam', icon: 'fa-person-arrows', desc: 'Postür düzeltici, nefesli, ayarlı.', price: '240 ₺' }
    ];

    /* ============================================================
       2. ÜRÜN KARTLARINI RENDER
       ============================================================ */
    const grid = document.getElementById('productsGrid');
    const filterBtns = document.querySelectorAll('.filter__btn');
    const searchInput = document.getElementById('productSearch');

    let currentFilter = 'all';
    let currentSearch = '';
    let isExpanded = false;

    // Mobilde 6, masaüstünde 12 ürün göster, geri kalanı gizle
    function getVisibleLimit() {
        return window.innerWidth <= 768 ? 6 : 12;
    }

    function escapeHTML(str) {
        return str.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const loadMoreWrap = document.getElementById('loadMoreWrap');

    function renderProducts() {
        const filtered = PRODUCTS.filter(p => {
            const matchFilter = currentFilter === 'all' || p.cat === currentFilter;
            const matchSearch = currentSearch === '' ||
                p.name.toLowerCase().includes(currentSearch) ||
                p.catLabel.toLowerCase().includes(currentSearch) ||
                p.desc.toLowerCase().includes(currentSearch);
            return matchFilter && matchSearch;
        });

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="no-results">
                    <i class="fa-solid fa-magnifying-glass-minus"></i>
                    <h3>Ürün bulunamadı</h3>
                    <p>Aradığınız kriterlere uygun ürün yok. Mağazamızı arayabilirsiniz.</p>
                </div>`;
            if (loadMoreWrap) loadMoreWrap.style.display = 'none';
            return;
        }

        // Filtre değiştiğinde "daha fazla" durumunu sıfırla
        isExpanded = false;

        const limit = getVisibleLimit();
        const total = filtered.length;
        const hiddenCount = total - limit;

        grid.innerHTML = filtered.map((p, idx) => {
            const tagClass = p.tag === 'new' ? 'is-new' : (p.tag === 'featured' ? 'is-featured' : '');
            const tagHTML = p.tag ? `<span class="product-card__tag ${tagClass}">${escapeHTML(p.tagText)}</span>` : '';
            const oldPriceHTML = p.oldPrice ? `<span class="product-card__price-old">${escapeHTML(p.oldPrice)}</span>` : '';
            const hiddenClass = idx >= limit ? 'is-hidden-mobile' : '';

            return `
                <article class="product-card reveal ${hiddenClass}" data-cat="${p.cat}">
                    <div class="product-card__media">
                        ${tagHTML}
                        <i class="fa-solid ${p.icon}"></i>
                    </div>
                    <div class="product-card__body">
                        <span class="product-card__cat">${escapeHTML(p.catLabel)}</span>
                        <h3 class="product-card__title">${escapeHTML(p.name)}</h3>
                        <p class="product-card__desc">${escapeHTML(p.desc)}</p>
                        <div class="product-card__foot">
                            <div class="product-card__price-wrap">
                                <span class="product-card__price-label">Başlangıç fiyatı</span>
                                <span class="product-card__price">${escapeHTML(p.price)}</span>
                                ${oldPriceHTML}
                            </div>
                            <a href="#iletisim" class="product-card__cta" aria-label="${escapeHTML(p.name)} için bilgi al">
                                <i class="fa-solid fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </article>`;
        }).join('');

        // "Daha Fazla" butonu yönetimi
        if (loadMoreWrap && loadMoreBtn) {
            if (hiddenCount > 0) {
                loadMoreWrap.style.display = '';
                loadMoreBtn.innerHTML = `Daha Fazla Ürün Göster <span style="font-weight:400;opacity:.7">(${hiddenCount})</span> <i class="fa-solid fa-chevron-down"></i>`;
                loadMoreBtn.classList.remove('is-hidden');
            } else {
                loadMoreWrap.style.display = 'none';
            }
        }

        // Yeni eklenen kartlar için reveal tetikle
        requestAnimationFrame(() => {
            grid.querySelectorAll('.reveal:not(.is-hidden-mobile)').forEach(el => revealObserver.observe(el));
        });
    }

    // "Daha Fazla" butonu tıklama
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            isExpanded = !isExpanded;
            grid.querySelectorAll('.product-card.is-hidden-mobile').forEach(card => {
                card.classList.remove('is-hidden-mobile');
                // Gizli olan kartlar için reveal tetikle
                if (!card.classList.contains('is-visible')) {
                    revealObserver.observe(card);
                }
            });
            loadMoreBtn.innerHTML = 'Tüm Ürünleri Göster <i class="fa-solid fa-chevron-up"></i>';
            loadMoreBtn.classList.add('is-hidden');
            loadMoreWrap.style.display = 'none';
        });
    }

    // Ekran boyutu değiştiğinde render'ı güncelle (limit mobilden masaüstüne geçerse)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => renderProducts(), 250);
    });

    /* ============================================================
       3. FILTRELEME
       ============================================================ */
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');
            currentFilter = btn.dataset.filter;
            isExpanded = false;
            renderProducts();
        });
    });

    // Kategori kartından filtre tetikleme
    document.querySelectorAll('[data-cat]').forEach(el => {
        if (el.classList.contains('cat-card')) {
            el.addEventListener('click', (e) => {
                const cat = el.dataset.cat;
                const targetBtn = document.querySelector(`.filter__btn[data-filter="${cat}"]`);
                if (targetBtn) {
                    targetBtn.click();
                }
            });
        }
    });

    // Arama (debounce)
    let searchTimer;
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimer);
            searchTimer = setTimeout(() => {
                currentSearch = e.target.value.toLowerCase().trim();
                isExpanded = false;
                renderProducts();
            }, 200);
        });
    }

    /* ============================================================
       4. SCROLL REVEAL (IntersectionObserver)
       ============================================================ */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* ============================================================
       5. HEADER SCROLL & YUKARI BUTONU
       ============================================================ */
    const header = document.getElementById('header');
    const toTop = document.getElementById('toTop');

    function onScroll() {
        const y = window.scrollY;
        header.classList.toggle('is-scrolled', y > 20);
        toTop.classList.toggle('is-visible', y > 600);
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    if (toTop) {
        toTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ============================================================
       6. MOBİL MENÜ
       ============================================================ */
    const navToggle = document.getElementById('navToggle');
    const navClose = document.getElementById('navClose');
    const nav = document.getElementById('nav');
    const body = document.body;

    // Backdrop oluştur
    const backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    body.appendChild(backdrop);

    function closeMenu() {
        nav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        backdrop.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
    }
    function openMenu() {
        nav.classList.add('is-open');
        navToggle.classList.add('is-open');
        backdrop.classList.add('is-open');
        navToggle.setAttribute('aria-expanded', 'true');
        body.style.overflow = 'hidden';
    }

    navToggle.addEventListener('click', () => {
        nav.classList.contains('is-open') ? closeMenu() : openMenu();
    });
    if (navClose) navClose.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

    // ESC ile kapat
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('is-open')) closeMenu();
    });

    /* ============================================================
       7. AKTİF NAV LİNKİ (scroll spy)
       ============================================================ */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    // Başlangıçta hiçbir link aktif olmasın
    navLinks.forEach(link => link.classList.remove('is-active'));

    // Scroll pozisyonuna göre en üstteki section'ı bul
    function updateActiveByScroll() {
        const scrollY = window.scrollY + 120; // header offset
        let current = null;
        sections.forEach(section => {
            if (section.offsetTop <= scrollY) {
                current = section.id;
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle(
                'is-active',
                current !== null && link.getAttribute('href') === `#${current}`
            );
        });
    }

    window.addEventListener('scroll', updateActiveByScroll, { passive: true });
    updateActiveByScroll();

    /* ============================================================
       8. İLK YÜKLEME
       ============================================================ */
    renderProducts();
    onScroll();

    // Telif yılı
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
