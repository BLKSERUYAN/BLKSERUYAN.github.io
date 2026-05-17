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
document.querySelector('.close-icon').onclick = (e) => {
    e.preventDefault();
    itemDetailModal.classList.remove('active');
}

/* klik luar modal */
window.onclick = (e) => {
    if (e.target === itemDetailModal) {
        itemDetailModal.classList.remove('active');
    }
}

const welcomeScreen = document.querySelector('#welcomeScreen');
const enterBtn = document.querySelector('#enterBtn');

/* cek session */
if (sessionStorage.getItem('welcomeShown')) {
    welcomeScreen.style.display = 'none';
}

/* tombol lanjut */
enterBtn.addEventListener('click', () => {

    sessionStorage.setItem('welcomeShown', 'true');

    welcomeScreen.classList.add('hide');

});