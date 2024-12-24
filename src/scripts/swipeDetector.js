export class SwipeDetector {
    _detectorElement = null;

    _startX = null;
    _startY = null;
    _distX = null;
    _distY = null;

    _threshold = 50;

    constructor(element) {
        this._detectorElement = element;

        this._bindEvents();
    }

    _handleTouchStart = event => {
        const touch = event.touches[0];
        this._startX = touch.clientX;
        this._startY = touch.clientY;
    };

    _handleTouchMove = event => {
        const touch = event.touches[0];
        this._distX = touch.clientX - this._startX;
        this._distY = touch.clientY - this._startY;
    };

    _handleTouchEnd = () => {
        if (!(Math.abs(this._distX) > this._threshold && Math.abs(this._distY) < this._threshold)) {
            return;
        }
        
        if (this._distX > 0) {
            const rightSwipeEvent = new CustomEvent('rightswipe', { bubbles: true });
            this._detectorElement.dispatchEvent(rightSwipeEvent);
        } else {
            const leftSwipeEvent = new CustomEvent('leftswipe', { bubbles: true });
            this._detectorElement.dispatchEvent(leftSwipeEvent);
        }
    };

    _bindEvents() {
        this._detectorElement.addEventListener('touchstart', this._handleTouchStart);
        this._detectorElement.addEventListener('touchmove', this._handleTouchMove);
        this._detectorElement.addEventListener('touchend', this._handleTouchEnd);
    }
}