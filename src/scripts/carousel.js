export class Carousel {
    _selectors = {
        prevButton: '[data-js-carousel-prev]',
        nextButton: '[data-js-carousel-next]',
        carouselList: '[data-js-carousel-list]',
        carouselItem: '[data-js-carousel-slide]',
    }

    _screenWidths = {
        mobile: 767,
    }

    _carouselElement = null;

    _direction = null;

    _moveOptions = {
        desktop: 354,
        mobile: 184,
    };

    _moveLength = null;

    _activeSlide = 0;

    constructor(selector, options) {
        this._carouselElement = document.querySelector(selector);

        this._direction = options?.direction === 'rtl' ? 1 : -1;
        
        this._setMoveLength();
        
        this._bindEvents();
    }

    _setMoveLength() {
        if (window.innerWidth <= this._screenWidths.mobile) {
            this._moveLength = this._moveOptions.mobile;
        }
        else {
            this._moveLength = this._moveOptions.desktop;
        }
    }

    _moveSlides(dir = 1) {
        const carouselListElement = this._carouselElement.querySelector(this._selectors.carouselList);
        const carouselItemElements = [...carouselListElement.querySelectorAll(this._selectors.carouselItem)];

        if (this._activeSlide === 0 && dir === -1) return;

        if (this._activeSlide === carouselItemElements.length - 1 && dir === 1) return;

        carouselItemElements[this._activeSlide].classList.remove('active');

        this._activeSlide += dir;

        carouselListElement.style = `transform: translate(${this._direction * this._moveLength * this._activeSlide}px, 0px);`;

        carouselItemElements[this._activeSlide].classList.add('active');
    }

    _onClick = event => {
        const { target } = event;

        if (target.closest(this._selectors.prevButton)) {
            this._moveSlides(-1);
        }
        else if (target.closest(this._selectors.nextButton)) {
            this._moveSlides(1);
        }
    }

    _bindEvents() {
        this._carouselElement.addEventListener('click', this._onClick);

        window.addEventListener('resize', () => {
            this._setMoveLength();
            this._moveSlides(0);
        })
    }
}