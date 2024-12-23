export class FormValidation {
    _selectors = {
        formElement: '[data-js-form]',
        formRowElement: '.contacts-form__field',
        fieldErrorsElement: '[data-js-form-field-errors]',
    }

    _errorMessages = {
        valueMissing: () => 'Заполните это поле',
        patternMismatch: ({ title }) => title || 'Данные не соответствуют формату',
        tooShort: ({ minLength }) => `Минимальное количество символов: ${minLength}`,
        looLong: ({ maxLength }) => `Максимальное количество символов: ${maxLength}`,
    }

    constructor() {
        this._bindEvents();
    }

    _clearForm(form) {
        const elements = form.elements;
    
        [...elements].forEach(element => {
            if (element.type === 'checkbox' || element.type === 'radio') {
                element.checked = false;
            }
            else if (element.tagName === 'SELECT') {
                element.selectedIndex = 0;
            }
            else {
                element.value = '';
            }
        });
    }
    

    _manageErrors(fieldElement, errorMessages) {
        const fieldErrorsElement = fieldElement
            .closest(this._selectors.formRowElement)
            .querySelector(this._selectors.fieldErrorsElement);
        
            fieldErrorsElement.innerHTML = errorMessages
                .map(message => `<div>${message}</div>`)
                .join('');
    }

    _validateField(fieldElement) {
        const errors = fieldElement.validity;
        const errorMessages = [];

        Object.entries(this._errorMessages).forEach(([errorType, getErrorMessage]) => {
            if (errors[errorType]) {
                errorMessages.push(getErrorMessage(fieldElement));
            }
        });

        this._manageErrors(fieldElement, errorMessages);

        const isFieldValid = errorMessages.length === 0;

        fieldElement.ariaInvalid = !isFieldValid;

        return isFieldValid;
    }

    _onBlur = event => {
        const { target } = event;

        const isFormfield = target.closest(this._selectors.formElement);
        const isRequired = target.required;

        if (isFormfield && isRequired) {
            this._validateField(target);
        }
    };

    _onChange = event => {
        const { target } = event;

        const isRequired = target.required;
        const isToggleType = ['radio', 'checkbox'].includes(target.type);

        if (isToggleType && isRequired) {
            this._validateField(target);
        }
    }

    _onSubmit = event => {
        const { target } = event;
        const isFormElement = target.matches(this._selectors.formElement);

        if (!isFormElement) return;

        const requiredFieldElements = [...target.elements].filter(({ required }) => required);
        
        let isFormValid = true;
        let firstInvalidFieldElement = null;

        requiredFieldElements.forEach(element => {
            const isFieldValid = this._validateField(element);

            if (!isFieldValid) {
                isFormValid = false;

                firstInvalidFieldElement = firstInvalidFieldElement || element;
            }
        })

        if (!isFormValid) {
            event.preventDefault();
            firstInvalidFieldElement.focus();
        }
        else {
            event.preventDefault();
            this._clearForm(target)
            alert('Ваш вопрос отправлен');
        }
    };

    _bindEvents() {
        document.addEventListener('blur', this._onBlur, { capture: true })
        document.addEventListener('change', this._onChange);
        document.addEventListener('submit', this._onSubmit);
    }
}