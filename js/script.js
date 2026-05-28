// Toggle class active
const navbarNav = document.querySelector('.navbar-nav');
//ketika hamburger menu di klik
document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
};

//klik diluar sidebar untuk menghilangkan nav
const hamburger = document.querySelector('#hamburger-menu');

document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
});



const itemDetailModal = document.querySelector('#item-detail-modal');

/* tampilkan modal jika belum pernah muncul */
if (!sessionStorage.getItem('modalShown')) {

    window.onload = () => {

        itemDetailModal.classList.add('active');

        sessionStorage.setItem('modalShown', 'true');

    }

}

/* close modal */
const closeIcon = document.querySelector('.close-icon');

if (closeIcon) {

    closeIcon.onclick = (e) => {

        e.preventDefault();

        itemDetailModal.classList.remove('active');

    }

}

/* klik luar modal produk */
window.addEventListener('click', function (e) {

    if (e.target === itemDetailModal) {
        itemDetailModal.classList.remove('active');
    }

});

const welcomeScreen = document.querySelector('#welcomeScreen');
const enterBtn = document.querySelector('#enterBtn');

/* cek session */
if (welcomeScreen) {

    if (sessionStorage.getItem('welcomeShown')) {
        welcomeScreen.style.display = 'none';
    }

    /* tombol lanjut */
    if (enterBtn) {

        enterBtn.addEventListener('click', () => {

            sessionStorage.setItem('welcomeShown', 'true');

            welcomeScreen.classList.add('hide');

        });

    }
}



// =========================
// IMAGE MODAL + ZOOM
// =========================

const beritaCards =
    document.querySelectorAll(".berita-card");

const imageModal =
    document.getElementById("imageModal");

const modalImage =
    document.getElementById("modalImage");

const closeModal =
    document.querySelector(".close-modal");

let scale = 1;
let isDragging = false;

let startX;
let startY;

let translateX = 0;
let translateY = 0;


// BUKA MODAL
beritaCards.forEach(card => {

    card.addEventListener("click", () => {

        const img =
            card.querySelector("img");

        modalImage.src = img.src;

        imageModal.classList.add("show");

        // reset
        scale = 1;

        translateX = 0;
        translateY = 0;

        updateTransform();

    });

});


// CLOSE MODAL
closeModal.addEventListener("click", closeImageModal);

function closeImageModal() {

    imageModal.classList.remove("show");

}


// CLICK BACKGROUND
imageModal.addEventListener("click", (e) => {

    if (e.target !== modalImage) {

        closeImageModal();

    }

});


// =========================
// ZOOM MOUSE WHEEL
// =========================

modalImage.addEventListener("wheel", (e) => {

    e.preventDefault();

    if (e.deltaY < 0) {

        scale += 0.2;

    } else {

        scale -= 0.2;

    }

    // batas zoom
    scale = Math.min(Math.max(1, scale), 5);

    updateTransform();

});


// =========================
// DRAG IMAGE
// =========================

modalImage.addEventListener("mousedown", (e) => {

    isDragging = true;

    startX = e.clientX - translateX;
    startY = e.clientY - translateY;

    modalImage.style.cursor = "grabbing";

});

window.addEventListener("mousemove", (e) => {

    if (!isDragging) return;

    translateX = e.clientX - startX;
    translateY = e.clientY - startY;

    updateTransform();

});

window.addEventListener("mouseup", () => {

    isDragging = false;

    modalImage.style.cursor = "grab";

});


// =========================
// TOUCH ZOOM MOBILE
// =========================

let initialDistance = null;

imageModal.addEventListener("touchmove", (e) => {

    if (e.touches.length === 2) {

        e.preventDefault();

        const dx =
            e.touches[0].clientX -
            e.touches[1].clientX;

        const dy =
            e.touches[0].clientY -
            e.touches[1].clientY;

        const distance =
            Math.sqrt(dx * dx + dy * dy);

        if (initialDistance) {

            if (distance > initialDistance) {

                scale += 0.03;

            } else {

                scale -= 0.03;

            }

            scale =
                Math.min(Math.max(1, scale), 5);

            updateTransform();

        }

        initialDistance = distance;

    }

});

imageModal.addEventListener("touchend", () => {

    initialDistance = null;

});


// =========================
// UPDATE TRANSFORM
// =========================

function updateTransform() {

    modalImage.style.transform =
        `translate(${translateX}px, ${translateY}px) scale(${scale})`;

}