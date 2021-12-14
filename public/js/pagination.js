const currentPage = document.getElementById('list-current-page');

const pages = Array.from(document.querySelectorAll('.list-pagination .pagination .page-item'));

if (currentPage && pages) {
    const forward = pages.pop();
    const backward = pages.shift();

    for (let i = 0; i < pages.length; i++) {
        if (pages[i].textContent == currentPage.getAttribute('name')) pages[i].classList.add('active');
    }

    forward.onclick = (e) => {
        e.preventDefault();
        if (currentPage.getAttribute('name') == pages[pages.length - 1].textContent) return;
        else pages[parseInt(currentPage.getAttribute('name'))].childNodes[0].click();
    }

    backward.onclick = (e) => {
        e.preventDefault();
        if (currentPage.getAttribute('name') == pages[0].textContent) return;
        else pages[parseInt(currentPage.getAttribute('name')) - 2].childNodes[0].click();
    }
}