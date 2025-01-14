"use strict";

class AppointmentManager {
    constructor() {
        this.appointments = [];
        this.loadAppointments();
        this.initializeEventListeners();
        this.checkLoginStatus();
    }

    /**
     * Initialize event listeners for UI actions.
     */
    initializeEventListeners() {
        const todayBtn = document.getElementById('todayBtn');
        const newAppointmentBtn = document.getElementById('newAppointmentBtn');
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const appointmentForm = document.getElementById('appointmentForm');
        const appointmentsTable = document.getElementById('appointmentsTable');

        todayBtn?.addEventListener('click', () => this.filterTodayAppointments());
        newAppointmentBtn?.addEventListener('click', () => this.openNewAppointmentModal());
        loginBtn?.addEventListener('click', () => this.login());
        logoutBtn?.addEventListener('click', () => this.logout());
        appointmentForm?.addEventListener('submit', (e) => this.handleAppointmentSubmit(e));
        appointmentsTable?.addEventListener('click', (e) => this.handleActions(e));
    }

    /**
     * Check login status and update the UI accordingly.
     */
    checkLoginStatus() {
        const isLoggedIn = sessionStorage.getItem('token') !== null;
        this.updateUIForLoginStatus(isLoggedIn);
    }

    /**
     * Update UI elements based on login status.
     * @param {boolean} isLoggedIn - Whether the user is logged in.
     */
    updateUIForLoginStatus(isLoggedIn) {
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const appointmentSection = document.getElementById('appointmentSection');

        if (loginBtn) loginBtn.style.display = isLoggedIn ? 'none' : 'inline-block';
        if (logoutBtn) logoutBtn.style.display = isLoggedIn ? 'inline-block' : 'none';
        if (appointmentSection) appointmentSection.style.display = isLoggedIn ? 'block' : 'none';
    }

    /**
     * Simulate login by setting session data.
     */
    login() {
        sessionStorage.setItem('token', 'dummy_token');
        sessionStorage.setItem('email', 'user@example.com');
        sessionStorage.setItem('role', 'user');
        this.updateUIForLoginStatus(true);
    }

    /**
     * Logout the user by clearing session data.
     */
    logout() {
        sessionStorage.clear();
        this.updateUIForLoginStatus(false);
    }

    /**
     * Load all appointments from the API.
     */
    async loadAppointments() {
        try {
            const response = await fetch('http://localhost:3000/appointment/getAll');
            if (!response.ok) throw new Error('Failed to fetch appointments');
            this.appointments = await response.json();
            this.renderAppointments();
        } catch (error) {
            console.error('Error loading appointments:', error);
            alert('Failed to load appointments. Please try again.');
        }
    }

    /**
     * Render appointments in the table.
     */
    renderAppointments() {
        const tableBody = document.getElementById('appointmentsTable');
        if (tableBody) {
            tableBody.innerHTML = this.appointments.map(appointment => `
                <tr>
                    <td>${appointment.patientName}</td>
                    <td>${appointment.email}</td>
                    <td>${appointment.phoneNumber}</td>
                    <td>${appointment.doctorName}</td>
                    <td>${appointment.date}</td>
                    <td>${appointment.time}</td>
                    <td>
                        
                        <button class="btn btn-sm btn-link text-danger delete-btn" data-id="${appointment._id}" title="Delete">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `).join('');
        }
    }

    /**
     * Filter appointments to show only today's appointments.
     */
    filterTodayAppointments() {
        const today = new Date().toISOString().split('T')[0];
        const filteredAppointments = this.appointments.filter(app => app.date === today);
        this.appointments = filteredAppointments;
        this.renderAppointments();
    }

    
    openNewAppointmentModal() {
        const form = document.getElementById('appointmentForm');
        if (form) {
            form.reset();
            delete form.dataset.appointmentId; // Clear existing ID
        }
        const modalElement = document.getElementById('appointmentModal');
        if (modalElement) {
            const modalInstance = new bootstrap.Modal(modalElement);
            modalInstance.show();
        }
    }

    /**
     * Handle edit or delete actions on appointments.
     * @param {Event} e - The event object.
     */
    async handleActions(e) {
        if (e.target.closest('.edit-btn')) {
            const editBtn = e.target.closest('.edit-btn');
            const appointmentId = editBtn.dataset.id;
            this.openEditAppointmentModal(appointmentId);
        } else if (e.target.closest('.delete-btn')) {
            const deleteBtn = e.target.closest('.delete-btn');
            const appointmentId = deleteBtn.dataset.id;
            await this.deleteAppointment(appointmentId);
        }
    }

    /**
     * Delete an appointment by ID.
     * @param {string} id - The appointment ID.
     */
    async deleteAppointment(id) {
        try {
            const response = await fetch(`http://localhost:3000/appointment/delete?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete appointment');

            const result = await response.json();
            if (result.success) {
                this.appointments = this.appointments.filter(app => app._id !== id);
                this.renderAppointments();
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error deleting appointment:', error);
            alert('Failed to delete appointment. Please try again.');
        }
    }

    /**
     * Handle form submission for creating or updating an appointment.
     * @param {Event} e - The form submission event.
     */
    async handleAppointmentSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const appointmentData = Object.fromEntries(formData.entries());
        const appointmentId = form.dataset.appointmentId;

        const phoneRegex = /^\+251[1-9]\d{8}$/;
        if (!phoneRegex.test(appointmentData.phoneNumber)) {
            alert("Please enter a valid Ethiopian phone number (e.g., +251912345678)");
            return;
        }

        try {
            const url = appointmentId
                ? `http://localhost:3000/appointment/${appointmentId}`
                : 'http://localhost:3000/appointment/create';
            const method = appointmentId ? 'PATCH' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(appointmentData),
            });

            if (!response.ok) throw new Error('Failed to submit appointment');

            const updatedAppointment = await response.json();

            if (appointmentId) {
                this.appointments = this.appointments.map(app => app._id === appointmentId ? updatedAppointment : app);
            } else {
                this.appointments.push(updatedAppointment);
            }

            this.renderAppointments();

            const modalElement = document.getElementById('appointmentModal');
            if (modalElement) {
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                modalInstance.hide();
            }

            form.reset();
            delete form.dataset.appointmentId;
        } catch (error) {
            console.error('Error submitting appointment:', error);
            alert('Failed to submit appointment. Please try again.');
        }
    }

    /**
     * Open the edit appointment modal with prefilled data.
     * @param {string} appointmentId - The appointment ID.
     */
    openEditAppointmentModal(appointmentId) {
        const appointment = this.appointments.find(app => app._id === appointmentId);
        if (!appointment) {
            alert('Appointment not found');
            return;
        }

        const form = document.getElementById('appointmentForm');
        if (form) {
            form.patientName.value = appointment.patientName;
            form.email.value = appointment.email;
            form.phoneNumber.value = appointment.phoneNumber;
            form.doctorName.value = appointment.doctorName;
            form.date.value = appointment.date;
            form.time.value = appointment.time;
            form.dataset.appointmentId = appointmentId;
        }

        const modalElement = document.getElementById('appointmentModal');
        if (modalElement) {
            const modalInstance = new bootstrap.Modal(modalElement);
            modalInstance.show();
        }
    }
}

// Initialize the AppointmentManager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AppointmentManager();
});
