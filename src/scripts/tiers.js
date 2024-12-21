export class TiersPainter {
    _selectors = {
        progressItem: '[data-js-tiers-progress-item]',
        tierItem: '[data-js-tier-item]',
    };

    _timeout = 5000;

    _progressItemElements = null;
    _tierItemElements = null;

    _currentActive = 0;

    constructor() {
        this._progressItemElements = document.querySelectorAll(this._selectors.progressItem);
        this._tierItemElements = document.querySelectorAll(this._selectors.tierItem);

        this._setActiveTier();

        document.documentElement.style = `--progress-bar-transition-duration: ${this._timeout}ms;`;

        setInterval(() => {
            this._switchActiveTier();
        },
        this._timeout
        )
    }

    _incrementCurrentActive() {
        this._currentActive++;

        if (this._currentActive > this._tierItemElements.length - 1) {
            this._currentActive = 0;
        }
    }

    _removeActiveTier() {
        this._progressItemElements[this._currentActive].classList.remove('active');
        this._tierItemElements[this._currentActive].classList.remove('active');
    }

    _setActiveTier() {
        this._progressItemElements[this._currentActive].classList.add('active');
        this._tierItemElements[this._currentActive].classList.add('active');
    }

    _switchActiveTier() {
        this._removeActiveTier();

        this._incrementCurrentActive();

        this._setActiveTier();
    }
}