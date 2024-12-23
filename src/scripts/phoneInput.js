export class PhoneInput {
    _selectors = {
        inputElement: '[data-js-phone-input]',
    }

    _phoneCode = '+7';

    constructor() {
        this._bindEvents();
    }

    _togglePhoneCode(inputElement) {
        const valueLength = inputElement.value.length;

        if (valueLength === 1) {
            inputElement.value = this._phoneCode + inputElement.value;
        }
        else if (valueLength === 2) {
            inputElement.value = '';
        }
    }

    _onInput = event => {
        const { target } = event;

        const isPhoneInput = target.matches(this._selectors.inputElement);

        if (!isPhoneInput) return;

        this._togglePhoneCode(target);
    }

    _bindEvents() {
        document.addEventListener('input', this._onInput);
    }
}