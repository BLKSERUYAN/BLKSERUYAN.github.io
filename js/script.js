document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Deteksi Halaman Aktif Otomatis
    const currentPath = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPath || (currentPath === "" && link.getAttribute("href") === "index.html")) {
            link.classList.add("active");
        }
    });

    // 2. Logika Hamburger Menu (Buka / Tutup Menu Utama Mobile)
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-links");
    
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", (e) => {
            e.stopPropagation(); // Mencegah klik menyebar ke document
            navMenu.classList.toggle("active");
        });
    }

    // 3. Logika Klik Dropdown Khusus Tampilan Mobile (FIXED)
   // Logika Klik Dropdown Khusus Tampilan Mobile (Mendukung Banyak Dropdown)
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation(); // Menahan agar hamburger menu tidak menutup
            
            const parent = toggle.closest('.dropdown');
            const menu = toggle.nextElementSibling;
            
            // Tutup dropdown lain yang mungkin sedang terbuka (biar rapi)
            document.querySelectorAll('.dropdown').forEach(otherParent => {
                if (otherParent !== parent) {
                    otherParent.classList.remove('active');
                    const otherMenu = otherParent.querySelector('.dropdown-menu');
                    if(otherMenu) otherMenu.style.setProperty('display', 'none', 'important');
                }
            });

            // Toggle kelas active pada parent
            parent.classList.toggle('active');
            
            // Paksa display block/flex lewat inline style agar mengalahkan CSS PC
            if (parent.classList.contains('active')) {
                menu.style.setProperty('display', 'flex', 'important');
            } else {
                menu.style.setProperty('display', 'none', 'important');
            }
            
        }
    });
});

    // 4. Tutup Menu Otomatis Jika Mengklik Area Di Luar Menu (FIXED)
    document.addEventListener("click", (event) => {
        // Jika menu sedang terbuka, dan yang diklik bukan area hamburger maupun navMenu
        if (navMenu && navMenu.classList.contains("active")) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove("active");
                if (dropdownParent) dropdownParent.classList.remove("active");
            }
        }
    });

    // 5. Konter Angka Statistik Animatif
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const updateCount = () => {
            const speed = target / 40; 
            if (count < target) {
                count += Math.ceil(speed);
                counter.innerText = count > target ? target : count;
                setTimeout(updateCount, 25);
            }
        };
        updateCount();
    });

    // 6. Auto Slider Testimoni
    const items = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.slider-dots .dot');
    let activeIndex = 0;

    const showSlide = (index) => {
        items.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        if(items[index]) items[index].classList.add('active');
        if(dots[index]) dots[index].classList.add('active');
    };

    if (items.length > 0) {
        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                activeIndex = idx;
                showSlide(activeIndex);
            });
        });
        setInterval(() => {
            activeIndex = (activeIndex + 1) % items.length;
            showSlide(activeIndex);
        }, 4000);
    }

    // 7. FAQ Accordion Click Toggle
    const faqHeaders = document.querySelectorAll('.faq-header');
    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.faq-content');
            
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if(otherItem !== item && otherItem.classList.contains('open')) {
                    otherItem.classList.remove('open');
                    otherItem.querySelector('.faq-content').style.maxHeight = null;
                }
            });

            if (item.classList.contains('open')) {
                item.classList.remove('open');
                content.style.maxHeight = null;
            } else {
                item.classList.add('open');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // 8. Filter Galeri Halaman Galeri
    const filterButtons = document.querySelectorAll('.btn-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filterValue = button.getAttribute('data-filter');
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 9. Peta Interaktif OpenStreetMap
    const mapContainer = document.getElementById('map');
    if (mapContainer && typeof L !== 'undefined') {
        const seruyanCoords = [-3.3986, 112.5434]; 
        const map = L.map('map', { scrollWheelZoom: false }).setView(seruyanCoords, 14);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap'
        }).addTo(map);

        L.marker(seruyanCoords).addTo(map)
            .bindPopup('<b>Kantor Pusat BLK Seruyan</b><br>Kuala Pembuang, Kalimantan Tengah.')
            .openPopup();
    }




});





