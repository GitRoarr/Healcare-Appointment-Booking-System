interface ContactForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

class ContactManager {
    private form: HTMLFormElement;
    private successMessage: HTMLElement | null;

    constructor() {
        this.form = document.getElementById('contactForm') as HTMLFormElement;
        this.successMessage = document.getElementById('successMessage');
        this.initializeEventListeners();
    }

    private initializeEventListeners(): void {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Add input event listeners for real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.validateField(input as HTMLInputElement));
        });
    }

    private validateField(field: HTMLInputElement | HTMLTextAreaElement): boolean {
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

    private validateForm(): boolean {
        let isValid = true;
        const inputs = this.form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (!this.validateField(input as HTMLInputElement)) {
                isValid = false;
            }
        });

        return isValid;
    }

    private async handleSubmit(e: Event): Promise<void> {
        e.preventDefault();

        if (!this.validateForm()) {
            return;
        }

        const formData: ContactForm = {
            firstName: (document.getElementById('firstName') as HTMLInputElement).value,
            lastName: (document.getElementById('lastName') as HTMLInputElement).value,
            email: (document.getElementById('email') as HTMLInputElement).value,
            phone: (document.getElementById('phone') as HTMLInputElement).value,
            subject: (document.getElementById('subject') as HTMLInputElement).value,
            message: (document.getElementById('message') as HTMLTextAreaElement).value
        };

        try {
            // Simulate API call
            await this.submitForm(formData);
            
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

        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your message. Please try again.');
        }
    }

    private async submitForm(formData: ContactForm): Promise<void> {
        // Simulate API call with a delay
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form submitted:', formData);
                resolve();
            }, 1000);
        });
    }
}

// Initialize the ContactManager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactManager();
});