/*- directions-slider -*/
document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".directions-slider", {
        spaceBetween: 30,
        speed: 800,
        effect: "fade",
    });

    const navItems = document.querySelectorAll('.directions-nav__item');

    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            swiper.slideTo(index);
        });
    });

    swiper.on('slideChange', () => {
        const activeIndex = swiper.activeIndex;
        navItems.forEach((el, i) => {
            if (i === activeIndex) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });
    });
});

/*- consultant -*/
document.addEventListener("DOMContentLoaded", function () {
    const closeBtn = document.querySelector(".consultant__close");
    const consultant = document.querySelector(".consultant");

    if (closeBtn && consultant) {
        closeBtn.addEventListener("click", function () {
            consultant.classList.add("hidden");
        });
    }
});

/*- service-slider -*/
const filterNavItems = document.querySelectorAll('.services-filter-nav li');
const swiperWrapper = document.querySelector('.service-slider .swiper-wrapper');
const allSlides = Array.from(document.querySelectorAll('.service-slider .swiper-slide'));

var swiper = new Swiper(".service-slider", {
    slidesPerView: "auto",
    spaceBetween: 56,
    navigation: {
        nextEl: ".gl-arrows .swiper-button-next",
        prevEl: ".gl-arrows .swiper-button-prev",
    },
    breakpoints: {
    0: {
        spaceBetween: 20,
        },
    1241: {
        spaceBetween: 56,
        },
    },
});

filterNavItems.forEach(item => {
    item.addEventListener('click', () => {
    filterNavItems.forEach(el => el.classList.remove('active'));
    item.classList.add('active');

    const filter = item.getAttribute('data-filter');

    swiper.removeAllSlides();

    const filteredSlides = allSlides.filter(slide => {
        const category = slide.getAttribute('data-category');
        return filter === 'all' || category === filter;
    });

    filteredSlides.forEach(slide => {
        swiper.appendSlide(slide);
    });

        swiper.update();
    });
});

/*- filter -*/
document.addEventListener('DOMContentLoaded', () => {
    const filterNavItems = document.querySelectorAll('.filter-nav li');
    const allCases = Array.from(document.querySelectorAll('.cases__item'));
    const pageNav = document.querySelector('.page-nav');

    if (!pageNav || !filterNavItems.length || !allCases.length) return;

    const ITEMS_PER_PAGE = 5;
    let currentPage = 1;
    let currentCategory = 'all';
    let filteredCases = [];
    let prevArrow, nextArrow, paginationContainer;

    function filterCases() {
        filteredCases = allCases.filter(item => {
            const itemCategory = item.dataset.category;
            return currentCategory === 'all' || itemCategory === currentCategory;
        });
    }

    function updateCasesDisplay() {
        allCases.forEach(el => el.style.display = 'none');

        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        const toShow = filteredCases.slice(start, end);

        toShow.forEach(el => el.style.display = '');

        updateArrows();
    }

    function updateArrows() {
        const totalPages = Math.ceil(filteredCases.length / ITEMS_PER_PAGE);
        if (prevArrow && nextArrow) {
            prevArrow.classList.toggle('hidden', currentPage === 1);
            nextArrow.classList.toggle('hidden', currentPage === totalPages || totalPages <= 1);
        }
    }

    function createPagination() {
        const totalPages = Math.ceil(filteredCases.length / ITEMS_PER_PAGE);
        pageNav.innerHTML = '';

        prevArrow = document.createElement('span');
        prevArrow.className = 'page-nav__prev-arrow';
        prevArrow.textContent = 'Назад';
        prevArrow.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                updateCasesDisplay();
                createPagination();
            }
        });
        pageNav.appendChild(prevArrow);

        const ul = document.createElement('ul');
        paginationContainer = ul;

        const visiblePages = [];

        if (totalPages <= 6) {
            for (let i = 1; i <= totalPages; i++) {
                visiblePages.push(i);
            }
        } else {
            if (currentPage <= 4) {
                visiblePages.push(1, 2, 3, 4, 5, '...', totalPages);
            } else if (currentPage >= totalPages - 3) {
                visiblePages.push(1, '...');
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    visiblePages.push(i);
                }
            } else {
                visiblePages.push(1, '...');
                visiblePages.push(currentPage - 1, currentPage, currentPage + 1);
                visiblePages.push('...', totalPages);
            }
        }

        visiblePages.forEach(p => {
            const li = document.createElement('li');
            if (p === '...') {
                li.innerHTML = '<i class="page-nav__separator"></i>';
            } else {
                li.innerHTML = `<span>${p}</span>`;
                if (p === currentPage) li.classList.add('active');
                li.addEventListener('click', () => {
                    currentPage = p;
                    updateCasesDisplay();
                    createPagination();
                });
            }
            ul.appendChild(li);
        });

        pageNav.appendChild(ul);

        nextArrow = document.createElement('span');
        nextArrow.className = 'page-nav__next-arrow';
        nextArrow.textContent = 'Вперёд';
        nextArrow.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                updateCasesDisplay();
                createPagination();
            }
        });
        pageNav.appendChild(nextArrow);

        updateArrows();
    }

    function changeCategory(newCategory) {
        currentCategory = newCategory;
        currentPage = 1;

        filterNavItems.forEach(item => item.classList.remove('active'));
        filterNavItems.forEach(item => {
            if (item.dataset.filter === newCategory) item.classList.add('active');
        });

        filterCases();
        createPagination();
        updateCasesDisplay();
    }

    filterNavItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.dataset.filter;
            changeCategory(category);
        });
    });

    changeCategory('all');
});

