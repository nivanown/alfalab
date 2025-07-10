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
document.addEventListener('DOMContentLoaded', function () {
    const filterNav = document.querySelector('.filter-services-nav');
    const filterItems = document.querySelectorAll('.filter-services-nav [data-filter]');
    const serviceItems = document.querySelectorAll('.services__item');

    if (!filterNav || filterItems.length === 0 || serviceItems.length === 0) return;

    filterNav.addEventListener('click', function (e) {
        const target = e.target.closest('[data-filter]');
        if (!target) return;

        const filter = target.getAttribute('data-filter');

        filterItems.forEach(item => item.classList.remove('active'));
        target.classList.add('active');

        serviceItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

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