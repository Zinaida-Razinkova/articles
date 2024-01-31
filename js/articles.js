"use strict"

function imagesInit() {
    const images = document.querySelectorAll(".articles__link");
    if (images.length) {
        images.forEach(image => {
            const imageItem = image.querySelector('img');
            const padding = imageItem.offsetHeight / imageItem.offsetWidth * 100;
            image.style.paddingBottom = `${padding}%`
            imageItem.classList.add('init');
        })
    }
}

function gridInit() {
    const items = document.querySelector(".articles__items");
    const itemsGrid = new Isotope(items, {
      itemSelector: ".articles__item",
      masonry: {
        fitWidth: true,
        gutter: 20,
      },
    });

    document.addEventListener('click', documentActions);

    function documentActions(event) {
        const tergetElement = event.target;
        if (tergetElement.closest('.articles__filter-item')) {
            const filterItem = tergetElement.closest('.articles__filter-item');
            const filterValue = filterItem.dataset.filter;
            const filterActiveItem = document.querySelector(".articles__filter-item.active");

            filterValue === "*"
              ? itemsGrid.arrange({ filter: `` })
              : itemsGrid.arrange({
                  filter: `[data-filter = "${filterValue}"]`,
              });
            
            filterActiveItem.classList.remove("active");
            filterItem.classList.add('active');

            event.preventDefault();
        }
    }
}

window.addEventListener('load', windowLoad);

function windowLoad() {
    imagesInit();
    gridInit();
}