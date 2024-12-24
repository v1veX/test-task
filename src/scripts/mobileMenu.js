export class MobieMenu {
    _selectors = {
        menu: '[data-js-mobile-menu]',
        openButton: '[data-js-mobile-menu-open]',
        closeButton: '[data-js-mobile-menu-close]',
        link: '[data-js-mobile-menu-link]', 
    }

    constructor() {
        this._bindEvents();
    }

    _openMenu() {
        const menuElement = document.querySelector(this._selectors.menu);
        menuElement.classList.add('show');

        document.body.style.overflow = 'hidden';
    }

    _closeMenu() {
        const menuElement = document.querySelector(this._selectors.menu);
        menuElement.classList.remove('show');

        document.body.style.overflow = 'auto';
    }

    _onClick = event => {
        const { target } = event;

        if (target.closest(this._selectors.openButton)) {
            this._openMenu();
        }
        else if (target.closest(this._selectors.closeButton) || target.closest(this._selectors.link)) {
            this._closeMenu();
        }
    };

    _bindEvents() {
        document.addEventListener('click', this._onClick);
    }
}