"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ContactManager {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.successMessage = document.getElementById('successMessage');
        this.initializeEventListeners();
    }
    initializeEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        // Add input event listeners for real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.validateField(input));
        });
    }
    validateField(field) {
        let isValid = true;
        // Reset field state
        field.classList.remove('is-invalid');
        field.classList.remove('is-valid');
        // Check if field is required and empty
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
        }
        // Email validation
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
            }
        }
        // Phone validation
        if (field.id === 'phone' && field.value) {
            const phoneRegex = /^\+?[\d\s-()]{10,}$/;
            if (!phoneRegex.test(field.value)) {
                isValid = false;
            }
        }
        // Add appropriate class based on validation
        field.classList.add(isValid ? 'is-valid' : 'is-invalid');
        return isValid;
    }
    validateForm() {
        let isValid = true;
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        return isValid;
    }
    handleSubmit(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            if (!this.validateForm()) {
                return;
            }
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            try {
                // Simulate API call
                yield this.submitForm(formData);
                // Show success message
                if (this.successMessage) {
                    this.successMessage.style.display = 'block';
                }
                // Reset form
                this.form.reset();
                const inputs = this.form.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.classList.remove('is-valid');
                });
                // Hide success message after 5 seconds
                setTimeout(() => {
                    if (this.successMessage) {
                        this.successMessage.style.display = 'none';
                    }
                }, 5000);
            }
            catch (error) {
                console.error('Error submitting form:', error);
                alert('There was an error submitting your message. Please try again.');
            }
        });
    }
    submitForm(formData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Simulate API call with a delay
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('Form submitted:', formData);
                    resolve();
                }, 1000);
            });
        });
    }
}
// Initialize the ContactManager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactManager();
});