/*- filter-services -*/
var containerEl = document.querySelector('.services');

if (containerEl) {
    var mixer = mixitup(containerEl);
}

/*- header mobile menu -*/
document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.querySelector('.menu-btn');
    const headerCol = document.querySelector('.header__col');

    if (menuBtn && headerCol) {
        menuBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            headerCol.classList.toggle('show');
            menuBtn.classList.toggle('close');
        });

        document.addEventListener('click', function (e) {
            const target = e.target;
            const clickedInsideMenu = headerCol.contains(target);
            const clickedOnButton = menuBtn.contains(target);

            if (!clickedInsideMenu && !clickedOnButton) {
                headerCol.classList.remove('show');
                menuBtn.classList.remove('close');
            }
        });
    }
});

/*- accordion -*/
const accordions = document.querySelectorAll('.accordion__title-panel');

accordions.forEach(accordion => {
    accordion.addEventListener('click', function () {
        const currentAccordionItem = this.closest('.accordion__item');
        const currentPanel = this.nextElementSibling;

        accordions.forEach(otherAccordion => {
            if (otherAccordion !== this) {
                otherAccordion.classList.remove('active');
                const otherItem = otherAccordion.closest('.accordion__item');
                const otherPanel = otherAccordion.nextElementSibling;

                if (otherItem) otherItem.classList.remove('open');
                if (otherPanel) otherPanel.style.maxHeight = null;
            }
        });

        this.classList.toggle('active');
        if (currentAccordionItem) currentAccordionItem.classList.toggle('open');

        if (currentPanel.style.maxHeight) {
            currentPanel.style.maxHeight = null;
        } else {
            currentPanel.style.maxHeight = currentPanel.scrollHeight + "px";
        }
    });
});

/*- modal -*/
const myModal = new HystModal({
    closeOnEsc: true,
    backscroll: true,      
});

/*- phone-field -*/
document.addEventListener('DOMContentLoaded', () => {
    const formatPhoneInput = (phoneInput) => {
        phoneInput.addEventListener('input', () => {
            let value = phoneInput.value.replace(/\D/g, '');
            if (!value.startsWith('998')) {
                value = '998' + value;
            }
            value = value.slice(0, 12);
            const formattedValue = `+${value.slice(0, 3)} ${value.slice(3, 5)} ${value.slice(5, 8)} ${value.slice(8, 10)} ${value.slice(10, 12)}`;
            phoneInput.value = formattedValue.trim();
        });

        phoneInput.addEventListener('keydown', (event) => {
            if (event.key === 'Backspace') {
                const cursorPosition = phoneInput.selectionStart;
                const value = phoneInput.value;
                if (cursorPosition <= 5) {
                    event.preventDefault();
                    return;
                }
                const prevChar = value[cursorPosition - 1];
                if (/\s/.test(prevChar)) {
                    event.preventDefault();

                    const newValue = value.slice(0, cursorPosition - 1) + value.slice(cursorPosition);
                    phoneInput.value = newValue;

                    phoneInput.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
                }
            }
        });

        phoneInput.addEventListener('focus', () => {
            if (!phoneInput.value || phoneInput.value === '+998') {
                phoneInput.value = '+998 ';
            }
        });

        phoneInput.addEventListener('blur', () => {
            if (phoneInput.value === '+998 ') {
                phoneInput.value = '';
            }
        });
    };

    const phoneInputs = document.querySelectorAll('.phone-input');
    phoneInputs.forEach((phoneInput) => {
        formatPhoneInput(phoneInput);
    });
});