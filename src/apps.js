document.addEventListener('alpine:init', () => {
        Alpine.data('products', () => ({
            items: [
                { id: 1, name: 'Pelatihan Komputer', img: '1.png', },
                { id: 1, name: 'Pelatihan Listrik', img: '2.png', },
                { id: 1, name: 'Pelatihan Tata boga', img: '3.png', },
                { id: 1, name: 'Pelatihan Garmen Apparel', img: '4.png', },
                { id: 1, name: 'Pelatihan Tata boga', img: '5.png', },
                { id: 1, name: 'Pelatihan Komputer', img: '6.png', },
                { id: 1, name: 'Pelatihan Listrik', img: '7.png', },
                { id: 1, name: 'Pelatihan Garmen Apparel', img: '8.png', },
            ]
        }));
    }); 